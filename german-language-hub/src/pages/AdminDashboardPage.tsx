import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock, Unlock, KeyRound, Search, Filter, Download, Trash2,
  RefreshCw, CheckCircle2, Clock, Phone, MapPin, GraduationCap,
  Calendar, ArrowLeft, ShieldCheck, Eye, EyeOff, AlertTriangle,
  FileSpreadsheet, Users, Sparkles, Sun, Moon, ExternalLink, X
} from 'lucide-react';
import { StudentRegistration, GermanLevel } from '../types';

interface AdminDashboardPageProps {
  onNavigateHome: () => void;
}

const DEFAULT_ADMIN_PASSWORD = 'admin0062';
const MAX_CAPACITY = 2000;

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigateHome }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('german_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Registrations state
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [batchFilter, setBatchFilter] = useState<string>('ALL');

  // Deletion modal state
  const [deleteCandidate, setDeleteCandidate] = useState<StudentRegistration | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch registrations from server API, falling back to localStorage
  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      // 1. Try server API
      const res = await fetch('/api/registrations');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.registrations) && data.registrations.length > 0) {
          setRegistrations(data.registrations);
          localStorage.setItem('german_registrations', JSON.stringify(data.registrations));
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Network or offline fallback
    }

    // 2. Fallback to localStorage
    try {
      const local = localStorage.getItem('german_registrations');
      if (local) {
        setRegistrations(JSON.parse(local));
      }
    } catch {
      // fallback
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    try {
      // Try server verify endpoint first
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });

      if (res.ok) {
        sessionStorage.setItem('german_admin_auth', 'true');
        setIsAuthenticated(true);
        setIsVerifying(false);
        return;
      }
    } catch {
      // If server unreachable, check client-side default password
    }

    // Fallback comparison with default password
    if (passwordInput.trim() === DEFAULT_ADMIN_PASSWORD) {
      sessionStorage.setItem('german_admin_auth', 'true');
      setIsAuthenticated(true);
      setIsVerifying(false);
      return;
    }

    setIsVerifying(false);
    setAuthError('Incorrect admin password. Please try again.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('german_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Handle Delete
  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);

    const targetId = deleteCandidate.id;

    // 1. Try deleting from server
    try {
      await fetch(`/api/registrations/${targetId}`, { method: 'DELETE' });
    } catch {
      // ignore
    }

    // 2. Update local state & localStorage
    const updated = registrations.filter((r) => r.id !== targetId);
    setRegistrations(updated);
    try {
      localStorage.setItem('german_registrations', JSON.stringify(updated));
      window.dispatchEvent(new Event('registration_updated'));
    } catch {
      // ignore
    }

    setIsDeleting(false);
    setDeleteCandidate(null);
    showToast(`Registration ${targetId} deleted successfully.`);
  };

  // Export to Excel / CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('No registrations available to export.');
      return;
    }

    const headers = [
      'Registration ID',
      'Full Name',
      'Age',
      'Gender',
      'WhatsApp Number',
      'City',
      'Country',
      'Highest Education',
      'Current German Level',
      'Target German Level',
      'Zoom Batch Time Slot',
      'Learning Purpose',
      'Submission Date & Time'
    ];

    const escapeCsv = (val: any) => {
      const str = String(val ?? '');
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = filteredRegistrations.map((r) => [
      escapeCsv(r.id),
      escapeCsv(r.fullName),
      escapeCsv(r.age),
      escapeCsv(r.gender),
      escapeCsv(r.whatsappNumber),
      escapeCsv(r.city),
      escapeCsv(r.country),
      escapeCsv(r.highestEducation || 'N/A'),
      escapeCsv(r.currentLevel),
      escapeCsv(r.targetLevel),
      escapeCsv(r.classTimeSlot),
      escapeCsv(r.learningReason),
      escapeCsv(new Date(r.createdAt).toLocaleString())
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `German_Language_Hub_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filteredRegistrations.length} registrations to CSV.`);
  };

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const search = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        r.fullName.toLowerCase().includes(search) ||
        r.whatsappNumber.toLowerCase().includes(search) ||
        r.city.toLowerCase().includes(search) ||
        r.id.toLowerCase().includes(search);

      const matchLevel = levelFilter === 'ALL' || r.targetLevel === levelFilter;
      const matchBatch =
        batchFilter === 'ALL' ||
        (batchFilter === 'Morning' && r.classTimeSlot.includes('Morning')) ||
        (batchFilter === 'Night' && r.classTimeSlot.includes('Night'));

      return matchSearch && matchLevel && matchBatch;
    });
  }, [registrations, searchTerm, levelFilter, batchFilter]);

  // Statistics
  const totalCount = registrations.length;
  const countA1 = registrations.filter((r) => r.targetLevel === 'A1').length;
  const countA2 = registrations.filter((r) => r.targetLevel === 'A2').length;
  const countB1 = registrations.filter((r) => r.targetLevel === 'B1').length;
  const countB2 = registrations.filter((r) => r.targetLevel === 'B2').length;
  const countMorning = registrations.filter((r) => r.classTimeSlot?.includes('Morning')).length;
  const countNight = registrations.filter((r) => r.classTimeSlot?.includes('Night')).length;
  const capacityPercent = Math.min(100, (totalCount / MAX_CAPACITY) * 100);

  // -------------------------------------------------------------
  // Render: Login Screen (if not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Back button */}
        <button
          onClick={onNavigateHome}
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Website</span>
        </button>

        <div className="w-full max-w-md bg-stone-950/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Header & German Crest */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-stone-700 shadow-lg flex flex-col ring-2 ring-amber-500/20">
              <div className="h-1/3 bg-[#111111] w-full" />
              <div className="h-1/3 bg-[#DE0000] w-full" />
              <div className="h-1/3 bg-[#FFCE00] w-full" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Protected Portal</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Admissions Desk Login
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Enter admin passcode to view student registrations & batch logs
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode 
                  autoFocus
                  required
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 text-sm font-semibold focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                />
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-lg active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-800/80 text-center text-[11px] text-stone-500">
            <span>Hint: Default passcode is </span>
            <code className="text-amber-400 font-mono font-bold bg-stone-900 px-1.5 py-0.5 rounded">admin0062</code>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Full Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-stone-950 border border-emerald-500 text-emerald-400 text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Brand & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              title="Return to public site"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-stone-700 flex flex-col shrink-0">
                <div className="h-1/3 bg-stone-950 w-full" />
                <div className="h-1/3 bg-red-600 w-full" />
                <div className="h-1/3 bg-amber-400 w-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Admin Admissions Dashboard
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                    Live Portal
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 hidden sm:block">
                  germanlanguagehub.online/admin • Managed by Ahmed Rajput Network
                </p>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchRegistrations}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              title="Refresh student list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              title="Export all rows to CSV/Excel"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden sm:inline">Export Excel / CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-red-950/60 text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-800/80 text-xs font-bold transition-all cursor-pointer"
              title="Sign out of admin"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Requirement 7: Total Count on Top Banner (Total Registrations: 1250 / 2000) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Registration Capacity & Quota
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Total Registrations: {totalCount} <span className="text-stone-500 font-semibold text-xl sm:text-2xl">/ {MAX_CAPACITY}</span>
                </h2>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Database capacity configured for 2000+ submissions across all Asian countries & worldwide students.
              </p>
            </div>

            {/* Quota Progress Meter */}
            <div className="w-full md:w-72 bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-stone-300">Admission Seats</span>
                <span className="text-amber-400">{capacityPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, capacityPercent)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1.5">
                <span>{totalCount} Enrolled</span>
                <span>{Math.max(0, MAX_CAPACITY - totalCount)} Seats Left</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 mt-5 pt-4 border-t border-stone-800/80">
            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
              <div className="text-[10px] font-bold text-stone-400 uppercase">Level A1</div>
              <div className="text-xl font-black text-white mt-0.5">{countA1}</div>
              <div className="text-[10px] text-stone-500">Beginners</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
              <div className="text-[10px] font-bold text-stone-400 uppercase">Level A2</div>
              <div className="text-xl font-black text-white mt-0.5">{countA2}</div>
              <div className="text-[10px] text-stone-500">Elementary</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
              <div className="text-[10px] font-bold text-stone-400 uppercase">Level B1</div>
              <div className="text-xl font-black text-white mt-0.5">{countB1}</div>
              <div className="text-[10px] text-stone-500">Intermediate</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
              <div className="text-[10px] font-bold text-stone-400 uppercase">Level B2</div>
              <div className="text-xl font-black text-white mt-0.5">{countB2}</div>
              <div className="text-[10px] text-stone-500">Professional</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
              <div className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-500" />
                <span>Morning Batch</span>
              </div>
              <div className="text-xl font-black text-white mt-0.5">{countMorning}</div>
              <div className="text-[10px] text-stone-500">10:00 AM – 11:00 AM</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
              <div className="text-[10px] font-bold text-indigo-400 uppercase flex items-center gap-1">
                <Moon className="w-3 h-3 text-indigo-400" />
                <span>Night Batch</span>
              </div>
              <div className="text-xl font-black text-white mt-0.5">{countNight}</div>
              <div className="text-[10px] text-stone-500">09:00 PM – 10:00 PM</div>
            </div>
          </div>
        </div>

        {/* Search, Filter & Quick Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Search by Name / WhatsApp / City */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, WhatsApp number, city, or ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter by Level */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-stone-400 uppercase mr-1">Level:</span>
            {['ALL', 'A1', 'A2', 'B1', 'B2'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Filter by Batch */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-400 uppercase mr-1">Batch:</span>
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs font-semibold focus:outline-hidden"
            >
              <option value="ALL">All Batches</option>
              <option value="Morning">Morning (10:00 AM)</option>
              <option value="Night">Night (09:00 PM)</option>
            </select>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredRegistrations.length}</strong> of{' '}
            <strong className="text-white">{registrations.length}</strong> total registrations
          </span>
          {filteredRegistrations.length !== registrations.length && (
            <button
              onClick={() => {
                setSearchTerm('');
                setLevelFilter('ALL');
                setBatchFilter('ALL');
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Requirement 4: Table with all fields */}
        {/* Full Name, WhatsApp, City, German Level, Zoom Batch, Learning Purpose, Date/Time */}
        {/* ------------------------------------------------------------- */}
        
        {/* Desktop & Tablet Table View */}
        <div className="hidden lg:block bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-900/90 text-stone-400 uppercase font-black tracking-wider text-[11px] border-b border-stone-800">
                <tr>
                  <th className="py-4 px-4">Student</th>
                  <th className="py-4 px-4">WhatsApp Contact</th>
                  <th className="py-4 px-4">City / Country</th>
                  <th className="py-4 px-4 text-center">Level</th>
                  <th className="py-4 px-4">Zoom Batch</th>
                  <th className="py-4 px-4">Learning Purpose</th>
                  <th className="py-4 px-4">Date / Time</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-stone-500">
                      <div className="max-w-xs mx-auto text-center space-y-2">
                        <Users className="w-8 h-8 text-stone-600 mx-auto" />
                        <p className="font-bold text-stone-400 text-sm">No registrations found</p>
                        <p className="text-xs text-stone-500">Try changing your search keywords or clearing filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((student) => {
                    const cleanPhone = student.whatsappNumber.replace(/\D/g, '');
                    const waLink = `https://wa.me/${cleanPhone}`;
                    const formattedDate = new Date(student.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    });
                    const formattedTime = new Date(student.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    });

                    return (
                      <tr key={student.id} className="hover:bg-stone-900/60 transition-colors group">
                        
                        {/* 1. Full Name + ID + Age/Gender */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-extrabold text-white text-sm">
                            {student.fullName}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 font-bold">
                              {student.id}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {student.age} yrs • {student.gender}
                            </span>
                          </div>
                          {student.highestEducation && (
                            <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-stone-500" />
                              <span>{student.highestEducation}</span>
                            </div>
                          )}
                        </td>

                        {/* 2. WhatsApp */}
                        <td className="py-4 px-4 align-top">
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold bg-emerald-950/40 hover:bg-emerald-900/60 px-2.5 py-1.5 rounded-xl border border-emerald-800/60 transition-colors"
                            title="Open WhatsApp Chat directly"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{student.whatsappNumber}</span>
                            <ExternalLink className="w-3 h-3 text-emerald-500 shrink-0" />
                          </a>
                        </td>

                        {/* 3. City & Country */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-stone-200">
                            {student.city}
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {student.country}
                          </div>
                        </td>

                        {/* 4. German Level */}
                        <td className="py-4 px-4 align-top text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-lg font-black text-xs shadow-xs ${
                              student.targetLevel === 'A1'
                                ? 'bg-stone-900 text-stone-100 border border-stone-700'
                                : student.targetLevel === 'A2'
                                ? 'bg-stone-800 text-amber-300 border border-stone-700'
                                : student.targetLevel === 'B1'
                                ? 'bg-red-600 text-white'
                                : 'bg-amber-500 text-stone-950 font-black'
                            }`}
                          >
                            {student.targetLevel}
                          </span>
                        </td>

                        {/* 5. Zoom Batch */}
                        <td className="py-4 px-4 align-top">
                          <div className="inline-flex items-center gap-1.5 font-bold text-xs">
                            {student.classTimeSlot?.includes('Morning') ? (
                              <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            ) : (
                              <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            )}
                            <span className="text-stone-200">
                              {student.classTimeSlot?.includes('Morning')
                                ? 'Morning (10 AM)'
                                : 'Night (09 PM)'}
                            </span>
                          </div>
                          <div className="text-[10px] text-stone-500 mt-0.5">Live on Zoom</div>
                        </td>

                        {/* 6. Learning Purpose */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <p className="text-stone-300 text-xs leading-snug line-clamp-2">
                            {student.learningReason}
                          </p>
                        </td>

                        {/* 7. Date / Time */}
                        <td className="py-4 px-4 align-top whitespace-nowrap text-stone-400">
                          <div className="font-medium text-stone-200">{formattedDate}</div>
                          <div className="text-[11px] text-stone-500">{formattedTime}</div>
                        </td>

                        {/* 8. Action: Delete */}
                        <td className="py-4 px-4 align-top text-right">
                          <button
                            onClick={() => setDeleteCandidate(student)}
                            className="p-2 rounded-xl bg-stone-900 hover:bg-red-950/80 text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-800 transition-colors cursor-pointer"
                            title="Delete this registration"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Friendly Card List (Small & Medium screens) */}
        <div className="lg:hidden space-y-3">
          {filteredRegistrations.length === 0 ? (
            <div className="p-8 text-center bg-stone-950 rounded-2xl border border-stone-800 text-stone-500">
              <Users className="w-8 h-8 text-stone-600 mx-auto mb-2" />
              <p className="font-bold text-stone-400 text-sm">No registrations found</p>
              <p className="text-xs text-stone-500">Try changing your search or filters.</p>
            </div>
          ) : (
            filteredRegistrations.map((student) => {
              const cleanPhone = student.whatsappNumber.replace(/\D/g, '');
              const waLink = `https://wa.me/${cleanPhone}`;
              const formattedDate = new Date(student.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={student.id}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-tight">
                        {student.fullName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                        <span className="font-mono text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded text-[11px]">
                          {student.id}
                        </span>
                        <span>{student.age} yrs • {student.gender}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg font-black text-xs shadow-xs ${
                        student.targetLevel === 'A1'
                          ? 'bg-stone-800 text-white'
                          : student.targetLevel === 'A2'
                          ? 'bg-stone-800 text-amber-300'
                          : student.targetLevel === 'B1'
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-500 text-stone-950'
                      }`}
                    >
                      {student.targetLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-stone-800/80">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block font-bold">Location</span>
                      <span className="font-semibold text-stone-200">{student.city}, {student.country}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase block font-bold">Zoom Batch</span>
                      <span className="font-semibold text-stone-200 flex items-center gap-1">
                        {student.classTimeSlot?.includes('Morning') ? (
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Moon className="w-3.5 h-3.5 text-indigo-400" />
                        )}
                        <span>{student.classTimeSlot?.includes('Morning') ? 'Morning 10 AM' : 'Night 9 PM'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-xs pt-1">
                    <span className="text-[10px] text-stone-500 uppercase block font-bold">Learning Purpose</span>
                    <p className="text-stone-300 text-xs leading-relaxed mt-0.5">
                      {student.learningReason}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                    <span className="text-[11px] text-stone-500">
                      {formattedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>

                      <button
                        onClick={() => setDeleteCandidate(student)}
                        className="p-1.5 rounded-xl bg-stone-900 text-stone-400 hover:text-red-400 border border-stone-800"
                        title="Delete registration"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-stone-950 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">
                  Delete Registration?
                </h3>
                <p className="text-xs text-stone-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1">
              <div className="text-stone-300 font-bold text-sm">{deleteCandidate.fullName}</div>
              <div className="text-stone-400">ID: {deleteCandidate.id} • Level: {deleteCandidate.targetLevel}</div>
              <div className="text-emerald-400 font-mono">{deleteCandidate.whatsappNumber}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold shadow-md cursor-pointer transition-all flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
