<?php
declare(strict_types=1);

namespace Mimachh\TwoFactor\Http\Actions;

use App\Models\User;
use Illuminate\Http\Request;
use Mimachh\TwoFactor\Models\TwoFactorToken;
use Mimachh\TwoFactor\Models\TwoFactorConfirmation;

class TwoFactorActions
{
    public function __construct()
    {
        // Code here
    }

    public function handle(Request $request)
    {
        $code = $request->code_2fa;
        $user = User::where('email', $request->email)->first();
        
        if($user->hasTwoFactor()) {
      
            if(isset($code)) {
                $token = $this->getTwoFactorTokenByEmail($user);
                if(!$token) {
                    throw new \Exception("Token not found");
                }
                if($token->token != $code) {
                    throw new \Exception("Invalid code");
                }
                // si expires_at < now
                if($token->expires_at < now()) {
                    throw new \Exception("Token expired");
                }
                
                $token->delete();
                $existingConfirmation = $this->getTwoConfirmationByUserId($user->id);
                
                
                if($existingConfirmation) {
                    $existingConfirmation->delete();
                }

                $createConfirmation = TwoFactorConfirmation::create([
                    'user_id' => $user->id,
                    'id' => $token->token
                ]);   
            
            } else {
                $token = $this->generateTwoFactorToken($user);
                // send it by mail
                return $token->token;
                throw new \Exception("Waiting for code" . $token);
            }     
        }
    }


    private function getTwoFactorTokenByEmail(User $user): mixed
    {
        $token = TwoFactorToken::where('email', $user->email)->first();
        return $token ?? null;
    }

    private function generateTwoFactorToken(User $user): TwoFactorToken
    {
        $token = random_int(100_000, 1_000_000);
        $expires = date('Y-m-d H:i:s', strtotime('+5 minutes')); 

        $existingToken = $this->getTwoFactorTokenByEmail($user);

        if($existingToken) {
            TwoFactorToken::where('email', $user->email)->delete();
        }

        $twoFactorToken = TwoFactorToken::create([
            'token' => $token,
            'email' => $user->email,
            'expires_at' => $expires
        ]);

        return $twoFactorToken;
    }
    private function getTwoConfirmationByUserId(int $userId): mixed
    {
        $confirmation = TwoFactorConfirmation::where('user_id', $userId)->first();
        return $confirmation ?? null;
    }
}
