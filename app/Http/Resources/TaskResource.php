<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'id'=>$this->id,
            'writer_id'=>$this->writer_id,
            'admin_id'=>$this->admin_id,
            'task_number'=>$this->task_number,
            'title'=>$this->title,
            'description'=>$this->description,
            'requirements'=>$this->requirements,
            'amount'=>$this->amount,
            'delivery_time'=>$this->delivery_time,
            'status'=>$this->status,
            'task_images'=>$this->task_images,
            'task_documents'=>$this->task_documents,
            'task_comments'=>$this->task_comments,
            'updated_at'=>$this->updated_at,
            'created_at'=>$this->created_at,

        ];
    }
}
