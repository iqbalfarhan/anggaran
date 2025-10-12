<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiLoginRequest;
use App\Http\Requests\ApiProfileRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function user()
    {
        return Auth::user()->load(['projects.transaksis']);
    }

    public function login(ApiLoginRequest $request)
    {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            return response([
                'user' => Auth::user(),
                'token' => Auth::user()->createToken('auth_token')->plainTextToken
            ], 200);
        }

        return response([
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function profile(ApiProfileRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();
        return $user->update($data);
    }
}
