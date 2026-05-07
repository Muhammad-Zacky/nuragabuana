<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Fitur bawaan Vite untuk performa loading asset
        Vite::prefetch(concurrency: 3);

        /**
         * SHARING FLASH MESSAGES (Inertia)
         * Ini berguna agar pesan "Event Berhasil Dibuat" atau "Status Relawan Diperbarui"
         * dari Controller bisa langsung ditangkap dan ditampilkan di React.
         */
        Inertia::share([
            'flash' => function () {
                return [
                    'message' => Session::get('message'),
                    'error' => Session::get('error'),
                ];
            },
            // Bagikan data auth secara global jika diperlukan oleh komponen layout
            'auth' => function () {
                return [
                    'user' => auth()->user() ? [
                        'id' => auth()->user()->id,
                        'name' => auth()->user()->name,
                        'email' => auth()->user()->email,
                        'role' => auth()->user()->role,
                    ] : null,
                ];
            },
        ]);
    }
}
