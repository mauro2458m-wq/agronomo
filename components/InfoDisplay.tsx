
import React from 'react';

interface InfoDisplayProps {
  title: string;
  content: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ title, content }) => {
    const formatContent = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={index} className="font-bold my-2 text-gray-700">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('###')) {
                return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-green-800">{line.replace('###', '').trim()}</h3>;
            }
            if (line.startsWith('##')) {
                return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-green-900">{line.replace('##', '').trim()}</h2>;
            }
            if (line.startsWith('- **')) {
                 const parts = line.substring(2).split(':**');
                 return (
                    <p key={index} className="mb-2 ml-4">
                        <strong className="font-semibold text-gray-800">{parts[0].replace(/\*\*/g, '')}:</strong>
                        {parts.length > 1 ? parts.slice(1).join(':') : ''}
                    </p>
                 );
            }
            if (line.startsWith('* **')) {
                 const parts = line.substring(2).split(':**');
                 return (
                    <p key={index} className="mb-2 ml-4">
                        <strong className="font-semibold text-gray-800">{parts[0].replace(/\*\*/g, '')}:</strong>
                        {parts.length > 1 ? parts.slice(1).join(':') : ''}
                    </p>
                 );
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="list-disc ml-8 mb-1">{line.substring(2)}</li>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="mb-2 text-gray-700">{line}</p>;
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-green-900 mb-4 border-b-2 border-green-200 pb-2">{title}</h2>
            <div className="prose max-w-none text-base leading-relaxed">
                 {formatContent(content)}
            </div>
        </div>
    );
};

export default InfoDisplay;
