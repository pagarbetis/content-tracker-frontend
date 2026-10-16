import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  ShieldAlert,
  Edit3,
  Video
} from 'lucide-react';

export default function Dashboard() {
  const [role, setRole] = useState('creator');

  useEffect(() => {
    const savedRole = localStorage.getItem('user_role') || 'creator';
    setRole(savedRole);
  }, []);

  // --- RENDER VIEW BERDASARKAN ROLE ---
  
  // 1. ADMIN DASHBOARD
  if (role === 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Overview</h1>
          <p className="mt-1 text-xs text-slate-500">Pantau seluruh aktivitas sistem, pengguna, dan performa platform secara global.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">Total Pengguna</span>
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">24</p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">● 3 user baru minggu ini</span>
          </div>

          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">Total Channel</span>
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">12</p>
            <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">YouTube, TikTok, Instagram</span>
          </div>

          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">Total Konten</span>
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">86</p>
            <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">18 dalam proses editing</span>
          </div>

          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">System Status</span>
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">Normal</p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Uptime 99.9%</span>
          </div>
        </div>

        {/* System Logs */}
        <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
          <h3 className="mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">Aktivitas Sistem Terbaru</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 text-xs border-b border-slate-100">
              <span className="font-semibold text-slate-800">User <span className="text-indigo-600">@angga</span> mendaftarkan channel YouTube baru.</span>
              <span className="text-slate-400">10 menit lalu</span>
            </div>
            <div className="flex items-center justify-between py-2 text-xs border-b border-slate-100">
              <span className="font-semibold text-slate-800">Editor <span className="text-blue-600">@siti</span> mengubah status konten #12 menjadi "Ready to Publish".</span>
              <span className="text-slate-400">1 jam lalu</span>
            </div>
            <div className="flex items-center justify-between py-2 text-xs">
              <span className="font-semibold text-slate-800">Backup database otomatis berhasil dijalankan.</span>
              <span className="text-slate-400">5 jam lalu</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. EDITOR DASHBOARD
  if (role === 'editor') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Editor Workspace</h1>
          <p className="mt-1 text-xs text-slate-500">Daftar antrean tugas video dan konten yang memerlukan proses editing atau revisi.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">Antrean Masuk</span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">7</p>
            <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">Butuh tindakan segera</span>
          </div>

          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">Sedang Dikerjakan</span>
              <Edit3 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">3</p>
            <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">On Progress</span>
          </div>

          <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
            <div className="flex items-center justify-between mb-3 text-slate-500">
              <span className="text-xs font-bold tracking-wider uppercase">Selesai Minggu Ini</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">14</p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Target terpenuhi</span>
          </div>
        </div>

        {/* Task Queue Table */}
        <div className="overflow-hidden bg-white border shadow-xs rounded-xl border-slate-200">
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400">Antrean Tugas Editing</h3>
            <span className="text-xs font-semibold text-slate-500">Urut berdasarkan deadline</span>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="flex items-center justify-between p-4 transition hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-blue-600 rounded-lg bg-blue-50">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Tutorial Fullstack React & Express #3</p>
                  <p className="text-[11px] text-slate-500">Creator: Andi Angga • Deadline: Besok</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md text-[11px] font-bold">Reviewing</span>
            </div>

            <div className="flex items-center justify-between p-4 transition hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-blue-600 rounded-lg bg-blue-50">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Vlog Setup Keyboard Mechanical 2026</p>
                  <p className="text-[11px] text-slate-500">Creator: Budi Santoso • Deadline: 3 hari lagi</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-[11px] font-bold">In Editing</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. CREATOR DASHBOARD (DEFAULT)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Creator Dashboard</h1>
        <p className="mt-1 text-xs text-slate-500">Ringkasan performa konten, target rilis, dan pipeline produksi video Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
          <div className="flex items-center justify-between mb-3 text-slate-500">
            <span className="text-xs font-bold tracking-wider uppercase">Total Konten Saya</span>
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">12</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">+2 konten minggu ini</span>
        </div>

        <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
          <div className="flex items-center justify-between mb-3 text-slate-500">
            <span className="text-xs font-bold tracking-wider uppercase">Channel Terhubung</span>
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">3</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Aktif & Sinkron</span>
        </div>

        <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
          <div className="flex items-center justify-between mb-3 text-slate-500">
            <span className="text-xs font-bold tracking-wider uppercase">Jadwal Tayang Mendatang</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">4</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Siap rilis tepat waktu</span>
        </div>
      </div>

      {/* Recent Pipeline Activity */}
      <div className="p-5 bg-white border shadow-xs rounded-xl border-slate-200">
        <h3 className="mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">Status Konten Terbaru</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 text-xs border-b border-slate-100">
            <span className="font-semibold text-slate-800">Review Kodingan Fullstack Express #1</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-bold text-[10px]">Editing</span>
          </div>
          <div className="flex items-center justify-between py-2 text-xs border-b border-slate-100">
            <span className="font-semibold text-slate-800">Tips Optimasi Query MySQL & Indexing</span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-bold text-[10px]">Published</span>
          </div>
          <div className="flex items-center justify-between py-2 text-xs">
            <span className="font-semibold text-slate-800">Konfigurasi Tailwind CSS di React Vite</span>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded font-bold text-[10px]">Scripting</span>
          </div>
        </div>
      </div>
    </div>
  );
}