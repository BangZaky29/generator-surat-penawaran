import React, { useState, useRef } from 'react';
import Header from './components/Header';
import FormInput from './components/FormInput';
import PreviewSurat from './components/PreviewSurat';
import DownloadPDFButton from './components/DownloadPDFButton';
import { SuratData, initialSuratData } from './types';
import { Eye, PenLine, MousePointerClick, Check } from 'lucide-react';
import SubscriptionGuard from './components/SubscriptionGuard';

const App: React.FC = () => {
  const [suratData, setSuratData] = useState<SuratData>(initialSuratData);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [isEditingPreview, setIsEditingPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null!);

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
    /* MENGGUNAKAN h-[100dvh] AGAR TINGGI MENYESUAIKAN BROWSER MOBILE YANG MEMILIKI ADDRESS BAR */
    <SubscriptionGuard featureSlug="surat-penawaran">
      <div className="h-[100dvh] bg-[#e8eaed] flex flex-col font-sans overflow-hidden">
        <Header />

        {/* Tambahkan min-h-0 di sini agar child scrollable area berfungsi normal di dalam flex/grid */}
        <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 sm:p-6 gap-6 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative min-h-0">

          {/* Left Column: Form Input */}
          {/* Tambahkan min-h-0 pada flex child ini */}
          <div className={`lg:col-span-4 xl:col-span-3 h-full flex flex-col min-h-0 ${mobileTab === 'form' ? 'flex' : 'hidden lg:flex'}`}>
            <FormInput
              data={suratData}
              onChange={handleDataChange}
              onTTDChange={handleTTDChange}
              onStempelChange={handleStempelChange}
              onLogoChange={handleLogoChange}
            />
          </div>

          {/* Right Column: Preview & Action */}
          <div className={`lg:col-span-8 xl:col-span-9 h-full flex flex-col overflow-hidden min-h-0 ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>

            {/* Toolbar atas Preview (Download) */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-4 flex flex-wrap gap-2 justify-between items-center z-20 shrink-0">
              <div className="text-sm text-gray-600 hidden sm:flex items-center gap-2">
                <span className="font-semibold text-gray-800">Preview Dokumen</span>
                <span className="text-gray-300">|</span>
                <span>Ukuran A4</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* TOMBOL MODE EDIT */}
                <button
                  onClick={() => setIsEditingPreview(!isEditingPreview)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg text-sm font-medium transition-all border ${isEditingPreview
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-700 shadow-sm'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {isEditingPreview ? (
                    <>
                      <Check size={18} />
                      <span>Selesai Edit</span>
                    </>
                  ) : (
                    <>
                      <MousePointerClick size={18} />
                      <span>Atur Halaman</span>
                    </>
                  )}
                </button>

                <div className="flex-1 sm:flex-none">
                  <DownloadPDFButton
                    targetRef={previewRef}
                    fileName={`Surat_Penawaran_${suratData.namaPenerima.replace(/\s+/g, '_')}`}
                  />
                </div>
              </div>
            </div>

            {/* Area Preview - Darker Background to Pop the Paper */}
            <div className="flex-1 overflow-y-auto bg-[#525659] rounded-xl shadow-inner relative custom-scrollbar flex flex-col items-center py-10">

              {/* Wrapper untuk Scaling */}
              <div className="origin-top transition-transform duration-200 ease-out
                scale-[0.45] mb-[-140mm]
                sm:scale-[0.6] sm:mb-[-100mm]
                md:scale-[0.7] md:mb-[-80mm]
                lg:scale-[0.65] lg:mb-[-90mm]
                xl:scale-[0.8] xl:mb-[-50mm]
                2xl:scale-[1.0] 2xl:mb-[0mm]
            ">
                <PreviewSurat
                  ref={previewRef}
                  data={suratData}
                  isEditing={isEditingPreview}
                  onIsiSuratChange={(val) => handleDataChange('isiSurat', val)}
                />
              </div>

              {/* Spacer extra di bawah untuk scroll nyaman */}
              <div className="h-20 shrink-0 w-full"></div>
            </div>
          </div>

        </main>

        {/* Mobile FAB */}
        <button
          onClick={() => setMobileTab(prev => prev === 'form' ? 'preview' : 'form')}
          className="fixed bottom-6 right-6 lg:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl z-50 transition-transform active:scale-95"
        >
          {mobileTab === 'form' ? <Eye size={24} /> : <PenLine size={24} />}
        </button>

      </div>
    </SubscriptionGuard>
  );
};

export default App;