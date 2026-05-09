const {GoogleGenAI} = require ("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi() {
    
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents : "Hello Gemini ! Explain what is Interview ?"
    })

    console.log(response.text);
    
}

const Llama = require("groq-sdk");


const llama = new Llama({
    apiKey: process.env.GROQ_API_KEY
});

async function generateai() {
    const response = await llama.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Hello llama! Explain what is Interview?"
            }
        ],
        model: "llama-3.1-8b-instant",
    });

    console.log(response.choices[0].message.content);
}

module.exports ={
    invokeGeminiAi,
    generateai,
}





