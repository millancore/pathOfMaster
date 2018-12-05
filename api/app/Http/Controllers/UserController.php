<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $response = array(
            "response" => true,
            "token" => "1BF2A38E20C193004AB4207F4A20B99D84C8CED9"
        );

        print(json_encode($response));
    }
}
