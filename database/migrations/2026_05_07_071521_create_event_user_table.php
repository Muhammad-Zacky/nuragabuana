<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_user', function (Blueprint $table) {
            $table->id();

            // Menghubungkan ID Relawan (dari tabel users) dan ID Kegiatan (dari tabel events)
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Disinilah letak fitur ACC ketat yang kamu mau. Defaultnya 'pending'. Admin nanti bisa ubah jadi 'approved' atau 'rejected'
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_user');
    }
};
