import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header style={styles.header}>
            <div style={styles.logoContainer}>
                <h1 style={styles.title}>Yosbel.dev</h1>
            </div>
            <nav style={styles.nav}>
                <Link href="/" style={styles.link}>Home</Link>
                <Link href="/about" style={styles.link}>About</Link>
                <Link href="/services" style={styles.link}>Services</Link>
                <Link href="/contact" style={styles.link}>Contact</Link>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        width: '100%',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        marginLeft: '10px',
        fontSize: '1.5rem',
    },
    nav: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
    },
};

export default Header;