import React, { useState } from 'react';
import EmailChecker from './EmailChecker';
import Results from './Results';

const App: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [results, setResults] = useState<any>(null);

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    };

    const handleResultsChange = (newResults: any) => {
        setResults(newResults);
    };

    return (
        <div>
            <h1>Email Legitimacy Checker</h1>
            <EmailChecker email={email} onEmailChange={handleEmailChange} onResultsChange={handleResultsChange} />
            {results && <Results results={results} />}
        </div>
    );
};

export default App;