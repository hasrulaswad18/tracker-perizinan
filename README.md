# Tracker Perizinan

Aplikasi web untuk melacak proses perizinan secara transparan dan real-time. Masyarakat dapat mengecek status izin menggunakan **kode resi** atau **QR Code** yang diberikan petugas.

## Fitur

- **Cek status publik** — masyarakat input kode resi, langsung lihat progress izin
- **QR Code otomatis** — setiap izin baru mendapat kode resi + QR Code yang bisa dicetak
- **Panel petugas** — tambah izin, update tahapan, cetak QR
- **Notifikasi & alert** — peringatan izin yang mandek terlalu lama
- **Responsive** — tampil baik di HP maupun desktop
- **Dark mode** — otomatis mengikuti sistem

## Struktur Project

```
tracker-perizinan/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Semua styling
├── js/
│   ├── data.js         # Data & helper functions
│   ├── qr.js           # QR Code generator
│   ├── ui.js           # Render tampilan
│   └── app.js          # Logic utama & aksi
└── README.md
```

## Cara Pakai

### Sebagai masyarakat (publik)
1. Buka halaman utama
2. Masukkan kode resi di kolom pencarian (contoh: `IZN-A3F7K2`)
3. Klik **Lacak** — status izin langsung tampil

### Sebagai petugas
1. Klik tab **Panel Petugas**
2. Klik **+ Tambah Izin** untuk mendaftarkan pengajuan baru
3. Sistem otomatis generate kode resi unik
4. Klik **QR Code** untuk cetak/simpan QR yang diberikan ke pemohon
5. Klik **Maju Tahap** untuk update progress izin

## Deploy ke GitHub Pages

1. Upload semua file ke repository GitHub
2. Buka **Settings → Pages**
3. Pilih branch `main`, folder `/ (root)`
4. Klik **Save** — tunggu 1-2 menit
5. Akses di: `https://[username].github.io/tracker-perizinan/`

## Rencana Pengembangan

- [ ] Koneksi database (Supabase) — data permanen
- [ ] Sistem login petugas
- [ ] Notifikasi WhatsApp/email ke pemohon
- [ ] Upload dokumen persyaratan
- [ ] Laporan & ekspor Excel/PDF

## Teknologi

- HTML, CSS, JavaScript (vanilla — tanpa framework)
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) untuk generate QR

---

Dibuat dengan ❤️ untuk transparansi layanan publik.
