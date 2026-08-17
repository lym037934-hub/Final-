import { useAuth } from '../Hook/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <div className="flex items-center gap-4 mb-8">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-2xl">
              {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-lg font-semibold">
              {currentUser.displayName || 'No name set'}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;