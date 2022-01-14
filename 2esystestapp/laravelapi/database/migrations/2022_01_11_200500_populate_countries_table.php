<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Country;

class PopulateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Country::insert([
            [
                'country_name' => 'Anguilla',
                'country_code' => 'AI / AIA',
            ],
            [
                'country_name' => 'Bahrain',
                'country_code' => 'BH / BHR',
            ],
            [
                'country_name' => 'Bulgaria',
                'country_code' => 'BG / BGR',
            ],
            [
                'country_name' => 'Cyprus',
                'country_code' => 'CY / CYP',
            ],
            [
                'country_name' => 'Denmark',
                'country_code' => 'DK / DNK',
            ],
            [
                'country_name' => 'Egypt',
                'country_code' => 'EG / EGY',
            ],
            [
                'country_name' => 'Ethiopia',
                'country_code' => 'ET / ETH',
            ],
            [
                'country_name' => 'Ghana',
                'country_code' => 'GH / GHA',
            ],
            [
                'country_name' => 'Hungary',
                'country_code' => 'HU / HUN',
            ],
            [
                'country_name' => 'Japan',
                'country_code' => 'JP / JPN',
            ],
            [
                'country_name' => 'Mexico',
                'country_code' => 'MX / MEX',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \DB::table('countries')->delete();
    }
}
