<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransaksiRequest extends FormRequest
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
            'description' => 'nullable|string',
            'project_id' => 'required|integer|exists:projects,id',
        ];
    }
}
