/**
 * ════════════════════════════════════════════════════
 *  UNDANGAN DIGITAL — KONFIGURASI UTAMA
 *  Edit file ini untuk mengganti semua data undangan.
 *  Tidak perlu menyentuh file lain sama sekali.
 * ════════════════════════════════════════════════════
 */

const SUPABASE = {
  url:  'https://xvvnueyceowavkrwfrhp.supabase.co',
  key:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dm51ZXljZW93YXZrcndmcmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTU2ODcsImV4cCI6MjA5MTU5MTY4N30.8UNuNCnM2LQJUpCzcRxGsaShSIjGJlpLTNbmLZp1b8I',
};

const WEDDING = {

  /* ──────────────────────────────────────────────────
   *  NAMA MEMPELAI
   * ────────────────────────────────────────────────── */
  groom: 'Ahmad Zarizal Muslim',   // ← Nama Pria
  bride: 'Fani Agitha',            // ← Nama Wanita

  /* ──────────────────────────────────────────────────
   *  NAMA ORANG TUA
   *  Kosongkan ('') untuk menyembunyikan baris.
   * ────────────────────────────────────────────────── */
  groomParents: 'Putra dari Bpk. Sulaiman & Ibu Nurul Husna',  // ← Orang tua pria
  brideParents: 'Putri dari Bpk. Suman & Ibu Hartati',  // ← Orang tua wanita

  /* ──────────────────────────────────────────────────
   *  TANGGAL PERNIKAHAN
   * ────────────────────────────────────────────────── */
  dateISO:  '2026-10-18',          // ← Format YYYY-MM-DD
  dayName:  'Minggu',               // ← Nama hari
  dateFull: '18 Oktober 2026',   // ← Teks tanggal yang tampil

  /* ──────────────────────────────────────────────────
   *  AKAD NIKAH
   * ────────────────────────────────────────────────── */
  akad: {
    time:    '08.00 WIB',
    venue:   'Lumbung Cafe',
    address: 'Tanah Enam Ratus, Kec. Medan Marelan, Kota Medan, Sumatera Utara 20244, Indonesia',
    mapsUrl: 'https://www.google.com/maps/place/LUMBUNG+KULINER/@3.6875523,98.6532975,17z/data=!3m1!4b1!4m6!3m5!1s0x30312dac0663efcf:0x6a1904298d730b1f!8m2!3d3.6875523!4d98.6558724!16s%2Fg%2F11rnbwbxc9?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D',
  },

  /* ──────────────────────────────────────────────────
   *  RESEPSI
   * ────────────────────────────────────────────────── */
  resepsi: {
    time:    '11.00 – 14.00 WIB',
    venue:   'Lumbung Cafe',
    address: 'Tanah Enam Ratus, Kec. Medan Marelan, Kota Medan, Sumatera Utara 20244, Indonesia',
    mapsUrl: 'https://www.google.com/maps/place/LUMBUNG+KULINER/@3.6875523,98.6532975,17z/data=!3m1!4b1!4m6!3m5!1s0x30312dac0663efcf:0x6a1904298d730b1f!8m2!3d3.6875523!4d98.6558724!16s%2Fg%2F11rnbwbxc9?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D',
  },

  /* ──────────────────────────────────────────────────
   *  COUNTDOWN  —  Format: 'YYYY-MM-DDTHH:mm:ss'
   * ────────────────────────────────────────────────── */
  countdownISO: '2026-10-18T08:00:00',

  /* ──────────────────────────────────────────────────
   *  KADO DIGITAL
   *  Tambah/hapus objek di array sesuai kebutuhan.
   * ────────────────────────────────────────────────── */
  bankAccounts: [
    {
      bank:          'BNI',        // ← Nama bank
      accountNumber: '1891468114',      // ← Nomor rekening
      accountName:   'Ahmad Zarizal Muslim',  // ← Atas nama
    },
    {
      bank:          'BCA',
      accountNumber: '3831799771',
      accountName:   'Fani Agitha',
    },
  ],

  /* ──────────────────────────────────────────────────
   *  GALERI FOTO
   *  Isi dengan path foto, misal: 'assets/gallery/foto-1.jpg'
   *  Pastikan file ada di folder assets/gallery/
   *  Biarkan kosong [] untuk tampilkan placeholder elegan.
   * ────────────────────────────────────────────────── */
  gallery: [
    'assets/gallery/foto-1.webp',
    'assets/gallery/foto-2.webp',
    'assets/gallery/foto-3.webp',
    'assets/gallery/foto-4.webp',
    'assets/gallery/foto-5.webp',
  ],

  /* ──────────────────────────────────────────────────
   *  AUDIO BACKGROUND (OPSIONAL)
   *  Isi path file: 'assets/music/lagu.mp3'
   *  Kosongkan ('') untuk menonaktifkan.
   * ────────────────────────────────────────────────── */
  audioSrc: 'assets/music/perfect.mp3',

  /* ── Dipakai di cover ────────────────────────────── */
  venueName:    'Lumbung Cafe',
  venueCity:    'Marelan, Medan',
  venueAddress: 'Tanah Enam Ratus, Kec. Medan Marelan, Kota Medan, Sumatera Utara 20244, Indonesia',
  mapsUrl:      'https://www.google.com/maps/place/LUMBUNG+KULINER/@3.6875523,98.6532975,17z/data=!3m1!4b1!4m6!3m5!1s0x30312dac0663efcf:0x6a1904298d730b1f!8m2!3d3.6875523!4d98.6558724!16s%2Fg%2F11rnbwbxc9?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D',
};
