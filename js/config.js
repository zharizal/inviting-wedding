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
  groomParents: 'Putra dari Bpk. _______ & Ibu _______',  // ← Orang tua pria
  brideParents: 'Putri dari Bpk. _______ & Ibu _______',  // ← Orang tua wanita

  /* ──────────────────────────────────────────────────
   *  TANGGAL PERNIKAHAN
   * ────────────────────────────────────────────────── */
  dateISO:  '2026-09-12',          // ← Format YYYY-MM-DD
  dayName:  'Sabtu',               // ← Nama hari
  dateFull: '12 September 2026',   // ← Teks tanggal yang tampil

  /* ──────────────────────────────────────────────────
   *  AKAD NIKAH
   * ────────────────────────────────────────────────── */
  akad: {
    time:    '08.00 WIB',
    venue:   'Masjid Al-Azhar',
    address: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=Masjid+Al-Azhar+Jakarta',
  },

  /* ──────────────────────────────────────────────────
   *  RESEPSI
   * ────────────────────────────────────────────────── */
  resepsi: {
    time:    '11.00 – 14.00 WIB',
    venue:   'Gedung Serbaguna Nusantara',
    address: 'Jl. Gatot Subroto No. 10, Jakarta Selatan',
    mapsUrl: 'https://maps.google.com/?q=Gatot+Subroto+Jakarta+Selatan',
  },

  /* ──────────────────────────────────────────────────
   *  COUNTDOWN  —  Format: 'YYYY-MM-DDTHH:mm:ss'
   * ────────────────────────────────────────────────── */
  countdownISO: '2026-09-12T08:00:00',

  /* ──────────────────────────────────────────────────
   *  KADO DIGITAL
   *  Tambah/hapus objek di array sesuai kebutuhan.
   * ────────────────────────────────────────────────── */
  bankAccounts: [
    {
      bank:          'Bank BCA',        // ← Nama bank
      accountNumber: '1234567890',      // ← Nomor rekening
      accountName:   'Ahmad Zarizal Muslim',  // ← Atas nama
    },
    {
      bank:          'Bank Mandiri',
      accountNumber: '0987654321',
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
    // 'assets/gallery/foto-1.jpg',   // ← Ganti dengan path foto asli
    // 'assets/gallery/foto-2.jpg',
    // 'assets/gallery/foto-3.jpg',
    // 'assets/gallery/foto-4.jpg',
    // 'assets/gallery/foto-5.jpg',
  ],

  /* ──────────────────────────────────────────────────
   *  AUDIO BACKGROUND (OPSIONAL)
   *  Isi path file: 'assets/music/lagu.mp3'
   *  Kosongkan ('') untuk menonaktifkan.
   * ────────────────────────────────────────────────── */
  audioSrc: '',

  /* ── Dipakai di cover ────────────────────────────── */
  venueName:    'Gedung Serbaguna Nusantara',
  venueCity:    'Jakarta Selatan',
  venueAddress: 'Jl. Gatot Subroto No. 10, Jakarta Selatan',
  mapsUrl:      'https://maps.google.com/?q=Gatot+Subroto+Jakarta+Selatan',
};
