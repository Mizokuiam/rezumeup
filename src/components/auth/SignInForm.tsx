"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium leading-none">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}