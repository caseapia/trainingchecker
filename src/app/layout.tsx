import Header from '../components/Header/Header';
import './globals.scss';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>TRAINING CHECKER</title>
                <meta property="og:title" content="TRAINING CHECKER" key="title" />
            </head>
            <body>
                <Header />
                {children}
            </body>
        </html>
    )
}