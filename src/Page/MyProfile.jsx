import React, { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hook/AuthContext";
import { db } from "../firebase/firebase";

export default function MyProfile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // Edit State initialized directly from Auth currentUser
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  // Sync edit form inputs whenever currentUser loads or changes
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");
    }
  }, [currentUser]);

  // Fetch non-auth Firestore details (e.g. lastLoginAt, uid)
  useEffect(() => {
    if (!currentUser?.uid) return;

    const docRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
          setError("");
        } else {
          setError("No profile record found in Firestore.");
        }
        setFetching(false);
      },
      (err) => {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
        setFetching(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;

    setUpdating(true);
    setError("");

    const updatedDisplayName = displayName.trim();
    const updatedPhotoURL = photoURL.trim();

    try {
      // 1. Update Firebase Auth Profile
      await updateProfile(currentUser, {
        displayName: updatedDisplayName,
        photoURL: updatedPhotoURL,
      });

      // 2. Update Firestore document so database stays in sync
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        displayName: updatedDisplayName,
        photoURL: updatedPhotoURL,
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Could not save changes.");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="flex items-center space-x-3 text-purple-600 dark:text-purple-400 font-medium">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent dark:border-purple-400"></div>
          <span>Loading your profile...</span>
        </div>
      </div>
    );
  }

  // Format timestamp safely
  const formattedLastLogin = profileData?.lastLoginAt?.toDate
    ? profileData.lastLoginAt.toDate().toLocaleString()
    : "N/A";

  // Pulled directly from Auth currentUser
  const initials = currentUser?.displayName
    ? currentUser.displayName.charAt(0).toUpperCase()
    : currentUser?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Navigation / Header Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/30 p-4 text-center text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* Top Decorative Banner */}
          <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 relative" />

          {/* User Section Overlay */}
          <div className="relative px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 mb-6 gap-4">
              
              {/* Avatar (Rendered from Auth currentUser) */}
              <div className="relative">
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Avatar"
                    className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-gray-900 shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg ring-4 ring-white dark:ring-gray-900">
                    {initials}
                  </div>
                )}
              </div>

              {/* Name & Email Header (Rendered from Auth currentUser) */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentUser?.displayName || "No Display Name"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
              </div>
            </div>

            {/* EDIT MODE FORM */}
            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/avatar.png"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(currentUser?.displayName || "");
                      setPhotoURL(currentUser?.photoURL || "");
                    }}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* READ-ONLY VIEW */
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                      User ID
                    </span>
                    <code className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                      {currentUser?.uid}
                    </code>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                      Last Active
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {formattedLastLogin}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-6 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  Log Out
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}