"use client";
import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-3 rounded-lg text-black"
      />

      <button
        type="submit"
        className="bg-black text-white p-3 rounded-lg font-semibold"
      >
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
      </button>

      {status === "success" && (
        <p className="text-green-500 text-sm">You're in! Check your email.</p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
