"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  switchToDarkLabel: string;
  switchToLightLabel: string;
}

export function ThemeToggle({
  switchToDarkLabel,
  switchToLightLabel,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? switchToLightLabel : switchToDarkLabel;

  return (
    <Button
      aria-label={label}
      className="h-9 w-9 p-0"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="icon"
      title={label}
      variant="outline"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
