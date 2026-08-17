import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import storeImage from "../assets/Store.jpg";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save the name onto the Firebase user profile
      await updateProfile(userCredential.user, { displayName: fullName });

      navigate("/"); // redirect to Homepage after successful signup
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
          <p className="text-lg text-gray-300 mb-8">Create an Account</p>

          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 border border-gray-600 rounded-full px-5 py-3 focus-within:border-[#723EC3] transition-colors">
              <User className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>

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
                minLength={6}
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-3 border border-gray-600 rounded-full px-5 py-3 focus-within:border-[#723EC3] transition-colors">
              <Lock className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#723EC3] hover:bg-[#5f34a3] transition-colors text-white font-medium rounded-full py-3 mt-2 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-300 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
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
    case "auth/email-already-in-use":
      return "That email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}