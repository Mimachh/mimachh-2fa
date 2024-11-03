<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('two_factor_confirmations', function (Blueprint $table) {
            // $table->id();
            $table->string('id')->primary(); // cuid as primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique('user_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('two_factor_confirmations');
    }
};