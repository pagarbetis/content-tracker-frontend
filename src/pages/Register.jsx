import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register data:", { name, email, password });
    alert("Registrasi Berhasil! Silakan Login.");
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border shadow-md rounded-xl border-slate-100">
        <h2 className="text-2xl font-bold text-center text-slate-800">Daftar Akun Kreator</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@domain.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 text-white transition rounded-md bg-slate-900 hover:bg-slate-800"
          >
            Daftar
          </button>
        </form>
        <p className="text-sm text-center text-slate-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}