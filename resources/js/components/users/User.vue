<template>
    <div>
        <div class="d-flex flex-row align-items-center justify-content-center p-4" v-if="loading">
            <div class="spinner-border spinner-border-sm" role="status" style="height: 100px; width: 100px;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-center p-4" v-else-if="error">
            <h6 class="m-0 fw-bold">
                Something went wrong
            </h6>
        </div>
        <div
            class="d-flex flex-column align-items-center"
            v-else
        >
            <b-avatar
                size="15rem"
                :src="`../../../../storage/profile/${user.profile}`"
            ></b-avatar>
            <small class="mt-2">
                {{ allShifts.find(shift => shift.id === user.shift_id).name }}
            </small>
            <hr class="w-50 mx-auto">
            <h1>
                {{ user.name }}
            </h1>
            <h6>
                {{ user.from }} &#8226; {{ user.phone_number}}
            </h6>
            <div class="container d-flex flex-row align-items-center justify-content-between">
                <vs-button success flat v-if="isClockedIn === false" @click="clockIn()" :disabled="ongoingShift === false" :loading="clock.loading">
                    <h6 class="m-0 fw-bold d-flex flex-row align-items-center">
                        <i class="fa-duotone fa-timer fa-2x"></i>
                        <span class="m-2">
                            Clock In
                        </span>
                    </h6>
                </vs-button>
                <vs-button success flat v-else @click="clockOut()" :loading="clock.loading">
                    <h6 class="m-0 fw-bold d-flex flex-row align-items-center">
                        <i class="fa-duotone fa-timer fa-2x"></i>
                        <span class="m-2">
                            Clock Out
                        </span>
                    </h6>
                </vs-button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    props:{
        slug:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
            loading: true,
            error: false,
            user:{},
            clock: {
                loading:false
            }
        }
    },
    computed:{
        ...mapGetters(['allUsers', 'allShifts', 'ongoingShift']),
        isClockedIn(){
            if(this.currentSession.start === null){
                return false
            }else{
                return true;
            }
        },
        currentSession(){
            return this.user.attendances.find(attendance => attendance.session_id === this.ongoingShift.ongoing_session);
        }
    },
    methods: {
        clockIn() {
            this.clock.loading = true

            this.$store.dispatch('checkIn', this.user.id).then(response => {
                this.$router.push({ name: 'clock' });
                this.openNotification(`<h5 class='m-0'>User</h5>`, `<h6 class='m-0'>Clocked In successfully</h6>`);
            })
        },
        clockOut(){
            this.clock.loading = true

            this.$store.dispatch('checkOut', this.user.id).then(response => {
                this.$router.push({ name: 'clock' });
                this.openNotification(`<h5 class='m-0'>User</h5>`, `<h6 class='m-0'>Clocked out successfully</h6>`);
            })
        },
        openNotification(title, text) {
            const notification = this.$vs.notification({
                title,
                text
            });
        }
    },
    async mounted() {
        try {
            this.user = await this.allUsers.find(item => item.id === this.slug);
            this.loading = false;
        }
        catch(error){
            this.error = true;
        }
    }
}
</script>
