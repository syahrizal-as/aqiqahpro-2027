# AqiqahPro Landing Page

Landing page berbahasa Indonesia dengan **HTML, JavaScript vanilla, dan Tailwind CSS**. Tanpa framework aplikasi. CSS Tailwind sudah dikompilasi dan disertakan; halaman dapat dibuka langsung melalui `index.html`.

## Preview lokal

```sh
npm install
npm run dev
```

Buka http://127.0.0.1:4173. Node.js hanya dipakai untuk server preview dan kompilasi CSS, bukan untuk menjalankan halaman di hosting.

## Build untuk hosting

```sh
npm run build
```

Upload seluruh isi folder `dist/` ke hosting statis. Semua jalur aset relatif sehingga halaman juga dapat dipasang di subfolder. Saat mengubah class Tailwind atau CSS, jalankan kembali build.

## Struktur

- `index.html`: konten, ilustrasi dashboard berbasis HTML/SVG, dan dialog.
- `css/input.css`: Tailwind dan gaya tampilan komponen.
- `css/styles.css`: CSS hasil kompilasi yang digunakan halaman.
- `js/app.js`: menu mobile, demo lima langkah, kalkulator paket, dan FAQ.
- `assets/favicon.svg`: ikon merek berbasis SVG.

## Interaksi

- CTA “Jadwalkan demo Core” membuka form permintaan demo. Nama, bisnis, nomor WhatsApp, paket, dan kebutuhan disiapkan sebagai draf ke WhatsApp bisnis **089649532960**. Pengunjung mengirim sendiri pesan di WhatsApp; situs tidak menyatakan pesan sudah terkirim.
- Tombol “Eksplorasi Core” membuka empat manfaat Core dan mockup tujuh tahap alur operasional. Tombol ini tidak membuka kalkulator.
- Tombol demo interaktif tetap membuka simulasi perjalanan pelanggan dengan tab dan navigasi keyboard.
- Tombol paket membuka kalkulator dengan paket yang dipilih.
- Kalkulator memasukkan Core, add-on CRM, Kirimdev, Meta, usage, dan onboarding. Tahun pertama = 12 × biaya bulanan + onboarding; tahun berikutnya = 12 × biaya bulanan, sebelum pajak.
- Rekomendasi paket mengikuti batas rencana user CRM dan nomor WhatsApp. Kebutuhan di atas Scale diarahkan ke perencanaan Enterprise tanpa membuat harga rekaan.
- Form menyediakan tombol salin ringkasan dan fallback salin manual. Data form tidak disimpan di server atau local storage. Situs tidak membutuhkan layanan backend.

## Pengaturan publik

`js/site-config.js` menyimpan nomor WhatsApp tujuan dan status **masing-masing** fitur Core. Jangan memasukkan kredensial ke file ini karena isinya publik. Nomor WhatsApp sudah mengikuti konfirmasi pemilik produk. Jika kontak kosong atau tidak valid, pengiriman draf dinonaktifkan dan situs menyediakan salin ringkasan.

Status awal Warehouse, RPH, stok hewan, dan akuntansi adalah `verification`, dengan label “Sudah digunakan di operasional IbrahimGroup — verifikasi/UAT AqiqahPro berlangsung”. Ubah status satu fitur menjadi `available`, `beta`, `coming-soon`, atau `excluded` hanya setelah ada hasil UAT AqiqahPro per role. Status satu modul tidak otomatis mengubah modul lain.

## Konten produk

Konten mengikuti PRD 1 November 2026 dan klarifikasi pemilik produk. Harga Core Rp800.000/bulan; harga dan kuota add-on CRM masih rencana. Core sudah digunakan di operasional IbrahimGroup tetapi belum dinyatakan lulus UAT formal AqiqahPro per role. Label “Segera hadir” saat ini hanya dipakai untuk CRM.

Seluruh mockup diberi label “Ilustrasi tampilan”, dengan referensi `ORD-DEMO-001`, Pelanggan Demo, dan nominal contoh. Mockup tidak diklaim identik dengan production. Tidak ada URL, screenshot, logo pelanggan, atau transaksi production yang digunakan. Screenshot aktual baru dapat ditambahkan setelah tersedia environment demo yang datanya sudah disanitasi dan mendapat persetujuan publikasi. Biaya vendor dan Meta tidak dinyatakan gratis.

Font Plus Jakarta Sans dan DM Sans dimuat dari Google Fonts. Bila koneksi tidak tersedia, halaman memakai Arial/sans-serif sebagai fallback; seluruh CSS, ikon, dan JavaScript tetap lokal.
