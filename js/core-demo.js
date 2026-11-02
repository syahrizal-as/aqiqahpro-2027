(() => {
  'use strict';

  const tabs = [...document.querySelectorAll('[data-core-demo-step]')];
  const panel = document.querySelector('#core-demo-panel');
  if (!tabs.length || !panel) return;

  const steps = [
    {
      title: 'Order dicatat',
      description: 'Sales atau admin meninjau ORD-DEMO-001 untuk Pelanggan Demo: 2 ekor dan 140 box. Detail pesanan yang disetujui menjadi acuan pekerjaan tim berikutnya.',
      owner: 'Sales / admin',
      document: 'Sales order ORD-DEMO-001',
      state: 'Detail ditinjau',
    },
    {
      title: 'Hewan diperiksa dan dialokasikan',
      description: 'Petugas stok memeriksa ketersediaan hewan, lalu meninjau alokasi 2 ekor untuk ORD-DEMO-001. Pencatatan keluar-masuk hewan membantu tim menelusuri pergerakan stok.',
      owner: 'Petugas stok hewan',
      document: 'Catatan stok dan alokasi 2 ekor',
      state: 'Contoh alokasi',
    },
    {
      title: 'Pekerjaan RPH disiapkan',
      description: 'Admin dan tim RPH meninjau kebutuhan 2 ekor pada order yang sama, menyiapkan pekerjaan, serta memeriksa purchase order dan komponen biaya yang diperlukan.',
      owner: 'Admin / tim RPH',
      document: 'Purchase order dan catatan pekerjaan RPH',
      state: 'Pekerjaan ditinjau',
    },
    {
      title: 'Dapur menyiapkan bahan dan produksi',
      description: 'Tim gudang meninjau stok bahan, kemudian tim dapur memeriksa menu dan kebutuhan produksi 140 box. Penggunaan bahan serta biaya dapur dicatat sesuai pekerjaan yang dilakukan.',
      owner: 'Gudang bahan / tim dapur',
      document: 'Catatan bahan dan pekerjaan 140 box',
      state: 'Contoh persiapan',
    },
    {
      title: 'Pembayaran diperiksa dan dicatat',
      description: 'Finance memeriksa bukti pembayaran untuk ORD-DEMO-001 sebelum mencatat penerimaannya. Rp4.200.000 adalah nominal contoh untuk demonstrasi, bukan transaksi pelanggan aktual.',
      owner: 'Finance',
      document: 'Bukti pembayaran demo · Rp4.200.000',
      state: 'Contoh verifikasi',
    },
    {
      title: 'Pengiriman dilanjutkan dari order yang sama',
      description: 'Admin dan kurir meninjau jumlah 140 box, jadwal antar, serta catatan surat jalan dari ORD-DEMO-001. Tim kemudian mencatat progres penyerahan untuk Pelanggan Demo.',
      owner: 'Admin pengiriman / kurir',
      document: 'Jadwal antar dan catatan surat jalan demo',
      state: 'Contoh pengiriman',
    },
    {
      title: 'Jurnal dan laporan keuangan ditinjau',
      description: 'Tim akuntansi meninjau transaksi serta biaya hewan, RPH, dapur, dan pengiriman. Setelah pencatatan diperiksa, tim meninjau posting jurnal, buku besar, serta laporan laba-rugi.',
      owner: 'Akuntansi',
      document: 'Jurnal, buku besar, dan laporan laba-rugi',
      state: 'Contoh pencatatan',
    },
  ];

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  let activeIndex = 0;
  const renderStep = (index) => {
    activeIndex = ((index % steps.length) + steps.length) % steps.length;
    const step = steps[activeIndex];
    setText('#core-demo-stage', step.title);
    setText('#core-demo-description', step.description);
    setText('#core-demo-owner', step.owner);
    setText('#core-demo-document', step.document);
    setText('#core-demo-state', step.state);
    setText('#core-demo-counter', `${String(activeIndex + 1).padStart(2, '0')} / 07`);
    tabs.forEach((tab) => {
      const selected = Number(tab.dataset.coreDemoStep) === activeIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) panel.setAttribute('aria-labelledby', tab.id || `core-step-${activeIndex}`);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => renderStep(Number(tab.dataset.coreDemoStep)));
    tab.addEventListener('keydown', (event) => {
      let nextIndex;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = activeIndex + 1;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = activeIndex - 1;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = steps.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      renderStep(nextIndex);
      tabs.find((item) => Number(item.dataset.coreDemoStep) === activeIndex)?.focus();
    });
  });
  document.querySelector('#core-demo-next')?.addEventListener('click', () => renderStep(activeIndex + 1));
  renderStep(0);
})();
