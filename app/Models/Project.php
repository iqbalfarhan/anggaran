<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    // protected $table = 'projects';

    /*
    protected $fillable = [
        'name',
        'description',
        'user_id'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $appends = [
        'counts',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaksis()
    {
        return $this->hasMany(Transaksi::class);
    }

    public function scopeOwned($query)
    {
        return $query->where('user_id', auth()->id());
    }

    public function getCountsAttribute()
    {
        return [
            'pemasukan' => $this->transaksis()->pemasukan()->sum('price'),
            'pengeluaran' => $this->transaksis()->pengeluaran()->sum('price'),
            'sisa' => $this->transaksis()->pemasukan()->sum('price') - $this->transaksis()->pengeluaran()->sum('price'),
        ];
    }
}
