"use client";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALE_OPTIONS, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  label: string;
  locale: Locale;
  menuLabel: string;
  onLocaleChange: (locale: Locale) => void;
}

export function LanguageSwitcher({
  label,
  locale,
  menuLabel,
  onLocaleChange,
}: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label={label}
          className="h-9 w-9 p-0"
          size="icon"
          title={label}
          variant="outline"
        >
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          onValueChange={(value) => onLocaleChange(value as Locale)}
          value={locale}
        >
          {LOCALE_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.locale} value={option.locale}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
