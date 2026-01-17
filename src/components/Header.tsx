import React from 'react';
import { FileText } from 'lucide-react';
import logo from '../assets/NS_white_01.png'; // Uncomment jika ingin pakai gambar

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            {/* Jika ingin pakai Image, hapus div di bawah dan uncomment img tag */}
            {/* <img src={logo} alt="Logo" className="h-10 w-auto sm:h-12" /> */}
            
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm border border-blue-600/10">
              <img src={logo} alt="Logo" className="h-10 w-auto sm:h-12" />
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight truncate sm:overflow-visible">
              Generator Surat Penawaran
            </h1>
            <p className="text-[10px] sm:text-sm text-gray-500 font-medium leading-tight mt-0.5 truncate sm:overflow-visible">
              Profesional, Rapi & Siap Cetak PDF
            </p>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;