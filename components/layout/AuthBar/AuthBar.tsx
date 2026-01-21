'use client';

import Link from 'next/link';
import styles from './AuthBar.module.scss';

export const AuthBar = () => {
    return (
        <div className={styles.authBar}>
            <Link href="/auth/register" className={styles.link}>
                <button className={`${styles.button} ${styles.buttonRegister}`}>
                    Зареєструватися
                </button>
            </Link>
            <Link href="/auth/login" className={styles.link}>
                <button className={`${styles.button} ${styles.buttonLogin}`}>
                    Увійти
                </button>
            </Link>
        </div>
    );
};
