"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Switch color theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="theme-sun" aria-hidden="true" />
            <Moon className="theme-moon" aria-hidden="true" />
          </Button>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            role="link"
            className="header-cta"
          >
            Start a project <ArrowUpRight aria-hidden="true" />
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="mobile-menu-button"
                />
              }
              aria-label="Open navigation"
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>Explore Technovata</SheetTitle>
                <SheetDescription>
                  Good ideas start with a conversation.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="mobile-nav">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
                <Button
                  render={
                    <Link href="/contact" onClick={() => setMenuOpen(false)} />
                  }
                  nativeButton={false}
                  role="link"
                >
                  Start a project <ArrowUpRight aria-hidden="true" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
