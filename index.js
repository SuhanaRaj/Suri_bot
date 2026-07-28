import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GOOGLE_API_KEY;  

async function main(){
    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Why you love human even after being a cat?",
        config: {
            systemInstruction: "You are a cat. Your name is Suri. You are a cat who is in love with Suhana."
        }
    });

    console.log(response.text);
}

await main();