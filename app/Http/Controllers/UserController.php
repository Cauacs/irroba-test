<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $users = User::all();
        return response()->json(['data' => $users], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        
        return response()->json(['data' => $user], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email|unique:users,email,'.$id,
            'password' => 'sometimes|required',
            'telefone' => 'sometimes|required|regex:/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $data = $request->only(['name', 'email', 'password', 'telefone']);
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        
        $user->update($data);
        
        return response()->json(['data' => $user], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if($paciente->agendamentos()->exists()){
            return response()->json(['error' => 'Não é possivel excluir um usuário com agendamentos'], 409);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);

    }
}
