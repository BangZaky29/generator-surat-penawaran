import React, { useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import FormInput from './components/FormInput';
import PreviewSection from './components/PreviewSection';
import logo from '/src/assets/NS_white_01.png';
import './App.css';
import './styles/global.css';
import './styles/desktop.css';
import './styles/mobile.css';

export default function App() {
  const [formData, setFormData] = useState({
    logo: null,
    companyName: 'PT ROCKET MANAJEMEN',
    address: 'Jl. Solo Km. 59 Bantul Yogyakarta',
    phone: 'Telp. (0271) 252352552, Fax. (0127) 32523532532',
    contact: 'email : manajemenrocket@gmail.com , www.rocketmanjemen.com',
    letterNumber: '89/XII/II/2017',
    attachment: '1 bandel Brosur dan Leaflet',
    subject: 'Penawaran Barang Elektronik',
    recipient: 'Toko Utama Elektro',
    recipientAddress: 'Jl. Permai Km. 2 Malang\nJawa Timur',
    opening: 'Menanggapi surat permintaan daftar produk serta harga yang saudara kirimkan pada tanggal 27 Februari 2017 dengan nomor surat 42/MN/II/2017, telah kami terima. Kami mengucapkan banyak terima kasih atas kepercayaan saudara kepada perusahaan kami.',
    additionalInfo: 'Untuk memenuhi permintaan dari saudara, kami akan memberikan informasi yang saudara butuhkan sebagai berikut :',
    closing: 'Kami sangat berharap saudara tertarik dengan penawaran yang kami berikan. Bila masih ada informasi yang kurang jelas saudara dapat berkunjung di perusahaan kami di Jl. Solo Km. 59 Bantul Yogyakarta ataupun dapat menghubungi ke nomor (0271) 252352552. Kami akan senang hati akan menjawab segala pertanyaan dari saudara mengenai informasi barang yang kami tawarkan.',
    signerName: 'Nurul Anggita',
    signerTitle: 'Manajer Pemasaran',
  });

  const [listItems, setListItems] = useState([
    'Daftar barang beserta harga telah kami kirimkan bersama dengan surat ini. Harga tersebut sudah termasuk ongkos kirim ke toko saudara.',
    'Apabila saudara membeli produk dari kami, saudara dapat membayar 75% sebagai DP dan sisanya dapat saudara bayarkan setelah 1 bulan barang saudara terima dan tidak ada kerusakan.',
    'Untuk pembelian dalam diatas 100 unit maka kami akan memberikan diskon 10% kepada saudara.',
  ]);

  return (
    <>
      <GlobalStyles />
      <div className="app-header">
        <div className="header-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="header-content">
          <div className="header-title">Generator Surat Penawaran</div>
          <div className="header-subtitle">Buat surat penawaran profesional dengan mudah dan cepat</div>
        </div>
      </div>
      
      <div className="app-body">
        <FormInput 
          formData={formData} 
          setFormData={setFormData}
          listItems={listItems}
          setListItems={setListItems}
        />
        <PreviewSection formData={formData} listItems={listItems} />
      </div>

      <div className="app-footer">
        <div className="footer-text">
          © 2022 PT Nuansa Solution | Generator Surat Penawaran
        </div>
      </div>
    </>
  );
}