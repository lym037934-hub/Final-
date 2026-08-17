import React from "react";
import { FaFacebookF, FaInstagram, FaDiscord, FaGithub, FaMicrochip } from "react-icons/fa";

// Quick Links column data
const quickLinks = ["Home", "Products", "About", "Contact"];

// Customer Service column data
const customerServiceLinks = ["FAQ", "Shipping", "Returns", "Privacy Policy"];

// Social media icons data
const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/meng.ly.323007" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/fanta6790/" },
  { icon: FaDiscord, label: "Discord", href: "#" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/lym037934-hub" },
];

/**
 * Footer
 * Modern dark-themed footer for TechParts Store featuring
 * company info, navigation, customer service links, and socials.
 */
function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-cyan-400">
                <FaMicrochip className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold text-white tracking-tight">
                TechParts
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted destination for premium desktop PC components and
              accessories. We provide reliable hardware from trusted brands
              for gamers, creators, and professionals.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group inline-flex items-center text-sm text-slate-400 transition-all duration-300 ease-in-out hover:text-cyan-400 cursor-pointer"
                  >
                    <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Customer Service
            </h3>
            <ul className="flex flex-col gap-3">
              {customerServiceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group inline-flex items-center text-sm text-slate-400 transition-all duration-300 ease-in-out hover:text-cyan-400 cursor-pointer"
                  >
                    <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 ease-in-out hover:scale-110 hover:text-blue-500 hover:border-blue-500/50 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-800" />

        {/* Bottom footer */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-slate-400">
            © 2026 TechParts Store. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-500">
            Designed and Developed by មនុស្សស្មោះ with ❤️ using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;