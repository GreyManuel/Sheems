<template>
    <div class="shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold">
            <i class="fa-duotone fa-users"></i>
            Users Overview
        </h4>
        <div v-if="ongoingShift === false" class="p-3">
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
        <div
            class="p-3"
            v-else
        >
            <vs-alert warn>
                <template #icon>
                    <i class="fa-duotone fa-timer fa-2x"></i>
                </template>
                <template #title>
                    <h4 class="m-0 fw-bold">
                        Ongoing Shift :
                        <span class="text-muted">
                            {{ ongoingShift.name }}
                        </span>
                    </h4>
                </template>
                <div>
                    <div class="d-flex flex-row align-items-center">
                        <h6 class="m-0 fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-clock fa-2x"></i>
                            <span class="m-2">
                                Started:
                            </span>
                        </h6>
                        <timeago
                            :datetime="new Date(Date.parse(ongoingShift.session.start))"
                            :auto-update="60"
                        ></timeago>
                    </div>
                    <div class="d-flex flex-row align-items-center">
                        <h6 class="m-0 fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-circle-check fa-2x"></i>
                            <span class="m-2">
                                Checked In:
                            </span>
                        </h6>
                        Checked in {{ clockedInUsers.length }} of {{ shiftUsers.length }}
                    </div>
                    <div class="d-flex flex-row align-items-center p-2">
                        <vs-button
                            dark
                            @click="endShift(ongoingShift.id)"
                        >
                            <h6 class="fw-bold m-0">
                                <i class="fa-duotone fa-ban"></i>
                                <span class="p-1">
                                    End Shift
                                </span>
                            </h6>
                        </vs-button>
                        <vs-button
                            dark
                            @click="goToNext(ongoingShift.id)"
                        >
                            <h6 class="fw-bold m-0">
                                <i class="fa-duotone fa-ban"></i>
                                <i class="fa-duotone fa-forward"></i>
                                <span class="p-1">
                                    End Shift and Commence {{ allShifts.find(shift => shift.id !== ongoingShift.id).name }}
                                </span>
                            </h6>
                        </vs-button>
                    </div>
                </div>
            </vs-alert>
        </div>
        <div class="d-flex flex-row mb-3">
            <router-link :to="{ name: 'homeAll' }"  class="text-decoration-none">
                <vs-button danger flat :active="$route.path.includes('all')">
                    <h6 class="m-0  fw-bold">
                        <i class="fa-duotone fa-users"></i>
                        All Users
                    </h6>
                </vs-button>
            </router-link>
            <router-link :to="{ name: 'clock' }" class="text-decoration-none">
                <vs-button danger flat :active="$route.path.includes('clock')">
                    <h6 class="m-0 fw-bold">
                        <i class="fa-duotone fa-list-check"></i>
                        Clock In Users
                    </h6>
                </vs-button>
            </router-link>
        </div>
        <div>
            <transition>
                <router-view :key="$route.path"></router-view>
            </transition>
        </div>
        <b-modal
            id="add-user"
            centered
            hide-footer
            hide-header-close
            title-html="<h4 class='fw-bold m-2'><i class='fa-duotone fa-plus'></i> Add User</h4>"
            content-class="template-modal"
            header-class="template-modal-header"
        >
            <form
                @submit.stop.prevent
                id="createUserForm"
                method="post"
            >
                <!--      Token        -->
                <input hidden name="_token" :value="csrfToken"/>

                <div class="d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                    <div>
                        <h6 class="fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-signature fa-2x"></i>
                            <span class="m-2">Name</span>
                        </h6>
                        <vs-input type="text" name="name" v-model="createForm.name"></vs-input>
                    </div>
                    <div>
                        <h6 class="fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-at fa-2x"></i>
                            <span class="m-2">Email</span>
                        </h6>
                        <vs-input type="email" name="email" v-model="createForm.email"></vs-input>
                    </div>
                </div>
                <div class="mb-3 container p-3">
                    <h6 class="fw-bold d-flex flex-row align-items-center justify-content-center">
                        <i class="fa-duotone fa-user fa-2x"></i>
                        <span class="m-2">Profile</span>
                    </h6>
                    <input type="file" name="profile" ref="profile" class="form-control border-0" style="border-radius: 10px;"/>
                </div>
                <div class="d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                    <div>
                        <h6 class="fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-location-dot fa-2x"></i>
                            <span class="m-2">From</span>
                        </h6>
                        <vs-input type="text" name="from" v-model="createForm.from"></vs-input>
                    </div>
                    <div>
                        <h6 class="fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-phone fa-2x"></i>
                            <span class="m-2">Phone Number</span>
                        </h6>
                        <vs-input type="tel" name="phone_number"  v-model="createForm.phone"></vs-input>
                    </div>
                </div>
                <div class="d-flex flex-column flex-md-row align-items-center justify-content-evenly my-2 p-2">
                    <div class="flex-grow-1 m-2">
                        <h6 class="fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-user-group-crown fa-2x"></i>
                            <span class="m-2">Title</span>
                        </h6>
                        <select name="title" id="title"  v-model="createForm.title" class="form-control border-0" style="border-radius: 10px;">
                            <option value="0" selected>None</option>
                            <option value="1" >Pastor</option>
                            <option value="2" >Bishop</option>
                        </select>
                    </div>
                    <div class="flex-grow-1 m-2">
                        <h6 class="fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-phone fa-2x"></i>
                            <span class="m-2">Type</span>
                        </h6>
                        <select name="type" id="type"  v-model="createForm.type" class="form-control border-0" style="border-radius: 10px;">
                            <option value="1" >Shift Leader</option>
                            <option value="2" >Data Analyst</option>
                            <option value="3" selected>Member</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 container p-4">
                    <h6 class="fw-bold d-flex flex-row align-items-center">
                        <i class="fa-duotone fa-timer fa-2x"></i>
                        <span class="m-2">Shift</span>
                    </h6>
                    <vs-input type="text" name="shift"  v-model="createForm.shift" list="shift-list"></vs-input>
                    <datalist id="shift-list">
                        <option
                            v-for="(shift, index) in allShifts"
                            :selected="index === 0"
                            :key="index"
                        >
                            {{ shift.name }}
                        </option>
                    </datalist>
                </div>
                <div v-if="errors">
                    <h6 class="m-0 text-danger fw-bold">
                        Please fill all fields
                    </h6>
                </div>
                <div class="container d-flex flex-row justify-content-between align-items-center">
                    <vs-button
                        dark
                        flat
                        :loading="createForm.loading"
                        @click="createUser()"
                    >
                        <h6 class="m-0 fw-bold">
                            Create
                        </h6>
                    </vs-button>
                    <vs-button class="my-3" danger flat @click="$bvModal.hide('add-user')">
                        <h6 class="m-0 fw-bold">
                            <i class="fa-solid fa-times"></i>
                            Close
                        </h6>
                    </vs-button>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            shift:{
                loading: false
            },
            errors: false,
            createForm: {
                name: '',
                email: '',
                from: '',
                type: 3,
                title: 0,
                shift: '',
                phone: '',
                loading: false
            }
        }
    },
    mounted() {
        this.$store.dispatch('getShifts');
    },
    computed: {
        ...mapGetters(['allUsers', 'allShifts', 'ongoingShift','csrfToken']),
        shiftUsers(){
            return this.allUsers.filter(user => user.shift_id === this.ongoingShift.id);
        },
        clockedInUsers(){
            return this.shiftUsers.filter(user => {
                let attendance = user.attendances.find(item => item.session_id === this.ongoingShift.ongoing_session);

                if(attendance !== undefined){
                    if(attendance.start !== null && attendance.end == null){
                        return true;
                    }
                }else{
                    return false;
                }
            })
        }
    },
    methods: {
        createUser(){
            this.createForm.loading = true;

            this.errors = false;

            let {name, email, from, shift, phone} = this.createForm;

            if(name === '' || from === '' || shift === '' || phone === ''){
                this.errors = true;
                this.createForm.loading = false;
            }else{
                //Get form
                let form = document.querySelector('#createUserForm');

                let createForm = new FormData(form);

                let items = this.allShifts.find(item => item.name === shift.trim());

                createForm.append('shift', items.id);

                //Attach profile image
                createForm.append('profile', this.$refs.profile.files[0]);

                this.$store.dispatch('createUser', createForm).then(response => {
                    this.createForm = { name: '', email: '', from: '', shift: '', phone: '', loading: false};
                    this.createForm.loading = false;
                    this.$bvModal.hide('add-user');

                });
            }

        },
        startShift(shiftId){
            this.shift.loading = true;

            this.$store.dispatch('startShift', shiftId).then(response => {
                // console.log('start', response.data);
                this.shift.loading = false;
                window.location.reload();
            });
        },
        endShift(shiftId){
            this.shift.loading = true;

            this.$store.dispatch('endShift', shiftId).then(response => {
                // console.log('end', response.data);
                this.shift.loading = false;
                window.location.reload();
            });
        },
        goToNext(shiftId){
            let payload = {
                nextId:   this.allShifts.find(shift => shift.id !== shiftId).id,
                shiftId
            };

            this.$store.dispatch('goToNext', payload).then(response => {
                // console.log('next', response.data);
                window.location.reload();
            })
        }
    },
    watch: {

    }
}
</script>
<style>
    .template-modal {
        border-radius: 15px;
    }

    .template-modal-header {
        border: none;
    }
</style>
