import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/SessionProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "Rezumeup - AI Resume Optimizer",
    description: "Optimize your resume with AI-powered keyword optimization",
};
export default async function RootLayout({ children, }) {
    const session = await getServerSession(authOptions);
    return (<html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen bg-background">
              <Header />
              <main>{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>);
}
