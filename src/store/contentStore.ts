import { create } from 'zustand';
import { supabase, Content } from '../lib/supabase';
import { generateContent, editContent } from '../lib/openai';

interface ContentState {
  contents: Content[];
  currentContent: Content | null;
  loading: boolean;
  error: string | null;
  fetchContents: () => Promise<void>;
  createContent: (title: string, type: Content['type'], prompt: string, tone: string, length: string) => Promise<void>;
  updateContent: (id: string, title: string, content: string) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  setCurrentContent: (content: Content | null) => void;
  editCurrentContent: (instruction: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  currentContent: null,
  loading: false,
  error: null,

  fetchContents: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      set({ contents: data as Content[], loading: false });
    } catch (error: any) {
      console.error('Error fetching contents:', error);
      set({ error: error.message || 'Failed to fetch contents', loading: false });
    }
  },

  createContent: async (title, type, prompt, tone, length) => {
    try {
      set({ loading: true, error: null });
      
      // Generate content using OpenAI
      const generatedContent = await generateContent(prompt, type, tone, length);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('contents')
        .insert([
          { 
            title, 
            content: generatedContent, 
            type,
            user_id: user.id 
          }
        ])
        .select();

      if (error) throw error;
      
      // Update local state
      const newContent = data[0] as Content;
      set(state => ({ 
        contents: [newContent, ...state.contents],
        currentContent: newContent,
        loading: false 
      }));
    } catch (error: any) {
      console.error('Error creating content:', error);
      set({ error: error.message || 'Failed to create content', loading: false });
    }
  },

  updateContent: async (id, title, content) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('contents')
        .update({ title, content, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      set(state => {
        const updatedContents = state.contents.map(item => 
          item.id === id ? { ...item, title, content, updated_at: new Date().toISOString() } : item
        );
        
        return { 
          contents: updatedContents,
          currentContent: state.currentContent?.id === id 
            ? { ...state.currentContent, title, content, updated_at: new Date().toISOString() } 
            : state.currentContent,
          loading: false 
        };
      });
    } catch (error: any) {
      console.error('Error updating content:', error);
      set({ error: error.message || 'Failed to update content', loading: false });
    }
  },

  deleteContent: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      set(state => ({ 
        contents: state.contents.filter(item => item.id !== id),
        currentContent: state.currentContent?.id === id ? null : state.currentContent,
        loading: false 
      }));
    } catch (error: any) {
      console.error('Error deleting content:', error);
      set({ error: error.message || 'Failed to delete content', loading: false });
    }
  },

  setCurrentContent: (content) => {
    set({ currentContent: content });
  },

  editCurrentContent: async (instruction) => {
    try {
      const { currentContent } = get();
      if (!currentContent) throw new Error('No content selected');
      
      set({ loading: true, error: null });
      
      // Edit content using OpenAI
      const editedContent = await editContent(currentContent.content, instruction);
      
      // Update in Supabase
      await get().updateContent(currentContent.id, currentContent.title, editedContent);
      
    } catch (error: any) {
      console.error('Error editing content:', error);
      set({ error: error.message || 'Failed to edit content', loading: false });
    }
  }
}));