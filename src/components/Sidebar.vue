<script setup lang="ts">
import { CircleQuestionMarkIcon } from 'lucide-vue-next';
import SidebarLink from '@components/SidebarLink.vue';
import icsa_logo from '@assets/icsa_logo.png';
import { watch } from 'vue'
import { useAuth } from '@pages/auth/presentation/composables/useAuth';
import { ROUTES } from '@core/url_paths';

interface Props {
    sidebarWidth: string
    isSidebarOpen?: boolean
    isMobile: boolean
}

const props = defineProps<Props>();

watch(
    () => props.isSidebarOpen,
    (newVal) => {
        if (props.isMobile && newVal) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }
)

const { user } = useAuth()


</script>

<template>
    <aside class="left-0 inset-y-0 transition-all duration-300 shadow-2xl bg-white " :class="[
        props.sidebarWidth,
        props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        props.isMobile
            ? 'fixed z-40'
            : 'fixed z-30'
    ]">
        <div class="flex items-center gap-4 px-5 py-2 shadow-sm">
            <img :src="icsa_logo" alt="icsa_logo" width="40">
            <p class="text-xl font-semibold">MMS</p>
        </div>

        <!-- DUNGAG DUNGAGI RANI BAI. MAKITA RANI SA ROUTES ANG ILANG MGA PAGES -->
        <div class="overflow-y-auto h-[93vh]" v-if="user">
            <div class="space-y-1 px-2 py-2" v-if="user.role == 'admin'">
                <!-- NAVIGATION LINKS FOR ADMIN -->
                <SidebarLink :icon="CircleQuestionMarkIcon" label="Dashboard" :to="ROUTES.admin.dashboard" />
                <!-- SAMPLE IF MAG ADD KAG ANOTHER LINK -->
                <SidebarLink :icon="CircleQuestionMarkIcon" label="Sample Page for admin"
                    :to="ROUTES.admin.sample_page" />
            </div>

            <div class="space-y-1 px-2 py-2" v-else-if="user.role == 'advisor'">
                <!-- NAVIGATION LINKS FOR ADVISOR -->
                <SidebarLink :icon="CircleQuestionMarkIcon" label="Dashboard" :to="ROUTES.advisor.dashboard" />
            </div>

            <div class="space-y-1 px-2 py-2" v-else-if="user.role == 'driver'">
                <!-- NAVIGATION LINKS FOR DRIVER -->
                <SidebarLink :icon="CircleQuestionMarkIcon" label="Dashboard" :to="ROUTES.driver.dashboard" />
            </div>

            <div class="space-y-1 px-2 py-2" v-else-if="user.role == 'passenger'">
                <!-- NAVIGATION LINKS FOR PASSENGER -->
                <SidebarLink :icon="CircleQuestionMarkIcon" label="Dashboard" :to="ROUTES.passenger.dashboard" />
            </div>
        </div>
    </aside>
</template>