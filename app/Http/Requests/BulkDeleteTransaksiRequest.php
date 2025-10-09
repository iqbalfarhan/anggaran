<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkDeleteTransaksiRequest extends FormRequest
{
    /**
     * Determine if the transaksi is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'transaksi_ids' => 'required|array',
            'transaksi_ids.*' => 'exists:transaksis,id',
        ];
    }
}
