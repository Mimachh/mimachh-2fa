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

### Controller
If you need to have more control about the controller. You can publish it and customize it according to your needs.