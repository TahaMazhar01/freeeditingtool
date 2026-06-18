<div align="center">
        <img src="src/assets/logo.png" width="220" />
        <br /><br />
        <h1>FreeEditingTools</h1>
        <p><strong>A Comprehensive Suite of High-Performance Web Utilities for Developers, Content Creators & Digital Professionals</strong></p>
        <br />
        <a href="https://github.com/TahaMazhar01/freeeditingtools/releases">
          <img src="https://img.shields.io/badge/status-production--ready-success?style=for-the-badge" />
        </a>
        <a href="https://github.com/TahaMazhar01/freeeditingtools">
          <img src="https://img.shields.io/github/stars/TahaMazhar01/freeeditingtools?style=for-the-badge&logo=github" />
        </a>
        <a href="https://github.com/TahaMazhar01/freeeditingtools/blob/main/LICENSE">
          <img src="https://img.shields.io/github/license/TahaMazhar01/freeeditingtools?style=for-the-badge" />
        </a>
        <br /><br />
</div>

**FreeEditingTools** is a premium, open-source web utility platform designed for professionals who demand speed, privacy, and reliability. Whether you're manipulating images, processing PDFs, converting data formats, or working with multimedia content, FreeEditingTools provides an elegant, lightning-fast solution.

All files are processed entirely on the client side—nothing ever leaves your device. Pure privacy. Pure performance.

Built with **React**, **TypeScript**, **Tailwind CSS**, and optimized for instant, client-side execution. Deploy seamlessly on **Vercel** or self-host with ease.

![img.png](docs-images/img.png)

## Table of Contents

- [Features](#features)
- [Deployment & Installation](#-deployment--installation)
- [Development & Technology Stack](#️-development--technology-stack)
- [Contributing](#-contributing)
- [Support & Contact](#-support--contact)
- [License](#-license)

## Features

A comprehensive collection of professionally-designed tools for modern digital workflows:

### 🖼️ **Multimedia Tools**

- Image Resizer & Scaler
- Image Converter (PNG, JPG, WebP, AVIF)
- Advanced Image Editor
- Video Trimmer & Compressor
- Video Reverser
- Audio Processing Tools
- And more multimedia utilities...

### 📄 **PDF Processing**

- PDF Splitter & Merger
- PDF Editor with Annotations
- PDF Converter
- Batch PDF Operations
- And more PDF tools...

### 📝 **Text & Data Utilities**

- Case Converters (camelCase, snake_case, PascalCase, etc.)
- Text Formatters & Minifiers
- List Shuffler & Sorter
- String Manipulation Tools
- JSON, CSV & XML Processors
- And more data transformation tools...

### ⏰ **Date & Time Tools**

- Date Calculator & Difference Finder
- Time Zone Converter
- Countdown & Timer Utilities
- And more temporal tools...

### 🔢 **Math & Engineering Tools**

- Prime Number Generator
- Electrical Calculations (Ohm's Law)
- Mathematical Converters
- Advanced Calculations
- And more engineering utilities...

### 🔄 **Data & Conversion Tools**

- JSON Validator & Formatter
- CSV Parser & Converter
- XML Processing Tools
- Base64 Encoder/Decoder
- QR Code Generator
- And more conversion utilities...

**Constantly expanding.** New tools and features are added regularly based on community feedback and industry demands.

## 🚀 Deployment & Installation

### Quick Start (Development)

```bash
git clone https://github.com/TahaMazhar01/freeeditingtools.git
cd freeeditingtools
pnpm install
pnpm run dev
```

The application will start on `http://localhost:5173` with hot-reload enabled.

### Production Deployment

FreeEditingTools is optimized for **Vercel** for ultra-fast, global deployment:

```bash
# Deploy directly from GitHub to Vercel
# Visit vercel.com and import this repository
```

**Alternative Hosting:**
- Deploy on Netlify, Firebase Hosting, or any static hosting provider
- Built-in Vite optimization ensures minimal bundle size
- Fully self-contained—no backend required

### Build for Production

```bash
pnpm run build
pnpm run preview
```

## 🛠️ Development & Technology Stack

**FreeEditingTools** is built with modern, production-grade technologies:

- **Frontend Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS for responsive, elegant UI
- **UI Components:** Material-UI (MUI) for professional component library
- **Build Tool:** Vite for lightning-fast development & optimized production builds
- **Icons:** Iconify for a comprehensive icon library
- **Internationalization:** i18n for multi-language support
- **Testing:** Playwright for robust e2e testing

### Project Setup

```bash
git clone https://github.com/TahaMazhar01/freeeditingtools.git
cd freeeditingtools
pnpm install
pnpm run dev
```

### Creating a New Tool

Use our CLI scaffolding script to generate a new tool template:

```bash
pnpm run script:create:tool my-tool-name folder-name
# Example: pnpm run script:create:tool compress image/png
```

For nested directories on Windows, use backslashes:
```bash
pnpm run script:create:tool my-tool-name folder1\folder2
```

### Testing

```bash
# Unit & Integration Tests
pnpm run test

# End-to-End Tests
pnpm run test:e2e
```

### Internationalization (i18n)

Translations are managed via [Locize](https://www.locize.com) for seamless multi-language support.
Translation files are located in `public/locales/`. Developers can edit directly; translators use the Locize platform.

## 🤝 Contributing

We actively welcome contributions from the community! Whether you're a developer, designer, translator, or passionate user, there are many ways to help:

**Ways to Contribute:**
- 🐛 **Report Bugs** – Found an issue? Open a GitHub issue with details
- ✨ **Suggest Features** – Have an idea? Share it in GitHub issues or discussions
- 🌍 **Translate** – Help localize FreeEditingTools to more languages
- 📚 **Improve Docs** – Enhance documentation and guides
- 💻 **Submit Code** – Create pull requests for bug fixes or features
- 🎨 **Design & UX** – Suggest UI/UX improvements

**Getting Started:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

All contributions are valued and reviewed promptly!

## 📫 Support & Contact

Have questions, feedback, or need support? Reach out:

- **Issues & Bugs:** [GitHub Issues](https://github.com/TahaMazhar01/freeeditingtools/issues)
- **Discussions:** [GitHub Discussions](https://github.com/TahaMazhar01/freeeditingtools/discussions)
- **Feature Requests:** Share your ideas in GitHub Issues or Discussions

## 📄 License

This project is licensed under the **MIT License**—permitting free use, modification, and distribution in personal and commercial projects.

See the [LICENSE](LICENSE) file for complete details.

---

<div align="center">
  <p><strong>Built with ❤️ as a free, open-source utility platform for everyone</strong></p>
  <p>If you find FreeEditingTools useful, please consider starring the repository to show your support!</p>
</div>