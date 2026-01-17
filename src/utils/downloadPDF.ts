import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

export const downloadPDF = async (ref: React.RefObject<HTMLDivElement>, filename: string): Promise<boolean> => {
  const element = ref.current;
  if (!element) return false;

  // KONFIGURASI A4 (mm)
  const PDF_WIDTH_MM = 210;
  const PDF_HEIGHT_MM = 297;
  
  // 1. SETUP CONTAINER KHUSUS EXPORT
  // Container ini dibuat tersembunyi tapi dirender di DOM untuk memastikan font dan layout konsisten
  const container = document.createElement('div');
  container.style.position = 'fixed'; 
  container.style.top = '-10000px';
  container.style.left = '-10000px';
  container.style.zIndex = '-1000';
  container.style.width = '210mm'; 
  
  // 2. CLONE ELEMENT
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Normalisasi style clone
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.padding = '25.4mm'; 
  clone.style.boxShadow = 'none';
  clone.style.width = '210mm'; 
  clone.style.height = 'auto'; 
  clone.style.minHeight = '297mm';
  clone.style.backgroundColor = '#ffffff';

  // HAPUS VISUAL GUIDE
  const guides = clone.querySelectorAll('[data-visual-guide="true"]');
  guides.forEach(el => el.remove());

  // KONVERSI TEXTAREA KE DIV (PENTING UNTUK HASIL PDF YANG RAPI)
  // html2canvas sering bermasalah render textarea penuh, jadi kita ganti dengan div statis
  const originalTextareas = element.querySelectorAll('textarea');
  const clonedTextareas = clone.querySelectorAll('textarea');

  originalTextareas.forEach((orig, index) => {
    const cloned = clonedTextareas[index];
    if (cloned) {
        const div = document.createElement('div');
        // Salin style teks penting
        div.style.fontFamily = getComputedStyle(orig).fontFamily;
        div.style.fontSize = getComputedStyle(orig).fontSize;
        div.style.lineHeight = getComputedStyle(orig).lineHeight;
        div.style.textAlign = getComputedStyle(orig).textAlign;
        div.style.color = getComputedStyle(orig).color;
        
        div.style.width = '100%';
        div.style.whiteSpace = 'pre-wrap'; // Pertahankan enter/spasi
        div.style.wordBreak = 'break-word';
        div.textContent = orig.value; // Ambil value asli, bukan attribute value

        cloned.replaceWith(div);
    }
  });

  container.appendChild(clone);
  document.body.appendChild(container);

  // Tunggu sebentar untuk rendering
  await new Promise(resolve => setTimeout(resolve, 800)); 

  try {
    // 3. CAPTURE CANVAS
    const scale = 2; // High quality

    const canvas = await html2canvas(clone, {
      scale: scale, 
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800, 
    });

    // 4. GENERATE PDF (SLICING)
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;

    const pxToMm = PDF_WIDTH_MM / imgWidthPx;
    const imgHeightMm = imgHeightPx * pxToMm;

    const pageHeightMm = PDF_HEIGHT_MM; 
    
    let heightLeftMm = imgHeightMm;
    let positionMm = 0;

    // --- HALAMAN PERTAMA ---
    pdf.addImage(imgData, 'JPEG', 0, positionMm, PDF_WIDTH_MM, imgHeightMm);
    heightLeftMm -= pageHeightMm;

    // --- HALAMAN BERIKUTNYA ---
    while (heightLeftMm > 0) {
      positionMm = heightLeftMm - imgHeightMm; 
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, positionMm, PDF_WIDTH_MM, imgHeightMm);
      heightLeftMm -= pageHeightMm;
    }
    
    pdf.save(`${filename}.pdf`);
    return true;

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF. Silakan coba lagi.');
    return false;
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};