import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import storeImage from "../assets/Store.jpg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to Homepage after successful login
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      <div
        className="hidden lg:flex flex-1 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${storeImage})` }}
      >
        <div className="w-full h-full bg-black/40" />
      </div>

      <div className="relative w-full lg:w-[45%] bg-[#723EC3] flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full border border-white/30 pointer-events-none" />
        <div className="absolute -bottom-32 -right-10 w-80 h-80 rounded-full border border-white/30 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-black rounded-2xl shadow-xl p-8 sm:p-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-white mb-6">Hello!</h1>
          <p className="text-lg text-gray-300 mb-8">Sign In to Get Started</p>

          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 border border-gray-600 rounded-full px-5 py-3 focus-within:border-[#723EC3] transition-colors">
              <Mail className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-3 border border-gray-600 rounded-full px-5 py-3 focus-within:border-[#723EC3] transition-colors">
              <Lock className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#723EC3] hover:bg-[#5f34a3] transition-colors text-white font-medium rounded-full py-3 mt-2 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button className="text-gray-300 hover:text-white text-sm mt-4 transition-colors block">
            Forgot Password
          </button>

          <p className="text-gray-300 text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Turns Firebase's error codes into readable messages
function mapFirebaseError(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}
