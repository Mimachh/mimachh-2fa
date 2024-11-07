Désactiver la route par défaut de breeze

php artisan vendor:publish --tag=2fa-migrations

php artisan migrate

use the trait on user

ajouer la validation dans LoginRequest

Ajouter les éléments dans le controlleur de breeze



Ajoutr dans LoginRequest :           'code_2fa' => ['nullable', 'string', 'size:6'],


Ajouter dans auth.php la route :  Route::post('/login', [TwoFactorController::class, 'store'])->name('login.2fa');

et commenter la route login de breeze


pour importer les composants TSX :  php artisan vendor:publish --tag=2fa-assets


// TODO: il me restera à créer la vue
// TODO: il me restera à faire un job pour supprimer les token expirés. Une fois par jour probablement.


Pour utiliser la modal il faut zustand...donc le mettre en facultatif

Mettre en require shadcn / zustand / inertia / react