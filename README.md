<div align="center">
  <br />
  <h1> Abu Dujanah Siregar – Portfolio </h1>
  <p>
    <strong>A Premium, Bilingual, and Highly Responsive Next.js Portfolio</strong>
  </p>
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <h1>Abu Dujanah Siregar — Portfolio</h1>
  <p>
    <strong>A high-performance personal portfolio built with Next.js App Router and Framer Motion.</strong>
  </p>
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  </p>
</div>

<br />

> **Note:** This document provides an English overview followed by the Indonesian translation.
> Dokumen ini memuat deskripsi dalam bahasa Inggris dan terjemahan bahasa Indonesia di bagian bawah.

## Overview

This repository contains the source code for a dark-themed, highly interactive software engineering portfolio. The design relies on a "Deep Ocean Editorial" aesthetic, prioritizing high-contrast typography, structural symmetry, and seamless layout transitions. 

The application is fully responsive down to a 320px viewport, ensuring accessibility and readability across all mobile and desktop environments.

## Architecture & Tech Stack

- **Core Framework**: Next.js (App Router, Server-Side Rendering)
- **Language**: TypeScript
- **Styling**: Tailwind CSS combined with Vanilla CSS for custom backdrop filters and masks
- **Animations**: Framer Motion for layout transitions, reveal effects, and a custom magnetic cursor
- **Icons**: Lucide React

## Key Features

1. **State-Driven Internationalization (i18n)**: Implements a custom React Context to switch the entire application's language state instantly without requiring a page reload.
2. **Fluid Typography**: Uses CSS `clamp()` functions and dynamic viewports to scale fonts proportionally, preventing layout shifts on ultra-narrow devices.
3. **Glassmorphism Interfaces**: Utilizes `backdrop-filter` and semi-transparent RGBA backgrounds to create depth without relying on heavy image assets.
4. **Optimized Build**: Configured for static export and edge caching, resulting in zero hydration errors during the Vercel production build process.

## Local Development

To run the project locally, clone the repository and install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser. The application supports Hot Module Replacement (HMR).

## Production Deployment

This project is strictly configured for deployment on the Vercel platform. The build command compiles the TypeScript files and generates optimized static pages.

```bash
npm run build
```

---

<br />

<div align="center">
  <h2>Versi Bahasa Indonesia</h2>
</div>

## Ringkasan Proyek

Repositori ini berisi kode sumber untuk portofolio *software engineering* berdesain gelap dan interaktif. Antarmuka ini mengusung estetika "Deep Ocean Editorial", yang menonjolkan tipografi kontras tinggi, simetri struktural, dan transisi tata letak yang mulus.

Aplikasi ini sepenuhnya responsif hingga ukuran layar 320px, memastikan aksesibilitas dan keterbacaan di seluruh lingkungan seluler maupun desktop.

## Arsitektur & Teknologi

- **Kerangka Kerja Utama**: Next.js (App Router, Server-Side Rendering)
- **Bahasa Pemrograman**: TypeScript
- **Styling**: Tailwind CSS dikombinasikan dengan Vanilla CSS
- **Animasi**: Framer Motion untuk transisi halaman dan kursor interaktif
- **Ikon**: Lucide React

## Fitur Utama

1. **Internasionalisasi (i18n)**: Menggunakan React Context khusus untuk mengubah bahasa seluruh aplikasi secara instan tanpa memuat ulang halaman.
2. **Tipografi Dinamis**: Menggunakan fungsi CSS `clamp()` untuk menyesuaikan ukuran huruf secara proporsional dan mencegah kerusakan tata letak pada perangkat sempit.
3. **Antarmuka Kaca (Glassmorphism)**: Memanfaatkan `backdrop-filter` dan latar belakang RGBA semi-transparan untuk menciptakan dimensi kedalaman visual.
4. **Kompilasi Optimal**: Dikonfigurasi secara spesifik untuk melewati proses *build* produksi Vercel tanpa satu pun peringatan hidrasi atau galat TypeScript.

## Panduan Instalasi Lokal

Untuk menjalankan proyek ini di komputer Anda, silakan unduh repositori ini dan instal seluruh dependensinya:

```bash
npm install
```

Jalankan server lokal:

```bash
npm run dev
```

Buka `http://localhost:3000` di peramban Anda. Aplikasi akan memperbarui tampilan secara otomatis setiap kali Anda menyimpan perubahan kode.

## Panduan *Deploy*

Proyek ini telah dikalibrasi untuk proses *deploy* di *platform* Vercel. Perintah kompilasi akan memproses kode TypeScript dan menghasilkan halaman statis yang teroptimasi.

```bash
npm run build
```

## Lisensi

Dirancang dan dikembangkan oleh [Abu Dujanah Siregar](https://github.com/DujanahSr).
