import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, Users, ChevronRight, Plus, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Index({ auth, events }) {
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    // Otomatis hilangkan notifikasi setelah 3 detik
    useEffect(() => {
        if (flash.message || flash.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Event</h2>}
        >
            <Head title="Admin - Daftar Event" />

            {/* Notifikasi Melayang */}
            {showFlash && (flash.message || flash.error) && (
                <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className={`flex items-center p-4 rounded-2xl shadow-xl border ${flash.message ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                        {flash.message ? <CheckCircle2 className="mr-3 text-green-600" size={20} /> : <AlertCircle className="mr-3 text-red-600" size={20} />}
                        <p className="font-bold text-sm">{flash.message || flash.error}</p>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Header Card */}
                    <div className="bg-white shadow-sm sm:rounded-2xl p-6 border border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Semua Kegiatan</h3>
                                <p className="text-sm text-gray-500">Kelola jadwal relawan dan setujui pendaftaran di sini.</p>
                            </div>

                            <Link
                                href={route('admin.events.create')}
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-100 active:scale-95"
                            >
                                <Plus size={18} />
                                <span>Tambah Event</span>
                            </Link>
                        </div>

                        {/* List Event */}
                        <div className="space-y-4">
                            {events && events.length > 0 ? (
                                events.map((event) => (
                                    <Link
                                        key={event.id}
                                        href={route('admin.events.show', event.id)}
                                        className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:bg-green-50/50 hover:border-green-200 transition-all group"
                                    >
                                        <div className="flex items-center space-x-5">
                                            <div className="bg-green-100 p-3.5 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                <Calendar size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors">
                                                    {event.title}
                                                </h4>
                                                <div className="flex items-center text-sm text-gray-500 mt-1 font-medium">
                                                    <span className="bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md mr-3">
                                                        {new Date(event.event_date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-md uppercase text-[10px] font-black tracking-widest ${
                                                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {event.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-8">
                                            <div className="hidden sm:block text-right border-r border-gray-100 pr-8">
                                                <p className="text-lg font-black text-gray-900 leading-none">{event.users_count || 0}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Pendaftar</p>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded-full group-hover:bg-green-100 transition-colors">
                                                <ChevronRight className="text-gray-300 group-hover:text-green-600 transition-colors" size={20} />
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                /* Empty State */
                                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
                                        <Info size={32} />
                                    </div>
                                    <h4 className="text-gray-900 font-bold text-lg">Belum ada event</h4>
                                    <p className="text-gray-500 text-sm max-w-xs mx-auto mt-2">
                                        Klik tombol "Tambah Event" untuk mulai membuat agenda kegiatan Nuragabuana.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
