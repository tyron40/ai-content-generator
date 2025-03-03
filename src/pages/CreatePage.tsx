import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentForm from '../components/ContentForm';
import { ArrowLeft } from 'lucide-react';

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-blue-600 mb-6 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      
      <ContentForm onSuccess={() => navigate('/edit')} />
    </div>
  );
};

export default CreatePage;