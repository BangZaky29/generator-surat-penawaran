import React, { useState, useRef } from 'react';
import { Upload, Plus, Trash2, ChevronDown, Building2, User, Package, FileText } from 'lucide-react';

// Accordion Component
const AccordionSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <Icon className="accordion-icon" />
        <span className="accordion-title">{title}</span>
        <ChevronDown className={`accordion-chevron ${isOpen ? 'open' : ''}`} />
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ formData, setFormData, listItems, setListItems }) => {
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addListItem = () => {
    setListItems([...listItems, '']);
  };

  const removeListItem = (index) => {
    setListItems(listItems.filter((_, i) => i !== index));
  };

  const updateListItem = (index, value) => {
    const newItems = [...listItems];
    newItems[index] = value;
    setListItems(newItems);
  };

  return (
    <div className="form-section">
      <AccordionSection title="Info Perusahaan" icon={Building2} defaultOpen={true}>
        <div className="form-group">
          <label className="form-label">Logo Perusahaan</label>
          <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
            <Upload size={32} style={{ margin: '0 auto 8px', color: 'var(--gray-400)' }} />
            <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
              {formData.logo ? 'Klik untuk ganti logo' : 'Klik untuk upload logo'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleLogoUpload}
            />
          </div>
          {formData.logo && (
            <div className="upload-preview">
              <img src={formData.logo} alt="Preview Logo" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Nama Perusahaan</label>
          <input
            type="text"
            className="form-input"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="PT ROCKET MANAJEMEN"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Alamat</label>
          <input
            type="text"
            className="form-input"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Jl. Solo Km. 59 Bantul Yogyakarta"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Telepon & Fax</label>
          <input
            type="text"
            className="form-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Telp. (0271) 252352552, Fax. (0127) 32523532532"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email & Website</label>
          <input
            type="text"
            className="form-input"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="email : manajemenrocket@gmail.com"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="Detail Surat" icon={FileText} defaultOpen={true}>
        <div className="form-group">
          <label className="form-label">Nomor Surat</label>
          <input
            type="text"
            className="form-input"
            value={formData.letterNumber}
            onChange={(e) => setFormData({ ...formData, letterNumber: e.target.value })}
            placeholder="89/XII/II/2017"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Lampiran</label>
          <input
            type="text"
            className="form-input"
            value={formData.attachment}
            onChange={(e) => setFormData({ ...formData, attachment: e.target.value })}
            placeholder="1 bandel Brosur dan Leaflet"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hal</label>
          <input
            type="text"
            className="form-input"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Penawaran Barang Elektronik"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="Penerima Surat" icon={User}>
        <div className="form-group">
          <label className="form-label">Kepada Yth.</label>
          <input
            type="text"
            className="form-input"
            value={formData.recipient}
            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            placeholder="Toko Utama Elektro"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Alamat Penerima</label>
          <textarea
            className="form-textarea"
            value={formData.recipientAddress}
            onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
            placeholder="Jl. Permai Km. 2 Malang&#10;Jawa Timur"
          />
        </div>
      </AccordionSection>

      <AccordionSection title="Isi Surat" icon={Package}>
        <div className="form-group">
          <label className="form-label">Pembuka Surat</label>
          <textarea
            className="form-textarea"
            value={formData.opening}
            onChange={(e) => setFormData({ ...formData, opening: e.target.value })}
            placeholder="Menanggapi surat permintaan daftar produk..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Informasi Tambahan</label>
          <textarea
            className="form-textarea"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            placeholder="Untuk memenuhi permintaan dari saudara..."
          />
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label className="form-label" style={{ marginBottom: 0 }}>Daftar Item Penawaran</label>
            <button className="btn btn-primary btn-icon" onClick={addListItem}>
              <Plus size={16} />
            </button>
          </div>
          {listItems.map((item, index) => (
            <div key={index} className="list-item">
              <div className="list-item-header">
                <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Item {index + 1}</span>
                <button className="btn btn-danger btn-icon" onClick={() => removeListItem(index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                className="form-textarea"
                value={item}
                onChange={(e) => updateListItem(index, e.target.value)}
                placeholder={`Masukkan detail item ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Penutup Surat</label>
          <textarea
            className="form-textarea"
            value={formData.closing}
            onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
            placeholder="Kami sangat berharap saudara tertarik..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nama Penandatangan</label>
          <input
            type="text"
            className="form-input"
            value={formData.signerName}
            onChange={(e) => setFormData({ ...formData, signerName: e.target.value })}
            placeholder="Nurul Anggita"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Jabatan</label>
          <input
            type="text"
            className="form-input"
            value={formData.signerTitle}
            onChange={(e) => setFormData({ ...formData, signerTitle: e.target.value })}
            placeholder="Manajer Pemasaran"
          />
        </div>
      </AccordionSection>
    </div>
  );
};

export default FormInput;