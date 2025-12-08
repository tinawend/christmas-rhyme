import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateRhyme = async (gift: string, tone: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        throw new Error("API Key saknas. Lägg till VITE_GEMINI_API_KEY i din .env fil.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
        "gemini-1.5-flash",
        "gemini-pro"
    ];

    const prompt = `Du är en expert på svenska julrim. Uppgift: Skriv ett rim för julklappen "${gift}".
    Ton: "${tone}".
    Regler:
    1. Rimmet ska vara 4-8 rader långt.
    2. Det absolut sista ordet i rimmet MÅSTE rimma perfekt (fullrim) på "${gift}".
    3. Du får INTE använda ordet "${gift}" i texten.
    4. Se till att rimmet fungerar med svenskt uttal (t.ex. "Bok" rimmar på "Klok", men INTE på "Tjock").`;

    let lastError: any = null;

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            console.warn(`Failed to generate with model ${modelName}:`, error);
            lastError = error;
            // Continue to next model
        }
    }

    // If we get here, all models failed. Try to list available models.
    let availableModels = "Kunde inte hämta lista.";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        if (data.models) {
            availableModels = data.models.map((m: any) => m.name.replace('models/', '')).join(', ');
        }
    } catch (listError) {
        console.error("Failed to list models:", listError);
    }

    const errorMessage = lastError?.message || "Okänt fel";
    throw new Error(`Kunde inte generera rim. Inga modeller fungerade. (Sista felet: ${errorMessage}). Tillgängliga modeller för din nyckel: ${availableModels}`);
};
