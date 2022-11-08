import axios from "axios"

export default{
    state: {
        /**
         * Users
         */
        users: [],

        /**
         * Shifts
         */
        shifts: [],
        sessions:{
            shiftId: '',
            data: [],
            users: []
        }
    },
    getters: {
        csrfToken(){
            return window.Laravel.csrfToken;
        },
        /**
         * Users
         */
        allUsers(state){
            return state.users;
        },

        /**
         * Shifts
         */
        allShifts(state){
            return state.shifts;
        },
        //Get ongoing shift
        ongoingShift(state){
            let ongoing = state.shifts.find(shift => shift.ongoing === 1);
            return ongoing === undefined ? false : ongoing;
        },
        sessions(state){
            return state.sessions.data;
        },
        sessionsUsers(state){
            return state.sessions.users
        }
    },
    mutations: {
        /**
         * Users
         */
        //Mutate users
        setUsers(state, payload){
            state.users = payload
        },

        /**
         * Shifts
         */
        //Mutate Shifts
        setShifts(state, payload){
            state.shifts = payload;
        },
        setSessions(state, payload){
            state.sessions.shiftId = payload.id;
            state.sessions.data = payload.sessions;
            state.sessions.users = payload.users;
        }
    },
    actions: {
        /**
         * Users
         */
        //Get users from api
        async getUsers(context){
            return await axios.get('/api/v1/user').then(response => {
                context.commit('setUsers', response.data);
            })
        },

        //Create a new user
        async createUser(context, payload){
            return await axios.post('/api/v1/user/create', payload, { headers: { "Content-Type" : "multipart/form-data" } }).then(response => {
                return response;
            });
        },

        //Update profile
        async updateProfile(context, payload){
            return await axios.post(`/api/v1/user/update/${payload.id}`, payload.data,{ headers: { "Content-type":"multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2) } }).then(response => {
                // console.log(response.data);
                return response;
            })
        },
        checkIn(context, payload){
            return axios.get(`/api/v1/user/check-in/${payload}`).then(res => {
                context.dispatch('getUsers');
                context.dispatch('getShifts');
                return res;
            });
        },
        checkOut(context, payload){
            return axios.get(`/api/v1/user/check-out/${payload}`).then(res => {
                context.dispatch('getUsers');
                context.dispatch('getShifts');
                return res;
            });
        },
        /**
         * Shifts
         */
        //Get shifts from api
        getShifts(context){
            return axios.get('/api/v1/shift').then(response => {
                context.commit('setShifts', response.data);
            });
        },

        //Get sessions
        getSessions(context, payload){
            return axios.get(`/api/v1/shift/sessions/${payload}`).then(response => {
                context.commit('setSessions', response.data);
            })
        },

        //end Shift
        endShift(context, payload){
            return axios.get(`/api/v1/shift/end/${payload}`).then(response => response).catch(error => error);
        },

        //Start Shift
        startShift(context, payload){
            return axios.get(`/api/v1/shift/start/${payload}`).then(response => response).catch(error => error);
        },

        //end and go to next shift
        goToNext(context, payload){
            return axios.get(`/api/v1/shift/end-and-go-to-next/${payload.shiftId}/${payload.nextId}`).then(response => response).catch(error => error);
        }
    }
};
