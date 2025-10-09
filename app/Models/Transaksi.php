<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;


class Transaksi extends Model implements HasMedia
{
    use HasFactory;
    
    use InteractsWithMedia;


    //protected $table = 'transaksis';

    /*
    protected $fillable = [
        'name',
        'date',
        'type',
        'price',
        'description'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public $casts = [
        'date' => 'date:Y-m-d',
        'price' => 'integer',
    ];

    public static $types = [
        'pemasukan',
        'pengeluaran',
    ];

    public function scopePemasukan($query)
    {
        return $query->where('type', 'pemasukan');
    }

    public function scopePengeluaran($query)
    {
        return $query->where('type', 'pengeluaran');
    }

    /**
     * Register media conversions.
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
