import dns from 'dns/promises';
import axios from 'axios';
import whois from "whois-json";

export const getEmailAnalysisUsingOPENAI = async (email: string): Promise<string> => {
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
}

export const checkEmailLegitimacyDynamic = async (email: string): Promise<string> => {
  try {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return "❌ Invalid email format.";

    // STEP 1: Verify domain has MX (mail) records
    let hasMx = false;
    try {
      const records = await dns.resolveMx(domain);
      hasMx = records.length > 0;
    } catch {
      return `❌ Domain "${domain}" has no mail servers. Likely fake.`;
    }

    if (!hasMx) {
      return `❌ Domain "${domain}" cannot receive mail.`;
    }

    // STEP 2: Fetch WHOIS info dynamically
    let whoisData: any = {};
    try {
      whoisData = await whois(domain, { follow: 3, timeout: 5000 });
    } catch (e) {
      console.warn(`⚠️ WHOIS lookup failed for ${domain}:`, e);
    }

    const registrar = whoisData.registrar || whoisData.OrgName || "";
    const org = whoisData.org || whoisData.organization || "";

    // STEP 3: Analyze WHOIS + domain name
    const baseName = domain.split(".")[0];
    const isNewDomain = whoisData.creationDate && new Date(whoisData.creationDate) > new Date(Date.now() - 90 * 24 * 3600 * 1000); // last 90 days
    const isFreeEmail = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"].includes(domain);

    if (isFreeEmail) {
      return `⚠️ Generic domain (${domain}) — cannot verify ownership.`;
    }

    if (isNewDomain) {
      return `⚠️ Domain "${domain}" is newly registered — possible temporary or scam email.`;
    }

    if (registrar || org) {
      const orgText = (registrar + " " + org).toLowerCase();
      if (orgText.includes(baseName)) {
        return `✅ Legit: Domain "${domain}" is registered under organization "${org || registrar}".`;
      } else {
        return `⚠️ Domain "${domain}" appears valid but registration does not match "${baseName}". Review manually.`;
      }
    }

    // STEP 4: Fallback verdict
    return `⚠️ Domain "${domain}" is valid but no clear organization data found.`;

  } catch (err: any) {
    console.error("Error analyzing email:", err.message);
    return "❌ Error analyzing email.";
  }
}

