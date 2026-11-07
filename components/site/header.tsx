"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Layers3,
  Menu,
  Moon,
  PanelsTopLeft,
  Smartphone,
  Sun,
} from "lucide-react";
import { Brand } from "@/components/site/brand";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { services } from "@/lib/site-content";

const links = [
  { href: "/process", label: "Our process" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

const serviceIcons = {
  websites: Globe2,
  "web-apps": PanelsTopLeft,
  "mobile-apps": Smartphone,
  saas: Layers3,
};

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Brand />
        <NavigationMenu
          className="desktop-nav"
          aria-label="Main navigation"
          align="center"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="header-nav-link"
                data-active={pathname.startsWith("/services") || undefined}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="header-services-content">
                <div className="header-services-intro">
                  <span className="nav-eyebrow">IDEAS. ENGINEERED.</span>
                  <p>
                    Whatever&apos;s next.
                    <br />
                    <span>Let&apos;s build it.</span>
                  </p>
                  <NavigationMenuLink
                    render={<Link href="/services" />}
                    closeOnClick
                    className="all-services-link"
                  >
                    Explore all services <ArrowRight aria-hidden="true" />
                  </NavigationMenuLink>
                </div>
                <div className="header-service-links">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.id];
                    return (
                      <NavigationMenuLink
                        key={service.id}
                        render={<Link href={`/services/${service.id}`} />}
                        closeOnClick
                        className="header-service-link"
                      >
                        <span className="header-service-icon">
                          <Icon aria-hidden="true" />
                        </span>
                        <span>
                          <strong>{service.name}</strong>
                          <small>{service.shortDescription}</small>
                        </span>
                        <ArrowUpRight
                          className="service-link-arrow"
                          aria-hidden="true"
                        />
                      </NavigationMenuLink>
                    );
                  })}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {links.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  render={<Link href={href} />}
                  active={pathname === href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="header-nav-link"
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            className="header-theme-toggle"
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
            Start a project{" "}
            <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
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
                <span className="nav-eyebrow">TECHNOVATA / EXPLORE</span>
                <SheetTitle>
                  Good things
                  <br />
                  start here<span>.</span>
                </SheetTitle>
                <SheetDescription>
                  From your first idea to your next big thing.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="mobile-nav">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  ...links,
                ].map(({ href, label }, index) => (
                  <Link
                    key={href}
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mobile-nav-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <div className="mobile-capabilities">
                <span className="nav-eyebrow">WHAT WE BUILD</span>
                <div>
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {service.name}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mobile-menu-cta">
                <Button
                  render={
                    <Link href="/contact" onClick={() => setMenuOpen(false)} />
                  }
                  nativeButton={false}
                  role="link"
                >
                  Start a project{" "}
                  <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </Button>
                <p>A little conversation. A world of possibilities.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
