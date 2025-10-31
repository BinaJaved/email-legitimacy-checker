import React, { useState } from 'react';

const EmailChecker: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const handleCheckEmail = async () => {
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError('Failed to check email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
            />
            <button onClick={handleCheckEmail} disabled={loading}>
                {loading ? 'Checking...' : 'Check Email'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <textarea readOnly value={JSON.stringify(result, null, 2)} />
            )}
        </div>
    );
};

export default EmailChecker;