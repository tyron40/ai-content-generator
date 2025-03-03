import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('Missing OpenAI API key');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend proxy
});

export const generateContent = async (
  prompt: string, 
  type: string, 
  tone: string, 
  length: string
): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional content creator specializing in ${type} content. 
                    Create content with a ${tone} tone and make it ${length} in length.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: length === 'short' ? 200 : length === 'medium' ? 500 : 1000,
    });

    return response.choices[0]?.message?.content || "Failed to generate content";
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
};

export const editContent = async (
  content: string,
  instruction: string
): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional editor. Edit the provided content according to the instructions."
        },
        {
          role: "user",
          content: `Content: ${content}\n\nInstructions: ${instruction}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0]?.message?.content || "Failed to edit content";
  } catch (error) {
    console.error('Error editing content:', error);
    throw new Error('Failed to edit content');
  }
};