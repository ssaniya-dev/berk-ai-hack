import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasAccount, signInUser, createUser } from '../firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const accountExists = await hasAccount(email);
      if (accountExists) {
        await signInUser(email, password);
      } else {
        await createUser(email, password);
      }
      navigate('/main');
    } catch (error) {
      console.error('Error during authentication:', error);
      alert('Error during authentication. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 text-transparent bg-clip-text animate-gradient">Login / Sign Up</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-1">
          Don't have an account? Just sign up with your new credentials!{' '}
          {/* <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default Login;
