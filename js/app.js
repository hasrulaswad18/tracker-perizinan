/**
 * app.js
 * Logic utama aplikasi: aksi petugas, form, dan auto-refresh simulasi.
 * File ini diload terakhir setelah data.js, qr.js, dan ui.js.
 */

// ============================================
// ADMIN ACTIONS
// ============================================

function majuTahap(resi) {
  const item = perizinanData.find(d => d.resi === resi);
  if (!item || item.step >= TAHAPAN.length - 1) return;

  item.step++;
  item.lastUpdate = Date.now();
  if (item.step === TAHAPAN.length - 1) item.status = 'Selesai';

  renderAdmin();
  toast(`${resi} maju ke tahap: ${TAHAPAN[item.step]}`);
}

function copyResi(resi) {
  navigator.clipboard?.writeText(resi)
    .then(() => toast('Kode resi ' + resi + ' disalin!'))
    .catch(() => toast('Salin manual: ' + resi));
}

// ============================================
// FORM — TAMBAH IZIN BARU
// ============================================

function openForm() {
  document.getElementById('form-overlay').classList.add('open');
}

function closeForm() {
  document.getElementById('form-overlay').classList.remove('open');
  // Reset form
  ['f-nama', 'f-pemohon', 'f-instansi'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function saveIzin() {
  const nama    = document.getElementById('f-nama').value.trim();
  const pemohon = document.getElementById('f-pemohon').value.trim();

  if (!nama || !pemohon) {
    alert('Nama izin dan pemohon wajib diisi.');
    return;
  }

  const resi = genResi();
  perizinanData.unshift({
    resi,
    nama,
    jenis:      document.getElementById('f-jenis').value,
    pemohon,
    instansi:   document.getElementById('f-instansi').value.trim() || '-',
    tgl:        today(),
    status:     'Proses',
    step:       0,
    lastUpdate: Date.now(),
  });

  closeForm();
  renderAdmin();

  // Langsung tampilkan QR baru
  setTimeout(() => showQR(resi), 200);
  toast('Izin baru ditambahkan. Kode resi: ' + resi);
}

// ============================================
// SIMULASI REAL-TIME
// Hapus bagian ini saat sudah pakai database nyata
// ============================================

setInterval(() => {
  const inProgress = perizinanData.filter(
    d => d.status === 'Proses' && d.step < TAHAPAN.length - 1
  );
  if (!inProgress.length) return;

  const item = inProgress[Math.floor(Math.random() * inProgress.length)];
  item.step++;
  item.lastUpdate = Date.now();
  if (item.step === TAHAPAN.length - 1) item.status = 'Selesai';

  // Hanya re-render jika tab admin sedang aktif
  if (document.getElementById('tab-admin').style.display !== 'none') {
    renderAdmin();
  }
}, 15000);

// ============================================
// INIT
// ============================================

renderAdmin();
