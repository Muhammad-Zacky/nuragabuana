<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Membuat Akun Admin
        User::create([
            'name' => 'Admin Nuragabuana',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'), // Password default: password
            'phone' => '081234567890',
            'role' => 'admin', // Role Admin
        ]);

        // 2. Membuat Akun Relawan Contoh
        User::create([
            'name' => 'Relawan Padang',
            'email' => 'relawan@gmail.com',
            'password' => Hash::make('password'),
            'phone' => '089876543210',
            'role' => 'relawan', // Role Relawan
        ]);

        // (Opsional) Jika ingin membuat 10 relawan random secara otomatis
        // User::factory(10)->create(['role' => 'relawan']);
    }
}
