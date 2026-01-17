import React, { useState } from 'react';
import { SuratData } from '../types';
import TTDUpload from './TTDUpload';
import { Upload, X, ChevronDown, ChevronUp, Briefcase, Mail, User, FileText, PenTool } from 'lucide-react';

interface FormInputProps {
  data: SuratData;
  onChange: (key: keyof SuratData, value: string) => void;
  onTTDChange: (url: string | null) => void;
  onStempelChange: (url: string | null) => void;
  onLogoChange: (url: string | null) => void;
}

// Komponen Helper untuk Accordion Item
const AccordionItem = ({ 
  title, 
  icon: Icon, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ElementType; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) => {
  return (
    <div className={`border rounded-xl transition-all duration-300 overflow-hidden mb-3 ${isOpen ? 'border-blue-400 bg-white ring-2 ring-blue-100' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors cursor-pointer ${isOpen ? 'bg-gradient-to-r from-blue-50 to-white' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
             <Icon size={18} strokeWidth={2.5} />
          </div>
          <span className={`font-bold text-sm sm:text-base ${isOpen ? 'text-blue-900' : 'text-gray-700'}`}>{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-blue-600" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      
      <div 
        // Max height besar agar konten panjang seperti canvas TTD tidak terpotong
        className={`transition-all duration-500 ease-in-out origin-top ${isOpen ? 'max-h-[2500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 py-0'}`}
      >
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-white">
           {children}
        </div>
      </div>
    </div>
  );
};

const FormInput: React.FC<FormInputProps> = ({ data, onChange, onTTDChange, onStempelChange, onLogoChange }) => {
  // State untuk mengontrol bagian mana yang terbuka
  const [openSection, setOpenSection] = useState<string | null>('kop');

  const toggleSection = (section: string) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name as keyof SuratData, e.target.value);
  };

  const handleStempelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onStempelChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const InputGroup = ({ label, name, placeholder, type = "text" }: { label: string, name: keyof SuratData, placeholder?: string, type?: string }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={data[name] as string}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none"
      />
    </div>
  );

  return (
    // Gunakan 'block' normal (bukan flex) agar browser lebih mudah menghitung height konten untuk scrolling
    // Spacer bottom (div kosong) akan ditambahkan di akhir untuk memaksa scroll
    <div className="h-full overflow-y-auto custom-scrollbar pr-2 pl-1">
      
      {/* 1. KOP SURAT */}
      <AccordionItem 
        title="Identitas Perusahaan" 
        icon={Briefcase} 
        isOpen={openSection === 'kop'} 
        onToggle={() => toggleSection('kop')}
      >
        <div className="mb-5">
           <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Logo Perusahaan</label>
           <div className="flex items-center gap-4">
              {data.logoUrl ? (
                <div className="relative group w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={data.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                    <button 
                        onClick={() => onLogoChange(null)}
                        className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
                    >
                        <X size={16} />
                    </button>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    <Briefcase size={20} />
                </div>
              )}
              <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label 
                    htmlFor="logo-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
                  >
                    <Upload size={16} />
                    <span>Upload Logo</span>
                  </label>
                  <p className="text-[10px] text-gray-400 mt-1">Format: PNG/JPG (Transparan disarankan)</p>
              </div>
           </div>
        </div>

        <InputGroup label="Nama Perusahaan" name="namaPerusahaan" placeholder="Contoh: PT. Maju Jaya" />
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
          <textarea
            name="alamatPerusahaan"
            value={data.alamatPerusahaan}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none resize-none"
            placeholder="Jalan..."
          />
        </div>
        <InputGroup label="Kontak (Telp/Fax)" name="kontakPerusahaan" placeholder="Telp. (021) ..." />
        <InputGroup label="Email / Website" name="emailWebsite" placeholder="email@example.com" />
      </AccordionItem>

      {/* 2. DETAIL SURAT */}
      <AccordionItem 
        title="Detail Surat" 
        icon={FileText} 
        isOpen={openSection === 'detail'} 
        onToggle={() => toggleSection('detail')}
      >
        <div className="grid grid-cols-2 gap-4">
             <InputGroup label="Nomor Surat" name="nomor" placeholder="001/XII/2024" />
             <InputGroup label="Lampiran" name="lampiran" placeholder="- / 1 Berkas" />
        </div>
        <InputGroup label="Perihal" name="hal" placeholder="Penawaran Harga..." />
        
        <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Tempat" name="tempatSurat" placeholder="Jakarta" />
            <InputGroup label="Tanggal" name="tanggalSurat" placeholder="20 Agustus 2024" />
        </div>
      </AccordionItem>

      {/* 3. PENERIMA */}
      <AccordionItem 
        title="Penerima Surat" 
        icon={User} 
        isOpen={openSection === 'penerima'} 
        onToggle={() => toggleSection('penerima')}
      >
         <InputGroup label="Nama / Instansi Penerima" name="namaPenerima" placeholder="Bpk. Budi / PT. Sejahtera" />
         <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Alamat Penerima</label>
          <textarea
            name="alamatPenerima"
            value={data.alamatPenerima}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none resize-none"
            placeholder="Jalan..."
          />
        </div>
         <InputGroup label="Kota / Provinsi" name="kotaProvinsi" placeholder="Jakarta Selatan" />
      </AccordionItem>

      {/* 4. ISI SURAT */}
      <AccordionItem 
        title="Isi Surat" 
        icon={Mail} 
        isOpen={openSection === 'isi'} 
        onToggle={() => toggleSection('isi')}
      >
        <div className="mb-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Konten Surat</label>
            <textarea
                name="isiSurat"
                value={data.isiSurat}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none leading-relaxed"
                placeholder="Tulis isi surat di sini..."
            />
            <p className="text-[10px] text-gray-400 mt-2 text-right">Tekan Enter untuk membuat paragraf baru.</p>
        </div>
      </AccordionItem>

      {/* 5. PENGIRIM & TTD */}
      <AccordionItem 
        title="Pengirim & Tanda Tangan" 
        icon={PenTool} 
        isOpen={openSection === 'ttd'} 
        onToggle={() => toggleSection('ttd')}
      >
        <div className="grid grid-cols-2 gap-4">
             <InputGroup label="Nama Pengirim" name="namaPengirim" placeholder="Nama Lengkap" />
             <InputGroup label="Jabatan" name="jabatan" placeholder="Direktur Utama" />
        </div>

        <div className="mt-6 border-t border-dashed border-gray-200 pt-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tanda Tangan</label>
            <TTDUpload onUpdate={onTTDChange} initialValue={data.ttdUrl} />
        </div>

        <div className="mt-6 border-t border-dashed border-gray-200 pt-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Stempel Perusahaan</label>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {data.stempelUrl ? (
                    <div className="relative w-24 h-24 bg-white rounded border border-gray-200 shadow-sm flex items-center justify-center p-2">
                        <img src={data.stempelUrl} alt="Stempel" className="max-w-full max-h-full object-contain" />
                        <button 
                            onClick={() => onStempelChange(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="w-24 h-24 bg-white rounded border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-1 text-center p-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Upload size={14} />
                        </div>
                        <span className="text-[9px]">Belum ada</span>
                    </div>
                )}
                
                <div className="flex-1">
                     <p className="text-sm font-medium text-gray-700 mb-2">Upload Gambar Stempel</p>
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleStempelUpload}
                        className="hidden"
                        id="stempel-upload"
                    />
                    <label 
                        htmlFor="stempel-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                    >
                        <Upload size={14} />
                        <span>Pilih File</span>
                    </label>
                    <p className="text-[10px] text-gray-400 mt-2">Gunakan file PNG transparan agar hasil stempel terlihat menyatu dengan kertas.</p>
                </div>
            </div>
        </div>
      </AccordionItem>

      {/* SPACER FISIK: Memastikan konten paling bawah bisa di-scroll jauh ke atas (melewati FAB) */}
      <div className="h-64 sm:h-24 w-full bg-transparent shrink-0"></div>
    </div>
  );
};

export default FormInput;