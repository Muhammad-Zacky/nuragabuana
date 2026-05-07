<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * Kolom yang dapat diisi secara massal (Mass Assignment).
     */
    protected $fillable = [
        'title',
        'description',
        'event_date',
        'quota',
        'image',
        'status',
        'views', // Tambahan kolom views untuk counter
    ];

    /**
     * Relasi Many-to-Many ke tabel Users (Relawan).
     * Menghubungkan event dengan relawan yang mendaftar.
     */
    public function users()
    {
        // Mengambil data status pendaftaran (pending/approved/rejected) dari tabel pivot
        return $this->belongsToMany(User::class)
                    ->withPivot('status')
                    ->withTimestamps();
    }

    /**
     * Scope untuk memudahkan pengambilan event yang sedang aktif/mendatang.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming')->where('event_date', '>=', now());
    }

    /**
     * Helper untuk mendapatkan jumlah relawan yang sudah di-ACC (Approved).
     */
    public function getApprovedCountAttribute()
    {
        return $this->users()->wherePivot('status', 'approved')->count();
    }
}
