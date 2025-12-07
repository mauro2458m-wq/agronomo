import React, { useState, useCallback } from 'react';
import { Crop } from './types';
import { CROPS } from './constants';
import { fetchCropInfo } from './services/geminiService';
import CropCard from './components/CropCard';
import InfoDisplay from './components/InfoDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [topic, setTopic] = useState<'pragas' | 'defensivos' | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    setTopic(null);
    setGeneratedContent('');
    setError('');
  };

  const handleBack = () => {
    setSelectedCrop(null);
    setTopic(null);
    setGeneratedContent('');
    setError('');
  };

  const fetchInformation = useCallback(async (selectedTopic: 'pragas' | 'defensivos') => {
    if (!selectedCrop) return;

    setTopic(selectedTopic);
    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
      const content = await fetchCropInfo(selectedCrop.name, selectedTopic);
      setGeneratedContent(content);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido ao buscar informações.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCrop]);

  const Header = () => (
    <header className="bg-green-800 text-white p-6 shadow-lg">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight">Guia do Agrônomo Várzea Alegre</h1>
        <p className="mt-2 text-lg text-green-200">Informações sobre pragas e defensivos para as culturas de Várzea Alegre</p>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!selectedCrop ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Selecione uma Cultura</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {CROPS.map((crop) => (
                <CropCard key={crop.id} crop={crop} onSelect={handleSelectCrop} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Voltar
            </button>
            <div className="text-center mb-8">
              <div className="inline-block bg-white p-4 rounded-full shadow-md mb-4">
                 <div className="w-20 h-20 text-green-700">{selectedCrop.icon}</div>
              </div>
              <h2 className="text-4xl font-bold text-green-800">{selectedCrop.name}</h2>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => fetchInformation('pragas')}
                disabled={isLoading}
                className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 w-48 ${
                  topic === 'pragas'
                    ? 'bg-green-700 text-white shadow-lg scale-105'
                    : 'bg-white text-green-700 hover:bg-green-100 shadow-md'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Pragas Comuns
              </button>
              <button
                onClick={() => fetchInformation('defensivos')}
                disabled={isLoading}
                className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 w-48 ${
                  topic === 'defensivos'
                    ? 'bg-green-700 text-white shadow-lg scale-105'
                    : 'bg-white text-green-700 hover:bg-green-100 shadow-md'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Defensivos
              </button>
            </div>

            {isLoading && <LoadingSpinner />}
            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
            {generatedContent && !isLoading && (
              <InfoDisplay
                title={`Informações sobre ${topic === 'pragas' ? 'Pragas' : 'Defensivos'} para ${selectedCrop.name}`}
                content={generatedContent}
              />
            )}
          </div>
        )}
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>Gerado com IA do Google Gemini. Sempre consulte um agrônomo profissional.</p>
      </footer>
    </div>
  );
};

export default App;