<template>
    <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
        <header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div class="flex items-center gap-2">
                    <div class="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
                        M
                    </div>
                    <span class="text-lg font-semibold tracking-tight text-slate-900">
                        DNSC Motorpool
                    </span>
                </div>

                <div class="flex items-center gap-4">
                    <nav class="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                        <a href="#features" class="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#about" class="hover:text-blue-600 transition-colors">About</a>
                    </nav>
                    <button v-if="user" v-on:click="() => router.push('/')" class="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all">
                        Home
                    </button>
                    <button v-else @click="navigateToLogin"
                        class="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all">
                        Login
                    </button>
                </div>
            </div>
        </header>

        <main>
            <section class="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                        <div class="lg:col-span-6 text-center lg:text-left">
                            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                Modernizing Fleet & <br>
                                <span class="text-blue-600">Trip Management</span>
                            </h1>
                            <p class="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto lg:mx-0">
                                A centralized platform for the Executive Affairs Division to track vehicles in
                                real-time, automate trip tickets, and manage fuel consumption effortlessly.
                            </p>
                            <div class="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                                <button
                                    class="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
                                    Request a Vehicle
                                </button>
                                <a href="#features"
                                    class="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors">
                                    View Features <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>

                        <div class="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                            <div class="relative rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-slate-900/5">
                                <div
                                    class="aspect-[4/3] rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex flex-col items-center justify-center relative">
                                    <div
                                        class="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 opacity-50">
                                    </div>
                                    <div class="relative z-10 text-center space-y-4 w-3/4">
                                        <div class="h-8 w-full bg-white rounded-md shadow-sm border border-slate-100">
                                        </div>
                                        <div class="flex gap-4">
                                            <div
                                                class="h-32 w-1/3 bg-white rounded-md shadow-sm border border-slate-100">
                                            </div>
                                            <div
                                                class="h-32 w-2/3 bg-white rounded-md shadow-sm border border-slate-100 flex items-center justify-center">
                                                <span class="text-xs text-slate-400 font-medium">[ GPS Map Preview
                                                    ]</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="features" class="bg-white py-24 sm:py-32 border-t border-slate-100">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto max-w-2xl text-center">
                        <h2 class="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
                        <p class="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">System Capabilities
                        </p>
                    </div>

                    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div class="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">

                            <div
                                class="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
                                <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold leading-8 text-slate-900">Real-Time GPS Tracking</h3>
                                <p class="mt-4 text-sm leading-6 text-slate-600">Monitor vehicle locations during
                                    official trips to ensure authorized routing and exact departure times.</p>
                            </div>

                            <div
                                class="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
                                <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold leading-8 text-slate-900">Barcode Trip Tickets</h3>
                                <p class="mt-4 text-sm leading-6 text-slate-600">Automated digital trip tickets with
                                    unique barcodes for quick validation and paperless documentation.</p>
                            </div>

                            <div
                                class="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition-shadow">
                                <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                    <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold leading-8 text-slate-900">Analytics & Maintenance</h3>
                                <p class="mt-4 text-sm leading-6 text-slate-600">Track fuel consumption, monitor vehicle
                                    availability, and review repair history for informed decision-making.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@pages/auth/presentation/stores/useAuthStore'
const router = useRouter()

const { user } = useAuthStore()
const navigateToLogin = () => {
    router.push('/auth/login')
}
</script>