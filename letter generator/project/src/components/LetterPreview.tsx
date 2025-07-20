import React from 'react';
import { Download, FileText } from 'lucide-react';
import { LetterData } from '../types/LetterTypes';
import { exportToPDF, exportToDocx } from '../utils/exportUtils';

interface LetterPreviewProps {
  letterData: LetterData;
}

const LetterPreview: React.FC<LetterPreviewProps> = ({ letterData }) => {
  const handleExportPDF = () => {
    exportToPDF(letterData);
  };

  const handleExportDocx = () => {
    exportToDocx(letterData);
  };

  const formatBody = (body: string, responsibilities: string[]) => {
    let formattedBody = body;
    
    // Replace placeholders with actual values
    formattedBody = formattedBody.replace(/\[Job Role\]/g, letterData.jobRole || '[Job Role]');
    formattedBody = formattedBody.replace(/\[Department\]/g, letterData.department || '[Department]');
    formattedBody = formattedBody.replace(/\[Start Date\]/g, letterData.startDate || '[Start Date]');
    formattedBody = formattedBody.replace(/\[Salary\]/g, letterData.salary || '[Salary]');
    formattedBody = formattedBody.replace(/\[Reporting Manager\]/g, letterData.reportingManager || '[Reporting Manager]');
    
    // Replace responsibilities placeholder
    if (responsibilities.length > 0) {
      const responsibilityList = responsibilities
        .filter(r => r.trim())
        .map(r => `• ${r}`)
        .join('\n');
      formattedBody = formattedBody.replace(/\[Responsibilities will be listed here\]/g, responsibilityList);
    }
    
    return formattedBody;
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Handle bold text
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={index} className="font-bold mb-2">
            {line.slice(2, -2)}
          </p>
        );
      }
      
      // Handle bullet points
      if (line.startsWith('• ')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.slice(2)}
          </li>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="ml-4 mb-1 list-decimal">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Export Buttons */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleExportPDF}
            className="flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </button>
          <button
            onClick={handleExportDocx}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export as DOCX
          </button>
        </div>
      </div>

      {/* Letter Preview */}
      <div 
        id="letter-preview" 
        className="bg-white rounded-lg shadow-lg p-12 mx-auto max-w-3xl"
        style={{
          fontSize: `${letterData.fontSize}px`,
          lineHeight: letterData.lineHeight,
          fontWeight: letterData.fontWeight,
        }}
      >
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {letterData.logo && (
                <img
                  src={letterData.logo}
                  alt="Company Logo"
                  className="h-16 w-auto mb-4 object-contain"
                />
              )}
              <h1 className="text-2xl font-bold text-blue-900 mb-2">
                {letterData.companyName}
              </h1>
              <div className="text-gray-600 text-sm space-y-1">
                <p>{letterData.companyAddress}</p>
                <p>Phone: {letterData.phone} | Email: {letterData.email}</p>
                <p>Website: {letterData.website}</p>
                <p className="font-medium">MSME Reg. No.: {letterData.msmeNo}</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end space-y-2">
              {letterData.letterNo && (
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Letter No.: {letterData.letterNo}</p>
                </div>
              )}
              <div className="text-sm text-gray-600">
                <p className="font-medium">Date: {letterData.date}</p>
              </div>
              {letterData.seal && (
                <img
                  src={letterData.seal}
                  alt="Company Seal"
                  className="h-16 w-16 object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* Letter Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 underline decoration-2 decoration-blue-600">
            {letterData.letterTitle}
          </h2>
        </div>

        {/* Recipient Information */}
        {letterData.recipientName && (
          <div className="mb-6">
            <div className="text-gray-800">
              <p className="font-medium">{letterData.recipientName}</p>
              {letterData.recipientAddress && (
                <div className="mt-1 text-sm text-gray-600">
                  {letterData.recipientAddress.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subject */}
        <div className="mb-6">
          <p className="font-medium text-gray-900">
            <span className="font-bold">Subject: </span>
            {letterData.subject}
          </p>
        </div>

        {/* Salutation */}
        <div className="mb-4">
          <p className="text-gray-800">
            {letterData.salutation} {letterData.recipientName || '[Recipient Name]'},
          </p>
        </div>

        {/* Letter Body */}
        <div className="mb-8 text-gray-800">
          {renderFormattedText(formatBody(letterData.body, letterData.responsibilities))}
        </div>

        {/* Closing */}
        <div className="mb-12">
          <p className="text-gray-800">{letterData.closing}</p>
        </div>

        {/* Signature */}
        <div className="text-gray-800">
          <div className="border-t border-gray-400 w-48 mb-2"></div>
          <p className="font-medium">{letterData.signatoryName}</p>
          <p className="text-sm text-gray-600">{letterData.signatoryTitle}</p>
          <p className="text-sm text-gray-600">{letterData.companyName}</p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">
            <p>This is a computer-generated letter and does not require a physical signature.</p>
            <p className="mt-0.5">
              {letterData.companyName} | {letterData.email} | {letterData.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;