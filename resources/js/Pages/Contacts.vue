<script setup>
import ContactsTable from '@/Components/ContactsTable.vue';
import ContactGroupTable from '@/Components/ContactGroupTable.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Contacts</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <ContactsTable />                
            </div>
        </div>
    </AuthenticatedLayout>
</template>
