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
        } catch (ValidationException $e) {
            // Renvoyer l'erreur d'authentification à la vue avec les anciennes valeurs
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            // Gérer d'autres erreurs éventuelles
            return back()->with(['message' => $e->getMessage()])->withInput();
        }

       

        $request->authenticate();
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard', absolute: false));
    }

}
