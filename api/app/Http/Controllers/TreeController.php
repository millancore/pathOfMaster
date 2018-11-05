<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TreeController extends Controller
{
    public function add(Request $request)
    {   
        print(json_encode($request->all()));
    }

}