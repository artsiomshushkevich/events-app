import './globals.css';
import { Inter } from 'next/font/google';
import { MainHeader } from '@/components/Layout/MainHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Events app',
    description: 'Events app from NextJS Udemy course'
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <MainHeader />
                <main>{children}</main>
            </body>
        </html>
    );
}
