<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransaksiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'date' => 'nullable',
            'type' => 'required|string|max:255',
            'price' => 'required|numeric',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'description' => 'required|string',
        ];
    }
}
