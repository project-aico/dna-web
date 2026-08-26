"use client";

import { Code, Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { decodeDna, encodeText } from "@/lib/dna";
import {
  isLocale,
  type Locale,
  MESSAGES,
  resolveBrowserLocale,
} from "@/lib/i18n";

const LOCALE_STORAGE_KEY = "dna-transcoder-locale";
const SOURCE_REPOSITORY_URL = "https://github.com/project-aico/dna";

export default function DNATranscoder() {
  const [inputText, setInputText] = useState("");
  const [inputDna, setInputDna] = useState("");
  const [locale, setLocale] = useState<Locale>("en");
  const { toast } = useToast();
  const messages = MESSAGES[locale];

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    const browserLocale = resolveBrowserLocale(
      navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language],
    );
    setLocale(isLocale(storedLocale) ? storedLocale : browserLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${messages.appTitle} - ${messages.appDescription}`;
  }, [locale, messages.appDescription, messages.appTitle]);

  const encodeResults = useMemo(
    () => (inputText ? encodeText(inputText) : null),
    [inputText],
  );
  const decodeResults = useMemo(
    () => (inputDna ? decodeDna(inputDna) : null),
    [inputDna],
  );

  const changeLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    setLocale(nextLocale);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: messages.copiedTitle,
        description: messages.copiedDescription(label),
      });
    } catch {
      toast({
        title: messages.copyFailedTitle,
        description: messages.copyFailedDescription,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
              <Code className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-balance font-semibold text-xl">
                {messages.appTitle}
              </h1>
              <p className="hidden truncate text-muted-foreground text-sm sm:block">
                {messages.appDescription}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher
              label={messages.changeLanguage}
              locale={locale}
              menuLabel={messages.languageMenuLabel}
              onLocaleChange={changeLocale}
            />
            <ThemeToggle
              switchToDarkLabel={messages.switchToDark}
              switchToLightLabel={messages.switchToLight}
            />
            <Button
              asChild
              className="h-9 w-9 p-0"
              size="icon"
              title={messages.sourceCode}
              variant="outline"
            >
              <a
                aria-label={messages.sourceCode}
                href={SOURCE_REPOSITORY_URL}
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Tabs className="space-y-6" defaultValue="encode">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">{messages.encodeTab}</TabsTrigger>
            <TabsTrigger value="decode">{messages.decodeTab}</TabsTrigger>
          </TabsList>

          <TabsContent className="space-y-6" value="encode">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  {messages.encodeTitle}
                </CardTitle>
                <CardDescription>{messages.encodeDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="text-input">
                    {messages.inputTextLabel}
                  </label>
                  <Textarea
                    className="min-h-[100px] resize-none"
                    id="text-input"
                    onChange={(event) => setInputText(event.target.value)}
                    placeholder={messages.inputTextPlaceholder}
                    value={inputText}
                  />
                </div>

                {encodeResults && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid gap-4">
                      <Result
                        copyLabel={messages.copyLabel(messages.binary)}
                        label={messages.binary}
                        onCopy={() =>
                          copyToClipboard(encodeResults.binary, messages.binary)
                        }
                        value={encodeResults.binary}
                      />
                      <Result
                        badge={messages.mappingBadge}
                        copyLabel={messages.copyLabel(messages.dnaPositive)}
                        label={messages.dnaPositive}
                        onCopy={() =>
                          copyToClipboard(
                            encodeResults.dnaPositive,
                            messages.dnaPositive,
                          )
                        }
                        value={encodeResults.dnaPositive}
                      />
                      <Result
                        badge={messages.complementBadge}
                        badgeVariant="outline"
                        copyLabel={messages.copyLabel(messages.dnaNegative)}
                        label={messages.dnaNegative}
                        onCopy={() =>
                          copyToClipboard(
                            encodeResults.dnaNegative,
                            messages.dnaNegative,
                          )
                        }
                        value={encodeResults.dnaNegative}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent className="space-y-6" value="decode">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  {messages.decodeTitle}
                </CardTitle>
                <CardDescription>{messages.decodeDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="font-medium text-sm" htmlFor="dna-input">
                    {messages.inputDnaLabel}
                  </label>
                  <Textarea
                    className="min-h-[100px] resize-none font-mono"
                    id="dna-input"
                    onChange={(event) => setInputDna(event.target.value)}
                    placeholder={messages.inputDnaPlaceholder}
                    value={inputDna}
                  />
                </div>

                {decodeResults && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="grid gap-4">
                      <Result
                        copyLabel={messages.copyLabel(messages.cleanDna)}
                        label={messages.cleanDna}
                        onCopy={() =>
                          copyToClipboard(
                            decodeResults.cleanDna,
                            messages.cleanDna,
                          )
                        }
                        value={decodeResults.cleanDna}
                      />
                      <Result
                        copyLabel={messages.copyLabel(messages.binary)}
                        label={messages.binary}
                        onCopy={() =>
                          copyToClipboard(decodeResults.binary, messages.binary)
                        }
                        value={decodeResults.binary}
                      />
                      <Result
                        copyLabel={messages.copyLabel(messages.decodedText)}
                        label={messages.decodedText}
                        monospace={false}
                        onCopy={() =>
                          copyToClipboard(
                            decodeResults.text,
                            messages.decodedText,
                          )
                        }
                        value={decodeResults.text}
                      />
                      <Result
                        copyLabel={messages.copyLabel(messages.complement)}
                        label={messages.complement}
                        onCopy={() =>
                          copyToClipboard(
                            decodeResults.complement,
                            messages.complement,
                          )
                        }
                        value={decodeResults.complement}
                      />
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

interface ResultProps {
  badge?: string;
  badgeVariant?: "outline" | "secondary";
  copyLabel: string;
  label: string;
  monospace?: boolean;
  onCopy: () => void;
  value: string;
}

function Result({
  badge,
  badgeVariant = "secondary",
  copyLabel,
  label,
  monospace = true,
  onCopy,
  value,
}: ResultProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2 font-medium text-sm">
          <span>{label}</span>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </div>
        <Button
          aria-label={copyLabel}
          className="shrink-0"
          onClick={onCopy}
          size="sm"
          title={copyLabel}
          variant="outline"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div
        className={`break-all rounded-lg bg-muted p-3 text-sm ${
          monospace ? "font-mono" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
