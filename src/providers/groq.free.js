
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''; // User must provide this

export const generateWithGroq = async (prompt, systemPrompt = "You are a specialized career coach AI.") => {
    if (!GROQ_API_KEY) {
        console.warn("Groq API Key is missing. Using mock response.");
        return "Simulation: To use real fast AI, please add VITE_GROQ_API_KEY to your .env file.";
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "llama3-8b-8192",
                "messages": [
                    { "role": "system", "content": systemPrompt },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        return data.choices[0]?.message?.content || "No response generated.";
    } catch (error) {
        console.error("Groq API Error:", error);
        return "Error: Failed to fetch from Groq.";
    }
};
