<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Nama kegiatan
            $table->text('description'); // Deskripsi kegiatan
            $table->date('event_date'); // Tanggal pelaksanaan
            $table->integer('quota')->default(0); // Kuota jumlah relawan yang dibutuhkan
            $table->string('image')->nullable(); // Poster kegiatan
            $table->enum('status', ['upcoming', 'ongoing', 'completed'])->default('upcoming'); // Status kegiatan
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
