(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
  const formatMoney = (value) => money.format(value);
  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };
  const getCost = (selector) => {
    const input = $(selector);
    const value = Number(input?.value ?? 0);
    const upperBound = Number(input?.max) || 1000000000;
    return Number.isFinite(value) ? Math.round(Math.min(upperBound, Math.max(0, value))) : 0;
  };

  // The navigation remains usable with a keyboard and closes after selection.
  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  };
  menuToggle?.addEventListener('click', () => {
    if (!mobileMenu) return;
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });
  $$('a, [data-open-demo], [data-open-pricing]', mobileMenu || document)
    .forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || menuToggle?.getAttribute('aria-expanded') !== 'true') return;
    closeMenu();
    menuToggle.focus();
  });
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener?.('change', (event) => {
    if (event.matches) closeMenu();
  });

  // Native dialogs provide focus trapping and Escape handling.
  const dialogOpeners = new WeakMap();
  const openDialog = (dialog, opener) => {
    if (!dialog || dialog.open) return;
    dialogOpeners.set(dialog, opener || document.activeElement);
    closeMenu();
    dialog.showModal();
    document.body.classList.add('dialog-open');
  };
  $$('dialog').forEach((dialog) => {
    dialog.addEventListener('close', () => {
      if (!$('dialog[open]')) document.body.classList.remove('dialog-open');
      const opener = dialogOpeners.get(dialog);
      const openerIsHidden = opener?.closest?.('[hidden]');
      if (openerIsHidden && mobileMenu?.contains(opener)) {
        menuToggle?.focus();
      } else if (opener?.isConnected && !openerIsHidden) {
        opener.focus();
      }
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });
  });
  $$('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => button.closest('dialog')?.close());
  });
  $$('[data-open-demo]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openDialog($('#demo-dialog'), button);
    });
  });

  const demoSteps = [
    {
      title: 'Kenali pelanggan dari chat pertama.',
      description: 'Contoh: Bu Rina menanyakan aqiqah untuk putranya, Muhammad Arkan. Kebutuhan 2 ekor domba, tanggal acara 8 November 2026, dan area pengiriman Bandung dicatat pada profil pelanggan.',
      state: 'Lead baru',
    },
    {
      title: 'Tentukan langkah follow-up berikutnya.',
      description: 'Contoh: Nisa menjadi penanggung jawab prospek Bu Rina. Jadwalkan tindak lanjut untuk mengonfirmasi Paket Berkah, 140 box, dan alamat pengiriman di Bandung.',
      state: 'Follow-up',
    },
    {
      title: 'Susun pesanan dengan detail yang lengkap.',
      description: 'Contoh: Bu Rina menyetujui Paket Berkah, 2 ekor domba, dan 140 box untuk acara Muhammad Arkan pada 8 November 2026. Data yang sama menjadi acuan quotation dan order untuk ditinjau tim.',
      state: 'Order dibuat',
    },
    {
      title: 'Pisahkan order dari pembayaran.',
      description: 'Contoh: Admin memeriksa bukti DP dari Bu Rina dan mengonfirmasi pembayaran untuk order Muhammad Arkan. Status pembayaran diperbarui setelah verifikasi admin.',
      state: 'DP terverifikasi',
    },
    {
      title: 'Teruskan pesanan sampai pengiriman.',
      description: 'Contoh: Tim operasional meninjau jadwal produksi 140 box, label nama Muhammad Arkan, dan alamat Bandung. Pesanan disiapkan untuk dikirim pada 8 November 2026.',
      state: 'Siap dikirim',
    },
  ];
  let demoIndex = 0;
  const showDemoStep = (index) => {
    demoIndex = ((index % demoSteps.length) + demoSteps.length) % demoSteps.length;
    const step = demoSteps[demoIndex];
    setText('#demo-title', step.title);
    setText('#demo-description', step.description);
    setText('#demo-state', step.state);
    setText('#demo-counter', `LANGKAH ${String(demoIndex + 1).padStart(2, '0')} / ${String(demoSteps.length).padStart(2, '0')}`);
    $('#demo-panel')?.setAttribute('aria-labelledby', `demo-tab-${demoIndex}`);
    $$('[data-demo-step]').forEach((button) => {
      const isActive = Number(button.dataset.demoStep) === demoIndex;
      button.setAttribute('aria-selected', String(isActive));
      button.classList.toggle('is-active', isActive);
      button.tabIndex = isActive ? 0 : -1;
    });
  };
  const demoTabs = $$('[data-demo-step]');
  demoTabs.forEach((button) => {
    button.addEventListener('click', () => showDemoStep(Number(button.dataset.demoStep)));
    button.addEventListener('keydown', (event) => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = demoIndex + 1;
      if (event.key === 'ArrowLeft') nextIndex = demoIndex - 1;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = demoSteps.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      showDemoStep(nextIndex);
      demoTabs.find((tab) => Number(tab.dataset.demoStep) === demoIndex)?.focus();
    });
  });
  $('#demo-next')?.addEventListener('click', () => showDemoStep(demoIndex + 1));
  showDemoStep(0);

  const plans = {
    core: { name: 'Core', addon: 0, users: 0, numbers: 0 },
    starter: { name: 'CRM Starter', addon: 200000, users: 5, numbers: 1 },
    growth: { name: 'CRM Growth', addon: 400000, users: 10, numbers: 3 },
    scale: { name: 'CRM Scale', addon: 700000, users: 25, numbers: 10 },
  };
  const corePrice = 800000;
  const getPlanKey = () => {
    const key = $('#estimate-plan')?.value;
    return Object.hasOwn(plans, key) ? key : 'core';
  };
  const renderEstimate = () => {
    const planKey = getPlanKey();
    const plan = plans[planKey];
    const coreWithoutWhatsApp = planKey === 'core' && !getCost('#estimate-vendor') && !getCost('#estimate-meta');
    const subtotal = corePrice + plan.addon;
    const vendor = getCost('#estimate-vendor');
    const meta = getCost('#estimate-meta');
    const other = getCost('#estimate-other');
    const onboarding = getCost('#estimate-onboarding');
    const monthly = subtotal + vendor + meta + other;
    setText('#estimate-subtotal', formatMoney(subtotal));
    setText('#estimate-monthly', formatMoney(monthly));
    setText('#estimate-first-year', formatMoney(monthly * 12 + onboarding));
    setText('#estimate-next-year', formatMoney(monthly * 12));
    setText('#estimate-breakdown', [
      `Core ${formatMoney(corePrice)}`,
      `${plan.name === 'Core' ? 'CRM tidak dipilih' : plan.name} ${formatMoney(plan.addon)}`,
      `Kirimdev ${vendor ? formatMoney(vendor) : coreWithoutWhatsApp ? 'tidak digunakan' : 'belum diisi'}`,
      `pesan Meta ${meta ? formatMoney(meta) : coreWithoutWhatsApp ? 'tidak digunakan' : 'belum diisi'}`,
      `biaya rutin lainnya ${other ? formatMoney(other) : 'belum diisi'}`,
      `biaya sekali bayar ${onboarding ? formatMoney(onboarding) : 'belum diisi'}`,
    ].join(' + '));
    const unfilled = [
      !coreWithoutWhatsApp && !vendor && 'lisensi Kirimdev',
      !coreWithoutWhatsApp && !meta && 'pesan Meta',
      !other && 'biaya rutin lainnya',
      !onboarding && 'onboarding / biaya sekali bayar',
    ].filter(Boolean);
    const note = unfilled.length
      ? `Belum diisi: ${unfilled.join(', ')}. Isi jika relevan dengan kebutuhan Anda; komponen ini tidak otomatis wajib. Nilai 0 adalah asumsi perhitungan, bukan biaya gratis.`
      : 'Biaya eksternal menggunakan angka yang Anda masukkan; konfirmasikan dengan quotation aktual.';
    const coreNote = coreWithoutWhatsApp ? 'Core dapat digunakan tanpa koneksi WhatsApp; biaya Kirimdev/Meta hanya relevan jika digunakan. ' : '';
    setText('#estimate-note', `${coreNote}${note} Pajak belum termasuk. Harga add-on CRM merupakan usulan berdasarkan PRD 1 November 2026; kuota dan ketersediaan fitur perlu dikonfirmasi. Tahun berikutnya mengasumsikan tarif dan pemakaian tetap.`);
  };
  ['#estimate-vendor', '#estimate-meta', '#estimate-other', '#estimate-onboarding'].forEach((selector) => {
    $(selector)?.addEventListener('change', () => {
      const input = $(selector);
      input.value = String(getCost(selector));
    });
  });
  $('#estimate-form')?.addEventListener('submit', (event) => event.preventDefault());
  $('#estimate-form')?.addEventListener('input', renderEstimate);
  $('#estimate-form')?.addEventListener('change', renderEstimate);
  $('#estimate-plan')?.addEventListener('change', () => {
    setText('#estimate-recommendation', 'Paket diubah. Gunakan rekomendasi untuk menyesuaikan dengan jumlah user CRM dan nomor WhatsApp Anda.');
  });
  $('#recommend-plan')?.addEventListener('click', (event) => {
    event.preventDefault();
    const users = Number($('#estimate-users')?.value);
    const numbers = Number($('#estimate-numbers')?.value);
    if (![users, numbers].every((count) => Number.isInteger(count) && count >= 1 && count <= 10000)) {
      setText('#estimate-recommendation', 'Isi jumlah user CRM dan nomor WhatsApp dengan bilangan bulat antara 1 dan 10.000. Untuk operasional tanpa CRM, pilih paket Core langsung.');
      return;
    }
    const key = Object.keys(plans).find((name) => users <= plans[name].users && numbers <= plans[name].numbers);
    if (!key) {
      setText('#estimate-recommendation', `Kebutuhan ${users} user CRM dan ${numbers} nomor WhatsApp melebihi batas rencana paket Scale. Konsultasikan paket Enterprise; estimasi saat ini tetap memakai paket yang dipilih.`);
      return;
    }
    const select = $('#estimate-plan');
    if (select) select.value = key;
    renderEstimate();
    setText('#estimate-recommendation', `${plans[key].name} adalah rencana paket terkecil untuk ${users} user CRM dan ${numbers} nomor WhatsApp. Seat inbox Kirimdev dihitung terpisah; fitur, kuota, dan tarif akhir perlu dikonfirmasi.`);
  });
  $$('[data-open-pricing]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const select = $('#estimate-plan');
      const planKey = button.dataset.plan;
      if (select && Object.hasOwn(plans, planKey)) select.value = planKey;
      renderEstimate();
      setText('#estimate-recommendation', 'Masukkan kebutuhan tim Anda untuk melihat rekomendasi rencana paket. Biaya eksternal tetap mengikuti input Anda.');
      openDialog($('#pricing-dialog'), button);
    });
  });
  renderEstimate();

  const faqs = $$('[data-faq]');
  faqs.forEach((faq) => {
    faq.addEventListener('toggle', () => {
      if (!faq.open) return;
      faqs.forEach((other) => {
        if (other !== faq) other.open = false;
      });
    });
  });

  setText('#current-year', String(new Date().getFullYear()));
  const header = $('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();
