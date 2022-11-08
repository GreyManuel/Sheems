<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'name'=>$this->name,
            'email'=>$this->email,
            'company_email' => $this->company_email,
            'writer_number' => $this->writer_number,
            'national_id' => $this->national_id,
            'role' => $this->role,
            'phone_number' => $this->phone_number,
            'token' => $this->createToken('API Token')->plainTextToken
        ];
    }
}
