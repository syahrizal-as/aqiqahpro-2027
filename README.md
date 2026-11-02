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

- Tombol demo membuka simulasi perjalanan pesanan dengan tab dan navigasi keyboard.
- Tombol paket membuka kalkulator dengan paket yang dipilih.
- Kalkulator memasukkan Core, add-on CRM, Kirimdev, Meta, usage, dan onboarding. Tahun pertama = 12 × biaya bulanan + onboarding; tahun berikutnya = 12 × biaya bulanan, sebelum pajak.
- Rekomendasi paket mengikuti batas rencana user CRM dan nomor WhatsApp. Kebutuhan di atas Scale diarahkan ke perencanaan Enterprise tanpa membuat harga rekaan.
- Tidak ada formulir yang mengirim data atau layanan backend. Tombol menjelajahi demo dan simulasi secara lokal.

## Konten produk

Konten mengikuti PRD 1 November 2026. Harga Core Rp800.000/bulan; harga dan kuota add-on CRM masih rencana. Status fitur ditandai sebagai pratinjau atau segera hadir; data dashboard dan contoh pelanggan adalah ilustrasi. Biaya vendor dan Meta tidak dinyatakan gratis. Sebelum publikasi komersial, perbarui status setelah UAT dan finalisasi paket.

Font Plus Jakarta Sans dan DM Sans dimuat dari Google Fonts. Bila koneksi tidak tersedia, halaman memakai Arial/sans-serif sebagai fallback; seluruh CSS, ikon, dan JavaScript tetap lokal.
