<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactGroups;
use Illuminate\Http\Request;

class ContactGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contactGroups = ContactGroups::all();
        return response()->json($contactGroups);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:contact_groups|max:255',
            'description' => 'nullable|string',
            'noofcontacts' => 'integer|min:0',
        ]);

        $contactGroup = ContactGroups::create($request->all());

        return response()->json($contactGroup, 201);
    }

    public function show(ContactGroups $contactGroup)
    {
        return response()->json($contactGroup);
    }

    public function update(Request $request, ContactGroups $contactGroup)
    {
        $request->validate([
            'name' => 'sometimes|required|unique:contact_groups,name,' . $contactGroup->id . '|max:255',
            'noofcontacts' => 'integer|min:0',
        ]);

        $contactGroup->update($request->all());

        return response()->json($contactGroup, 200);
    }

    public function destroy(ContactGroups $contactGroup)
    {
        $contactGroup->delete();

        return response()->json(null, 204);
    }
}
