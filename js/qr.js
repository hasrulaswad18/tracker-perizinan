/**
 * qr.js
 * Helper untuk generate dan download QR Code.
 * Menggunakan library qrcodejs dari CDN.
 */

let currentQRItem = null;

/**
 * Generate QR Code ke dalam element container.
 * @param {string} containerId - ID elemen target
 * @param {string} text        - Teks/data yang di-encode (kode resi)
 * @param {number} size        - Ukuran QR dalam px
 */
function makeQR(containerId, text, size) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  if (typeof QRCode === 'undefined') {
    console.warn('QRCode library belum dimuat.');
    return;
  }
  new QRCode(el, {
    text,
    width:  size,
    height: size,
    correctLevel: QRCode.CorrectLevel.M,
  });
}

/**
 * Tampilkan modal QR untuk item tertentu.
 * @param {string} resi - Kode resi
 */
function showQR(resi) {
  const item = perizinanData.find(d => d.resi === resi);
  if (!item) return;
  currentQRItem = item;

  document.getElementById('modal-nama').textContent  = item.nama;
  document.getElementById('modal-resi').textContent  = item.resi;
  document.getElementById('qr-overlay').classList.add('open');

  // Sedikit delay agar elemen sudah visible sebelum di-render
  setTimeout(() => makeQR('qr-modal-box', item.resi, 180), 100);
}

function closeQR() {
  document.getElementById('qr-overlay').classList.remove('open');
  currentQRItem = null;
}

/**
 * Download QR Code sebagai file PNG.
 */
function downloadQR() {
  if (!currentQRItem) return;
  const img = document.querySelector('#qr-modal-box img');
  if (!img) return;
  const a = document.createElement('a');
  a.download = 'resi-' + currentQRItem.resi + '.png';
  a.href = img.src;
  a.click();
}
