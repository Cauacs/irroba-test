<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'telefone' => 'required|regex:/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/
',
            'crm' => 'required|unique:users|regex:/^\d{6}$/'
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['name'] = $user->name;

        return response()->json(['success' => $success], 200);
    }

    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->accessToken;
            $success['name'] = $user->name;

            return response()->json(['success' => $success], 200);
        }
        else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
    }

    public function userDetails()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], 200);
    }
}
