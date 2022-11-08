<template>
    <div class="shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold"><i class="fa-duotone fa-chart-network"></i> Job Area</h4>
        <div class="p-1 mt-3">
            <router-link :to="{ name: 'create-jobs' }" v-if="userType === 1" class="text-decoration-none">
                <vs-button color="#6A8E7F">
                    <h6 class="m-0">
                        <i class="fa-duotone fa-layer-plus"></i>
                        Add Jobs
                    </h6>
                </vs-button>
            </router-link>

            <hr>
            <div class="container">
                <h5 class="d-flex flex-row justify-content-between align-items-center">
                    <span>Uploaded Jobs</span>
                    <vs-tooltip>
                        <vs-button color="warn" :loading="refresh">
                            <i class="fa-duotone fa-refresh"></i>
                        </vs-button>
                        <template #tooltip>
                            Refresh jobs
                        </template>
                    </vs-tooltip>
                </h5>

                <div class="p-1 mt-3">
                    <div class="d-flex flex-column flex-md-row">
                        <router-link class="text-decoration-none m-1"
                                     :to="{ name: 'jobDetails', params: { slug: 'pending' } }">
                            <vs-button color="dark" icon circle :active="active == 0" @click="active = 0"
                                       :loading="false">
                                <h6 class="m-0"><i class="fa-duotone fa-circle-arrow-up"></i>
                                    {{ userType === 1 ? 'Pending' : 'Available' }}</h6>
                            </vs-button>
                        </router-link>
                        <router-link class="text-decoration-none m-1"
                                     :to="{ name: 'jobDetails', params: { slug: 'ongoing' } }">
                            <vs-button color="#8AA399" icon circle :active="active == 1" @click="active = 1">
                                <h6 class="m-0"><i class="fa-duotone fa-circle-ellipsis"></i> Ongoing</h6>
                            </vs-button>
                        </router-link>
                        <router-link class="text-decoration-none m-1"
                                     :to="{ name: 'jobDetails', params: { slug: 'submitted' } }">
                            <vs-button color="#BEB2C8" icon circle :active="active == 2" @click="active = 2">
                                <h6 class="m-0"><i class="fa-duotone fa-circle-arrow-down"></i> Submitted</h6>
                            </vs-button>
                        </router-link>
                        <router-link class="text-decoration-none m-1"
                                     :to="{ name: 'jobDetails', params: { slug: 'completed' } }">
                            <vs-button color="success" icon circle :active="active == 3" @click="active = 3">
                                <h6 class="m-0"><i class="fa-duotone fa-circle-check"></i> Completed</h6>
                            </vs-button>
                        </router-link>
                        <router-link class="text-decoration-none m-1"
                                     :to="{ name: 'jobDetails', params: { slug: 'revisions' } }">
                            <vs-button color="warn" icon circle :active="active == 4" @click="active = 4">
                                <h6 class="m-0"><i class="fa-duotone fa-circle-exclamation-check"></i> Revisions</h6>
                            </vs-button>
                        </router-link>
                        <router-link class="text-decoration-none m-1"
                                     :to="{ name: 'jobDetails', params: { slug: 'cancelled' } }">
                            <vs-button color="danger" icon circle :active="active == 5" @click="active = 5">
                                <h6 class="m-0"><i class="fa-duotone fa-circle-exclamation"></i> Cancelled</h6>
                            </vs-button>
                        </router-link>
                    </div>
                    <router-view :key="display"></router-view>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            refresh: false,
            display: 0,
            active: 0,
            comment: '',
            action: {
                complete: false,
                revision: false
            }
        }
    },
    computed: {
        ...mapState(['jobs']),
        userType() {
            return window.Laravel.role;
        }
    },
    created() {
        let role = window.Laravel.role;
        if (role === 1) {
            this.$store.dispatch('getAdminJobs');
        } else {
            this.$store.dispatch('getWriterJobs');
        }
        let item = localStorage.getItem('active');
        if (item !== null) {
            this.active = JSON.parse(item);
        }
    },
    methods: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        },
        formatCurrency(amount) {
            return parseFloat(amount).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        },
        /**
         * Perform a job action
         */
        jobAction(action, task_id) {
            let payload = {
                action: action,
                task_id: task_id,
                data: {
                    comment: this.comment
                }
            };
            this.$store.dispatch('performJobAction', payload);
        },
        refreshJobs() {
            this.refresh = true;
            this.display = this.display++;
            this.refresh = false;
        }
    },
    watch: {
        active(value) {
            localStorage.setItem('active', JSON.stringify(value));
        }
    }
}
</script>

<style>

</style>
