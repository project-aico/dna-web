<p align="center">
    <img alt="favicon" src="./src/app/icon.svg"
        width="138" />
</p>

# DNA-web

<p align="right">
    <a href="./README.md">English</a> | <b>简体中文</b>
</p>

[![GitHub deployments](https://img.shields.io/github/deployments/project-aico/dna-web/Production)](https://github.com/project-aico/dna-web/deployments/Production)
[![GitHub last commit](https://img.shields.io/github/last-commit/project-aico/dna-web)](https://github.com/project-aico/dna-web/commits/main/)
[![GitHub License](https://img.shields.io/github/license/project-aico/dna-web)](https://github.com/project-aico/dna-web/blob/main/LICENSE)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/project-aico/dna-web/total)](https://github.com/project-aico/dna-web/releases)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/dnadsl)](https://dnadsl.vercel.app/)

这是一个基于Next.js构建的现代Web应用程序，允许您将UTF-8文本编码为DNA序列，并将DNA序列解码回文本。
该工具演示了数字二进制数据与生物DNA碱基对（A、C、G、T）之间的转换。

## 功能特性

- **文本编码**：将任意UTF-8文本转换为DNA序列。

  - 生成二进制表示。
  - 生成DNA正链 (`A=00`, `C=01`, `G=10`, `T=11`)。
  - 生成DNA负链 (互补链)。

- **DNA解码**：将DNA序列转换回可读文本。

  - 自动清理输入，确保仅处理有效碱基 (A, C, G, T)。
  - 显示二进制表示。
  - 还原原始UTF-8文本。
  - 显示互补链。

- **现代用户界面**：使用Shadcn UI和Tailwind CSS构建。

  - 默认跟随系统主题，并支持一键切换深色/浅色主题。
  - 支持English、简体中文、繁体中文和日本语。
  - 所有结果均支持一键复制到剪贴板。
  - 响应式设计。

- **渐进式 Web 应用（PWA）**：支持安装与离线后备页面。

## 技术栈

- **框架**：[Next.js 16](https://nextjs.org/) 与 [React 19](https://react.dev/)
- **语言**：[TypeScript](https://www.typescriptlang.org/)（严格模式）
- **样式**：[Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**：[Shadcn UI](https://ui.shadcn.com/)
- **图标**：[Lucide React](https://lucide.dev/)
- **PWA**：[Serwist](https://serwist.pages.dev/)
- **格式化与代码检查**：[Biome](https://biomejs.dev/)

## 快速开始

按照以下步骤在本地运行项目。

### 前置要求

- Node.js（推荐LTS版本）
- pnpm（或npm/yarn）

### 安装

1. 克隆仓库：

   ```bash
   git clone https://github.com/project-aico/dna-web.git
   cd dna-web
   ```

2. 安装依赖：

   ```bash
   pnpm install
   # 或
   npm install
   ```

3. 运行开发服务器：

   ```bash
   pnpm dev
   # 或
   npm run dev
   ```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 脚本

- `pnpm dev`：在开发模式下运行应用。
- `pnpm build`：构建生产版本的应用。
- `pnpm start`：启动生产服务器。
- `pnpm format`：使用 Biome 格式化所有支持的文件。
- `pnpm lint`：运行 Biome 检查。
- `pnpm typecheck`：运行 TypeScript 类型检查（不输出文件）。
- `pnpm test`：运行单元测试。

## 许可证 (License)

本项目采用 [GNU General Public License v3.0](./LICENSE) 许可证。
