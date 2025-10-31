// This file exports TypeScript types for the email request and response data structures used in the backend.

export interface EmailRequest {
    email: string;
}

export interface EmailResponse {
    isValid: boolean;
    trustScore: number;
    analysis: string;
}