<?php

namespace Mimachh\TwoFactor\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class TwoFactorToken extends Model
{
    protected $table = 'two_factor_tokens';

    protected $fillable = ['token', 'email', 'expires_at'];

}