import { useState, useEffect } from 'react';
import { checkAdminStatus } from '../firebase/checkRole'; // Adjust path to your firebase file

/**
 * Custom hook to check if the authenticated user has an 'admin' role.
 * @param {Object|null} currentUser - The current user object from AuthContext
 * @returns {{ isAdmin: boolean, loading: boolean }}
 */
export const useAdminStatus = (currentUser) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyAdmin = async () => {
      if (!currentUser) {
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const status = await checkAdminStatus();
        if (isMounted) {
          setIsAdmin(status);
        }
      } catch (error) {
        console.error('Failed to verify admin status:', error);
        if (isMounted) {
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyAdmin();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  return { isAdmin, loading };
};