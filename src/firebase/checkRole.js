import { auth } from "./firebase";

/**
 * Verifies if the currently logged-in Firebase user has an 'admin' role claim.
 * @returns {Promise<boolean>} Resolves to true if user is admin, false otherwise.
 */
export async function checkAdminStatus() {
  const user = auth.currentUser;
  
  if (!user) {
    console.log("Access denied: No user is currently logged in.");
    return false;
  }

  try {
    // Force refresh the token to retrieve updated custom claims
    const idTokenResult = await user.getIdTokenResult(true);

    if (idTokenResult.claims && idTokenResult.claims.role === "admin") {
      console.log("Access granted: User is an admin!");
      return true;
    } else {
      console.log("Access denied: User does not have an admin role.");
      return false;
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}