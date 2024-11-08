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




Côté shadcn : 
npx shadcn@latest add button input label input-otp
npm i zustand


# Installation

```php
composer require mimachh/2fa
```

Add the trait to the user model 
```php
use Mimachh\TwoFactor\HasTwoFactor;

use HasTwoFactor;
```

Publish the migrations and migrate.

```php
php artisan vendor:publish --tag=2fa-migrations

php artisan migrate
```

### Validation
To validate the code you need to add in the LoginRequest of Breeze (if you use Breeze) :
```php
'code_2fa' => ['nullable', 'string', 'size:6'],
```

### Routing
Replace your breeze (in auth.php) or custom route login by 
```php
Route::post('/login', [TwoFactorController::class, 'store'])->name('login.2fa');
```

### UI
You can use the inertia/react login (and register, confirmation mail etc) from the package, publishing them.
You need : ShadcnUI + Inertia + React + Zustand

```php
php artisan vendor:publish --tag=2fa-assets
```

Then install shadcn component + zustand library and use it in your own page and component.

```sh
npx shadcn@latest add button input label input-otp
npm i zustand
```

```tsx
import LoginForm from '@/Components/mimachh/2fa/login/LoginForm';

 <LoginForm />
```

### Mail 
You need to send email with the 2fa code.

First publish the mail view : 
```sh
php artisan vendor:publish --tag=2fa-mail
```

Now email will work.