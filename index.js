import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {

    const { message } = req.body;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

        res.json({
            reply: response.text,
        });

    } catch (err) {

        res.status(500).json({
            error: err.message,
        });

    }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});