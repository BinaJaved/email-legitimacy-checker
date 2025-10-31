
import React from 'react';

interface ResultsProps {
    trustScore: number;
    aiAnalysis: string;
}

const Results: React.FC<ResultsProps> = ({ trustScore, aiAnalysis }) => {
    return (
        <div>
            <h2>Email Check Results</h2>
            <textarea
                readOnly
                value={`Trust Score: ${trustScore}\nAI Analysis: ${aiAnalysis}`}
                rows={10}
                cols={50}
            />
        </div>
    );
};

export default Results;