import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, FileText, Edit, Share2, Mail, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Content Creation
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Generate high-quality content for blogs, social media, emails, and more with our advanced AI technology. Save time and boost your creativity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
            <Link to="/login" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-gray-50 transition-colors">
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <FileText className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blog Content</h3>
              <p className="text-gray-600">
                Generate engaging blog posts on any topic with customizable tone and length.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Share2 className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Social Media</h3>
              <p className="text-gray-600">
                Create attention-grabbing social media posts optimized for different platforms.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Mail className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Campaigns</h3>
              <p className="text-gray-600">
                Draft compelling email content that drives engagement and conversions.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Edit className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Editing</h3>
              <p className="text-gray-600">
                Refine and improve your content with AI-powered editing suggestions.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Zap className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Generation</h3>
              <p className="text-gray-600">
                Get high-quality content in seconds, not hours or days.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Brain className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced AI</h3>
              <p className="text-gray-600">
                Powered by the latest GPT models for human-like, creative content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Content Creation?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of content creators, marketers, and businesses who are saving time and creating better content with NexusAI.
          </p>
          <Link to="/signup" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Start Creating Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">NexusAI</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} NexusAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;