import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useContentStore } from '../store/contentStore';
import ContentCard from '../components/ContentCard';
import { RefreshCw } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { user } = useAuthStore();
  const { contents, fetchContents, setCurrentContent, deleteContent, loading } = useContentStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchContents();
  }, [user, navigate, fetchContents]);
  
  const handleEdit = (content: any) => {
    setCurrentContent(content);
    navigate('/edit');
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      await deleteContent(id);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Content History</h1>
        
        <button
          onClick={() => fetchContents()}
          className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : contents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No content history</h2>
          <p className="text-gray-600">
            Your content history will appear here once you create some content.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;