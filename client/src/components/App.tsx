import React, { useState } from 'react';
import EmailChecker from './EmailChecker';
import Results from './Results';

const App: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [results, setResults] = useState<any>(null);

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail.trim());
    };

    const handleResultsChange = (newResults: any) => {
        setResults(newResults);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                Email Legitimacy Checker
            </h1>
            <div className="space-y-6">
                <EmailChecker 
                    email={email} 
                    onEmailChange={handleEmailChange} 
                    onResultsChange={handleResultsChange}
                    isDisabled={!email} 
                />
                {results && <Results results={results} />}
            </div>
        </div>
    );
};

export default App;