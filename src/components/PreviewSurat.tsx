import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { SuratData } from '../types';

interface PreviewSuratProps {
  data: SuratData;
  onIsiSuratChange?: (value: string) => void;
  isEditing?: boolean;
}

const PreviewSurat = forwardRef<HTMLDivElement, PreviewSuratProps>(({ data, onIsiSuratChange, isEditing = false }, ref) => {
  const [totalPages, setTotalPages] = useState(1);
  const internalRef = ref as React.MutableRefObject<HTMLDivElement>;
  
  // State lokal untuk textarea
  const [localIsiSurat, setLocalIsiSurat] = useState(data.isiSurat);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sinkronisasi data prop ke state lokal
  useEffect(() => {
    setLocalIsiSurat(data.isiSurat);
  }, [data.isiSurat]);

  // Auto-resize textarea height
  useEffect(() => {
    if (isEditing) {
        const ta = textareaRef.current;
        if (ta) {
            ta.style.height = 'auto';
            ta.style.height = `${ta.scrollHeight}px`;
        }
    }
  }, [localIsiSurat, isEditing]);

  // KONFIGURASI A4 (mm)
  const A4_HEIGHT_MM = 297; 
  const MARGIN_MM = 25.4; // 1 inch

  useEffect(() => {
    if (!internalRef.current) return;

    const updatePages = () => {
      const el = internalRef.current;
      if (!el) return;
      if (el.offsetWidth === 0) return;

      const mmToPx = el.offsetWidth / 210; 
      if (mmToPx === 0) return;

      const currentHeightPx = el.scrollHeight;
      const totalHeightMm = currentHeightPx / mmToPx;
      
      let pages = Math.ceil(totalHeightMm / A4_HEIGHT_MM);
      if (!Number.isFinite(pages) || pages < 1) pages = 1;
      
      setTotalPages(pages);
    };

    const observer = new ResizeObserver(updatePages);
    observer.observe(internalRef.current);
    const timeoutId = setTimeout(updatePages, 100);

    return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
    };
  }, [data, internalRef, localIsiSurat, isEditing]); 

  // Zona Margin
  const breakCount = Math.max(0, totalPages); 
  const marginZones = Array.from({ length: breakCount }, (_, i) => {
    const breakIndex = i + 1;
    if (breakIndex >= totalPages && totalPages > 1) return null; 
    if (totalPages === 1) return null;

    const breakLineMm = breakIndex * A4_HEIGHT_MM;
    
    return {
        id: i,
        pageNumber: breakIndex, 
        nextPageNumber: breakIndex + 1,
        topMm: breakLineMm - MARGIN_MM, 
        heightMm: MARGIN_MM * 2, 
    };
  }).filter(Boolean) as { id: number, pageNumber: number, nextPageNumber: number, topMm: number, heightMm: number }[];

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalIsiSurat(val);
    if (onIsiSuratChange) {
        onIsiSuratChange(val);
    }
  };

  return (
    <div className="relative group flex justify-center font-serif">
      
      {/* LAYER 1: Visual Guidelines */}
      <div 
        data-visual-guide="true"
        className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center"
        style={{ width: '210mm' }}
      >
        {marginZones.map((zone) => (
            <div 
                key={zone.id}
                className={`absolute w-full flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-[1px]
                    ${isEditing 
                        ? 'bg-red-500/10 border-y border-red-500/30' // Mode Edit: Merah Warning
                        : 'bg-gray-400/20 border-y border-dashed border-gray-400/50' // Mode Default: Abu-abu Soft
                    }`}
                style={{ 
                    top: `${zone.topMm}mm`,
                    height: `${zone.heightMm}mm`,
                    zIndex: 50
                }}
            >
                {/* Garis Tengah */}
                <div className={`absolute w-full border-b transition-colors duration-300 ${isEditing ? 'border-dashed border-red-400/50' : 'border-dotted border-gray-500/30'}`} style={{ top: '50%' }}></div>
                
                {/* BADGE INDIKATOR (Muncul di kedua mode dengan style berbeda) */}
                <div className={`
                    px-3 py-1.5 rounded-lg border shadow-sm flex flex-col items-center gap-0.5 text-center max-w-[80%] transition-all duration-300
                    ${isEditing 
                        ? 'bg-white/80 border-red-200 text-red-700' // Style Edit
                        : 'bg-white/60 border-gray-300 text-gray-600' // Style Default
                    }
                `}>
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        {isEditing ? '⛔ AREA MARGIN (TERPOTONG)' : '✂️ PEMISAH HALAMAN'}
                    </span>
                    
                    {/* Pesan detail berbeda per mode */}
                    {isEditing ? (
                        <span className="text-[9px] font-medium leading-tight">
                            Teks di area ini akan terpotong.<br/>Tekan <b>ENTER</b> untuk pindah ke bawah.
                        </span>
                    ) : (
                        <span className="text-[8px] font-medium leading-tight opacity-80">
                            Batas kertas A4. Area ini tidak tercetak.
                        </span>
                    )}
                </div>
                
                {/* Indikator halaman di pojok */}
                <div className={`absolute left-2 top-2 text-[9px] font-mono transition-colors ${isEditing ? 'text-red-400 font-semibold' : 'text-gray-500'}`}>
                    Hal {zone.pageNumber}
                </div>
                <div className={`absolute left-2 bottom-2 text-[9px] font-mono transition-colors ${isEditing ? 'text-red-400 font-semibold' : 'text-gray-500'}`}>
                    Hal {zone.nextPageNumber}
                </div>
            </div>
        ))}
      </div>

      {/* LAYER 2: Kertas A4 */}
      <div 
        ref={ref}
        id="print-area"
        className="bg-white shadow-2xl relative text-black leading-normal z-10 transition-all duration-300"
        style={{ 
            width: '210mm', 
            minHeight: '297mm',
            padding: '25.4mm', 
            boxSizing: 'border-box'
        }}
      >
        {/* === KOP SURAT === */}
        <div className="flex items-center gap-4 mb-1">
            <div className="w-[28mm] h-[28mm] flex-shrink-0 flex items-center justify-center">
                 {data.logoUrl ? (
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                 ) : (
                    <div className="w-full h-full border border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                      <span className="text-[9px] text-gray-400">LOGO</span>
                    </div>
                 )}
            </div>
               
            <div className="flex-1 text-center"> 
                <h1 className="text-[16pt] font-bold uppercase tracking-wide text-black leading-tight">
                    {data.namaPerusahaan}
                </h1>
                <p className="text-[10pt] text-black leading-tight mt-1">
                    {data.alamatPerusahaan}
                </p>
                <p className="text-[10pt] text-black leading-tight">
                    {data.kontakPerusahaan}
                </p>
                <p className="text-[10pt] text-blue-900 underline mt-0">
                    {data.emailWebsite}
                </p>
            </div>
        </div>

        <div className="flex flex-col gap-[2px] mb-6 border-black">
            <div className="w-full h-[3px] bg-black"></div>
            <div className="w-full h-[1px] bg-black"></div>
        </div>
  
        {/* === META DATA === */}
        <div className="flex justify-between items-start mb-6 text-[12pt]">
             <div className="w-[60%]">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-24 align-top">Nomor</td>
                            <td className="w-4 align-top">:</td>
                            <td className="align-top">{data.nomor}</td>
                        </tr>
                        <tr>
                            <td className="align-top">Lampiran</td>
                            <td className="align-top">:</td>
                            <td className="align-top">{data.lampiran}</td>
                        </tr>
                        <tr>
                            <td className="align-top">Perihal</td>
                            <td className="align-top">:</td>
                            <td className="align-top font-bold">{data.hal}</td>
                        </tr>
                    </tbody>
                </table>
             </div>

             <div className="w-[40%] text-right">
                <p>{data.tempatSurat}, {data.tanggalSurat}</p>
             </div>
        </div>
  
        {/* === PENERIMA === */}
        <div className="mb-6 text-[12pt]">
            <p className="mb-2">Kepada Yth,</p>
            <div className="font-bold">{data.namaPenerima}</div>
            <div className="">{data.alamatPenerima}</div>
            <div className="">{data.kotaProvinsi}</div>
        </div>
  
        {/* === ISI SURAT === */}
        <div className="mb-4 min-h-[100px] w-full relative">
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    value={localIsiSurat}
                    onChange={handleTextareaChange}
                    className="w-full bg-blue-50/20 -mx-1 px-1 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-300/50 overflow-hidden font-serif text-[12pt] leading-[1.6] text-justify whitespace-pre-wrap border-none placeholder-gray-300"
                    placeholder="Ketik isi surat di sini..."
                    spellCheck="false"
                    autoFocus
                />
            ) : (
                <div className="w-full bg-transparent font-serif text-[12pt] leading-[1.6] text-justify whitespace-pre-wrap break-words">
                    {localIsiSurat}
                </div>
            )}
        </div>
  
        {/* === TTD & FOOTER === */}
        <div className="mt-4 text-[12pt] flex justify-end break-inside-avoid px-8">
            <div className="text-center min-w-[50mm] relative">
                <p className="mb-4">Hormat kami,</p>
                
                <div className="relative h-[25mm] w-full flex justify-center items-center my-1">
                    {data.stempelUrl && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <img src={data.stempelUrl} alt="Stempel" className="h-[35mm] w-auto opacity-90 mix-blend-multiply -rotate-12 -translate-x-6 -translate-y-1" />
                        </div>
                    )}
                    {data.ttdUrl && (
                        <img src={data.ttdUrl} alt="TTD" className="h-full w-auto object-contain z-10 relative mix-blend-multiply" />
                    )}
                </div>
      
                <div className="relative z-20 mt-1">
                    <p className="font-bold underline text-black">{data.namaPengirim}</p>
                    <p>{data.jabatan}</p>
                </div>
            </div>
        </div>
  
      </div>
    </div>
  );
});

PreviewSurat.displayName = 'PreviewSurat';

export default PreviewSurat;