import { Request, Response } from "express";
import { client } from "../utils/client";
import * as cheerio from 'cheerio'

export const images = async (req: Request, res: Response) => {
  try {
    const wildcardPath = req.params.wildcard; // named wildcard
    const response = await client.get(`/${wildcardPath}`);

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
