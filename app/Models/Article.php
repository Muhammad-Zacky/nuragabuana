<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'is_published',
        'user_id',
    ];

    // Relasi: Setiap artikel dimiliki oleh satu User (Admin)
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
