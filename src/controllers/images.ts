import { Request, Response } from "express";
import { client } from "../utils/client";
import * as cheerio from 'cheerio';

export const images = async (req: Request, res: Response) => {
  try {
    // The fix is to get the ID from req.params instead of req.query
    const id = req.params[0]; 

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid "id" in the URL path' });
    }

    const response = await client.get(`/${id}`);
    const $ = cheerio.load(response.data);
    const object = JSON.parse($("script[type='qwik/json']").text()).objs;
    const jpegUrls = object.filter(
      (item: string) => typeof item === 'string' && item.match(/\.(jpe?g)(\?.*)?$/i)
    );

    res.status(200).json({ totalImg: jpegUrls.length, jpegUrls });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
