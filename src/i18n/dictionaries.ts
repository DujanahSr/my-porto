export const dictionaries = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      certificates: "Sertifikat",
      contact: "Kontak"
    },
    home: {
      hero: {
        role: "Software Engineer",
        scroll: "GULIR"
      },
      statement: {
        label: "01 — Siapa Saya",
        title1: "Membangun",
        title2: "Sistem",
        title3: "Bermakna.",
        stats: [
          { num: "6+", label: "Proyek Dibuat" },
          { num: "3", label: "Tahun Pelatihan" },
          { num: "PUB", label: "Penerima Beasiswa" }
        ]
      },
      works: {
        label: "02 — Karya Terpilih",
        title: "Proyek Terbaru",
        allWorks: "Semua Karya"
      },
      about: {
        label: "03 — Tentang",
        title1: "Kedisiplinan",
        title2: "dari Kedalaman.",
        cta: "Bangun Sesuatu yang Tak Terpatahkan.",
        ctaDesc: "Saat ini Tersedia untuk Peluang Baru"
      }
    },
    hero: {
      greeting: "Halo, Saya",
      title: "Fullstack Developer — Ahli Java Spring Boot & React.js",
      description: "Membangun sistem backend yang kuat dan antarmuka pengguna yang dinamis dengan teknologi modern. Bersemangat tentang kode yang bersih dan arsitektur yang skalabel.",
      contactBtn: "Hubungi Saya",
      projectsBtn: "Lihat Proyek",
      cvBtn: "Unduh CV",
      viewProjects: "Lihat Proyek",
      contact: "Hubungi Saya"
    },
    about: {
      header: { ghost: "TENTANG", label: "01 — Tentang", title1: "Sosok", title2: "Di Balik Kode" },
      labels: { journey: "02 — Perjalanan", tech: "03 — Tech Stack", timeline: "04 — Riwayat", values: "05 — Nilai Profesional" },
      title: "Tentang Saya",
      heroStatement: "Software Engineer yang berfokus pada arsitektur sistem backend yang kuat dan antarmuka pengguna interaktif yang memukau.",
      quickBadges: ["S1 Teknik Industri", "Penerima Beasiswa PUB", "Full-Stack Developer"],
      journeyTitle: "Perjalanan Saya",
      journeyText: [
        "Sebagai lulusan Pesantren KH Ahmad Dahlan Sipirok yang kini menempuh program akselerasi S1 Teknik Industri di Universitas Nasional PASIM, saya memiliki pondasi kedisiplinan yang kuat sekaligus pola pikir rekayasa sistem yang terstruktur.",
        "Sebagai penerima Beasiswa Pemberdayaan Umat Berkelanjutan (PUB), saya telah menjalani pelatihan intensif yang membentuk keahlian teknis saya secara mendalam di bidang Java, React, manajemen basis data, dan arsitektur REST API.",
        "Berbekal pengalaman dalam berbagai proyek kolaboratif berskala penuh, fokus utama saya adalah membangun aplikasi dengan antarmuka yang intuitif dan integrasi API yang sangat efisien. Saya adalah individu yang cepat belajar, kolaboratif, dan memiliki rasa tanggung jawab tinggi untuk memastikan setiap proyek diselesaikan dengan keandalan dan kualitas terbaik."
      ],
      techEcosystemTitle: "Ekosistem Teknologi",
      techCategories: [
        { name: "Frontend & UI", icon: "frontend", skills: ["React 19", "Tailwind CSS", "HTML5/CSS3", "Framer Motion", "Vanilla JS"] },
        { name: "Backend & API", icon: "backend", skills: ["Java 21", "Spring Boot 3", "RESTful API", "C Language", "JWT Auth"] },
        { name: "Database & ORM", icon: "database", skills: ["MySQL", "PostgreSQL", "Spring Data JPA", "Hibernate"] },
        { name: "Tools & Deployment", icon: "tools", skills: ["Git/GitHub", "Vercel", "Postman", "Cloudinary", "Midtrans"] }
      ],
      timelineTitle: "Riwayat & Pendidikan",
      timeline: [
        { year: "2025", role: "Instruktur Java Fundamental", org: "Beasiswa PUB", desc: "Membimbing dan mengajar konsep Object-Oriented Programming (OOP) serta dasar backend Java kepada mahasiswa." },
        { year: "2024", role: "Full-Stack Trainee", org: "Beasiswa PUB", desc: "Membangun berbagai sistem fungsional, mulai dari program CLI interaktif hingga aplikasi web e-commerce berskala penuh." },
        { year: "2023 - 2026", role: "S1 Teknik Industri", org: "Universitas Nasional PASIM Bandung", desc: "Menempuh program pendidikan akselerasi 3 tahun dengan beasiswa penuh." }
      ],
      valuesTitle: "Nilai Profesional",
      values: [
        { title: "Fast Learner", icon: "zap", desc: "Mampu beradaptasi dengan cepat terhadap teknologi baru, dari manipulasi DOM murni hingga framework kompleks seperti Spring Boot." },
        { title: "Team Player", icon: "users", desc: "Berpengalaman membangun proyek sistem kolaboratif dan terbiasa memimpin sesi pelatihan teknis." },
        { title: "Detail-Oriented", icon: "target", desc: "Sangat memperhatikan arsitektur yang aman (anti XSS/SQLi), clean code, dan desain antarmuka yang sempurna (pixel-perfect)." }
      ],
      ctaTitle: "Mari Berkolaborasi!",
      ctaDesc: "Saya selalu terbuka untuk peluang baru, diskusi teknis, atau sekadar berbincang tentang teknologi inovatif.",
      cvBtn: "Unduh Resume (PDF)"
    },
    projects: {
      header: { ghost: "KARYA", label: "Karya Terpilih", title1: "Proyek", title2: "& Portofolio" },
      title: "Proyek",
      description: "Kumpulan karya saya yang menampilkan pengembangan full-stack, sistem backend, dan aplikasi frontend.",
      filterAll: "Semua",
      filterFullstack: "Full-Stack",
      filterBackend: "Backend",
      featured: "Unggulan",
      code: "Kode",
      demo: "Demo",
      items: [
        {
          title: "Aplikasi Manajemen Pegadaian (Premium CLI)",
          slug: "pegadaian-cli",
          longDescription: "Sistem informasi Pegadaian berbasis antarmuka teks (CLI) yang dikembangkan eksklusif menggunakan bahasa C murni. Proyek ini mendemonstrasikan pemahaman mendalam tentang manajemen memori, manipulasi file, dan algoritma dasar tanpa bergantung pada library modern.",
          features: ["Interactive UI with gotoxy", "File-based CRUD", "Gold Pawn Calculator", "High-level Input Validation"],
          description: "Sistem informasi Pegadaian berbasis antarmuka teks (CLI) yang dikembangkan eksklusif menggunakan bahasa C murni. Mendemonstrasikan manipulasi kontrol layar interaktif (gotoxy), file-based CRUD database, kalkulator gadai emas, dan algoritma validasi input tingkat tinggi.",
          tags: ["C", "CLI", "File Handling", "Algorithm"],
          githubUrl: "https://github.com/DujanahSr/pegadaian-cli-c",
          demoUrl: "",
          imageUrl: "/bahasaC.png" 
        },
        {
          title: "My-Qur'an Web Application (Vanilla JS)",
          slug: "my-quran",
          longDescription: "Aplikasi edukasi Islami interaktif untuk membaca Al-Qur'an dan Doa Harian. Dibangun sepenuhnya dari awal tanpa framework JS untuk memastikan performa maksimal dan mengasah fundamental DOM manipulation.",
          features: ["REST API Integration", "Smart Bookmark (LocalStorage)", "Custom Modal", "XSS Prevention"],
          description: "Aplikasi edukasi Islami interaktif untuk membaca Al-Qur'an dan Doa Harian. Dibangun dengan 100% Vanilla HTML, CSS, dan JS. Dilengkapi fitur integrasi REST API, Smart Bookmark (LocalStorage), Custom Modal, dan manipulasi DOM tingkat lanjut untuk pencegahan XSS.",
          tags: ["HTML5", "CSS3", "Vanilla JS", "REST API", "DOM"],
          githubUrl: "https://github.com/DujanahSr/projek-html",
          demoUrl: "https://projek-html-lime.vercel.app/",
          imageUrl: "/html.png" 
        },
        {
          title: "SIMAKA Enterprise - Sistem Manajemen Kehadiran",
          slug: "simaka",
          longDescription: "Sistem internal perusahaan yang dirancang untuk mengelola absensi dan laporan kegiatan karyawan secara efisien. Mengusung konsep desain Brutalist UI yang unik, modern, dan sangat berkarakter.",
          features: ["Brutalist UI Design", "Manajemen Karyawan & Absensi", "Laporan Kegiatan Harian", "Role-based Access (Admin/User)"],
          description: "Sistem Manajemen Kehadiran dan Aktivitas (Enterprise Grade) dengan desain Brutalist UI. Dibangun menggunakan Java 21, Spring Boot 3, dan Tailwind CSS. Menawarkan pengalaman pengguna yang responsif dengan fitur portal Admin (HRD) dan portal Karyawan.",
          tags: ["Java 21", "Spring Boot", "MySQL", "Tailwind CSS", "Thymeleaf"],
          githubUrl: "https://github.com/DujanahSr/pr.git",
          demoUrl: "",
          imageUrl: "/simaka.png"
        },
        {
          title: "Eventease - Platform Ticketing & Manajemen Acara",
          slug: "eventease",
          longDescription: "Sistem manajemen acara skala menengah dengan arsitektur Monolithic Spring Boot. Membantu penyelenggara event mengelola penjualan tiket secara real-time dan aman.",
          features: ["Midtrans Payment Gateway", "Automated QR E-Ticket (OpenPDF)", "Cloudinary Media Storage", "Role-based Access Control"],
          description: "Sistem manajemen acara dan penjualan tiket berbasis web dengan fitur autentikasi multi-peran. Dibangun menggunakan Java 21 dan Spring Boot 3. Dilengkapi integrasi Payment Gateway (Midtrans), pembuatan E-Ticket otomatis ber-QR code (OpenPDF & ZXing), penyimpanan media Cloudinary, dan notifikasi email.",
          tags: ["Java", "Spring Boot", "MySQL", "Midtrans", "Thymeleaf"],
          githubUrl: "https://github.com/DujanahSr/eventease",
          demoUrl: "",
          imageUrl: "/javaFundamental.png"
        },
        {
          title: "Project Task Management System",
          slug: "task-management",
          longDescription: "Sistem kolaboratif untuk melacak tugas dalam sebuah tim, dibangun sebagai proyek akhir yang membutuhkan autentikasi ketat dan pelaporan otomatis.",
          features: ["Email & OTP Verification", "Pagination & Filtering", "File Uploads", "Excel & PDF Auto-export"],
          description: "Sistem manajemen tugas kolaboratif (tim 3 orang) untuk admin dan karyawan. Dilengkapi autentikasi tingkat lanjut (Verifikasi Email & OTP), manajemen tugas dengan pagination dan filter, unggah berkas, serta *export* laporan rekapitulasi otomatis ke format Excel dan PDF.",
          tags: ["Java", "Spring Boot", "OTP Auth", "Excel/PDF Export", "Teamwork"],
          githubUrl: "https://github.com/DujanahSr/Project-Uas-Java-L",
          demoUrl: "",
          imageUrl: "/javaLanjutan.png"
        },
        {
          title: "FlyBook - Aplikasi Booking Tiket Pesawat",
          slug: "flybook",
          longDescription: "Simulasi aplikasi pemesanan tiket pesawat yang menawarkan UI/UX modern. Memisahkan *dashboard* admin yang kompleks dengan antarmuka pelanggan yang ramah pengguna.",
          features: ["Modern UI/UX", "Admin Dashboard", "Context API State Management", "Flight Analytics"],
          description: "Aplikasi web pemesanan tiket pesawat modern yang dibangun dengan React 18 dan Tailwind CSS. Menawarkan pengalaman booking lengkap dengan manajemen riwayat pesanan (User) serta Dashboard komprehensif untuk mengelola penerbangan, status pesanan, dan analitik pendapatan (Admin).",
          tags: ["React", "Tailwind CSS", "Vite", "Context API", "Local Storage"],
          githubUrl: "https://github.com/DujanahSr/uas-react-final",
          demoUrl: "https://uas-react-final.vercel.app/",
          imageUrl: "/reactFundamental.png"
        },
        {
          title: "RegarSport - Fullstack E-Commerce",
          slug: "regarsport",
          longDescription: "Aplikasi e-commerce lengkap yang menangani seluruh alur belanja dari pemilihan produk hingga pembayaran. Mengimplementasikan standar keamanan industri dengan JWT pada httpOnly cookie.",
          features: ["Secure JWT Auth", "Shopping Cart & Wishlist", "Product Rating & Reviews", "Midtrans Snap Integration"],
          description: "Aplikasi e-commerce perlengkapan olahraga full-stack terintegrasi. Frontend dibangun dengan React 19, Vite, dan Tailwind CSS. Dilengkapi fitur autentikasi JWT (httpOnly cookie), keranjang belanja, wishlist, rating & ulasan produk, serta integrasi Payment Gateway Midtrans Snap.",
          tags: ["React 19", "Tailwind CSS", "Midtrans", "JWT", "Supabase", "PostgreSQL"],
          githubUrl: "https://github.com/DujanahSr/regarsport-frontend",
          githubUrl2: "https://github.com/DujanahSr/regarsport-backend",
          demoUrl: "https://regarsport-frontend.vercel.app/",
          imageUrl: "/reactLanjutan.png"
        }
      ]
    },
    certificates: {
      header: { ghost: "SERTIFIKAT", label: "Kredensial" },
      fallback: { certTitle: "Sertifikat Penghargaan", score: "Skor" },
      closeBtn: "Tutup",
      title: "Sertifikat",
      description: "Sertifikasi profesional dan pencapaian pelatihan sepanjang perjalanan belajar saya.",
      filterLabel: "Filter berdasarkan jenis:",
      filterAll: "Semua",
      filterTraining: "Pelatihan",
      filterBootcamp: "Bootcamp",
      filterOther: "Lainnya",
      badgeTraining: "Pelatihan",
      notAvailable: "Sertifikat belum tersedia",
      viewCertificate: "Lihat Sertifikat",
      items: [
        {
          title: "Logika Algoritma (Bahasa C)",
          issuer: "Beasiswa PUB",
          year: "2024",
          description: "Pelatihan fundamental pemrograman dan algoritma dasar menggunakan C.",
          fileUrl: "bahasaC.png"
        },
        {
          title: "Struktur Data C Lanjutan",
          issuer: "Beasiswa PUB",
          year: "2024",
          description: "Pelatihan struktur data C lanjutan.",
          fileUrl: "/sertifikat/sertifikat-struktur-data.pdf" 
        },
        {
          title: "DBMS MySQL",
          issuer: "Beasiswa PUB",
          year: "2024",
          description: "Pelatihan fundamental database MySQL.",
          fileUrl: "/sertifikat/sertifikat-dbms.pdf" 
        },
        {
          title: "Pelatihan WEB Dasar",
          issuer: "Beasiswa PUB",
          year: "2024",
          description: "Pelatihan fundamental web dengan HTML, CSS, dan JavaScript.",
          fileUrl: "/sertifikat/sertifikat-pelatihan-web.pdf"
        },
        {
          title: "Git & GitHub",
          issuer: "Beasiswa PUB",
          year: "2024",
          description: "Pelatihan version control dan alur kerja kolaboratif.",
          fileUrl: "/sertifikat/sertifikat-github.pdf"
        },
        {
          title: "Java Fundamental",
          issuer: "Beasiswa PUB",
          year: "2025",
          description: "Pelatihan Object-Oriented Programming (OOP) dan inti Java.",
          fileUrl: "/sertifikat/sertifikat-java-fundamental.pdf"
        },
        {
          title: "Instruktur Java Fundamental",
          issuer: "Beasiswa PUB",
          year: "2025",
          description: "Dipercaya sebagai instruktur pelatihan Java Backend Fundamental.",
          fileUrl: "/sertifikat/sertifikat-instruktur-java-fundamental.pdf"
        },
        {
          title: "Java Lanjutan (Spring Boot)",
          issuer: "Beasiswa PUB",
          year: "2025",
          description: "Pelatihan membangun RESTful API dengan framework Spring Boot.",
          fileUrl: "/sertifikat/sertifikat-java-lanjutan.pdf"
        },
        {
          title: "React Fundamental",
          issuer: "Beasiswa PUB",
          year: "2025",
          description: "Pelatihan pengembangan frontend modern menggunakan library React.",
          fileUrl: "/sertifikat/sertifikat-react-fundamental.pdf"
        },
        {
          title: "React Lanjutan",
          issuer: "Beasiswa PUB",
          year: "2025",
          description: "Pelatihan frontend React tingkat mahir, mencakup integrasi REST API (Express & PostgreSQL), autentikasi JWT, optimasi performa, dan deployment Supabase.",
          fileUrl: "/sertifikat/sertifikat-react-lanjutan.pdf"
        }
      ]
    },
    contact: {
      header: { ghost: "KONTAK", label: "Mari Berdiskusi" },
      successMsg: "✓ Pesan Terkirim — Terima Kasih!",
      availabilityBadge: "Saat ini Tersedia untuk Peluang Baru",
      labels: { email: "Email", location: "Lokasi", github: "GitHub", linkedin: "LinkedIn", phone: "Telepon / WA" },
      title: "Butuh Sistem Kebal Peluru?",
      description: "Tertarik untuk berkolaborasi? Jangan ragu untuk menghubungi saya.",
      infoTitle: "Informasi Kontak",
      location: "Lokasi",
      locationDesc: "Bandung, Indonesia",
      nameLabel: "Nama",
      namePlaceholder: "Nama Anda",
      emailLabel: "Email",
      emailPlaceholder: "Email Anda",
      messageLabel: "Pesan",
      messagePlaceholder: "Pesan Anda...",
      sendBtn: "Kirim Pesan"
    },
    footer: {
      slogan: "Dibuat dengan Presisi. Direkayasa untuk Ketangguhan.",
      rights: "Hak Cipta Dilindungi."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      certificates: "Certificates",
      contact: "Contact"
    },
    home: {
      hero: {
        role: "Software Engineer",
        scroll: "SCROLL"
      },
      statement: {
        label: "01 — Who I Am",
        title1: "I Build",
        title2: "Systems",
        title3: "That Matter.",
        stats: [
          { num: "6+", label: "Projects Built" },
          { num: "3", label: "Years Training" },
          { num: "PUB", label: "Scholar" }
        ]
      },
      works: {
        label: "02 — Selected Works",
        title: "Recent Projects",
        allWorks: "All Works"
      },
      about: {
        label: "03 — About",
        title1: "Discipline",
        title2: "from the Deep.",
        cta: "Build the Unbreakable.",
        ctaDesc: "Currently Available for Opportunities"
      }
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Fullstack Developer — Java Spring Boot & React.js Enthusiast",
      description: "Building robust backend systems and dynamic user interfaces with modern technologies. Passionate about clean code and scalable architecture.",
      contactBtn: "Contact Me",
      projectsBtn: "View Projects",
      cvBtn: "Download CV",
      viewProjects: "View Projects",
      contact: "Contact Me"
    },
    about: {
      header: { ghost: "ABOUT", label: "01 — About", title1: "The Person", title2: "Behind the Code" },
      labels: { journey: "02 — Journey", tech: "03 — Tech Stack", timeline: "04 — Timeline", values: "05 — Values" },
      title: "About Me",
      heroStatement: "Software Engineer focusing on robust backend architectures and stunning interactive user interfaces.",
      quickBadges: ["B.Eng Industrial Engineering", "PUB Scholar", "Full-Stack Developer"],
      journeyTitle: "My Journey",
      journeyText: [
        "As a graduate of the KH Ahmad Dahlan Sipirok Islamic Boarding School, currently pursuing an accelerated B.Eng in Industrial Engineering at the National University of PASIM, I combine strong discipline with a structured systems engineering mindset.",
        "As a recipient of the PUB (Sustainable Community Empowerment) Scholarship, I have undergone intensive training that forged my technical expertise in Java, React, database management, and REST API architecture.",
        "With hands-on experience in full-scale collaborative projects, my primary focus is on building highly intuitive, user-friendly applications and highly efficient API integrations. I am a fast learner, a collaborative team player, and a responsible individual committed to ensuring every project is delivered with reliability and top-tier quality."
      ],
      techEcosystemTitle: "Tech Ecosystem",
      techCategories: [
        { name: "Frontend & UI", icon: "frontend", skills: ["React 19", "Tailwind CSS", "HTML5/CSS3", "Framer Motion", "Vanilla JS"] },
        { name: "Backend & API", icon: "backend", skills: ["Java 21", "Spring Boot 3", "RESTful API", "C Language", "JWT Auth"] },
        { name: "Database & ORM", icon: "database", skills: ["MySQL", "PostgreSQL", "Spring Data JPA", "Hibernate"] },
        { name: "Tools & Deployment", icon: "tools", skills: ["Git/GitHub", "Vercel", "Postman", "Cloudinary", "Midtrans"] }
      ],
      timelineTitle: "Experience & Education",
      timeline: [
        { year: "2025", role: "Java Fundamentals Instructor", org: "PUB Scholarship", desc: "Mentoring and teaching Object-Oriented Programming (OOP) concepts and backend Java fundamentals to students." },
        { year: "2024", role: "Full-Stack Trainee", org: "PUB Scholarship", desc: "Built various functional systems, ranging from interactive CLI programs to full-scale e-commerce web applications." },
        { year: "2023 - 2026", role: "B.Eng in Industrial Engineering", org: "National University of PASIM Bandung", desc: "Pursuing an accelerated 3-year degree program with a full scholarship." }
      ],
      valuesTitle: "Professional Values",
      values: [
        { title: "Fast Learner", icon: "zap", desc: "Able to adapt quickly to new technologies, from pure DOM manipulation to complex frameworks like Spring Boot." },
        { title: "Team Player", icon: "users", desc: "Experienced in building collaborative systems and leading technical training sessions." },
        { title: "Detail-Oriented", icon: "target", desc: "Highly focused on secure architectures (anti XSS/SQLi), clean code, and pixel-perfect interface designs." }
      ],
      ctaTitle: "Let's Collaborate!",
      ctaDesc: "I am always open to new opportunities, technical discussions, or just a chat about innovative technology.",
      cvBtn: "Download Resume (PDF)"
    },
    projects: {
      header: { ghost: "WORKS", label: "Selected Works", title1: "Projects", title2: "& Builds" },
      title: "Projects",
      description: "A collection of my work showcasing full-stack development, backend systems, and frontend applications.",
      filterAll: "All",
      filterFullstack: "Full-Stack",
      filterBackend: "Backend",
      featured: "Featured",
      code: "Code",
      demo: "Demo",
      items: [
        {
          title: "Pawnshop Management App (Premium CLI)",
          slug: "pegadaian-cli",
          longDescription: "A CLI-based Pawnshop information system developed exclusively using pure C. This project demonstrates deep understanding of memory management, file manipulation, and core algorithms without relying on modern libraries.",
          features: ["Interactive UI with gotoxy", "File-based CRUD", "Gold Pawn Calculator", "High-level Input Validation"],
          description: "A CLI-based Pawnshop information system developed exclusively using pure C. Demonstrates interactive screen control manipulation (gotoxy), file-based CRUD database, an interactive gold pawn calculator, and highly secure input validation algorithms.",
          tags: ["C", "CLI", "File Handling", "Algorithm"],
          githubUrl: "https://github.com/DujanahSr/pegadaian-cli-c",
          demoUrl: "",
          imageUrl: "/bahasaC.png"
        },
        {
          title: "My-Qur'an Web Application (Vanilla JS)",
          slug: "my-quran",
          longDescription: "An interactive Islamic educational web app for reading the Quran and daily prayers. Built entirely from scratch without JS frameworks to ensure maximum performance and hone fundamental DOM manipulation skills.",
          features: ["REST API Integration", "Smart Bookmark (LocalStorage)", "Custom Modal", "XSS Prevention"],
          description: "An interactive Islamic educational web app for reading the Quran and daily prayers. Built using 100% Vanilla HTML, CSS, and JS. Features REST API integration, Smart Bookmarks, Custom Modals, and advanced DOM manipulation to prevent XSS attacks.",
          tags: ["HTML5", "CSS3", "Vanilla JS", "REST API", "DOM"],
          githubUrl: "https://github.com/DujanahSr/projek-html",
          demoUrl: "https://projek-html-lime.vercel.app/",
          imageUrl: "/html.png"
        },
        {
          title: "SIMAKA Enterprise - Attendance Management System",
          slug: "simaka",
          longDescription: "An internal company system designed to efficiently manage employee attendance and activity reports. Features a unique, modern, and highly characteristic Brutalist UI design concept.",
          features: ["Brutalist UI Design", "Employee & Attendance Management", "Daily Activity Reports", "Role-based Access (Admin/User)"],
          description: "An Enterprise-Grade Attendance and Activity Management System with a Brutalist UI design. Built using Java 21, Spring Boot 3, and Tailwind CSS. Offers a responsive user experience with dedicated Admin (HR) and Employee portals.",
          tags: ["Java 21", "Spring Boot", "MySQL", "Tailwind CSS", "Thymeleaf"],
          githubUrl: "https://github.com/DujanahSr/pr.git",
          demoUrl: "",
          imageUrl: "/simaka.png"
        },
        {
          title: "Eventease - Ticketing & Event Management Platform",
          slug: "eventease",
          longDescription: "A medium-scale event management system with a Monolithic Spring Boot architecture. Helps event organizers manage ticket sales securely and in real-time.",
          features: ["Midtrans Payment Gateway", "Automated QR E-Ticket (OpenPDF)", "Cloudinary Media Storage", "Role-based Access Control"],
          description: "A web-based event management and ticket sales system featuring multi-role authentication. Built using Java 21 and Spring Boot 3. Integrates Midtrans Payment Gateway, automated QR code E-Ticket generation (OpenPDF & ZXing), Cloudinary media storage, and email notifications.",
          tags: ["Java", "Spring Boot", "MySQL", "Midtrans", "Thymeleaf"],
          githubUrl: "https://github.com/DujanahSr/eventease",
          demoUrl: "",
          imageUrl: "/javaFundamental.png"
        },
        {
          title: "Project Task Management System",
          slug: "task-management",
          longDescription: "A collaborative system for tracking tasks within a team, built as a final project requiring strict authentication and automated reporting.",
          features: ["Email & OTP Verification", "Pagination & Filtering", "File Uploads", "Excel & PDF Auto-export"],
          description: "A collaborative task management system (built by a 3-person team) designed for admins and employees. Features advanced authentication (Email & OTP Verification), task management with pagination and filtering, file uploads, and automated summary report generation in Excel and PDF formats.",
          tags: ["Java", "Spring Boot", "OTP Auth", "Excel/PDF Export", "Teamwork"],
          githubUrl: "https://github.com/DujanahSr/Project-Uas-Java-L",
          demoUrl: "",
          imageUrl: "/javaLanjutan.png"
        },
        {
          title: "FlyBook - Flight Booking Application",
          slug: "flybook",
          longDescription: "A modern flight ticket booking simulation offering a sleek UI/UX. It separates a complex admin dashboard from a user-friendly customer interface.",
          features: ["Modern UI/UX", "Admin Dashboard", "Context API State Management", "Flight Analytics"],
          description: "A modern flight ticket booking web application built with React 18 and Tailwind CSS. Offers a complete booking experience with order history management (User) and a comprehensive Dashboard to manage flights, booking statuses, and revenue analytics (Admin).",
          tags: ["React", "Tailwind CSS", "Vite", "Context API", "Local Storage"],
          githubUrl: "https://github.com/DujanahSr/uas-react-final",
          demoUrl: "https://uas-react-final.vercel.app/",
          imageUrl: "/reactFundamental.png"
        },
        {
          title: "RegarSport - Fullstack E-Commerce",
          slug: "regarsport",
          longDescription: "A comprehensive e-commerce application handling the entire shopping flow from product selection to payment. Implements industry security standards with JWT in httpOnly cookies.",
          features: ["Secure JWT Auth", "Shopping Cart & Wishlist", "Product Rating & Reviews", "Midtrans Snap Integration"],
          description: "An integrated full-stack sports equipment e-commerce application. The frontend is built with React 19, Vite, and Tailwind CSS. Features include JWT authentication (httpOnly cookies), a shopping cart, wishlist, product ratings & reviews, and Midtrans Snap payment gateway integration.",
          tags: ["React 19", "Tailwind CSS", "Midtrans", "JWT", "Supabase", "PostgreSQL"],
          githubUrl: "https://github.com/DujanahSr/regarsport-frontend",
          githubUrl2: "https://github.com/DujanahSr/regarsport-backend",
          demoUrl: "https://regarsport-frontend.vercel.app/",
          imageUrl: "/reactLanjutan.png"
        }
      ]
    },
    certificates: {
      header: { ghost: "CERTS", label: "Credentials" },
      fallback: { certTitle: "Certificate of Appreciation", score: "Score" },
      closeBtn: "Close",
      title: "Certificates",
      description: "Professional certifications and training achievements throughout my learning journey.",
      filterLabel: "Filter by type:",
      filterAll: "All",
      filterTraining: "Training",
      filterBootcamp: "Bootcamp",
      filterOther: "Other",
      badgeTraining: "Training",
      notAvailable: "Certificate not available",
      viewCertificate: "View Certificate",
      items: [
        {
          title: "Algorithm Logic (C Language)",
          issuer: "PUB Scholarship",
          year: "2024",
          description: "Fundamental training in programming and basic algorithms using C.",
          fileUrl: "/sertifikat/sertifikat-logika-algoritma.pdf"
        },
        {
          title: "Advanced C Data Structures",
          issuer: "PUB Scholarship",
          year: "2024",
          description: "Advanced C data structures training.",
          fileUrl: "/sertifikat/sertifikat-struktur-data.pdf"
        },
        {
          title: "DBMS MySQL",
          issuer: "PUB Scholarship",
          year: "2024",
          description: "MySQL database fundamentals training.",
          fileUrl: "/sertifikat/sertifikat-dbms.pdf"
        },
        {
          title: "Basic Web Training",
          issuer: "PUB Scholarship",
          year: "2024",
          description: "Fundamental web training covering HTML, CSS, and JavaScript.",
          fileUrl: "/sertifikat/sertifikat-pelatihan-web.pdf"
        },
        {
          title: "Git & GitHub",
          issuer: "PUB Scholarship",
          year: "2024",
          description: "Training in version control and collaborative workflows.",
          fileUrl: "/sertifikat/sertifikat-github.pdf"
        },
        {
          title: "Java Fundamentals",
          issuer: "PUB Scholarship",
          year: "2025",
          description: "Training in Object-Oriented Programming (OOP) and Java core.",
          fileUrl: "/sertifikat/sertifikat-java-fundamental.pdf"
        },
        {
          title: "Java Fundamentals Instructor",
          issuer: "PUB Scholarship",
          year: "2025",
          description: "Entrusted as an instructor for the Fundamental Java Backend Training.",
          fileUrl: "/sertifikat/sertifikat-instruktur-java-fundamental.pdf"
        },
        {
          title: "Advanced Java (Spring Boot)",
          issuer: "PUB Scholarship",
          year: "2025",
          description: "Training in building RESTful APIs using the Spring Boot framework.",
          fileUrl: "/sertifikat/sertifikat-java-lanjutan.pdf"
        },
        {
          title: "React Fundamentals",
          issuer: "PUB Scholarship",
          year: "2025",
          description: "Training in modern frontend development using the React library.",
          fileUrl: "/sertifikat/sertifikat-react-fundamental.pdf"
        },
        {
          title: "Advanced React",
          issuer: "PUB Scholarship",
          year: "2025",
          description: "Advanced React frontend training, covering REST API integration (Express & PostgreSQL), JWT authentication, performance optimization, and Supabase deployment.",
          fileUrl: "/sertifikat/sertifikat-react-lanjutan.pdf"
        }
      ]
    },
    contact: {
      header: { ghost: "CONTACT", label: "Let's Talk" },
      successMsg: "✓ Message Sent — Thank You!",
      availabilityBadge: "Currently Available for Opportunities",
      labels: { email: "Email", location: "Location", github: "GitHub", linkedin: "LinkedIn", phone: "Phone / WA" },
      title: "Need a Bulletproof System?",
      description: "Interested in collaborating? Don't hesitate to reach out.",
      infoTitle: "Contact Information",
      location: "Location",
      locationDesc: "Bandung, Indonesia",
      nameLabel: "Name",
      namePlaceholder: "Your Name",
      emailLabel: "Email",
      emailPlaceholder: "Your Email",
      messageLabel: "Message",
      messagePlaceholder: "Your Message...",
      sendBtn: "Send Message"
    },
    footer: {
      slogan: "Crafted with Precision. Engineered for Resilience.",
      rights: "All rights reserved."
    }
  }
};

export type Language = 'id' | 'en';
export type Dictionary = typeof dictionaries.id;
