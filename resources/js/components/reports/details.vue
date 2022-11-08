<template>
    <div>
        <div
            v-if="loading"
            class="d-flex flex-row justify-content-center align-items-center p-2 m-2"
        >
            <div class="spinner-border spinner-border-sm" role="status" style="height: 70px; width: 70px;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <h4 class="fw-bold text-muted p-2">
                Sessions
            </h4>
            <div class="d-flex flex-row">
                <router-link
                    v-for="(session, index) in sessions"
                    :key="session.id"
                    class="text-decoration-none"
                    :to="{ name: 'shiftDetails', query: { session: session.id }}"
                >
                    <vs-button danger flat :active="$route.query.session ? $route.query.session.includes(session.id) : false">
                        <h6 class="fw-bold m-0 pt-1">
                            Session {{ index + 1 }}
                        </h6>
                    </vs-button>
                </router-link>

            </div>
            <div class="p-2" v-if="selectedSession">
                <div>
                    <div class="d-flex flex-column flex-md-row align-items-center">
                        <h6 class="m-0 fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-hourglass-start"></i>
                            <span class="m-2">
                                Started:
                            </span>
                        </h6>
                        <h6 class="m-0">
                            {{ formatDate(selectedSession.start) }}
                        </h6>
                    </div>
                    <div class="d-flex flex-column flex-md-row align-items-center">
                        <h6 class="m-0 fw-bold d-flex flex-row align-items-center">
                            <i class="fa-duotone fa-hourglass-end"></i>
                            <span class="m-2">
                               Ended:
                            </span>
                        </h6>
                        <h6 class="m-0">
                            {{ formatDate(selectedSession.end) }}
                        </h6>
                    </div>
                    <div class="p-2 d-flex flex-row align-items-center">
                        <div class="text-center m-2">
                            <i class="fa-duotone fa-users fa-2x"></i>
                            <vs-button
                                warn
                                circle
                                icon
                                @click="showSession('attendees')"
                                :disabled="sessionAttendees.length === 0"
                            >
                                <span class="display-6 pt-1">
                                    {{ sessionAttendees.length < 10 ? `0${sessionAttendees.length}` : sessionAttendees.length }}
                                </span>
                            </vs-button>
                            <h6 class="m-0 fw-bold">
                                   Attendees
                            </h6>
                        </div>
                        <div class="text-center m-2">
                            <i class="fa-duotone fa-ban fa-2x"></i>
                            <vs-button
                                danger
                                circle
                                icon
                                flat
                                @click="showSession('defaulters')"
                                :disabled="sessionDefaulters.length === 0"
                            >
                                <span class="display-6 pt-1">
                                    {{ sessionDefaulters.length < 10 ? `0${sessionDefaulters.length}` : sessionDefaulters.length }}
                                </span>
                            </vs-button>
                            <h6 class="m-0 fw-bold">
                                Defaulters
                            </h6>
                        </div>
                        <div class="text-center m-2">
                            <i class="fa-duotone fa-user-large-slash fa-2x"></i>
                            <vs-button
                                dark
                                circle
                                icon
                                flat
                                @click="showSession('absentees')"
                                :disabled="sessionAbsentees.length === 0"
                            >
                                <span class="display-6 pt-1">
                                    {{ sessionAbsentees.length < 10 ? `0${sessionAbsentees.length}` : sessionAbsentees.length }}
                                </span>
                            </vs-button>
                            <h6 class="m-0 fw-bold">
                                Absentees
                            </h6>
                        </div>
                    </div>
                    <h6 class="p-3">
                        Click to show more information
                    </h6>
                    <router-view
                        :attendees="sessionAttendees"
                        :absentees="sessionAbsentees"
                        :defaulters="sessionDefaulters"
                        :key="$route.path"
                    ></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    export default {
        props: {
            slug: {
                type: String,
                required: false
            }
        },
        data(){
            return{
                text: 'lorem',
                loading: true,
                active: []
            }
        },
        computed:{
            ...mapGetters(['sessions', 'sessionsUsers']),
            selectedSession(){
                if(this.$route.query.session){
                    return this.sessions.find(session => session.id === this.$route.query.session);
                }
            },
            sessionAttendees(){
                if(this.$route.query.session){
                    return this.sessionsUsers.filter(user => {
                        let attendance = user.attendances.find(attendance => attendance.session_id === this.$route.query.session);
                        if(attendance !== undefined){
                            if(attendance.start !== null && attendance.end !== null){
                                return true;
                            }
                        }
                        return false;
                    });
                }
            },
            sessionAbsentees(){
                if(this.$route.query.session){
                    return this.sessionsUsers.filter(user => {
                        let attendance = user.attendances.find(attendance => attendance.session_id === this.$route.query.session);
                        if(attendance !== undefined){
                            if(attendance.start == null && attendance.end == null){
                                return true;
                            }
                        }
                        return false;
                    });
                }
            },
            sessionDefaulters(){
                if(this.$route.query.session){
                    return this.sessionsUsers.filter(user => {
                        let attendance = user.attendances.find(attendance => attendance.session_id === this.$route.query.session);
                        if(attendance !== undefined){
                            if(attendance.start !== null && attendance.end == null){
                                return true;
                            }
                        }
                        return false;
                    });
                }
            }
        },
        mounted() {

            let globalThis = this;

            this.$nextTick(function (){
                this.$store.dispatch('getSessions', globalThis.slug).then(reponse => {
                    globalThis.loading = false
                });
            });
        },
        methods:{
            formatDate(date){
                return new Date(Date.parse(date)).toLocaleDateString('en-US', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour12: true,
                    hour: '2-digit',
                    minute: 'numeric'
                });
            },
            showSession(value){
                if(!this.$route.query.users){
                    if(this.$route.query.users !== value){
                        this.$router.push({ name: 'userReports', params: { type: value }, query: { session: this.$route.query.session }});
                    }
                }
            }
        }
    }
</script>
