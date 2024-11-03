<?php

namespace Mimachh\TwoFactor;

use Mimachh\TwoFactor\Models\TwoFactorConfirmation;

trait HasTwoFactor
{
    // Méthode appelée automatiquement par Laravel pour initialiser le trait
    public function initializeHasTwoFactor(): void
    {
        // Étendre dynamiquement $fillable pour inclure `is_two_factor_enabled`
        $this->mergeFillable(['is_two_factor_enabled']);
    }
    /**
     * Check if the user has two-factor authentication enabled.
     */
    public function hasTwoFactor(): bool
    {
        return (bool) $this->is_two_factor_enabled;
    }

    /**
     * Enable two-factor authentication for the user.
     */
    public function enableTwoFactor(): void
    {
        $this->update(['is_two_factor_enabled' => true]);
    }

    /**
     * Disable two-factor authentication for the user.
     */
    public function disableTwoFactor(): void
    {
        $this->update(['is_two_factor_enabled' => false]);
    }


    /**
     * Relations 
     */

    public function twoFactorConfirmation()
    {
        return $this->hasOne(TwoFactorConfirmation::class);
    }
}
