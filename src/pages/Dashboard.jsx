import React, { useEffect, useState } from 'react';
import { Video, Layers, CheckCircle, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [role, setRole] = useState('creator');

  useEffect(() => {
    const activeRole = localStorage.getItem('user_role') || 'creator';
    setRole(activeRole);
  }, []);

  const stats = [
    { title: 'Total Konten', value: '24', icon: <Video className="w-6 h-6 text-indigo-600" />, change: '+4 minggu ini' },
    { title: 'Channel Terhubung', value: '3', icon: <Layers className="w-6 h-6 text-purple-600" />, change: 'YouTube, TikTok, IG' },
    { title: 'Konten Published', value: '15', icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, change: '62.5% success rate' },
    { title: 'Akses Role', value: role.toUpperCase(), icon: <Users className="w-6 h-6 text-amber-600" />, change: 'Sesi Aktif' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Ringkasan */}
      <div className="p-6 bg-white border shadow-sm rounded-2xl border-slate-200/80">
        <h1 className="text-xl font-bold text-slate-800">Dashboard Analytics & Overview</h1>
        <p className="mt-1 text-sm text-slate-500">Ringkasan performa konten dan status pipeline berdasarkan sesi role akunmu.</p>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-between p-6 bg-white border shadow-sm rounded-2xl border-slate-200/80">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">{stat.title}</p>
              <h3 className="mt-1 text-2xl font-black text-slate-800">{stat.value}</h3>
              <p className="mt-1 text-xs font-medium text-slate-500">{stat.change}</p>
            </div>
            <div className="p-3 border bg-slate-50 rounded-xl border-slate-100">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Chart & Info Role */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="p-6 space-y-4 bg-white border shadow-sm lg:col-span-2 rounded-2xl border-slate-200/80">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
            <TrendingUp className="w-5 h-5 text-indigo-600" /> Distribusi Status Pipeline
          </h3>
          <div className="pt-2 space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="text-slate-600">Idea & Scripting</span>
                <span className="font-bold text-slate-800">35%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="text-slate-600">Recording & Editing (Produksi)</span>
                <span className="font-bold text-slate-800">45%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="text-slate-600">Ready & Published</span>
                <span className="font-bold text-slate-800">20%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 bg-white border shadow-sm rounded-2xl border-slate-200/80">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
            <Users className="w-5 h-5 text-indigo-600" /> Hak Akses Role
          </h3>
          <div className="p-4 space-y-2 text-xs leading-relaxed border bg-slate-50 rounded-xl border-slate-200/60 text-slate-600">
            <p className="text-sm font-bold capitalize text-slate-800">Role Saat Ini: {role}</p>
            <p>Sistem otomatis menyesuaikan fitur berdasarkan token sesi role yang tersimpan saat login.</p>
          </div>
        </div>
      </div>
    </div>
  );
}