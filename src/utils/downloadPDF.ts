import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

export const downloadPDF = async (ref: React.RefObject<HTMLDivElement>, filename: string): Promise<boolean> => {
  const element = ref.current;
  if (!element) return false;

  // 1. Setup container sementara dengan ukuran fixed A4 (dalam pixel di 96 DPI)
  // Menggunakan pixel lebih stabil untuk html2canvas daripada mm
  const a4WidthPx = 794; // approx 210mm @ 96dpi
  
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-10000px';
  container.style.left = '-10000px';
  container.style.zIndex = '-100';
  // PENTING: Set lebar fix agar layout teks sama persis dengan preview desktop
  container.style.width = `${a4WidthPx}px`; 
  container.style.height = 'auto'; // Biarkan tinggi mengikuti konten
  container.style.backgroundColor = '#ffffff';
  
  // 2. Clone element
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Reset style clone untuk memastikan pas di container
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.padding = '25mm'; // Pastikan padding hardcoded sesuai PreviewSurat
  clone.style.boxShadow = 'none';
  clone.style.width = '100%'; // Full width container
  clone.style.height = 'auto';
  clone.style.minHeight = '1123px'; // approx 297mm (A4 height)
  
  container.appendChild(clone);
  document.body.appendChild(container);

  // Tunggu sebentar untuk memastikan render font/image selesai di clone
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    // 3. Capture dengan html2canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // Kualitas retina (2x) agar teks tajam
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: a4WidthPx, // Paksa lebar capture sesuai container
      windowWidth: 1200, // Simulasi window desktop
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    // 4. Setup PDF (A4)
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210; // Lebar A4 dalam mm
    const pdfPageHeight = 297; // Tinggi A4 dalam mm
    
    // 5. Hitung tinggi gambar berdasarkan rasio asli Canvas
    // Ini adalah KUNCI agar gambar tidak "PEYANG" (distorsi).
    // Rumus: Tinggi PDF = (Tinggi Canvas / Lebar Canvas) * Lebar PDF
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Masukkan gambar. 
    // Jika konten lebih panjang dari 1 halaman, logic ini akan memanjangkan gambar (bisa terpotong saat print fisik jika > 297mm).
    // Tapi secara visual digital file PDF akan proporsional (tidak gepeng).
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    pdf.save(`${filename}.pdf`);
    return true;

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF. Silakan coba lagi.');
    return false;
  } finally {
    // 6. Cleanup
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};