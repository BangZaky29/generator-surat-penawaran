import React, { forwardRef } from 'react';
import { SuratData } from '../types';

interface PreviewSuratProps {
  data: SuratData;
}

const PreviewSurat = forwardRef<HTMLDivElement, PreviewSuratProps>(({ data }, ref) => {
  return (
    /* 
       A4 Dimensions: 210mm x 297mm.
       Removed the outer wrapper to allow the parent container in App.tsx to handle centering and spacing completely.
       This prevents double padding/margin issues.
    */
    <div 
      ref={ref}
      id="print-area"
      className="bg-white shadow-xl mx-auto relative text-dark font-serif leading-relaxed"
      style={{ 
          width: '210mm', 
          minHeight: '297mm',
          padding: '25mm', // Margin standard kertas
          boxSizing: 'border-box'
      }}
    >
      {/* Header / Kop Surat Dynamic */}
      <div className="border-b-4 border-black pb-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
             {/* Logo Dynamic */}
             <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
               {data.logoUrl ? (
                  <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
               ) : (
                  <div className="w-20 h-20 border-2 border-gray-800 rounded-full flex items-center justify-center text-center p-2">
                    <span className="text-[10px] font-bold uppercase font-sans">Logo</span>
                  </div>
               )}
             </div>
             
             {/* Text Dynamic */}
             <div className="flex-1 text-center pr-24"> {/* pr-24 to balance the logo width visually if centered, or remove for left align */}
                <h1 className="text-2xl font-bold uppercase tracking-wide font-sans leading-tight">{data.namaPerusahaan}</h1>
                <p className="text-sm mt-1">{data.alamatPerusahaan}</p>
                <p className="text-sm">{data.kontakPerusahaan}</p>
                <p className="text-sm">{data.emailWebsite}</p>
             </div>
          </div>
      </div>

      {/* Tanggal & Tempat */}
      <div className="text-right mb-8">
          <p>{data.tempatSurat}, {data.tanggalSurat}</p>
      </div>

      {/* Metadata Surat */}
      <div className="mb-8 w-full">
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
                      <td className="align-top">Hal</td>
                      <td className="align-top">:</td>
                      <td className="font-bold align-top">{data.hal}</td>
                  </tr>
              </tbody>
          </table>
      </div>

      {/* Penerima */}
      <div className="mb-8">
          <p className="mb-2">Kepada Yth.</p>
          <p className="font-bold">{data.namaPenerima}</p>
          <p>{data.alamatPenerima}</p>
          <p>{data.kotaProvinsi}</p>
      </div>

      {/* Salam Pembuka */}
      <div className="mb-4">
          <p>Dengan Hormat,</p>
      </div>

      {/* Isi Surat */}
      <div className="mb-8 text-justify whitespace-pre-wrap leading-relaxed">
          {data.isiSurat}
      </div>

      {/* Penutup & TTD */}
      <div className="mt-12">
          <p className="mb-8">Hormat kami,</p>
          
          <div className="relative w-48 h-32 mb-4">
              {/* Stempel Layer */}
              {data.stempelUrl && (
                  <img 
                      src={data.stempelUrl} 
                      alt="Stempel" 
                      className="absolute top-0 -left-6 w-32 h-32 object-contain opacity-80 mix-blend-multiply pointer-events-none transform -rotate-12 z-10"
                  />
              )}
              
              {/* Tanda Tangan Layer */}
              {data.ttdUrl && (
                  <img 
                      src={data.ttdUrl} 
                      alt="Tanda Tangan" 
                      className="absolute top-0 left-0 w-full h-full object-contain z-20"
                  />
              )}
          </div>

          <div className="relative z-30">
              <p className="font-bold underline">{data.namaPengirim}</p>
              <p>{data.jabatan}</p>
          </div>
      </div>

    </div>
  );
});

PreviewSurat.displayName = 'PreviewSurat';

export default PreviewSurat;