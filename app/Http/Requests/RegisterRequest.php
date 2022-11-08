<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'phone_number' => 'required',
            'company_email' => 'required',
            'english_proficiency' => 'required',
            'pricing' => 'required',
            'description' => 'required',
            'niche' => 'required',
            'niche_expirience' => 'required',
            'daily_word_count' => 'required',
            'national_id' => 'required'
        ];
    }
}
