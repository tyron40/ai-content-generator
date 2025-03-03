import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentStore } from '../store/contentStore';
import ContentEditor from '../components/ContentEditor';
import { ArrowLeft } from 'lucide-react';

const EditPage: React.FC = () => {
  const { currentContent } = useContentStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentContent) {
      navigate('/dashboard');
    }
  }, [currentContent, navigate]);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-blue-600 mb-6 hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      
      <ContentEditor />
    </div>
  );
};

export default EditPage;