<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventManagementController extends Controller
{
    /**
     * Menampilkan daftar semua event untuk Admin.
     */
    public function index()
    {
        return Inertia::render('Admin/Events/Index', [
            'events' => Event::withCount('users')->latest()->get()
        ]);
    }

    /**
     * Menampilkan form untuk membuat event baru.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    /**
     * Menyimpan event baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'event_date' => 'required|date',
            'quota' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('events', 'public');
        }

        Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'event_date' => $request->event_date,
            'quota' => $request->quota,
            'image' => $imagePath,
            'status' => 'upcoming',
            'views' => 0,
        ]);

        return redirect()->route('admin.events.index')->with('message', 'Event berhasil dipublikasikan!');
    }

    /**
     * Menampilkan detail event dan daftar relawan yang mendaftar.
     */
    public function show($id)
    {
        /**
         * PENTING: findOrFail akan otomatis melempar error 404
         * jika ID tidak ada di database.
         */
        $event = Event::with(['users' => function($query) {
            $query->withPivot('status', 'created_at');
        }])->findOrFail($id);

        return Inertia::render('Admin/Events/Show', [
            'event' => $event,
            'registrants' => $event->users
        ]);
    }

    /**
     * Menyetujui atau Menolak pendaftaran relawan.
     */
    public function updateStatus(Request $request, $eventId, $userId)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected,pending'
        ]);

        $event = Event::findOrFail($eventId);

        // Update status di tabel pivot (many-to-many)
        $event->users()->updateExistingPivot($userId, [
            'status' => $request->status
        ]);

        return redirect()->back()->with('message', "Status pendaftaran diperbarui menjadi {$request->status}.");
    }

    /**
     * Menghapus event beserta gambarnya.
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        if ($event->image) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return redirect()->route('admin.events.index')->with('message', 'Event berhasil dihapus secara permanen.');
    }
}
