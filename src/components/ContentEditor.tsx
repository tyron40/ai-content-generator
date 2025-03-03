import React, { useState, useEffect } from 'react';
import { useContentStore } from '../store/contentStore';
import { Loader, Save, Wand2 } from 'lucide-react';

const ContentEditor: React.FC = () => {
  const { currentContent, updateContent, editCurrentContent, loading, error } = useContentStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editInstruction, setEditInstruction] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  
  useEffect(() => {
    if (currentContent) {
      setTitle(currentContent.title);
      setContent(currentContent.content);
    }
  }, [currentContent]);
  
  if (!currentContent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Select a content to edit</p>
      </div>
    );
  }
  
  const handleSave = async () => {
    if (currentContent) {
      await updateContent(currentContent.id, title, content);
    }
  };
  
  const handleAIEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editInstruction) {
      alert('Please provide editing instructions');
      return;
    }
    
    await editCurrentContent(editInstruction);
    setShowEditForm(false);
    setEditInstruction('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Edit Content</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Wand2 className="h-4 w-4 mr-1" />
            AI Edit
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? (
              <Loader className="animate-spin h-4 w-4 mr-1" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Save
          </button>
        </div>
      </div>
      
      {showEditForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-2">AI Editing Assistant</h3>
          <form onSubmit={handleAIEdit}>
            <div className="mb-3">
              <label htmlFor="editInstruction" className="block text-sm font-medium text-gray-700 mb-1">
                Editing Instructions
              </label>
              <textarea
                id="editInstruction"
                value={editInstruction}
                onChange={(e) => setEditInstruction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"
                placeholder="e.g., Make it more persuasive, fix grammar errors, shorten it, etc."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                'Apply AI Edit'
              )}
            </button>
          </form>
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-96"
        />
      </div>
    </div>
  );
};

export default ContentEditor;