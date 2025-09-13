"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Sun, Moon, Monitor, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// DNA conversion functions (TypeScript implementation)
const BIN_TO_DNA: { [key: string]: string } = {
  "00": "A",
  "01": "T",
  "10": "G",
  "11": "C",
};

const DNA_TO_BIN: { [key: string]: string } = {
  A: "00",
  T: "01",
  G: "10",
  C: "11",
};

const DNA_COMPLEMENT: { [key: string]: string } = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
};

function utf8ToBinary(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

function binaryToUtf8(binary: string): string {
  const bits = binary.replace(/\s/g, "");
  const bytes = [];

  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.slice(i, i + 8).padEnd(8, "0");
    bytes.push(Number.parseInt(byte, 2));
  }

  try {
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch {
    return "[Invalid UTF-8]";
  }
}

function binaryToDna(binary: string): string {
  const bits = binary.replace(/\s/g, "");
  let dna = "";

  for (let i = 0; i < bits.length; i += 2) {
    const pair = bits.slice(i, i + 2).padEnd(2, "0");
    dna += BIN_TO_DNA[pair];
  }

  return dna;
}

function dnaToBinary(dna: string): string {
  const bits = Array.from(dna)
    .map((base) => DNA_TO_BIN[base] || "00")
    .join("");
  return bits.match(/.{1,8}/g)?.join(" ") || "";
}

function complementDna(dna: string): string {
  return Array.from(dna)
    .map((base) => DNA_COMPLEMENT[base] || base)
    .join("");
}

export default function DNATranscoder() {
  const [inputText, setInputText] = useState("");
  const [inputDna, setInputDna] = useState("");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const { toast } = useToast();

  // Theme management
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  // Encoding: UTF-8 to DNA
  const encodeResults = inputText
    ? (() => {
      const binary = utf8ToBinary(inputText);
      const dnaPositive = binaryToDna(binary);
      const dnaNegative = complementDna(dnaPositive);
      return {
        binary,
        dnaPositive,
        dnaNegative,
        binaryNegative: dnaToBinary(dnaNegative),
      };
    })()
    : null;

  // Decoding: DNA to UTF-8
  const decodeResults = inputDna
    ? (() => {
      const cleanDna = inputDna.toUpperCase().replace(/[^ATGC]/g, "");
      const binary = dnaToBinary(cleanDna);
      const text = binaryToUtf8(binary);
      const complement = complementDna(cleanDna);
      return {
        cleanDna,
        binary,
        text,
        complement,
        complementBinary: dnaToBinary(complement),
      };
    })()
    : null;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "已复制",
        description: `${label} 已复制到剪贴板`,
      });
    } catch {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-balance">DNA 转码器</h1>
              <p className="text-sm text-muted-foreground">
                UTF-8 文本与 DNA 序列互转
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={theme === "light" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme("light")}
                className="h-8 w-8 p-0"
              >
                <Sun className="w-4 h-4" />
              </Button>
              <Button
                variant={theme === "system" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme("system")}
                className="h-8 w-8 p-0"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="h-8 w-8 p-0"
              >
                <Moon className="w-4 h-4" />
              </Button>
            </div>

            {/* GitHub Link */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  "https://github.com/your-username/dna-transcoder",
                  "_blank"
                )
              }
              className="h-9 w-9 p-0"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="encode" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">编码 (UTF-8 → DNA)</TabsTrigger>
            <TabsTrigger value="decode">解码 (DNA → UTF-8)</TabsTrigger>
          </TabsList>

          {/* Encoding Tab */}
          <TabsContent value="encode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  文本编码
                </CardTitle>
                <CardDescription>
                  输入 UTF-8 文本，转换为 DNA 序列
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">输入文本</label>
                  <Textarea
                    placeholder="请输入要编码的文本..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {encodeResults && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            二进制表示
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(encodeResults.binary, "二进制")
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {encodeResults.binary}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium flex items-center gap-2">
                            DNA 正链
                            <Badge variant="secondary">
                              A=00, T=01, G=10, C=11
                            </Badge>
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                encodeResults.dnaPositive,
                                "DNA 正链"
                              )
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {encodeResults.dnaPositive}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium flex items-center gap-2">
                            DNA 负链 (互补)
                            <Badge variant="outline">A↔T, G↔C</Badge>
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                encodeResults.dnaNegative,
                                "DNA 负链"
                              )
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {encodeResults.dnaNegative}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decoding Tab */}
          <TabsContent value="decode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  DNA 解码
                </CardTitle>
                <CardDescription>
                  输入 DNA 序列，转换回 UTF-8 文本
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">输入 DNA 序列</label>
                  <Textarea
                    placeholder="请输入 DNA 序列 (A, T, G, C)..."
                    value={inputDna}
                    onChange={(e) => setInputDna(e.target.value)}
                    className="min-h-[100px] resize-none font-mono"
                  />
                </div>

                {decodeResults && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            清理后的 DNA 序列
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                decodeResults.cleanDna,
                                "清理后的 DNA"
                              )
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {decodeResults.cleanDna}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            二进制表示
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(decodeResults.binary, "二进制")
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {decodeResults.binary}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            解码文本
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(decodeResults.text, "解码文本")
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-sm break-all">
                          {decodeResults.text}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">互补链</label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                decodeResults.complement,
                                "互补链"
                              )
                            }
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {decodeResults.complement}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
