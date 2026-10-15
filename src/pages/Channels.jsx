import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Video, Share2, Globe, LogOut } from 'lucide-react';

export default function Channels() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([
    { id: 1, platform: 'youtube', handle_name: '@techcreator' },
    { id: 2, platform: 'tiktok', handle_name: '@creatorlife' }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platform, setPlatform] = useState('youtube');
  const [handleName, setHandleName] = useState('');

  const handleAddChannel = (e) => {
    e.preventDefault();
    const newChannel = {
      id: Date.now(),
      platform,
      handle_name: handleName
    };
    setChannels([...channels, newChannel]);
    setHandleName('');
    setIsModalOpen(false);
  };

const getPlatformIcon = (plat) => {
    switch (plat) {
      case 'youtube': 
        return (
          <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'instagram': 
        return (
          <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        );
      case 'tiktok': 
        return (
          <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        );
      case 'linkedin': 
        return (
          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      default: 
        return <Globe className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border shadow-sm rounded-xl border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Manajemen Channel Kreator</h1>
            <p className="text-sm text-slate-500">Kelola platform sosial media untuk tracking kontenmu[cite: 3].</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/contents')}
              className="px-4 py-2 text-sm font-medium transition rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              Ke Pipeline Konten
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>

        {/* List Channel */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {channels.map((ch) => (
            <div key={ch.id} className="flex items-center justify-between p-6 bg-white border shadow-sm rounded-xl border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-slate-50">
                  {getPlatformIcon(ch.platform)}
                </div>
                <div>
                  <h3 className="font-semibold capitalize text-slate-800">{ch.platform}</h3>
                  <p className="text-sm text-slate-500">{ch.handle_name}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Tombol Buka Modal Tambah Channel */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center p-6 transition border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-slate-400 hover:text-slate-600 bg-white/50"
          >
            <Plus className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">Tambah Channel Baru</span>
          </button>
        </div>
      </div>

      {/* Modal Tambah Channel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl">
            <h3 className="text-lg font-bold text-slate-800">Tambah Saluran Sosmed</h3>
            <form onSubmit={handleAddChannel} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Platform</label>
                <select 
                  className="w-full px-3 py-2 mt-1 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Handle Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="contoh: @techcreator"
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={handleName}
                  onChange={(e) => setHandleName(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white rounded-md bg-slate-900 hover:bg-slate-800"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}