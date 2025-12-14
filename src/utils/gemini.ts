import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateRhyme = async (gift: string, tone: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        throw new Error("API Key saknas. Lägg till VITE_GEMINI_API_KEY i din .env fil.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
        "gemini-flash-latest"
    ];

    const prompt = `Du är en expert på svenska julrim.
    Uppgift: Skriv ett rim för julklappen "${gift}".
    Ton: "${tone}".
    
    STRÄNGA INSTRUKTIONER:
    1. Svara ENDAST med rimmet. Ingen annan text.
    2. Använd INTE fetstil (inga **stjärnor**).
    3. Du får INTE skriva ordet "${gift}".
    4. Rimmet SKA sluta med en "cliffhanger" (tre punkter).
    
    STRUKTUR (Följ denna exakt):
    Rad 1: [Rimmar på A]
    Rad 2: [Rimmar på A]
    Rad 3: [Slutar på ett ord som rimmar på "${gift}"]
    Rad 4: [Kort fras som slutar med "..."] (t.ex. "i denna...", "med denna...", "får du av mig...")
    
    EXEMPEL (Klapp: Bil):
    "Här ska du få se på fart och fläkt,
    denna grej är faktiskt helt perfekt.
    Du kan åka många mil,
    med denna lilla..."
    
    (Observera: Ordet "mil" rimmar på "bil", och rimmet slutar med "...")`;

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

    // If we get here, all models failed. Check for common error types.
    const errorMessage = lastError?.message || "";

    // Check for rate limit errors
    if (errorMessage.includes("429") ||
        errorMessage.includes("RESOURCE_EXHAUSTED") ||
        errorMessage.includes("quota") ||
        errorMessage.includes("rate limit")) {
        throw new Error("🎄 Gränsen för antal rim har nåtts idag. Försök igen imorgon efter kl 09:00! 🎅");
    }

    // Check for API key restriction errors
    if (errorMessage.includes("API_KEY") || errorMessage.includes("403")) {
        throw new Error("API-nyckeln är blockerad. Kontakta administratören.");
    }

    // Generic error with technical details for debugging
    throw new Error(`Kunde inte generera rim just nu. Försök igen om en stund. 🎁`);
};
