import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    label: "Explore Cases",
    href: "/explore-cases",
    children: [
      { label: "HealthEquity Breach", href: "/cases/health-equity" },
      { label: "Recent Settlements", href: "/cases/settlements" },
      { label: "Past Cases", href: "/cases/past" }
    ]
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Team", href: "/about/team" },
      { label: "Our Process", href: "/about/process" },
      { label: "Results", href: "/about/results" }
    ]
  },
  { label: "Other Cases", href: "/other-cases" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" }
];

function NavLink({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={item.href}
        className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium"
      >
        {item.label}
        {item.children && (
          <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </a>
      
      {item.children && isOpen && (
        <div 
          className="absolute left-0 mt-2 py-2 w-48 bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.children.map((child, index) => (
            <a
              key={index}
              href={child.href}
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavLink({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);
  const [submenuHeight, setSubmenuHeight] = useState<number>(0);

  useEffect(() => {
    if (submenuRef.current) {
      setSubmenuHeight(isOpen ? submenuRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-4">
        <a
          href={item.href}
          className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
        >
          {item.label}
        </a>
        {item.children && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-300 hover:text-white"
          >
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      
      {item.children && (
        <div 
          ref={submenuRef}
          className="mt-2 pl-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${submenuHeight}px` }}
        >
          {item.children.map((child, index) => (
            <a
              key={index}
              href={child.href}
              className="block py-2 px-4 text-sm text-gray-300 hover:text-white"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-white">
            <svg className="w-32 h-auto" viewBox="0 0 412.39 115" xmlns="http://www.w3.org/2000/svg">
              <g id="LIA_Logos">
                <path className="fill-current" d="M126.05,72.94h3.26l9.2,23.93h-2.92l-2.92-7.74h-10.23l-2.95,7.74h-2.8l9.36-23.93ZM131.89,86.9l-4.32-11.3-4.28,11.3h8.6Z"/>
                <path className="fill-current" d="M144.23,88.41c0-5.4,3.33-8.89,8.18-8.89,2.76,0,4.96,1.3,6.25,3.42v-10.33h2.58v24.26h-2.58v-3.06c-1.25,2.12-3.49,3.42-6.29,3.42-4.77,0-8.14-3.35-8.14-8.82ZM158.78,88.48v-.29c0-3.89-2.2-6.51-5.83-6.51s-5.95,2.52-5.95,6.59v.29c0,4.1,2.27,6.51,5.95,6.51s5.83-2.74,5.83-6.59Z"/>
                <path className="fill-current" d="M168.35,79.88h2.73l5.42,13.93,5.3-13.93h2.76l-6.89,17.09h-2.31l-7.01-17.09Z"/>
                <path className="fill-current" d="M189.86,88.38c0-5.22,3.6-8.82,8.86-8.82s8.79,3.6,8.79,8.82-3.6,8.82-8.86,8.82-8.79-3.56-8.79-8.82ZM204.86,88.48v-.14c0-4.03-2.35-6.66-6.14-6.66s-6.21,2.63-6.21,6.66v.14c0,4.03,2.35,6.59,6.14,6.59s6.21-2.59,6.21-6.59Z"/>
                <path className="fill-current" d="M214.26,88.38c0-5.22,3.56-8.82,8.79-8.82,4.32,0,7.05,2.3,8.03,5.72l-2.58.68c-.61-2.59-2.35-4.32-5.49-4.32-3.75,0-6.1,2.66-6.1,6.66v.14c0,3.92,2.27,6.62,6.06,6.62,3.26,0,5-1.73,5.61-4.35l2.58.65c-1.02,3.56-3.75,5.83-8.18,5.83-5.27,0-8.71-3.63-8.71-8.82Z"/>
                <path className="fill-current" d="M237.83,92.37c0-3.6,3.07-4.53,6.7-5.33,2.69-.54,5.04-.79,5.72-1.94v-.22c0-2.16-1.36-3.31-4.39-3.31s-4.89.9-4.92,3.63v.14l-2.58-.25c.15-3.71,3.11-5.54,7.5-5.54s6.93,2.16,6.93,6.15v7.38c0,1.91,1.02,2.09,3.18,1.87v1.94c-.15.04-.68.14-1.86.14-2.23,0-3.49-.9-3.64-3.31h-.04c-1.4,2.63-4.24,3.53-6.59,3.53-3.56,0-6.02-1.98-6.02-4.89ZM250.26,91.04v-3.99c-2.16,1.98-9.74,1.12-9.74,5.25,0,1.69,1.33,3.02,3.83,3.02,2.95,0,5.27-1.55,5.91-4.28Z"/>
                <path className="fill-current" d="M263.1,92.84v-10.8h-3.22v-2.16h3.22v-3.56l2.58-1.66v5.22h4.24v2.16h-4.28v10.51c0,1.51.57,2.12,2.12,2.16h2.08v2.16h-2.69c-3.11-.07-4.01-1.37-4.05-4.03Z"/>
                <path className="fill-current" d="M275.78,88.45c0-5.25,3.6-8.89,8.68-8.89s8.22,3.35,8.22,8.53v.61h-14.28v.04c0,3.78,2.31,6.37,6.14,6.37,3.52,0,5.19-1.73,5.8-4.1l2.35.75c-.95,3.17-3.49,5.44-8.14,5.44-5.42,0-8.75-3.56-8.75-8.75ZM289.91,86.72c-.27-3.2-2.27-5.11-5.49-5.11s-5.45,1.98-5.95,5.11h11.44Z"/>
                <path className="fill-current" d="M299.18,93.92l2.16-1.19c1.44,1.8,3.68,2.52,5.68,2.52,2.46,0,4.01-1.12,4.01-2.95s-2.27-2.34-5.26-3.02c-3.49-.75-6.1-1.65-6.1-4.82,0-2.84,2.73-4.93,6.33-4.93,3.03,0,5.45,1.22,7.27,3.24l-2.12,1.22c-1.29-1.55-3.18-2.41-5.19-2.41-2.27,0-3.75,1.08-3.75,2.74,0,1.84,1.59,2.2,4.85,2.84,3.18.68,6.51,1.73,6.51,4.97,0,3.06-2.69,5.18-6.63,5.18-3.18,0-6.1-1.19-7.77-3.38Z"/>
                <polygon className="fill-current" points="127.77 28.81 116.78 28.81 116.78 64.62 141.77 64.62 141.77 57.01 127.77 57.01 127.77 28.81"/>
                <path className="fill-current" d="M159.03,38.62c-8.58,0-13.89,5.36-13.89,13.56s5.31,13.08,13.89,13.08c7.67,0,10.61-2.68,13.08-7.56l-7.56-2.3c-.59,1.98-2.09,3.32-4.77,3.32-2.95,0-4.82-1.5-5.04-4.83h17.85v-1.39c0-8.74-4.83-13.89-13.56-13.89ZM154.75,49.13c.32-2.84,1.88-4.24,4.29-4.24s3.75,1.34,3.91,4.24h-8.2Z"/>
                <path className="fill-current" d="M222.67,38.68c-7.87,0-12.46,3.46-13.06,8.96l9.37,1.06v-.43c.11-1.82,1.29-2.89,3.59-2.89,2.04,0,3.06.86,3.06,2.47v.16c-.21,1.29-3,1.39-6.92,2.14-4.88.96-9.81,2.3-9.81,7.83,0,4.56,3.38,7.4,8.68,7.4,3.91,0,6.54-1.77,7.99-4.29v3.54h10.03v-14.8c0-7.88-4.34-11.15-12.92-11.15ZM225.62,55.83c-.32,2.47-2.09,3.49-4.07,3.49-1.66,0-2.57-1.02-2.57-2.36,0-2.04,1.55-2.68,3.43-3.22,1.12-.32,2.3-.54,3.22-.97v3.06Z"/>
                <rect className="fill-current" x="240.76" y="28.81" width="10.13" height="35.81"/>
                <rect className="fill-current" x="269.08" y="28.81" width="10.99" height="35.81"/>
                <path className="fill-current" d="M303.32,38.62c-3.65,0-6.27,1.72-7.67,4.45v-3.75h-10.03v25.31h10.13v-13.78c0-3,1.23-4.72,3.27-4.72,2.14,0,3,1.34,3,3.91v14.58h10.13v-15.39c0-6.97-3.32-10.62-8.85-10.62Z"/>
                <rect className="fill-current" x="317.23" y="28.81" width="10.08" height="7.48"/>
                <path className="fill-current" d="M317.23,65.78c0,1.82-.43,2.3-1.82,2.3h-2.34v6.81h2.93c7.02,0,11.31-1.45,11.31-9.49v-26.09h-10.08v26.47Z"/>
                <path className="fill-current" d="M348.52,53.1c0,2.89-.96,4.72-3.16,4.72s-3.06-1.39-3.06-3.91v-14.58h-10.03v15.39c0,6.81,3.43,10.56,9.06,10.56,3.43,0,5.9-1.5,7.29-4.07v3.43h9.92v-25.31h-10.03v13.78Z"/>
                <path className="fill-current" d="M373.84,43.61v-4.29h-10.19v25.31h10.19v-12.28c0-3,.86-4.4,4.24-4.4h3.49v-9.33h-.7c-3.97,0-6.11,2.2-7.02,4.99Z"/>
                <path className="fill-current" d="M404.4,39.32l-4.56,15.17-4.93-15.17h-10.56l9.81,25.31c-.7,2.63-1.61,3.3-3.54,3.3h-4.13v6.97h5.52c6.17,0,9.06-2.87,10.88-7.81l9.49-27.77h-7.99Z"/>
                <path className="fill-current" d="M194.44,39.33v3.06c-1.5-2.41-3.91-3.75-7.4-3.75-6.86,0-11.26,5.09-11.26,12.76v.05c0,7.61,4.34,12.7,11.31,12.7,3.32,0,5.84-1.29,7.45-3.59v3.65c0,3.11-1.18,4.23-4.5,4.23-2.59,0-3.75-.74-3.98-2.57h-8.87c.26,6.62,4.3,9.43,13,9.43,9.92,0,14.21-4.72,14.21-13.94v-22.03h-9.97ZM194.76,51.71c0,3.59-1.5,5.42-4.29,5.42s-4.07-1.82-4.07-5.42v-.54c0-3.65,1.45-5.58,4.07-5.58,2.79,0,4.29,1.77,4.29,5.31v.8Z"/>
                <path className="fill-current" d="M57.73,65.63c0,2,1.45,3.38,4.07,3.38,3.38,0,7.16-1.63,7.16-6.56v-3.24c-1.59.83-3.85,1.31-6.06,1.87-2.9.83-5.18,1.8-5.18,4.55Z"/>
                <path className="fill-current" d="M47.34,0C35.54,11.01,13.37,15.07,0,14.3v43.52c0,33.97,33.62,43.58,47.34,57.18,13.72-13.6,47.34-23.21,47.34-57.18V14.3c-13.37.77-35.54-3.29-47.34-14.3ZM75.65,38.9h2.45v.49h-.96v2.53h-.53v-2.53h-.96v-.49ZM32.27,32.29h3.52v-3.52h3.44v3.52h3.52v3.44h-3.52v3.52h-3.44v-3.52h-3.52v-3.44ZM26.31,75.02h-10.48V28.77h10.48v46.25ZM42.74,75.02h-10.48v-22.61c0-5.79,4.69-10.48,10.48-10.48v33.08ZM79.19,75.02h-10.21v-4.49c-1.93,3.31-5.59,5.38-10.56,5.38-6.83,0-11.18-3.73-11.18-9.46,0-7.32,5.8-8.97,12.7-10.35,5.66-1.17,8.9-1.38,9.11-3.18v-.21c0-2-1.59-3.45-5.25-3.45s-5.59,1.86-5.8,4.49h-9.97c.41-7.28,6.28-12.01,15.91-12.01s15.25,4,15.25,13.39v19.88ZM81.72,41.91h-.53v-2.16l-.95,1.42h-.02l-.94-1.41v2.16h-.52v-3.02h.56l.92,1.43.92-1.43h.56v3.02Z"/>
              </g>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <NavLink key={index} item={item} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-[32rem] opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          } overflow-hidden`}
        >
          <nav className="py-4">
            {navigation.map((item, index) => (
              <MobileNavLink key={index} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}