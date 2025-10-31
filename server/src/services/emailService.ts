import dns from 'dns/promises';
import axios from 'axios';

export const getEmailAnalysis = async (email: string): Promise<string> => {
  try {
    const domain = email.split('@')[1].toLowerCase();

    let domainValid = false;
    try {
      const records = await dns.resolveMx(domain);
      domainValid = records.length > 0;
    } catch {
      domainValid = false;
    }

    if (!domainValid) return `Domain "${domain}" is invalid or cannot receive emails. Possible scam.`;

    // Step 2: Optional - check against public company emails via OpenAI
    const prompt = `Check if the email domain "${domain}" belongs to the official organization of this email "${email}". 
                    Respond only with: "Legit" or "Suspicious" with a short reasoning.`;

    interface OpenAIResponse {
      choices: {
        message: {
          content: string;
        };
      }[];
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an email verification assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 60,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = (response.data as OpenAIResponse).choices[0].message.content.trim();
    return aiMessage;

  } catch (err: any) {
    console.error('Error checking email legitimacy:', err.response?.data || err.message);
    return 'Error analyzing email';
  }
};
