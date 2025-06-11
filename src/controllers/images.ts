import { Request, Response } from "express";
import { client } from "../utils/client";
import * as cheerio from 'cheerio';

export const images = async (req: Request, res: Response) => {
  try {
    const id = req.params[0]; 

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "id" in the URL path' });
    }

    const response = await client.get(`/${id}`);
    const $ = cheerio.load(response.data);
    
    const scriptElement = $("script[type='qwik/json']");

    // Check if the script tag was found
    if (scriptElement.length === 0) {
      console.error("Error: Could not find script tag with type 'qwik/json'.");
      return res.status(500).json({ error: "Failed to parse external page: script tag not found." });
    }

    const scriptContent = scriptElement.text();
    // Check if the script tag has content
    if (!scriptContent) {
        console.error("Error: Script tag with type 'qwik/json' was empty.");
        return res.status(500).json({ error: "Failed to parse external page: script tag is empty." });
    }

    const parsedData = JSON.parse(scriptContent);
    // Check if the parsed data has the '.objs' property
    if (!parsedData || !parsedData.objs) {
        console.error("Error: Parsed JSON does not contain 'objs' property.");
        return res.status(500).json({ error: "Failed to parse external page: 'objs' property not found in JSON." });
    }

    const object = parsedData.objs;
    const jpegUrls = object.filter(
      (item: any) => typeof item === 'string' && item.match(/\.(jpe?g)(\?.*)?$/i)
    );

    res.status(200).json({ totalImg: jpegUrls.length, jpegUrls });
  } catch (error: any) {
    // Log the full error for better debugging on Vercel
    console.error("An unexpected error occurred in the images handler:", error);
    res.status(500).json({ 
        error: "An internal server error occurred.",
        details: error.message 
    });
  }
};
