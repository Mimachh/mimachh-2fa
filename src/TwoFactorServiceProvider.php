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
            __DIR__ . '/./resources/js/Components/auth' => resource_path('Components/mimachh-2fa'),
        ], '2fa-assets');
    }

    public function register()
    {
        //
    }
}
