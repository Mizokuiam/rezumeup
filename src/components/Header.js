"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Replace logo image with text */}
            <span
              className={`text-5xl font-[Octarine] ${theme === "light" ? "text-lime-500" : "text-white"}`}
            >
              Rezumeup
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            {session && (
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">3 boosts</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTheme("light")}
                className={`rounded-lg p-2 hover:bg-accent ${theme === "light" ? "bg-accent" : ""}`}
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`rounded-lg p-2 hover:bg-accent ${theme === "dark" ? "bg-accent" : ""}`}
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`rounded-lg p-2 hover:bg-accent ${theme === "system" ? "bg-accent" : ""}`}
              >
                <Laptop className="h-4 w-4" />
              </button>
            </div>

            {!session ? (
              <>
                <Link
                  href="/signin"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-lime-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-lime-600"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/upgrade"
                className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
