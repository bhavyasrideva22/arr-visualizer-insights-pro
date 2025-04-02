
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-creamWhite">
      <header className="bg-darkGreen text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              ARR Insights Pro
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-mintGreen transition-colors">
                Home
              </Link>
              <Link to="/" className="hover:text-mintGreen transition-colors">
                About
              </Link>
              <Link to="/" className="hover:text-mintGreen transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-darkGreen text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">ARR Insights Pro</h3>
              <p className="text-sm text-gray-300">
                Professional SaaS metrics and valuation tools to help you make informed business decisions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-gray-300 hover:text-mintGreen transition-colors">Home</Link></li>
                <li><Link to="/" className="text-sm text-gray-300 hover:text-mintGreen transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="text-sm text-gray-300 hover:text-mintGreen transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
              <p className="text-sm text-gray-300">
                Have questions about our tools? Get in touch with our support team.
              </p>
              <button className="mt-4 bg-mintGreen text-darkGreen px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ARR Insights Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
