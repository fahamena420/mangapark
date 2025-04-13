import { Request, Response } from "express";
import { client } from "../utils/client";
import * as cheerio from 'cheerio'

export const images = async (req: Request, res: Response) => {
  try {
    const { infoId, id } = req.params
    const response = await client.get(`/title/${infoId}/${id}`)
    const $ = cheerio.load(response.data)

    const object = JSON.parse($("script[type='qwik/json']").text()).objs
    const jpegUrls = object.filter((item: string) => typeof item === 'string' && item.match(/\.(jpe?g)(\?.*)?$/i));

    res.status(200).json({ totalImg: Number(jpegUrls.length), jpegUrls })
  } catch (error) {
    res.status(500).json(error)
  }
}