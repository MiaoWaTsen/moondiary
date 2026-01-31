'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, BarChart3, Search, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
    { href: '/', icon: Home, label: '首頁' },
    { href: '/calendar', icon: Calendar, label: '日曆' },
    { href: '/stats', icon: BarChart3, label: '統計' },
    { href: '/search', icon: Search, label: '搜尋' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const { showToast } = useToast();
    const [showLogin, setShowLogin] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleUserClick = () => {
        if (user) {
            setShowUserMenu(!showUserMenu);
        } else {
            setShowLogin(true);
        }
    };

    const handleLogout = async () => {
        await signOut();
        setShowUserMenu(false);
        showToast('已登出', 'info');
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-items relative">
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

                    <div className="relative">
                        <button
                            onClick={handleUserClick}
                            className={`nav-item ${user ? 'text-purple-400' : ''}`}
                        >
                            <UserIcon />
                            <span>{user ? '我' : '登入'}</span>
                        </button>

                        <AnimatePresence>
                            {showUserMenu && user && (
                                <motion.div
                                    className="absolute bottom-16 right-0 w-48 bg-[#1a1a24] border border-[#2a2a3a] rounded-xl shadow-xl overflow-hidden"
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                >
                                    <div className="p-3 border-b border-[#2a2a3a]">
                                        <p className="text-xs text-gray-500">已登入</p>
                                        <p className="text-sm font-medium truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left p-3 text-sm text-red-400 hover:bg-[#22222e] transition-colors"
                                    >
                                        登出
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    );
}
