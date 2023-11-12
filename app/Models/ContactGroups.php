<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactGroups extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'noofcontacts'];

}
