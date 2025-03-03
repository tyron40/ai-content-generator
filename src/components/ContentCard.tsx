import React from 'react';
import { Content } from '../lib/supabase';
import { Edit, Trash2, Copy } from 'lucide-react';

interface ContentCardProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content.content);
    alert('Content copied to clipboard!');
  };

  const getTypeColor = (type: Content['type']) => {
    switch (type) {
      case 'blog':
        return 'bg-green-100 text-green-800';
      case 'social':
        return 'bg-blue-100 text-blue-800';
      case 'email':
        return 'bg-purple-100 text-purple-800';
      case 'ad':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{content.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
            {content.type}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-3">{content.content}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formatDate(content.created_at)}
          </span>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(content)}
              className="p-1 rounded-full hover:bg-gray-100"
              title="Edit"
            >
              <Edit className="h-5 w-5 text-blue-600" />
            </button>
            <button 
              onClick={() => copyToClipboard()}
              className="p-1 rounded-full hover:bg-gray-100"
              title="Copy to clipboard"
            >
              <Copy className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => onDelete(content.id)}
              className="p-1 rounded-full hover:bg-gray-100"
              title="Delete"
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;