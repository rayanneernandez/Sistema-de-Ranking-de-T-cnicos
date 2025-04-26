import React from 'react';
import { useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SettingsPage: React.FC = () => {
  const { technicians } = useAppContext();
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');
  
  const handleExportData = () => {
    const data = {
      technicians,
      exportDate: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `ranking-tecnicos-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };
  
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError('');
    setImportSuccess(false);
    
    const fileReader = new FileReader();
    const file = event.target.files && event.target.files[0];
    
    if (!file) {
      return;
    }
    
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      try {
        if (e.target?.result) {
          const content = e.target.result as string;
          const parsedData = JSON.parse(content);
          
          if (!parsedData.technicians || !Array.isArray(parsedData.technicians)) {
            setImportError('Formato de arquivo inválido. O arquivo deve conter um array de técnicos.');
            return;
          }
          
          localStorage.setItem('technicians', JSON.stringify(parsedData.technicians));
          
          setImportSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        console.error('Erro na importação:', error);
        setImportError('Falha ao processar o arquivo. Certifique-se de que é um arquivo JSON válido.');
      }
    };
    fileReader.onerror = () => {
      setImportError('Erro ao ler o arquivo');
    };
  };
  
  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('technicians');
      window.location.reload();
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Configurações</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-2">Gerenciamento de Dados</h2>
          <p className="text-gray-400">Exporte ou importe seus dados de técnicos</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-md font-medium text-white mb-2">Exportar Dados</h3>
              <p className="text-sm text-gray-400 mb-4">
                Baixe todos os seus dados de técnicos como um arquivo JSON.
              </p>
              <button
                onClick={handleExportData}
                className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-400 bg-transparent hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </button>
              {exportSuccess && (
                <p className="mt-2 text-sm text-green-400">Dados exportados com sucesso!</p>
              )}
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-md font-medium text-white mb-2">Importar Dados</h3>
              <p className="text-sm text-gray-400 mb-4">
                Importe dados de técnicos de um arquivo JSON.
                <br />
                <span className="text-amber-400">Atenção: Isso substituirá seus dados atuais.</span>
              </p>
              <div className="flex items-center">
                <label className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-400 bg-transparent hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Dados
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportData}
                  />
                </label>
              </div>
              {importSuccess && (
                <p className="mt-2 text-sm text-green-400">Dados importados com sucesso! Recarregando...</p>
              )}
              {importError && (
                <p className="mt-2 text-sm text-red-400">{importError}</p>
              )}
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-md font-medium text-white mb-2">Limpar Todos os Dados</h3>
              <p className="text-sm text-gray-400 mb-4">
                Isso removerá todos os dados de técnicos.
                <br />
                <span className="text-red-400 font-semibold">Atenção: Esta ação não pode ser desfeita.</span>
              </p>
              <button
                onClick={handleClearData}
                className="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Todos os Dados
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-2">Sobre</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-2">
            Sistema de Ranking de Técnicos - Versão 1.0.0
          </p>
          <p className="text-gray-400 text-sm">
            Uma ferramenta para acompanhar e classificar técnicos com base em suas métricas de desempenho.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;