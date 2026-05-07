import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Nuragabuana';

createInertiaApp({
    // Judul halaman dinamis (Contoh: Beranda - Nuragabuana)
    title: (title) => title ? `${title} - ${appName}` : appName,

    // Resolver untuk mencari file di folder Pages (Case Sensitive untuk Linux)
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),

    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },

    // Konfigurasi Loading Bar di bagian atas layar saat pindah halaman
    progress: {
        color: '#16a34a', // Menggunakan warna hijau khas Nuragabuana
        showSpinner: true,
    },
});
