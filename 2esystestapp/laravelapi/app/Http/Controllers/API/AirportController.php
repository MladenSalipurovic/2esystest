<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Airport;
use App\Models\Country;


class AirportController extends Controller
{

    public function index() 
    {
        $airports = Airport::join('countries', 'airports.country_id', 'countries.id')->select('airports.*', 'countries.country_name')->get();
        $countries = Country::all(); 
        return response()->json([
            'status' => 200,
            'airports' =>$airports,
            'countries'=> $countries,
        ]);
    }

    public  function store(Request $request) 
    {
        $airport = new Airport;
        $airport->name = $request->input('name'); 
        $airport->country_id = $request->input('country_id');
        $airport->latitude = $request->input('latitude');
        $airport->longitude = $request->input('longitude');
            // $airport->airlines = $request->input('airlines');  
        $airport->save();
        
        return response()->json([
            'status' => 200,
            'message' => 'Airport added Successfully',
        ]);
    }

    public function edit($id)
    {
        $airports = Airport::find($id);
        $countries = Country::all();       
 
        return response()->json([
            'status' => 200,
            'airports' => $airports,
            'countries'=> $countries,
            
        ]);
    }

    public function update(Request $request, $id) 
    {
        $airport = Airport::find($id);
        $airport->name = $request->input('name'); 
        $airport->country_id = $request->input('country_id');
        $airport->latitude = $request->input('latitude');
        $airport->longitude = $request->input('longitude');
            // $airport->airlines = $request->input('airlines');  
        $airport->update();
        
        return response()->json([
            'status' => 200,
            'message' => 'Airport updated Successfully',
        ]);
    }

    public function destroy($id) 
    {
        $airport = Airport::find($id)->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Airport deleted Successfully',
        ]);

    }
}
