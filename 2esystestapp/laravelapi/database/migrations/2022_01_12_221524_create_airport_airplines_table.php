<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirportAirplinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('airport_airplines', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('airline_id');
            $table->foreign('airline_id')->references('id')->on('airlines');

            $table->unsignedBigInteger('airport_id');
            $table->foreign('airport_id')->references('id')->on('airports');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('airport_airplines', function (Blueprint $table) {
            $table->dropForeign('airport_airplines_airline_id_foreign');
            $table->dropForeign('airport_airplines_airport_id_foreign');
        });

        Schema::dropIfExists('airport_airplines');
    }
}
