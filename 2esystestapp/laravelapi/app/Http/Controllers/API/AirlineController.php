<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Airline;
use App\Models\Country;
use App\Models\AirportAirpline;

class AirlineController extends Controller
{
    public function index($id) 
    {
        $airlines = Airline::join('airport_airplines', 'airport_airplines.airline_id', 'airlines.id')
        ->join('airports', 'airport_airplines.airport_id', 'airports.id')
        ->join('countries', 'airlines.country_id', 'countries.id')
        ->select('airlines.*', 'countries.country_name')
        ->where('airport_airplines.airport_id', $id)
        ->get();

        return response()->json([
            'status' => 200,
            'airlines' =>$airlines,
        ]);
    }

    public function create()
    {
        $countries = Country::all();
        return response()->json([
            'status' => 200,
            'countries' => $countries,
        ]);
    }

    public  function store(Request $request, $id) 
    {
        $airline = new Airline;
        $airline->name = $request->input('name'); 
        $airline->country_id = $request->input('country_id');
        $airline->save();
        $airline_id = $airline->id;
        
        $airport_airpline = new AirportAirpline;
        $airport_airpline->airport_id = $id;
        $airport_airpline->airline_id = $airline_id;
        $airport_airpline->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Airline added Successfully',
        ]);
    }

    public function edit($id)
    {
        $airlines = Airline::find($id);
        $countries = Country::all();       
 
        return response()->json([
            'status' => 200,
            'airlines' => $airlines,
            'countries'=> $countries,
            
        ]);
    }

    public function update(Request $request, $id) 
    {
        $airlines = Airline::find($id);
        $airlines->name = $request->input('name'); 
        $airlines->country_id = $request->input('country_id');
        $airlines->update();
        
        return response()->json([
            'status' => 200,
            'message' => 'Airline updated Successfully',
        ]);
    }

    public function destroy($id, $idd) 
    {
        AirportAirpline::where([
            'airport_id' => $idd, 
            'airline_id' => $id,
        ])->delete();

        Airline::find($id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Airline deleted Successfully',
        ]);

    }
}
