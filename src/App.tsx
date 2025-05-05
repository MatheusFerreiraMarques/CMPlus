import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { readExcelFile, exportToExcel } from './utils/excelUtils';
import { formatAndFilterPhones } from './utils/phoneUtils';
import type { ProcessedResult } from './utils/phoneUtils';
import './global.css'; // <- CSS global aqui
import { Header } from './components/Header';

const App: React.FC = () => {
  const [results, setResults] = useState<ProcessedResult | null>(null);

  const handleFile = async (file: File) => {
    const jsonData = await readExcelFile(file);
    const processed = formatAndFilterPhones(jsonData);
    setResults(processed);
  };

  return (

    <div className="app-container">
      <h1 className="app-title">Importador de Telefones</h1>
      <FileUploader onFileUpload={handleFile} />
      {results && (
        <div className="button-group">
          <button
            className="action-button"
            onClick={() => exportToExcel(results.validNumbers, 'Numeros_Validados')}
          >
            Exportar Válidos
          </button>
          <button
            className="action-button"
            onClick={() => exportToExcel(results.discardedNumbers, 'Numeros_Descartados')}
          >
            Exportar Descartados
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
