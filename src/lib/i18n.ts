export const SUPPORTED_LOCALES = ["en", "zh-CN", "zh-TW", "ja"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

interface Messages {
  appDescription: string;
  appTitle: string;
  binary: string;
  changeLanguage: string;
  cleanDna: string;
  complement: string;
  complementBadge: string;
  copiedDescription: (label: string) => string;
  copiedTitle: string;
  copyFailedDescription: string;
  copyFailedTitle: string;
  copyLabel: (label: string) => string;
  decodeDescription: string;
  decodedText: string;
  decodeTab: string;
  decodeTitle: string;
  dnaNegative: string;
  dnaPositive: string;
  encodeDescription: string;
  encodeTab: string;
  encodeTitle: string;
  inputDnaLabel: string;
  inputDnaPlaceholder: string;
  inputTextLabel: string;
  inputTextPlaceholder: string;
  languageMenuLabel: string;
  mappingBadge: string;
  sourceCode: string;
  switchToDark: string;
  switchToLight: string;
}

export const LOCALE_OPTIONS: ReadonlyArray<{
  label: string;
  locale: Locale;
}> = [
  { locale: "en", label: "English" },
  { locale: "zh-CN", label: "简体中文" },
  { locale: "zh-TW", label: "繁體中文" },
  { locale: "ja", label: "日本語" },
];

export const MESSAGES: Record<Locale, Messages> = {
  en: {
    appTitle: "DNA Transcoder",
    appDescription: "Convert between UTF-8 text and DNA sequences",
    languageMenuLabel: "Language",
    changeLanguage: "Change language",
    switchToDark: "Switch to dark theme",
    switchToLight: "Switch to light theme",
    sourceCode: "View source code",
    encodeTab: "Encode (UTF-8 → DNA)",
    decodeTab: "Decode (DNA → UTF-8)",
    encodeTitle: "Text Encoding",
    encodeDescription: "Enter UTF-8 text to convert it into a DNA sequence",
    inputTextLabel: "Input text",
    inputTextPlaceholder: "Enter text to encode...",
    binary: "Binary representation",
    dnaPositive: "DNA positive strand",
    dnaNegative: "DNA negative strand (complement)",
    mappingBadge: "A=00, T=11, G=10, C=01",
    complementBadge: "A↔T, G↔C",
    decodeTitle: "DNA Decoding",
    decodeDescription: "Enter a DNA sequence to convert it back to UTF-8 text",
    inputDnaLabel: "Input DNA sequence",
    inputDnaPlaceholder: "Enter a DNA sequence (A, T, G, C)...",
    cleanDna: "Cleaned DNA sequence",
    decodedText: "Decoded text",
    complement: "Complementary strand",
    copyLabel: (label) => `Copy ${label}`,
    copiedTitle: "Copied",
    copiedDescription: (label) => `${label} was copied to the clipboard`,
    copyFailedTitle: "Copy failed",
    copyFailedDescription: "Unable to copy to the clipboard",
  },
  "zh-CN": {
    appTitle: "DNA 转码器",
    appDescription: "UTF-8 文本与 DNA 序列互转",
    languageMenuLabel: "语言",
    changeLanguage: "切换语言",
    switchToDark: "切换到深色主题",
    switchToLight: "切换到浅色主题",
    sourceCode: "查看源代码",
    encodeTab: "编码 (UTF-8 → DNA)",
    decodeTab: "解码 (DNA → UTF-8)",
    encodeTitle: "文本编码",
    encodeDescription: "输入 UTF-8 文本，转换为 DNA 序列",
    inputTextLabel: "输入文本",
    inputTextPlaceholder: "请输入要编码的文本...",
    binary: "二进制表示",
    dnaPositive: "DNA 正链",
    dnaNegative: "DNA 负链 (互补)",
    mappingBadge: "A=00, T=11, G=10, C=01",
    complementBadge: "A↔T, G↔C",
    decodeTitle: "DNA 解码",
    decodeDescription: "输入 DNA 序列，转换回 UTF-8 文本",
    inputDnaLabel: "输入 DNA 序列",
    inputDnaPlaceholder: "请输入 DNA 序列 (A, T, G, C)...",
    cleanDna: "清理后的 DNA 序列",
    decodedText: "解码文本",
    complement: "互补链",
    copyLabel: (label) => `复制${label}`,
    copiedTitle: "已复制",
    copiedDescription: (label) => `${label} 已复制到剪贴板`,
    copyFailedTitle: "复制失败",
    copyFailedDescription: "无法复制到剪贴板",
  },
  "zh-TW": {
    appTitle: "DNA 轉碼器",
    appDescription: "UTF-8 文字與 DNA 序列互轉",
    languageMenuLabel: "語言",
    changeLanguage: "切換語言",
    switchToDark: "切換至深色主題",
    switchToLight: "切換至淺色主題",
    sourceCode: "檢視原始碼",
    encodeTab: "編碼 (UTF-8 → DNA)",
    decodeTab: "解碼 (DNA → UTF-8)",
    encodeTitle: "文字編碼",
    encodeDescription: "輸入 UTF-8 文字，轉換為 DNA 序列",
    inputTextLabel: "輸入文字",
    inputTextPlaceholder: "請輸入要編碼的文字...",
    binary: "二進位表示",
    dnaPositive: "DNA 正鏈",
    dnaNegative: "DNA 負鏈（互補）",
    mappingBadge: "A=00, T=11, G=10, C=01",
    complementBadge: "A↔T, G↔C",
    decodeTitle: "DNA 解碼",
    decodeDescription: "輸入 DNA 序列，轉換回 UTF-8 文字",
    inputDnaLabel: "輸入 DNA 序列",
    inputDnaPlaceholder: "請輸入 DNA 序列 (A, T, G, C)...",
    cleanDna: "清理後的 DNA 序列",
    decodedText: "解碼文字",
    complement: "互補鏈",
    copyLabel: (label) => `複製${label}`,
    copiedTitle: "已複製",
    copiedDescription: (label) => `${label}已複製到剪貼簿`,
    copyFailedTitle: "複製失敗",
    copyFailedDescription: "無法複製到剪貼簿",
  },
  ja: {
    appTitle: "DNA トランスコーダー",
    appDescription: "UTF-8 テキストと DNA 配列を相互変換",
    languageMenuLabel: "言語",
    changeLanguage: "言語を切り替える",
    switchToDark: "ダークテーマに切り替える",
    switchToLight: "ライトテーマに切り替える",
    sourceCode: "ソースコードを表示",
    encodeTab: "エンコード (UTF-8 → DNA)",
    decodeTab: "デコード (DNA → UTF-8)",
    encodeTitle: "テキストのエンコード",
    encodeDescription: "UTF-8 テキストを入力して DNA 配列に変換します",
    inputTextLabel: "入力テキスト",
    inputTextPlaceholder: "エンコードするテキストを入力...",
    binary: "バイナリ表現",
    dnaPositive: "DNA センス鎖",
    dnaNegative: "DNA アンチセンス鎖（相補鎖）",
    mappingBadge: "A=00, T=11, G=10, C=01",
    complementBadge: "A↔T, G↔C",
    decodeTitle: "DNA のデコード",
    decodeDescription: "DNA 配列を入力して UTF-8 テキストに戻します",
    inputDnaLabel: "DNA 配列を入力",
    inputDnaPlaceholder: "DNA 配列 (A, T, G, C) を入力...",
    cleanDna: "整形済み DNA 配列",
    decodedText: "デコードされたテキスト",
    complement: "相補鎖",
    copyLabel: (label) => `${label}をコピー`,
    copiedTitle: "コピーしました",
    copiedDescription: (label) => `${label}をクリップボードにコピーしました`,
    copyFailedTitle: "コピーに失敗しました",
    copyFailedDescription: "クリップボードにコピーできませんでした",
  },
};

export function resolveBrowserLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const normalized = language.toLowerCase();

    if (normalized.startsWith("ja")) {
      return "ja";
    }

    if (
      normalized.startsWith("zh-hant") ||
      normalized.startsWith("zh-tw") ||
      normalized.startsWith("zh-hk") ||
      normalized.startsWith("zh-mo")
    ) {
      return "zh-TW";
    }

    if (normalized.startsWith("zh")) {
      return "zh-CN";
    }
  }

  return "en";
}

export function isLocale(value: string | null): value is Locale {
  return SUPPORTED_LOCALES.some((locale) => locale === value);
}
