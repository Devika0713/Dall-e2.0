import express, { response } from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); //to load contents of .env file into process.env

const router = express.Router();

//The method suggested ie using Configuration did not work because of the change in version
//hence referred the updated documentation
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

//localhost:8080/api/v1/dalle
router.route("/").get((req, res) => {
  res.send("Hello from Dall-E route");
});

// async function main() {
//   const image = await openai.images.generate({
//     prompt: "A cute baby sea otter",
//     n: 1,
//     size: "1024x1024",
//     response_format: "b64_json",
//   });

//   console.log(image.data[0].b64_json);
// }

// main();

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    //console.log(aiResponse.data[0]);
    const image = aiResponse.data[0].b64_json;
    //console.log(aiResponse.data);
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
