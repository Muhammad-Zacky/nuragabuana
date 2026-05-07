import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Show({ auth, event, registrants }) {
    const { patch } = useForm();

    const handleStatus = (userId, newStatus) => {
        if (confirm(`Apakah anda yakin ingin mengubah status menjadi ${newStatus}?`)) {
            patch(route('admin.events.update-status', { event: event.id, user: userId }), {
                status: newStatus
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ACC Relawan: {event.title}</h2>}
        >
            <Head title="Detail Pendaftar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-bold">
                                <tr>
                                    <th className="p-4">Nama Relawan</th>
                                    <th className="p-4">Email / HP</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registrants.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="p-4 text-sm text-gray-500">{user.email} / {user.phone}</td>
                                        <td className="p-4 text-center">
                                            <StatusBadge status={user.pivot.status} />
                                        </td>
                                        <td className="p-4 flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleStatus(user.id, 'approved')}
                                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
                                                title="Setujui"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleStatus(user.id, 'rejected')}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                                                title="Tolak"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${styles[status]}`}>
            {status}
        </span>
    );
}
