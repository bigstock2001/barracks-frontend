'use client';

import { useState, useEffect } from 'react';
import { authService } from '../lib/auth';

export default function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Check login status on component mount
  useEffect(() => {
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { user } = await authService.getCurrentUser();
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { user, session, error } = await authService.signIn(formData.email, formData.password);
    
    if (error) {
      if (error.includes('not configured')) {
        alert('Demo Mode: Authentication is not configured. This is a preview version.');
      } else {
        alert('Login failed: ' + error);
      }
    } else {
      setUser(user);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      alert('Successfully logged in!');
    }
    
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }
    
    const { user, error } = await authService.signUp(
      formData.email, 
      formData.password, 
      { name: formData.name }
    );
    
    if (error) {
      if (error.includes('not configured')) {
        alert('Demo Mode: Authentication is not configured. This is a preview version.');
      } else {
        alert('Registration failed: ' + error);
      }
    } else {
      setUser(user);
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      alert('Account created successfully! Please check your email to verify your account.');
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      alert('Logout failed: ' + error);
      return;
    }
    
    setUser(null);
    setIsLoggedIn(false);
    alert('Successfully logged out!');
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-300">
          Welcome, {user.user_metadata?.name || user.email}!
        </span>
        <a
          href="/account"
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors"
        >
          Account
        </a>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => openAuthModal('login')}
          className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
        >
          Login
        </button>
        <button
          onClick={() => openAuthModal('register')}
          className="bg-yellow-500 text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-yellow-400 transition-colors"
        >
          Register
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="••••••••"
                  required
                />
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (authMode === 'login' ? 'Login' : 'Create Account')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {authMode === 'login' 
                  ? "Don't have an account? Register here" 
                  : "Already have an account? Login here"
                }
              </button>
            </div>

            {authMode === 'login' && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  <strong>Secure Authentication:</strong> Your account is protected with Supabase authentication.
                  You'll receive an email verification link after registration.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}