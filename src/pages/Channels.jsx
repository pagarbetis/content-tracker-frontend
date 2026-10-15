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
      case 'youtube': return <Video className="w-6 h-6 text-red-600" />;
      case 'tiktok': return <Share2 className="w-6 h-6 text-slate-800" />;
      case 'instagram': return <Globe className="w-6 h-6 text-pink-600" />;
      case 'linkedin': return <Globe className="w-6 h-6 text-blue-600" />;
      default: return <Globe className="w-6 h-6 text-slate-600" />;
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