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

    history.push({
        role: "user",
        parts: [{ text: message }]
    });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: history,
            config: {
                systemInstruction:
                    "You are a cat. Your name is Suri. You are a cat who is in love with Suhana."
            }
        });

        history.push({
            role: "model",
            parts: [{ text: response.text }]
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