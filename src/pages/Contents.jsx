import React, { useState } from 'react';
import { Plus, Filter, Trash2 } from 'lucide-react';

export default function Contents() {
  const [contents, setContents] = useState([
    { id: 1, title: 'Belajar React Dasar dalam 10 Menit', format_type: 'long_video', status: 'idea', priority: 'high', scheduled_date: '2026-10-25' },
    { id: 2, title: 'Tips Styling Tailwind CSS Biar Rapi', format_type: 'short_video', status: 'scripting', priority: 'medium', scheduled_date: '2026-10-28' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [formatType, setFormatType] = useState('long_video');
  const [priority, setPriority] = useState('medium');
  const [scheduledDate, setScheduledDate] = useState('');

  const [filterStatus, setFilterStatus] = useState('');
  const [filterFormat, setFilterFormat] = useState('');

  const handleCreateContent = (e) => {
    e.preventDefault();
    const newContent = {
      id: Date.now(),
      title,
      format_type: formatType,
      status: 'idea',
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

  const filteredContents = contents.filter(item => {
    return (
      (filterStatus === '' || item.status === filterStatus) &&
      (filterFormat === '' || item.format_type === filterFormat)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 bg-white border shadow-sm rounded-2xl border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Content Pipeline & Lifecycle</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola siklus hidup ide konten dari draf hingga rilis.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" /> Buat Konten Baru
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 bg-white border shadow-sm rounded-2xl border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
          <Filter className="w-4 h-4 text-indigo-600" /> Filter:
        </div>
        <select 
          className="px-3 py-2 text-xs font-medium border rounded-xl bg-slate-50"
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
          className="px-3 py-2 text-xs font-medium border rounded-xl bg-slate-50"
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

      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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
                  <td className="p-4 font-semibold text-slate-800">{item.title}</td>
                  <td className="p-4 text-xs font-medium capitalize text-slate-600">{item.format_type.replace('_', ' ')}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-50 text-indigo-600 uppercase">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      item.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-medium text-slate-500">{item.scheduled_date || '-'}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-sm font-medium text-center text-slate-400">Belum ada data konten yang sesuai filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 space-y-4 bg-white shadow-xl rounded-2xl">
            <h3 className="text-lg font-bold text-slate-800">Buat Draf Ide Konten Baru</h3>
            <form onSubmit={handleCreateContent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600">Judul Konten</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Tutorial Next.js v15"
                  className="w-full px-3 py-2 mt-1 text-sm border rounded-xl bg-slate-50"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600">Format</label>
                  <select 
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-xl bg-slate-50"
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
                  <label className="block text-xs font-semibold uppercase text-slate-600">Prioritas</label>
                  <select 
                    className="w-full px-3 py-2 mt-1 text-sm border rounded-xl bg-slate-50"
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
                <label className="block text-xs font-semibold uppercase text-slate-600">Target Rilis</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 mt-1 text-sm border rounded-xl bg-slate-50"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
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