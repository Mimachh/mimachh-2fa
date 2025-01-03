<?php

namespace Mimachh\TwoFactor\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Mimachh\TwoFactor\Http\Actions\TwoFactorActions;
use Illuminate\Validation\ValidationException;

class TwoFactorController extends Controller
{

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        if (!Auth::validate($request->only('email', 'password'))) {
            return back()->withErrors(['email' => trans('auth.failed')])
                ->withInput();
        }


        try {
            $two = (new TwoFactorActions())->handle($request);
            // dd($two);
  
            if(isset($two["message"]) && $two['message'] == 'OK') {
                $request->authenticate();
                $request->session()->regenerate();
                return redirect()->intended(route('dashboard', absolute: false));
            }
            return back()->with(['status' => json_encode(['token' => $two])])->withInput();

        } catch (ValidationException $e) {
            // Renvoyer l'erreur d'authentification à la vue avec les anciennes valeurs
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            if($e->getMessage() == "Token not found" || $e->getMessage() == "Invalid code" || $e->getMessage() == "Token expired") {
                return back()->with(['status' => json_encode($e->getMessage())])->withInput();
            }
            return back()->with(['status' => json_encode($e->getMessage())])->withInput();
        }

       

        $request->authenticate();
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard', absolute: false));
    }

}
