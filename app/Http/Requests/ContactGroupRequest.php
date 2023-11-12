<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, 
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:contact_groups|max:255',
            'description' => 'nullable|string',
            'noofcontacts' => 'integer|min:0',
        ];
    }
}
