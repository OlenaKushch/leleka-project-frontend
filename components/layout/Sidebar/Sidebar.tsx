'use client';

import Image from 'next/image';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';
import { useAuthStore } from '@/store/auth.store';
import { UserBar } from '@/components/layout/UserBar/UserBar';
import { AuthBar } from '@/components/layout/AuthBar/AuthBar';
import AppLogo from '@/components/auth/AppLogo';

const NAV_ITEMS = [
    { label: 'Мій день', href: '/', icon: '/icons/calendar.svg' },
    { label: 'Подорож', href: '/journey', icon: '/icons/journey.svg' },
    { label: 'Щоденник', href: '/diary', icon: '/icons/diary.svg' },
    { label: 'Профіль', href: '/profile', icon: '/icons/profile.svg' },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const { user } = useAuthStore();

    const isAuthPage = pathname?.startsWith('/auth');
    if (isAuthPage) return null;

    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.sidebar__logo} aria-label="Мій день">
                <AppLogo className={styles.sidebar__logo_img} />
            </Link>

            <nav className={styles.sidebar__nav}>
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={user ? item.href : '/auth/login'}
                        className={`${styles.sidebar__link} ${pathname === item.href ? styles.active : ''}`}
                    >
                        <Image src={item.icon} alt={item.label} width={24} height={24} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className={styles.sidebar__footer}>
                {user ? <UserBar /> : <AuthBar />}
            </div>
        </aside>
    );
};
