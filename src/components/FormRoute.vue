<script setup lang="ts">
import { Search, TrainFront, Pointer, LocateFixedIcon, ChevronUp, Bus, Train } from 'lucide-vue-next';


</script>
<template>
    <aside class="w-[35%] h-full p-6 z-20 flex flex-col">
    <div class="sidebar-glass h-full rounded-3xl p-8 flex flex-col custom-scroll overflow-y-auto">
        <div class="mb-10">
        <h1 class="text-4xl font-black text-slate-900 leading-tight mb-3">
                            Fluxo <br/>da Cidade <span class="text-blue-600">Moderna</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium tracking-wide">
                            Next-generation route intelligence for the modern commuter.
                        </p>
        </div>
        <div class="space-y-6 mb-10">
        <div class="space-y-3">
        <div class="relative group">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl"><Pointer class="text-blue-500" /></span>
        <input class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 font-medium transition-all" placeholder="Current Location" type="text"/>
        </div>
        <div class="flex justify-center -my-1 pb-4">
            <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shadow-sm">
            <span class="material-symbols-outlined text-lg"><ChevronUp class="text-blue-600" /></span>
            </div>
        </div>
        <div class="relative group">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl"><LocateFixedIcon class="text-blue-600" /></span>
        <input class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400 font-medium transition-all" placeholder="Enter Destination" type="text"/>
        </div>
        </div>
        <button class="w-full bg-blue-600 text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3">
        <span class="material-symbols-outlined text-lg">
            <Search class="text-white" />
        </span>
                            Ver Routa       
                        </button>
        </div>
        <div class="space-y-5">
            <div class="flex items-center justify-between">
                <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Selecionar Modo</h3>
                <span class="h-px bg-slate-200 flex-1 ml-4"></span>
            </div>
            <div class="grid grid-cols-1 gap-3">
            <div class="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-white cursor-pointer transition-all hover:border-blue-500 hover:shadow-md group">
                <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-2xl"><Bus class="text-blue-600 group-hover:text-white" /></span>
                </div>
                <div class="flex-1">
                    <p class="font-bold text-slate-900 text-sm">Express Bus</p>
                    <p class="text-[10px] text-slate-400 uppercase font-black tracking-wider">Every 8 mins</p>
                </div>
                <span class="material-symbols-outlined text-slate-300 text-lg">chevron_right</span>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-white cursor-pointer transition-all hover:border-blue-500 hover:shadow-md group">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <span class="material-symbols-outlined text-2xl"><Train class="text-blue-600 group-hover:text-white" /></span>
            </div>
            <div class="flex-1">
                <p class="font-bold text-slate-900 text-sm">Metro Line</p>
                <p class="text-[10px] text-slate-400 uppercase font-black tracking-wider">High Frequency</p>
            </div>
            <span class="material-symbols-outlined text-slate-300 text-lg">chevron_right</span>
            </div>
                <div class="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-white cursor-pointer transition-all hover:border-blue-500 hover:shadow-md group">
                    <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <span class="material-symbols-outlined text-2xl">
                            <TrainFront class="text-blue-600 group-hover:text-white" />
                        </span>
                    </div>
                    <div class="flex-1">
                        <p class="font-bold text-slate-900 text-sm">Intercity Train</p>
                        <p class="text-[10px] text-slate-400 uppercase font-black tracking-wider">Scheduled</p>
                    </div>
                    <span class="material-symbols-outlined text-slate-300 text-lg">chevron_right</span>
                </div>
            </div>
        </div>
        <div class="mt-auto pt-8">
            <div class="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-center gap-4">
            <div class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            <p class="text-xs font-bold text-blue-900">Real-time systems operational</p>
            </div>
        </div>
    </div>
</aside>
</template>