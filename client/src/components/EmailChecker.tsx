import React, { useState } from 'react';
import axios from 'axios';

interface CheckResult {
  analysis: string;
}

const EmailChecker: React.FC = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/check-email', { email });
      setResult(response.data.toString() ? { analysis: response.data.toString() } : null);
    } catch (err) {
      setError('Failed to check email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheck}
            disabled={loading || email.trim() === ''}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && (
          <textarea
            readOnly
            value={result.analysis}
            className="w-full h-48 p-4 border rounded bg-gray-50 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    </div>
  );
};

export default EmailChecker;