import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1em 0', background: '#f1f1f1' }}>
            <p>&copy; {new Date().getFullYear()} yosbel.dev</p>
        </footer>
    );
};

export default Footer;