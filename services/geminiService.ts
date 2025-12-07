import { GoogleGenAI } from "@google/genai";

const getPrompt = (crop: string, topic: 'pragas' | 'defensivos'): string => {
  if (topic === 'pragas') {
    return `
      Aja como um agrônomo especialista.
      Liste as 5 pragas mais comuns e destrutivas para a cultura de ${crop} no Brasil.
      Para cada praga, forneça as seguintes informações em formato de lista (markdown):
      - **Nome Comum e Científico:**
      - **Descrição:** Como identificar a praga (aparência, ciclo de vida).
      - **Danos Causados:** Que partes da planta são afetadas e como.
      - **Sinais de Infestação:** O que o agricultor deve procurar na lavoura.
    `;
  } else {
    return `
      Aja como um agrônomo especialista.
      Liste os principais tipos de defensivos agrícolas (agrotóxicos/venenos) recomendados para o controle das principais pragas na cultura de ${crop} no Brasil.
      Organize a resposta da seguinte forma em formato de lista (markdown):
      - **Tipo de Praga (Ex: Insetos sugadores, Lagartas, Fungos):**
        - **Princípio Ativo Recomendado:** (Ex: Imidacloprido, Clorpirifós, Mancozebe). Mencione 2-3 opções.
        - **Modo de Ação:** (Ex: Sistêmico, Contato, Ingestão).
        - **Observações Importantes:** (Ex: Período de carência, cuidados na aplicação, necessidade de rotação de princípios ativos).

      Finalize com um aviso em negrito e destaque sobre a importância de consultar um engenheiro agrônomo para a recomendação específica, a leitura atenta do rótulo e bula, e o uso de Equipamentos de Proteção Individual (EPI).
    `;
  }
};

export const fetchCropInfo = async (crop: string, topic: 'pragas' | 'defensivos'): Promise<string> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error("A chave de API do Gemini não está configurada. Verifique suas variáveis de ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const prompt = getPrompt(crop, topic);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const text = response.text;
    if (text) {
        return text;
    }
    
    return "Não foi possível obter uma resposta da IA.";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`A comunicação com o serviço de IA falhou: ${error.message}`);
    }
    throw new Error("A comunicação com o serviço de IA falhou por um motivo desconhecido.");
  }
};