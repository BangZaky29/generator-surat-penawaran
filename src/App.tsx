import React, { useState, useRef } from 'react';
import Header from './components/Header';
import FormInput from './components/FormInput';
import PreviewSurat from './components/PreviewSurat';
import DownloadPDFButton from './components/DownloadPDFButton';
import { SuratData, initialSuratData } from './types';
import { Eye, PenLine } from 'lucide-react';

const App: React.FC = () => {
  const [suratData, setSuratData] = useState<SuratData>(initialSuratData);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDataChange = (key: keyof SuratData, value: string) => {
    setSuratData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTTDChange = (url: string | null) => {
    setSuratData((prev) => ({ ...prev, ttdUrl: url }));
  };

  const handleStempelChange = (url: string | null) => {
    setSuratData((prev) => ({ ...prev, stempelUrl: url }));
  };

  const handleLogoChange = (url: string | null) => {
    setSuratData((prev) => ({ ...prev, logoUrl: url }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-8 grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-64px)] overflow-hidden relative">
        
        {/* Left Column: Form Input */}
        <div className={`lg:col-span-5 h-full flex-col ${mobileTab === 'form' ? 'flex' : 'hidden lg:flex'}`}>
          <FormInput 
            data={suratData} 
            onChange={handleDataChange} 
            onTTDChange={handleTTDChange}
            onStempelChange={handleStempelChange}
            onLogoChange={handleLogoChange}
          />
        </div>

        {/* Right Column: Preview & Action */}
        <div className={`lg:col-span-7 h-full flex-col overflow-hidden ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          {/* 
              Preview Container:
              - overflow-x-hidden: Mencegah scroll horizontal (geser kanan/kiri).
              - py-8: Memberi ruang vertikal.
              - items-center: Memastikan konten visual (surat) berada persis di tengah.
          */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200/50 rounded-xl border border-gray-200 shadow-inner py-8 flex flex-col items-center relative custom-scrollbar w-full">
            
            {/* 
               Preview Wrapper:
               - Scale disesuaikan lebih kecil (0.4 di mobile) agar muat di layar sempit (320px-360px).
               - Negative margins dihitung ulang berdasarkan scale untuk menghilangkan gap vertikal.
               - Rumus estimasi: -mb = 297mm * (1 - scale)
            */}
            <div className="
              scale-[0.4] -mb-[179mm] 
              sm:scale-[0.55] sm:-mb-[134mm] 
              md:scale-[0.65] md:-mb-[104mm] 
              lg:scale-[0.6] lg:-mb-[119mm] 
              xl:scale-[0.75] xl:-mb-[75mm] 
              2xl:scale-[0.9] 2xl:-mb-[30mm] 
              origin-top transition-all duration-300 flex justify-center
            ">
               <PreviewSurat ref={previewRef} data={suratData} />
            </div>

            {/* Download Section - Margin top disesuaikan agar menempel pas di bawah surat */}
            <div className="w-full max-w-[210mm] mt-4 sm:mt-6 z-10 shrink-0 px-4 sm:px-0 flex justify-center">
                <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500 hidden sm:block text-left">
                      <p>Pastikan data sudah benar.</p>
                    </div>
                    <DownloadPDFButton 
                        targetRef={previewRef} 
                        fileName={`Surat_Penawaran_${suratData.namaPenerima.replace(/\s+/g, '_')}`} 
                    />
                </div>
            </div>
            
            {/* Bottom spacer for FAB on mobile */}
            <div className="h-24 shrink-0 lg:h-0 w-full"></div>
          </div>
        </div>

      </main>

      {/* Mobile Floating Action Button (FAB) */}
      <button
        onClick={() => setMobileTab(prev => prev === 'form' ? 'preview' : 'form')}
        className="fixed bottom-6 right-6 lg:hidden bg-primary hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 z-50 flex items-center justify-center border-2 border-white"
        aria-label={mobileTab === 'form' ? "Lihat Preview" : "Edit Form"}
      >
        {mobileTab === 'form' ? (
          <Eye size={24} />
        ) : (
          <PenLine size={24} />
        )}
      </button>

    </div>
  );
};

export default App;