// Public website settings. Do not put credentials or API keys in this file.
window.AQIQAH_PRO_CONFIG = {
  contact: {
    // Fill with the confirmed business WhatsApp number (e.g. international format).
    whatsapp: '6289649532960',
    // Optional fallback when no WhatsApp destination is configured.
    email: '',
  },
  core: {
    // Update each status only from the corresponding AqiqahPro UAT result.
    // Accepted values: verification, available, beta, coming-soon, excluded.
    features: {
      warehouse: { status: 'verification' },
      rph: { status: 'verification' },
      livestock: { status: 'verification' },
      accounting: { status: 'verification' },
    },
  },
};
