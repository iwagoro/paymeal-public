import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TopBar } from "@/components/util/baseLayout/top-bar";
import { BottomBar } from "@/components/util/baseLayout/bottom-bar";
import { ThemeProvider } from "@/components/util/provider/theme-provider";
import { AppProvider } from "@/components/util/provider/app-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseStyle = "w-screen h-screen flex justify-center items-center bg-muted/40 overflow-hidden";
const responsiveStyle = "max-w-3xl w-full h-full  py-[70px]  px-5 overflow-y-scroll hidden-scrollbar";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className + " " + baseStyle}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AppProvider>
                        <TopBar />
                        <div className={responsiveStyle}>{children}</div>
                        <BottomBar />
                    </AppProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
