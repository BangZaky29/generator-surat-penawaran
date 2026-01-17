export interface SuratData {
  // Kop Surat Info
  logoUrl: string | null;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  kontakPerusahaan: string;
  emailWebsite: string;

  // Existing fields
  nomor: string;
  lampiran: string;
  hal: string;
  namaPenerima: string;
  alamatPenerima: string;
  kotaProvinsi: string;
  tempatSurat: string;
  tanggalSurat: string;
  isiSurat: string;
  namaPengirim: string;
  jabatan: string;
  ttdUrl: string | null;
  stempelUrl: string | null;
}

export const initialSuratData: SuratData = {
  // Default Kop Surat
  logoUrl: null,
  namaPerusahaan: 'PT Rocket Manajemen',
  alamatPerusahaan: 'Jl. Solo Km. 59 Bantul Yogyakarta',
  kontakPerusahaan: 'Telp. (0271) 252352552, Fax. (0127) 32523532532',
  emailWebsite: 'email : manajemenrocket@gmail.com , www.rocketmanjemen.com',

  // Existing defaults
  nomor: '89/XII/II/2026',
  lampiran: '1 bandel Brosur dan Leaflet',
  hal: 'Penawaran Barang Elektronik',
  namaPenerima: 'Toko Utama Elektro',
  alamatPenerima: 'Jl. Permai Km. 2 Malang',
  kotaProvinsi: 'Jawa Timur',
  tempatSurat: 'Bantul',
  tanggalSurat: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
  isiSurat: `Menanggapi surat permintaan daftar produk serta harga yang saudara kirimkan pada tanggal 27 Februari 2026, telah kami terima. Kami mengucapkan banyak terima kasih atas kepercayaan saudara kepada perusahaan kami.\n\nUntuk memenuhi permintaan dari saudara, kami akan memberikan informasi yang saudara butuhkan sebagai berikut:\n\n1. Daftar barang beserta harga telah kami kirimkan bersama dengan surat ini.\n2. Apabila saudara membeli produk dari kami, saudara dapat membayar 75% sebagai DP.\n3. Untuk pembelian dalam diatas 100 unit maka kami akan memberikan diskon 10% kepada saudara.\n\nKami sangat berharap saudara tertarik dengan penawaran yang kami berikan.`,
  namaPengirim: 'Nurul Anggita',
  jabatan: 'Manajer Pemasaran',
  ttdUrl: null,
  stempelUrl: null,
};