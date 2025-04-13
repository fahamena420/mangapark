import axios from "axios";
import { config } from "dotenv";

config();

export const client = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Cookie: "theme=mdark; tfv=1744393182711; imgser=1; ph_mcls=3; Hm_lvt_a7025e25c8500c732b8f48cc46e21467=1744393181,1744431901,1744500204; HMACCOUNT=3D34B54D27FA3E17; ps_sort=field_score; nsfw=2; bset=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiaWQiOiI2N2ZiNTFlMDk1NmRlZjhmOGMzNGRlZTkiLCJpYXQiOjE3NDQ1MjM3NDR9.TiG46Z92d41QUh0fmOVTdE_UuA2PZDW92qQBH6-pHhQ; Hm_lpvt_a7025e25c8500c732b8f48cc46e21467=1744524031",
    Origin: "https://mangapark.to",
    Referer: "https://mangapark.to/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
  }
}) 