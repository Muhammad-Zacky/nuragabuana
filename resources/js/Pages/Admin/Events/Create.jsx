import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Upload, Save } from 'lucide-react';

export default function Create({ auth }) {
    // Inisialisasi useForm dari Inertia untuk handle input & file
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        event_date: '',
        quota: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Menggunakan metode post untuk mengirim data form + file
        post(route('admin.events.store'), {
            forceFormData: true, // Memastikan data dikirim sebagai FormData (wajib untuk upload file)
            onSuccess: () => reset(), // Reset form jika berhasil
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-4">
                    <Link href={route('admin.events.index')} className="text-gray-500 hover:text-green-600 transition">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="font-bold text-xl text-gray-800 leading-tight">Buat Kegiatan Baru</h2>
                </div>
            }
        >
            <Head title="Admin - Tambah Event" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">

                            {/* Judul Kegiatan */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Judul Event</label>
                                <input
                                    type="text"
                                    className={`w-full border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 ${errors.title ? 'border-red-500' : ''}`}
                                    placeholder="Contoh: Bakti Sosial Panti Asuhan Al-Falah"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1 font-medium">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tanggal Event */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Tanggal Pelaksanaan</label>
                                    <input
                                        type="date"
                                        className="w-full border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500"
                                        value={data.event_date}
                                        onChange={e => setData('event_date', e.target.value)}
                                    />
                                    {errors.event_date && <p className="text-red-500 text-xs mt-1 font-medium">{errors.event_date}</p>}
                                </div>

                                {/* Kuota Relawan */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Kuota Relawan (Orang)</label>
                                    <input
                                        type="number"
                                        className="w-full border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500"
                                        placeholder="0"
                                        value={data.quota}
                                        onChange={e => setData('quota', e.target.value)}
                                    />
                                    {errors.quota && <p className="text-red-500 text-xs mt-1 font-medium">{errors.quota}</p>}
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Deskripsi Kegiatan</label>
                                <textarea
                                    className="w-full border-gray-200 rounded-xl focus:ring-green-500 focus:border-green-500 h-32"
                                    placeholder="Jelaskan detail kegiatan, titik kumpul, dan persyaratan relawan..."
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
                            </div>

                            {/* Upload Gambar Poster */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Poster Kegiatan</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:border-green-500 transition-colors group">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-green-500 transition-colors" />
                                        <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-bold text-green-600 hover:text-green-500">
                                                <span>Upload file gambar</span>
                                                <input
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={e => setData('image', e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500 italic">PNG, JPG, JPEG up to 2MB</p>
                                        {data.image && <p className="text-xs text-green-600 font-bold mt-2 underline">File terpilih: {data.image.name}</p>}
                                    </div>
                                </div>
                                {errors.image && <p className="text-red-500 text-xs mt-1 font-medium">{errors.image}</p>}
                            </div>

                            {/* Tombol Simpan */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Save size={20} />
                                    <span>{processing ? 'Sedang Menyimpan...' : 'Simpan & Publikasikan Event'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
