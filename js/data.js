/**
 * data.js
 * Data awal, konstanta, dan helper functions.
 * Ganti isi array `perizinanData` dengan data real dari database nanti.
 */

const TAHAPAN = ['Pengajuan', 'Verifikasi', 'Pemeriksaan', 'Persetujuan', 'Penerbitan'];

const STATUS_COLORS = {
  Proses:  '#185FA5',
  Selesai: '#1D9E75',
  Revisi:  '#EF9F27',
  Ditolak: '#E24B4A',
};

// Data contoh — nanti diganti koneksi ke database (Supabase/Firebase)
let perizinanData = [
  {
    resi:       'IZN-A3F7K2',
    nama:       'IMB Gedung Kantor Blok B',
    jenis:      'IMB',
    pemohon:    'PT Maju Bersama',
    instansi:   'Dinas PUPR',
    tgl:        today(),
    status:     'Proses',
    step:       2,
    lastUpdate: Date.now() - 3 * 86400000,
  },
  {
    resi:       'IZN-B8M2QX',
    nama:       'SIUP Usaha Ritel Modern',
    jenis:      'SIUP',
    pemohon:    'Budi Santoso',
    instansi:   'Dinas Perdagangan',
    tgl:        '2026-02-20',
    status:     'Revisi',
    step:       2,
    lastUpdate: Date.now() - 10 * 86400000,
  },
  {
    resi:       'IZN-C5PL9R',
    nama:       'Izin Gangguan (HO) Pabrik',
    jenis:      'HO',
    pemohon:    'CV Mandiri Jaya',
    instansi:   'BPPTSP',
    tgl:        '2026-01-15',
    status:     'Selesai',
    step:       4,
    lastUpdate: Date.now() - 2 * 86400000,
  },
  {
    resi:       'IZN-D1KW4T',
    nama:       'AMDAL Proyek Jalan Lingkar',
    jenis:      'AMDAL',
    pemohon:    'Dinas Pekerjaan Umum',
    instansi:   'Dinas LH',
    tgl:        '2026-03-01',
    status:     'Proses',
    step:       1,
    lastUpdate: Date.now() - 1 * 86400000,
  },
];

// ============================================
// Helper functions
// ============================================

function genResi() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let r = 'IZN-';
  for (let i = 0; i < 6; i++) {
    r += chars[Math.floor(Math.random() * chars.length)];
  }
  return r;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function daysSince(ts) {
  return Math.floor((Date.now() - ts) / 86400000);
}

function pct(step) {
  return Math.round((step / (TAHAPAN.length - 1)) * 100);
}

function badgeClass(status) {
  return {
    Proses:  'badge-proses',
    Selesai: 'badge-selesai',
    Revisi:  'badge-revisi',
  }[status] || 'badge-proses';
}

function updateLabel(ts) {
  const d = daysSince(ts);
  return d === 0 ? 'Hari ini' : d + ' hari lalu';
}
