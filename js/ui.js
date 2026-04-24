/**
 * ui.js
 * Semua fungsi render tampilan — publik dan admin.
 */

// ============================================
// TAB SWITCHER
// ============================================

function showTab(tab, btn) {
  document.getElementById('tab-publik').style.display = tab === 'publik' ? '' : 'none';
  document.getElementById('tab-admin').style.display  = tab === 'admin'  ? '' : 'none';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

// ============================================
// PUBLIK — CEK RESI
// ============================================

function cekResi() {
  const val   = document.getElementById('input-resi').value.trim().toUpperCase();
  const found = perizinanData.find(d => d.resi === val);

  document.getElementById('not-found').classList.remove('show');
  document.getElementById('result-card').classList.remove('show');

  if (!found) {
    document.getElementById('not-found').classList.add('show');
    return;
  }

  renderResultCard(found);
}

function renderResultCard(item) {
  document.getElementById('res-nama').textContent = item.nama;
  document.getElementById('res-meta').textContent = `${item.resi} · ${item.jenis} · ${item.instansi}`;

  const badge = document.getElementById('res-badge');
  badge.className  = 'badge ' + badgeClass(item.status);
  badge.textContent = item.status;

  const p   = pct(item.step);
  const bar = document.getElementById('res-bar');
  document.getElementById('res-pct').textContent = p + '%';
  bar.style.width      = p + '%';
  bar.style.background = STATUS_COLORS[item.status];

  document.getElementById('res-steps').innerHTML = renderSteps(item);
  document.getElementById('res-info').innerHTML  = renderInfoRows(item);
  document.getElementById('result-card').classList.add('show');

  setTimeout(() => makeQR('qr-pub', item.resi, 130), 100);
}

function renderSteps(item) {
  return TAHAPAN.map((t, i) => {
    const dc   = i < item.step ? 'done' : i === item.step ? 'active' : 'wait';
    const lc   = i < item.step ? 'var(--green)' : 'var(--border)';
    const icon = i < item.step ? '✓' : i + 1;
    const line = i < TAHAPAN.length - 1
      ? `<div class="step-line" style="background:${lc}"></div>`
      : '';
    return `
      <div class="step-wrap">
        <div class="step-inner">
          <div class="step-dot ${dc}">${icon}</div>
          <div class="step-label">${t}</div>
        </div>
        ${line}
      </div>`;
  }).join('');
}

function renderInfoRows(item) {
  const rows = [
    ['Pemohon',          item.pemohon],
    ['Tanggal pengajuan',item.tgl],
    ['Instansi pemroses',item.instansi],
    ['Tahap saat ini',   TAHAPAN[item.step]],
    ['Update terakhir',  updateLabel(item.lastUpdate)],
  ];
  return rows.map(([lbl, val]) =>
    `<div class="info-row">
       <span class="info-lbl">${lbl}</span>
       <span class="info-val">${val}</span>
     </div>`
  ).join('');
}

// ============================================
// ADMIN
// ============================================

let activeFilter = 'semua';

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderAdmin();
}

function renderStats() {
  const c = { Proses: 0, Revisi: 0, Selesai: 0 };
  perizinanData.forEach(d => { c[d.status] = (c[d.status] || 0) + 1; });

  document.getElementById('stats').innerHTML = [
    ['Total',   perizinanData.length, '#185FA5'],
    ['Proses',  c.Proses,             '#378ADD'],
    ['Revisi',  c.Revisi,             '#EF9F27'],
    ['Selesai', c.Selesai,            '#1D9E75'],
  ].map(([l, v, col]) =>
    `<div class="stat">
       <div class="stat-label">${l}</div>
       <div class="stat-val" style="color:${col}">${v}</div>
     </div>`
  ).join('');
}

function renderAdmin() {
  renderStats();

  const filtered = activeFilter === 'semua'
    ? perizinanData
    : perizinanData.filter(d => d.status === activeFilter);

  const list = document.getElementById('admin-list');

  if (!filtered.length) {
    list.innerHTML = '<div class="empty">Belum ada data pengajuan izin.</div>';
    return;
  }

  list.innerHTML = filtered.map(item => `
    <div class="izin-card">
      <div class="izin-header">
        <div>
          <div class="izin-name">${item.nama}</div>
          <div class="izin-meta">${item.jenis} · ${item.pemohon} · ${item.instansi}</div>
          <span class="resi-pill" onclick="copyResi('${item.resi}')" title="Klik untuk salin kode resi">
            ${item.resi}
            <span class="resi-copy">salin</span>
          </span>
        </div>
        <span class="badge ${badgeClass(item.status)}">${item.status}</span>
      </div>
      <div class="izin-footer">
        <span class="izin-info">
          Tahap: <strong>${TAHAPAN[item.step]}</strong> &middot; Update: ${updateLabel(item.lastUpdate)}
        </span>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn-qr" onclick="showQR('${item.resi}')">QR Code</button>
          ${item.status !== 'Selesai'
            ? `<button class="btn-maju" onclick="majuTahap('${item.resi}')">Maju Tahap</button>`
            : `<span class="selesai-tag">✓ Selesai</span>`
          }
        </div>
      </div>
    </div>`
  ).join('');
}

// ============================================
// TOAST
// ============================================

function toast(msg) {
  const t = document.createElement('div');
  t.className   = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
