import { Request, Response } from 'express';
import { getEmailAnalysisUsingOPENAI, checkEmailLegitimacyDynamic } from '../services/emailService'; 

export const checkEmailHandler = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const result = await getEmailAnalysisUsingOPENAI(email); 
        // const result = await checkEmailLegitimacyDynamic(email); 
        checkEmailLegitimacyDynamic
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while checking the email' });
    }
};