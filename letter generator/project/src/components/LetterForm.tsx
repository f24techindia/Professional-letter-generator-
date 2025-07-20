import React, { useRef } from 'react';
import { Upload, Save, FileText, Plus, Minus, Bold, Type, AlignLeft } from 'lucide-react';
import { LetterData, letterTypes, letterTemplates, jobRoleTemplates } from '../types/LetterTypes';

interface LetterFormProps {
  letterData: LetterData;
  setLetterData: (data: LetterData) => void;
}

const LetterForm: React.FC<LetterFormProps> = ({ letterData, setLetterData }) => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof LetterData, value: string | number | string[]) => {
    setLetterData({ ...letterData, [field]: value });
  };

  const handleLetterTypeChange = (type: LetterData['letterType']) => {
    const template = letterTemplates[type];
    
    // Preserve job role information when changing letter type
    const currentJobRole = letterData.jobRole;
    const currentDepartment = letterData.department;
    const currentResponsibilities = letterData.responsibilities;
    
    setLetterData({
      ...letterData,
      letterType: type,
      letterTitle: template.title,
      subject: template.subject,
      body: template.body,
      // Preserve job role data
      jobRole: currentJobRole,
      department: currentDepartment,
      responsibilities: currentResponsibilities,
    });
  };

  const handleJobRoleChange = (role: string) => {
    const template = jobRoleTemplates[role as keyof typeof jobRoleTemplates];
    if (template) {
      // Update job role specific fields
      setLetterData({
        ...letterData,
        jobRole: role,
        department: template.department,
        responsibilities: template.responsibilities,
      });
      
      // Update letter body based on letter type to include job role context
      const currentTemplate = letterTemplates[letterData.letterType];
      let updatedBody = currentTemplate.body;
      
      // Add role-specific context to the body for certain letter types
      if (letterData.letterType === 'offer' || letterData.letterType === 'appointment') {
        // The body already has placeholders that will be replaced in preview
        setLetterData(prev => ({
          ...prev,
          jobRole: role,
          department: template.department,
          responsibilities: template.responsibilities,
          body: updatedBody
        }));
      }
    } else {
      setLetterData({
        ...letterData,
        jobRole: role,
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'seal') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLetterData({ ...letterData, [type]: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addResponsibility = () => {
    const newResponsibilities = [...letterData.responsibilities, ''];
    setLetterData({ ...letterData, responsibilities: newResponsibilities });
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = letterData.responsibilities.filter((_, i) => i !== index);
    setLetterData({ ...letterData, responsibilities: newResponsibilities });
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...letterData.responsibilities];
    newResponsibilities[index] = value;
    setLetterData({ ...letterData, responsibilities: newResponsibilities });
  };

  const insertList = (type: 'ordered' | 'unordered') => {
    const listItems = type === 'ordered' 
      ? '\n1. First item\n2. Second item\n3. Third item\n'
      : '\n• First item\n• Second item\n• Third item\n';
    
    const newBody = letterData.body + listItems;
    setLetterData({ ...letterData, body: newBody });
  };

  const saveTemplate = () => {
    const template = {
      name: `${letterData.letterTitle} - ${new Date().toLocaleDateString()}`,
      data: letterData,
    };
    localStorage.setItem('letterTemplate', JSON.stringify(template));
    alert('Template saved successfully!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Configuration & Company Info */}
      <div className="space-y-6">
        {/* Letter Configuration */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Letter Configuration
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letter Type
                </label>
                <select
                  value={letterData.letterType}
                  onChange={(e) => handleLetterTypeChange(e.target.value as LetterData['letterType'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {letterTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letter No.
                </label>
                <input
                  type="text"
                  value={letterData.letterNo}
                  onChange={(e) => handleInputChange('letterNo', e.target.value)}
                  placeholder="F24/HR/2024/001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Letter Title
              </label>
              <input
                type="text"
                value={letterData.letterTitle}
                onChange={(e) => handleInputChange('letterTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={letterData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Formatting Controls */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Type className="h-5 w-5 mr-2 text-blue-600" />
            Formatting Controls
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <select
                  value={letterData.fontSize}
                  onChange={(e) => handleInputChange('fontSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                  <option value={20}>20px</option>
                  <option value={22}>22px</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Height
                </label>
                <select
                  value={letterData.lineHeight}
                  onChange={(e) => handleInputChange('lineHeight', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1.2}>1.2 (Tight)</option>
                  <option value={1.4}>1.4 (Normal)</option>
                  <option value={1.6}>1.6 (Relaxed)</option>
                  <option value={1.8}>1.8 (Loose)</option>
                  <option value={2.0}>2.0 (Double)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Weight
                </label>
                <select
                  value={letterData.fontWeight}
                  onChange={(e) => handleInputChange('fontWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => insertList('unordered')}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                <AlignLeft className="h-4 w-4 mr-1" />
                • Bullet List
              </button>
              <button
                onClick={() => insertList('ordered')}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                <AlignLeft className="h-4 w-4 mr-1" />
                1. Numbered List
              </button>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </button>
                  {letterData.logo && (
                    <img
                      src={letterData.logo}
                      alt="Company Logo"
                      className="h-12 w-12 object-contain rounded"
                    />
                  )}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logo')}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Seal
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => sealInputRef.current?.click()}
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Seal
                  </button>
                  {letterData.seal && (
                    <img
                      src={letterData.seal}
                      alt="Company Seal"
                      className="h-12 w-12 object-contain rounded"
                    />
                  )}
                  <input
                    ref={sealInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'seal')}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={letterData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Address
              </label>
              <textarea
                value={letterData.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MSME Registration No.
              </label>
              <input
                type="text"
                value={letterData.msmeNo}
                onChange={(e) => handleInputChange('msmeNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={letterData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={letterData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="text"
                value={letterData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Letter Content */}
      <div className="space-y-6">
        {/* Job Role Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Role Information</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Role
                </label>
                <select
                  value={letterData.jobRole}
                  onChange={(e) => handleJobRoleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Job Role</option>
                  {Object.keys(jobRoleTemplates).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={letterData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  value={letterData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="e.g., 8,00,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={letterData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Manager
              </label>
              <input
                type="text"
                value={letterData.reportingManager}
                onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Responsibilities
              </label>
              <div className="space-y-2">
                {letterData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={responsibility}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter responsibility"
                    />
                    <button
                      onClick={() => removeResponsibility(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addResponsibility}
                  className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Responsibility
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                value={letterData.recipientName}
                onChange={(e) => handleInputChange('recipientName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Address
              </label>
              <textarea
                value={letterData.recipientAddress}
                onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Letter Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Letter Content</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={letterData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salutation
              </label>
              <input
                type="text"
                value={letterData.salutation}
                onChange={(e) => handleInputChange('salutation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Letter Body
              </label>
              <textarea
                value={letterData.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing
              </label>
              <input
                type="text"
                value={letterData.closing}
                onChange={(e) => handleInputChange('closing', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signatory Name
                </label>
                <input
                  type="text"
                  value={letterData.signatoryName}
                  onChange={(e) => handleInputChange('signatoryName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signatory Title
                </label>
                <input
                  type="text"
                  value={letterData.signatoryTitle}
                  onChange={(e) => handleInputChange('signatoryTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={saveTemplate}
            className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterForm;