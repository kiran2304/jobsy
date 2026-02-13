
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ''; // User must provide this in .env

export const generateWithOpenRouter = async (prompt, systemPrompt = "You are a helpful AI career assistant.") => {
    if (!OPENROUTER_API_KEY) {
        console.warn("OpenRouter API Key is missing. Using mock response.");
        return "Simulation: To use real AI, please add VITE_OPENROUTER_API_KEY to your .env file.";
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "mistralai/mistral-7b-instruct:free", // Free model
                "messages": [
                    { "role": "system", "content": systemPrompt },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            throw new Error("No response from OpenRouter");
        }
    } catch (error) {
        console.error("OpenRouter API Error:", error);
        return "Error: Failed to generate response from OpenRouter.";
    }
};
