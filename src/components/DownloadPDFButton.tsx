import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { downloadPDF } from '../utils/downloadPDF';

interface DownloadPDFButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ targetRef, fileName }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    // Slight delay to allow UI to settle if needed, or show loading state
    setTimeout(async () => {
        await downloadPDF(targetRef, fileName);
        setLoading(false);
    }, 100);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Memproses...</span>
        </>
      ) : (
        <>
          <Download size={20} />
          <span>Download PDF</span>
        </>
      )}
    </button>
  );
};

export default DownloadPDFButton;