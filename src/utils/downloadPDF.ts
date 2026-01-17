import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

export const downloadPDF = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
  const element = ref.current;
  if (!element) return;

  // 1. Buat container sementara yang tersembunyi
  // Ini berguna untuk merender ulang surat dalam ukuran aslinya (tanpa CSS scale)
  // dan terisolasi dari layout mobile yang sempit.
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-10000px';
  container.style.left = '-10000px';
  container.style.zIndex = '-100';
  container.style.width = '210mm'; // Paksa lebar A4
  container.style.height = 'auto';
  
  // 2. Clone elemen surat
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Reset style yang mungkin mengganggu rendering di clone
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  
  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // 3. Capture dari clone, BUKAN dari elemen asli
    const canvas = await html2canvas(clone, {
      scale: 2, // Resolusi tinggi (2x) agar teks tajam
      useCORS: true, // Handle gambar cross-origin
      logging: false,
      backgroundColor: '#ffffff',
      // PENTING UNTUK MOBILE:
      // Paksa html2canvas "berpikir" dia sedang berjalan di layar lebar (desktop).
      // Ini mencegah teks menumpuk/wrapping karena lebar layar HP yang sempit.
      windowWidth: 1200, 
      width: container.offsetWidth, // Pastikan capture sesuai lebar container (210mm)
      x: 0,
      y: 0
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // Dimensi A4 dalam mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Masukkan gambar ke PDF
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF. Silakan coba lagi.');
  } finally {
    // 4. Bersihkan container sementara dari DOM
    document.body.removeChild(container);
  }
};