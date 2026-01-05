// C:\codingVibes\nuansasolution\.subpath\generator-surat-penawaran\src\components\PreviewSection.jsx

import React from 'react';
import { Printer } from 'lucide-react';

const PreviewSection = ({ formData, listItems }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="preview-section">
      <div className="btn-group">
        <button className="btn btn-primary" onClick={handlePrint}>
          <Printer size={18} />
          Cetak Surat
        </button>
      </div>

      <div className="a4-preview print:a4-exact">
        <div className="letter-header">
          <div className="logo-container">
            {formData.logo ? (
              <img src={formData.logo} alt="Logo" className="logo-img" />
            ) : (
              <div style={{ color: 'black', fontSize: '12px', textAlign: 'center' }}>YOUR<br  />LOGO</div>
            )}
          </div>
          <div className="company-info">
            <div className="company-name">{formData.companyName || 'PT ROCKET MANAJEMEN'}</div>
            <div className="company-details">
              <div>{formData.address || 'Jl. Solo Km. 59 Bantul Yogyakarta'}</div>
              <div>{formData.phone || 'Telp. (0271) 252352552, Fax. (0127) 32523532532'}</div>
              <div>{formData.contact || 'email : manajemenrocket@gmail.com , www.rocketmanjemen.com'}</div>
            </div>
          </div>
        </div>

        <div className="letter-body">
          <div className="letter-date">
            Bantul, {currentDate}
          </div>

          <div className="letter-meta">
            <div>Nomor : {formData.letterNumber || '89/XII/II/2017'}</div>
            <div>Lampiran : {formData.attachment || '1 bandel Brosur dan Leaflet'}</div>
            <div>Hal : {formData.subject || 'Penawaran Barang Elektronik'}</div>
          </div>

          <div className="recipient-address">
            <div>Kepada Yth.</div>
            <div>{formData.recipient || 'Toko Utama Elektro'}</div>
            <div style={{ whiteSpace: 'pre-line' }}>
              {formData.recipientAddress || 'Jl. Permai Km. 2 Malang\nJawa Timur'}
            </div>
          </div>

          <div className="letter-content">
            <p style={{ marginBottom: '16px' }}>Dengan Hormat,</p>
            <p style={{ marginBottom: '16px', textIndent: '40px' }}>
              {formData.opening || 'Menanggapi surat permintaan daftar produk serta harga yang saudara kirimkan pada tanggal 27 Februari 2017 dengan nomor surat 42/MN/II/2017, telah kami terima. Kami mengucapkan banyak terima kasih atas kepercayaan saudara kepada perusahaan kami.'}
            </p>
            <p style={{ marginBottom: '16px', textIndent: '40px' }}>
              {formData.additionalInfo || 'Untuk memenuhi permintaan dari saudara, kami akan memberikan informasi yang saudara butuhkan sebagai berikut :'}
            </p>

            {listItems.length > 0 && (
              <ol className="letter-list">
                {listItems.map((item, index) => (
                  <li key={index}>{item || `Item ${index + 1}`}</li>
                ))}
              </ol>
            )}

            <p style={{ marginTop: '16px', textIndent: '40px' }}>
              {formData.closing || 'Kami sangat berharap saudara tertarik dengan penawaran yang kami berikan. Bila masih ada informasi yang kurang jelas saudara dapat berkunjung di perusahaan kami di Jl. Solo Km. 59 Bantul Yogyakarta ataupun dapat menghubungi ke nomor (0271) 252352552. Kami akan senang hati akan menjawab segala pertanyaan dari saudara mengenai informasi barang yang kami tawarkan.'}
            </p>

            <p style={{ marginTop: '16px', textIndent: '40px' }}>
              Demikian surat penawaran barang ini kami sampaikan. Kami berharap menjadi pemasok barang-barang elektronik di toko saudara dan menjalin kerjasama dengan saudara. Atas perhatian Saudara, kami ucapkan terima kasih.
            </p>
          </div>

          <div className="letter-closing">
            <div>Hormat kami,</div>
            <div className="signature-area">
              <div className="signature-name">{formData.signerName || 'Nurul Anggita'}</div>
              <div>{formData.signerTitle || 'Manajer Pemasaran'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;