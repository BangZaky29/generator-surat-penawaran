import React, { useState } from 'react';
import { Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { downloadPDF } from '../utils/downloadPDF';

interface DownloadPDFButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

type DownloadStatus = 'idle' | 'loading' | 'success' | 'error';

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ targetRef, fileName }) => {
  const [status, setStatus] = useState<DownloadStatus>('idle');

  const handleDownload = async () => {
    setStatus('loading');
    
    // Beri jeda sedikit agar UI sempat update ke 'loading' sebelum thread berat (canvas) jalan
    setTimeout(async () => {
        const success = await downloadPDF(targetRef, fileName);
        
        if (success) {
            setStatus('success');
            // Reset ke idle setelah 3 detik
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    }, 100);
  };

  const getButtonContent = () => {
    switch (status) {
        case 'loading':
            return (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Memproses PDF...</span>
                </>
            );
        case 'success':
            return (
                <>
                    <CheckCircle size={20} />
                    <span>Berhasil Disimpan!</span>
                </>
            );
        case 'error':
            return (
                <>
                    <AlertCircle size={20} />
                    <span>Gagal</span>
                </>
            );
        default: // idle
            return (
                <>
                    <Download size={20} />
                    <span>Download PDF</span>
                </>
            );
    }
  };

  const getButtonStyles = () => {
    switch (status) {
        case 'success':
            return 'bg-green-600 hover:bg-green-700 text-white';
        case 'error':
            return 'bg-red-600 hover:bg-red-700 text-white';
        default:
            return 'bg-primary hover:bg-blue-600 text-white';
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={status === 'loading'}
      className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-semibold rounded-lg shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px] ${getButtonStyles()}`}
    >
      {getButtonContent()}
    </button>
  );
};

export default DownloadPDFButton;