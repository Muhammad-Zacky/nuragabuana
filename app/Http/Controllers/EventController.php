<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function show($id)
    {
        $event = Event::with('users')->findOrFail($id);

        // LOGIKA UTAMA: Tambah 1 view setiap kali fungsi ini dipanggil
        $event->increment('views');

        return Inertia::render('EventDetail', [
            'event' => $event,
            // Total yang daftar dihitung dari relasi users
            'total_registrants' => $event->users()->wherePivot('status', 'approved')->count()
        ]);
    }
}
