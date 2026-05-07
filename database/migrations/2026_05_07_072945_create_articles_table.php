<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul artikel
            $table->string('slug')->unique(); // URL ramah SEO (contoh: /berita/bakti-sosial-2026)
            $table->longText('content'); // Isi lengkap artikel
            $table->string('image')->nullable(); // Gambar cover (thumbnail)
            $table->boolean('is_published')->default(true); // Status rilis atau draft

            // Relasi ke pembuat artikel (Admin)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
