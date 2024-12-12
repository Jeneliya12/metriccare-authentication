import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        // Save user data (optional)
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to the homepage
        router.push("/");
      } else {
        setMessage(data.message || "Login failed!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black shadow-2xl rounded-xl p-10 max-w-md w-full">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="MetricCare Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white ml-4">MetricCare</h2>
        </div>

        {/* Form */}
        <h1 className="text-3xl font-extrabold text-center text-white mb-8">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">{message}</p>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-white font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
