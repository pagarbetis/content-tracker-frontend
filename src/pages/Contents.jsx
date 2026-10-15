import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';

export default function Contents() {
  const navigate = useNavigate();
  
  // State data konten (Mock data sesuai tabel contents di PDF)
  const [contents, setContents] = useState([
    { id: 1, title: 'Belajar React Dasar dalam 10 Menit', format_type: 'long_video', status: 'idea', priority: 'high', scheduled_date: '2026-10-25' },
    { id: 2, title: 'Tips Styling Tailwind CSS Biar Rapi', format_type: 'short_video', status: 'scripting', priority: 'medium', scheduled_date: '2026-10-28' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [formatType, setFormatType] = useState('long_video');
  const [priority, setPriority] = useState('medium');
  const [scheduledDate, setScheduledDate] = useState('');

  // Filter state
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFormat, setFilterFormat] = useState('');

  const handleCreateContent = (e) => {
    e.preventDefault();
    const newContent = {
      id: Date.now(),
      title,
      format_type: formatType,
      status: 'idea', // Status awal wajib 'idea' sesuai dokumen[cite: 2, 4]
      priority,
      scheduled_date: scheduledDate || null
    };
    setContents([...contents, newContent]);
    setTitle('');
    setScheduledDate('');
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setContents(contents.filter(item => item.id !== id));
  };

  // Filter logic
  const filteredContents = contents.filter(item => {
    return (
      (filterStatus === '' || item.status === filterStatus) &&
      (filterFormat === '' || item.format_type === filterFormat)
    );
  });

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header & Navigation */}
        <div className="flex items-center justify-between p-6 bg-white border shadow-sm rounded-xl border-slate-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/channels')}
              className="p-2 transition rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Content Pipeline & Lifecycle</h1>
              <p className="text-sm text-slate-500">Kelola siklus hidup ide kontenmu dari awal hingga publikasi[cite: 1, 8].</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4" /> Buat Konten Baru
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 p-4 bg-white border shadow-sm rounded-xl border-slate-100">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter className="w-4 h-4" /> Filter:
          </div>
          <select 
            className="px-3 py-1.5 border rounded-md text-sm bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="idea">Idea</option>
            <option value="scripting">Scripting</option>
            <option value="recording">Recording</option>
            <option value="editing">Editing</option>
            <option value="ready">Ready</option>
            <option value="published">Published</option>
          </select>

          <select 
            className="px-3 py-1.5 border rounded-md text-sm bg-white"
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
          >
            <option value="">Semua Format</option>
            <option value="short_video">Short Video</option>
            <option value="long_video">Long Video</option>
            <option value="carousel">Carousel</option>
            <option value="single_post">Single Post</option>
          </select>
        </div>

        {/* Table List Konten */}
        <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-semibold uppercase border-b bg-slate-50 border-slate-100 text-slate-500">
                <th className="p-4">Judul Konten</th>
                <th className="p-4">Format</th>
                <th className="p-4">Status</th>
                <th className="p-4">Prioritas</th>
                <th className="p-4">Target Rilis</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredContents.length > 0 ? (
                filteredContents.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-800">{item.title}</td>
                    <td className="p-4 capitalize text-slate-600">{item.format_type.replace('_', ' ')}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 uppercase">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                        item.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{item.scheduled_date || '-'}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Belum ada data konten yang sesuai filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal Buat Konten Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl">
            <h3 className="text-lg font-bold text-slate-800">Buat Draf Ide Konten Baru</h3>
            <form onSubmit={handleCreateContent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Judul / Topik Konten</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Belajar Next.js dari Nol"
                  className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Format</label>
                  <select 
                    className="w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md"
                    value={formatType}
                    onChange={(e) => setFormatType(e.target.value)}
                  >
                    <option value="short_video">Short Video</option>
                    <option value="long_video">Long Video</option>
                    <option value="carousel">Carousel</option>
                    <option value="single_post">Single Post</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Prioritas</label>
                  <select 
                    className="w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Target Rilis (Scheduled Date)</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
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
                  Simpan Draf
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}