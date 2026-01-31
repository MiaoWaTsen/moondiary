'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, BarChart3, Search } from 'lucide-react';

const navItems = [
    { href: '/', icon: Home, label: '首頁' },
    { href: '/calendar', icon: Calendar, label: '日曆' },
    { href: '/stats', icon: BarChart3, label: '統計' },
    { href: '/search', icon: Search, label: '搜尋' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <div className="nav-items">
                {navItems.map(({ href, icon: Icon, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`nav-item ${pathname === href ? 'active' : ''}`}
                    >
                        <Icon />
                        <span>{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
