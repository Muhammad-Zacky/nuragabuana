<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Cek apakah user sudah terautentikasi
        // 2. Cek apakah user memiliki role 'admin'
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        /**
         * Jika bukan admin:
         * Kirimkan pesan error flash ke session agar bisa ditangkap
         * oleh AuthenticatedLayout (notifikasi melayang).
         */
        return redirect()->route('dashboard')->with('error', 'Akses ditolak! Halaman ini hanya untuk Administrator.');
    }
}
