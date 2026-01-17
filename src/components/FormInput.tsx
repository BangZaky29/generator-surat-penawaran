import React from 'react';
import { SuratData } from '../types';
import TTDUpload from './TTDUpload';
import { Upload, ImagePlus, X } from 'lucide-react';

interface FormInputProps {
  data: SuratData;
  onChange: (key: keyof SuratData, value: string) => void;
  onTTDChange: (url: string | null) => void;
  onStempelChange: (url: string | null) => void;
  onLogoChange: (url: string | null) => void;
}

const FormInput: React.FC<FormInputProps> = ({ data, onChange, onTTDChange, onStempelChange, onLogoChange }) => {
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
      <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Detail Surat</h2>
      
      <div className="space-y-5">
        {/* Identitas Perusahaan / Kop Surat */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                Identitas Perusahaan (Kop Surat)
            </h3>
            
            <div className="mb-4 text-center">
                 <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                />
                
                {data.logoUrl ? (
                    <div className="relative w-full h-24 border-2 border-solid border-blue-200 bg-white rounded-md flex items-center justify-center group">
                        <img src={data.logoUrl} alt="Logo" className="h-20 object-contain" />
                        <button 
                            onClick={() => onLogoChange(null)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-all transform hover:scale-110"
                            title="Hapus Logo"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <label 
                        htmlFor="logo-upload" 
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-blue-300 rounded-md cursor-pointer hover:bg-blue-100 transition"
                    >
                        <ImagePlus className="text-blue-400 mb-1" size={24} />
                        <span className="text-xs text-blue-500">Upload Logo Perusahaan</span>
                    </label>
                )}
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nama Perusahaan</label>
                    <input
                        type="text"
                        name="namaPerusahaan"
                        value={data.namaPerusahaan}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Contoh: PT Rocket Manajemen"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Lengkap</label>
                    <input
                        type="text"
                        name="alamatPerusahaan"
                        value={data.alamatPerusahaan}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Alamat kantor..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Kontak (Telp/Fax)</label>
                    <input
                        type="text"
                        name="kontakPerusahaan"
                        value={data.kontakPerusahaan}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Telp: ... Fax: ..."
                    />
                </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email / Website</label>
                    <input
                        type="text"
                        name="emailWebsite"
                        value={data.emailWebsite}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Email & Website..."
                    />
                </div>
            </div>
        </div>

        {/* Identitas Surat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat</label>
            <input
              type="text"
              name="nomor"
              value={data.nomor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              placeholder="Contoh: 89/XII/II/2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempat & Tanggal</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="tempatSurat"
                value={data.tempatSurat}
                onChange={handleChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Kota"
              />
              <input
                type="text"
                name="tanggalSurat"
                value={data.tanggalSurat}
                onChange={handleChange}
                className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Tanggal"
              />
            </div>
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lampiran</label>
            <input
              type="text"
              name="lampiran"
              value={data.lampiran}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hal / Perihal</label>
            <input
              type="text"
              name="hal"
              value={data.hal}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
        </div>

        {/* Penerima */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tujuan / Penerima</h3>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nama Penerima</label>
                    <input
                    type="text"
                    name="namaPenerima"
                    value={data.namaPenerima}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Penerima</label>
                    <input
                    type="text"
                    name="alamatPenerima"
                    value={data.alamatPenerima}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Kota / Provinsi</label>
                    <input
                    type="text"
                    name="kotaProvinsi"
                    value={data.kotaProvinsi}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
            </div>
        </div>

        {/* Isi Surat */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Surat</label>
            <textarea
              name="isiSurat"
              value={data.isiSurat}
              onChange={handleChange}
              rows={8}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
              placeholder="Tuliskan isi surat disini..."
            />
            <p className="text-xs text-gray-500 mt-1">Gunakan enter untuk baris baru.</p>
        </div>

        {/* Pengirim & Legalitas */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Identitas Pengirim</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nama Pengirim</label>
                    <input
                    type="text"
                    name="namaPengirim"
                    value={data.namaPengirim}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Jabatan</label>
                    <input
                    type="text"
                    name="jabatan"
                    value={data.jabatan}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Tanda Tangan</label>
                    <TTDUpload onUpdate={onTTDChange} initialValue={data.ttdUrl} />
                </div>
                
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Stempel (Opsional)</label>
                    
                    {data.stempelUrl ? (
                         <div className="relative flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md">
                            <div className="flex items-center gap-3">
                                <img src={data.stempelUrl} alt="Stempel" className="h-10 w-10 object-contain rounded-full border border-gray-100" />
                                <span className="text-sm text-gray-600">Stempel terpasang</span>
                            </div>
                            <button 
                                onClick={() => onStempelChange(null)}
                                className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 transition"
                                title="Hapus Stempel"
                            >
                                <X size={16} />
                            </button>
                         </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleStempelUpload}
                                className="hidden"
                                id="stempel-upload"
                            />
                            <label 
                                htmlFor="stempel-upload" 
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-50 w-full justify-center border-dashed"
                            >
                                <Upload size={16} /> Pilih Gambar Stempel
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default FormInput;