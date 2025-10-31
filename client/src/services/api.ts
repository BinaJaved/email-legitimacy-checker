import axios from 'axios';

const API_URL = 'http://localhost:3000/check-email';

export const checkEmail = async (email: string) => {
    try {
        const response = await axios.post(API_URL, { email });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error checking email: ' + error.message);
        } else {
            throw new Error('Error checking email: Unknown error');
        }
    }
};