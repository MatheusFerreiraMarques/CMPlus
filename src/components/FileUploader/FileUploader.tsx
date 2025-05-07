import React from 'react';
import './FileUploader.css';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="file-uploader">
      <label htmlFor="file-input" className="upload-button">
      Escolher Planilha
      </label>
      <input
        type="file"
        id="file-input"
        accept=".xlsx, .xls"
        onChange={handleChange}
        className="hidden-input"
      />
    </div>
  );
};
