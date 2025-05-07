// components/SheetsImports.tsx
import React, { useState } from 'react';
import { FileUploader } from '../FileUploader/FileUploader';
import { readExcelFile, exportToExcel } from '../../utils/excelUtils';
import { formatAndFilterPhones } from '../../utils/phoneUtils';
import type { ProcessedResult } from '../../utils/phoneUtils';
import './SheetsImports.css';

export const SheetsImports: React.FC = () => {
  const [results, setResults] = useState<ProcessedResult | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFile = async (file: File) => {
    setFile(file); // salva o nome do arquivo
    const jsonData = await readExcelFile(file);
    const processed = formatAndFilterPhones(jsonData);
    setResults(processed);
  };

  return (
    <div className="app-container">
      <section className="import-section">
        <h2 className="app-title">Tratamento de Planilhas</h2>
        <FileUploader onFileUpload={handleFile} />

        {file && (
          <div className="sheet-preview">
            <div className="sheet-icon">📄</div>
            <div className="sheet-name">{file.name}</div>
          </div>
        )}

        {results && (
          <div className="export-section">
            <button
              className="action-button green"
              onClick={() =>
                exportToExcel(results.validNumbers, 'Numeros_Validados')
              }
            >
              Exportar Válidos
            </button>
            <button
              className="action-button red"
              onClick={() =>
                exportToExcel(results.discardedNumbers, 'Numeros_Descartados')
              }
            >
              Exportar Descartados
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
