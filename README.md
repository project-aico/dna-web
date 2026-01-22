<p align="center">
    <img alt="favicon" src="./src/app/icon.svg"
        width="138" />
</p>

# DNA-web

<p align="right">
    <b>English</b> | <a href="./README_zh.md">简体中文</a>
</p>

[![GitHub deployments](https://img.shields.io/github/deployments/project-aico/dna-web/Production)](https://github.com/project-aico/dna-web/deployments/Production)
[![GitHub last commit](https://img.shields.io/github/last-commit/project-aico/dna-web)](https://github.com/project-aico/dna-web/commits/main/)
[![GitHub License](https://img.shields.io/github/license/project-aico/dna-web)](https://github.com/project-aico/dna-web/blob/main/LICENSE)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/project-aico/dna-web/total)](https://github.com/project-aico/dna-web/releases)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/dnadsl)](https://dnadsl.vercel.app/)

A modern web application built with Next.js that allows you to encode UTF-8 text into DNA sequences
and decode DNA sequences back into text.
This tool demonstrates the conversion between digital binary data and biological DNA base pairs (A, C, G, T).

## Features

- **Text Encoding**: Convert any UTF-8 text into a DNA sequence.

  - Generates Binary representation.
  - Generates DNA Positive Strand (`A=00`, `C=01`, `G=10`, `T=11`).
  - Generates DNA Negative Strand (Complementary).

- **DNA Decoding**: Convert DNA sequences back into readable text.

  - Cleans input to ensure only valid bases (A, C, G, T) are processed.
  - Displays Binary representation.
  - Recovers original UTF-8 text.
  - Shows Complementary Strand.

- **Modern UI**: Built with Shadcn UI and Tailwind CSS.

  - Dark/Light/System theme support.
  - One-click copy to clipboard for all results.
  - Responsive design.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (LTS version recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/project-aico/dna-web.git
   cd dna-web
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs the linter.

## License

This project is licensed under the [GNU General Public License v3.0](./LICENSE).
