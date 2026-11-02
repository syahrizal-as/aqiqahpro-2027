(() => {
  'use strict';

  const setupContactForm = () => {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const nameInput = form.querySelector('#contact-name');
    const businessInput = form.querySelector('#contact-business');
    const phoneInput = form.querySelector('#contact-whatsapp');
    const interestInput = form.querySelector('#contact-interest');
    const notesInput = form.querySelector('#contact-notes');
    const submitButton = form.querySelector('#contact-submit');
    const copyButton = form.querySelector('#contact-copy');
    const status = document.querySelector('#contact-status');
    const configNote = document.querySelector('#contact-config-note');
    const messageField = document.querySelector('#contact-message');
    const whatsappLinks = [...document.querySelectorAll('a[data-whatsapp-link]')];

    if (!nameInput || !businessInput || !phoneInput || !submitButton) return;

    const setStatus = (message) => {
      if (status) status.textContent = message;
    };
    const cleanText = (value, limit) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, limit);
    const normalizePhone = (value) => {
      const raw = String(value ?? '').trim();
      if (!/^\+?[\d\s()-]+$/.test(raw)) return '';
      let digits = raw.replace(/\D/g, '');
      if (digits.startsWith('08')) digits = `62${digits.slice(1)}`;
      return /^[1-9]\d{7,14}$/.test(digits) ? digits : '';
    };
    const normalizeEmail = (value) => {
      const email = String(value ?? '').trim();
      if (email.length > 254 || email.includes('..')) return '';
      return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i.test(email) ? email : '';
    };
    const getDestination = () => {
      const config = window.AQIQAH_PRO_CONFIG?.contact ?? {};
      const whatsapp = normalizePhone(config.whatsapp);
      if (whatsapp) return { type: 'whatsapp', value: whatsapp };
      const email = normalizeEmail(config.email);
      return email ? { type: 'email', value: email } : null;
    };
    const refreshDestination = () => {
      const destination = getDestination();
      const whatsapp = normalizePhone(window.AQIQAH_PRO_CONFIG?.contact?.whatsapp);
      whatsappLinks.forEach((link) => {
        link.hidden = !whatsapp;
        if (whatsapp) {
          const message = 'Halo tim AqiqahPro, saya ingin menjadwalkan demo Core untuk bisnis aqiqah saya.';
          link.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        } else {
          link.removeAttribute('href');
        }
      });
      submitButton.disabled = !destination;
      submitButton.textContent = destination?.type === 'whatsapp'
        ? 'Lanjut ke WhatsApp'
        : destination?.type === 'email'
          ? 'Buka email permintaan demo'
          : 'Kirim permintaan demo';
      if (configNote) {
        configNote.hidden = Boolean(destination);
        configNote.textContent = 'Kontak demo sedang disiapkan. Anda tetap dapat menyalin ringkasan kebutuhan di bawah.';
      }
    };
    const validateForm = () => {
      nameInput.setCustomValidity(cleanText(nameInput.value, 80) ? '' : 'Isi nama Anda.');
      businessInput.setCustomValidity(cleanText(businessInput.value, 120) ? '' : 'Isi nama bisnis aqiqah Anda.');
      phoneInput.setCustomValidity(normalizePhone(phoneInput.value)
        ? ''
        : 'Isi nomor WhatsApp yang valid, 8–15 digit. Contoh format: 08… atau +62….');
      return form.reportValidity();
    };
    const interestLabels = {
      core: 'AqiqahPro Core',
      starter: 'Core + CRM Starter',
      growth: 'Core + CRM Growth',
      scale: 'Core + CRM Scale',
      unsure: 'Belum tahu, ingin konsultasi',
    };
    const buildMessage = () => {
      const notes = cleanText(notesInput?.value, 1200);
      return [
        'Halo tim AqiqahPro, saya ingin menjadwalkan demo.',
        '',
        `Nama: ${cleanText(nameInput.value, 80)}`,
        `Bisnis: ${cleanText(businessInput.value, 120)}`,
        `WhatsApp: +${normalizePhone(phoneInput.value)}`,
        `Minat paket: ${interestLabels[interestInput?.value] || interestLabels.unsure}`,
        ...(notes ? [`Kebutuhan: ${notes}`] : []),
      ].join('\n');
    };
    const revealMessage = (message) => {
      if (!messageField) {
        setStatus(`Salin permintaan demo berikut: ${message}`);
        return;
      }
      messageField.value = message;
      messageField.readOnly = true;
      messageField.hidden = false;
      messageField.focus();
      messageField.select();
      setStatus('Salin teks permintaan demo yang sudah dipilih di bawah. Belum ada data yang dikirim.');
    };

    form.addEventListener('input', (event) => {
      if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
      setStatus('');
      if (messageField) messageField.hidden = true;
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm()) return;

      const destination = getDestination();
      if (!destination) {
        refreshDestination();
        setStatus('Kontak demo sedang disiapkan. Salin ringkasan kebutuhan Anda terlebih dahulu. Belum ada data yang dikirim.');
        return;
      }

      const message = buildMessage();
      const link = document.createElement('a');
      if (destination.type === 'whatsapp') {
        link.href = `https://wa.me/${destination.value}?text=${encodeURIComponent(message)}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.href = `mailto:${encodeURIComponent(destination.value)}?subject=${encodeURIComponent('Permintaan demo AqiqahPro')}&body=${encodeURIComponent(message)}`;
      }
      form.append(link);
      link.click();
      link.remove();
      setStatus(destination.type === 'whatsapp'
        ? 'Draf WhatsApp disiapkan di tab baru. Kirim pesan di WhatsApp untuk meneruskan permintaan demo Anda.'
        : 'Draf permintaan demo disiapkan di aplikasi email Anda. Kirim email tersebut untuk meneruskan permintaan demo.');
    });
    copyButton?.addEventListener('click', async () => {
      if (!validateForm()) return;
      const message = buildMessage();
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(message);
        if (messageField) messageField.hidden = true;
        setStatus('Ringkasan kebutuhan disalin. Belum ada data yang dikirim.');
      } catch {
        revealMessage(message);
      }
    });

    window.addEventListener('aqiqahpro:config-changed', refreshDestination);
    refreshDestination();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactForm, { once: true });
  } else {
    setupContactForm();
  }
})();
