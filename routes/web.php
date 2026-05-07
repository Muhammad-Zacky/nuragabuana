<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\EventManagementController;
use App\Models\Headline;
use App\Models\Article;
use App\Models\Event;
use App\Models\User;
use App\Models\Location;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'headlines' => Headline::where('is_active', true)->latest()->get(),
        'events' => Event::withCount('users')->latest()->take(3)->get(),
        'articles' => Article::with('author')->where('is_published', true)->latest()->take(3)->get(),
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_relawan' => User::where('role', 'relawan')->count(),
                'total_event'   => Event::count(),
                'total_artikel' => Article::count(),
                'total_lokasi'  => Location::count(),
            ]
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    |--------------------------------------------------------------------------
    | Admin Routes (Proteksi Role Admin)
    |--------------------------------------------------------------------------
    */
    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {

        // 1. Rute List Utama
        Route::get('/events', [EventManagementController::class, 'index'])->name('events.index');

        // 2. Rute Form Tambah (HARUS DI ATAS {id})
        Route::get('/events/create', [EventManagementController::class, 'create'])->name('events.create');
        Route::post('/events', [EventManagementController::class, 'store'])->name('events.store');

        // 3. Rute Detail (HARUS DI BAWAH create)
        Route::get('/events/{id}', [EventManagementController::class, 'show'])->name('events.show');

        // 4. Rute Aksi Status & Hapus
        Route::patch('/events/{event}/users/{user}/status', [EventManagementController::class, 'updateStatus'])->name('events.update-status');
        Route::delete('/events/{id}', [EventManagementController::class, 'destroy'])->name('events.destroy');
    });
});

require __DIR__.'/auth.php';
