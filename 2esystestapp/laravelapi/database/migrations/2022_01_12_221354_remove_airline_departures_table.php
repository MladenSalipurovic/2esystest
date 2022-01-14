<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveAirlineDeparturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('airline_departures', function (Blueprint $table) {
            $table->dropForeign('airline_departures_airline_id_foreign');
            $table->dropForeign('airline_departures_airport_from_id_foreign');
            $table->dropForeign('airline_departures_airport_to_id_foreign');
        });

        Schema::dropIfExists('airline_departures');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('airline_departures', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('airline_id');
            $table->foreign('airline_id')->references('id')->on('airlines');

            $table->unsignedBigInteger('airport_from_id');
            $table->foreign('airport_from_id')->references('id')->on('airports');

            $table->unsignedBigInteger('airport_to_id');
            $table->foreign('airport_to_id')->references('id')->on('airports');

            $table->timestamps();
        });
    }
}
