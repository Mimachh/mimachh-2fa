<?php

namespace Mimachh\TwoFactor;

use Illuminate\Support\ServiceProvider;

class TwoFactorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/./database/migrations/' => database_path('migrations'),
        ], '2fa-migrations');

        $this->publishes([
            __DIR__ . '/./resources/js/Components/auth' => resource_path('js/Components/mimachh/2fa'),
            __DIR__ . '/./resources/js/hooks' => resource_path('js/hooks'),
        ], '2fa-assets');

        $this->publishes([
            __DIR__ . '/./resources/mail/mimachh' => resource_path('views/mail/mimachh'),
        ], '2fa-mail');

        // je publie le controller pour que l'utilisateur puisse le modifier
        $this->publishes([
            __DIR__ . '/./Http/Controllers/TwoFactorPublicController.php' => app_path('Http/Controllers/Mimachh/TwoFactorController.php'),
        ], '2fa-controllers');
    }

    public function register()
    {
        //
    }
}
