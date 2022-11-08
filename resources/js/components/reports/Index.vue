<template>
    <div class="shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold">
            <i class="fa-duotone fa-chart-network"></i>
            Reports
        </h4>
        <div class="p-3">
            <vs-alert warn>
                <template #icon>
                    <i class="fa-duotone fa-timer fa-2x"></i>
                </template>
                <template #title>
                    <h4 class="m-0 fw-bold">
                        Shifts
                    </h4>
                </template>
                <div>
                    <h5 class="m-0 text-center">
                        There is no ongoing shift. <br><br>
                        The ongoing shift will appear here.
                    </h5>
                    <div
                        v-if="shift.loading === false"
                        class="d-flex flex-column flex-md-row justify-content-center align-items-center p-2 m-2 mb-4"
                    >
                        <vs-button
                            v-for="shift in allShifts"
                            @click="startShift(shift.id)"
                            :key="shift.id"
                            dark
                        >
                            <h6 class="fw-bold m-0">
                                <i class="fa-duotone fa-play"></i>
                                <span class="p-1">
                                    Commence {{ shift.name }}
                                </span>
                            </h6>
                        </vs-button>
                    </div>
                    <div
                        v-else
                        class="d-flex flex-row justify-content-center align-items-center p-2 m-2"
                    >
                        <div class="spinner-border spinner-border-sm" role="status" style="height: 30px; width: 30px;">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </vs-alert>
        </div>
        <hr/>
        <div>
            <h3>
                Shift Details
            </h3>
            <div
                class="d-flex flex-row align-items-center"
            >
                <router-link
                    v-for="shift in allShifts"
                    :key="shift.id"
                    :to="{ name: 'shiftDetails', params: { slug: shift.id } }"
                    class="text-decoration-none"
                >
                    <vs-button danger :active="$route.path.includes(shift.id)">
                        <h6 class="m-0 fw-bold">
                            {{ shift.name }}
                        </h6>
                    </vs-button>
                </router-link>

            </div>
            <div class="p-2">
                <router-view :key="$route.path"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    data(){
        return{
            shift:{
                loading: false
            }

        }
    },
    computed:{
        ...mapGetters(['ongoingShift', 'allShifts'])
    },
    async created(){
        this.$store.dispatch('getShifts');


    },
    async mounted(){
        let globalThis = this;
        this.$nextTick(() => {
            // console.log(globalThis.allShifts);
            // globalThis.$store.dispatch('getSessions', globalThis.allShifts[0].id)
        })
        
    }
}
</script>
