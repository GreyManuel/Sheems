<template>
    <div>
        <div class="d-flex flex-row align-items-center justify-content-center p-4" v-if="loading">
            <div class="spinner-border spinner-border-sm" role="status" style="height: 100px; width: 100px;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <div class="my-3 d-flex flex-row justify-content-end">
                <vs-button danger flat v-b-modal.add-user>
                    <h6 class="m-0 fw-bold">
                        <i class="fa-duotone fa-plus"></i>
                        Add a User
                    </h6>
                </vs-button>
            </div>
            <div v-if="allUsers.length === 0" class="p-3 m-2">
                No users yet
            </div>
            <div v-else>
                <h6>
                    Click on a user to view attendance history
                </h6>
                <vs-table :key="tableKey">
                    <template #header>
                        <vs-input block v-model="search" border danger placeholder="Search" />
                    </template>
                    <template #thead>
                        <vs-tr class="text-capitalize">
                            <vs-th>
                                <h6 class="m-0 mx-auto fw-bold">Avatar</h6>
                            </vs-th>
                            <vs-th>
                                <h6 class="m-0 mx-auto fw-bold">Name</h6>
                            </vs-th>
                            <vs-th>
                                <h6 class="m-0 mx-auto fw-bold">From</h6>
                            </vs-th>
                            <vs-th>
                                <h6 class="m-0 mx-auto fw-bold">Phone Number</h6>
                            </vs-th>
                            <vs-th>
                                <h6 class="m-0 mx-auto fw-bold">User Number</h6>
                            </vs-th>
                            <vs-th>
                                <h6 class="m-0 mx-auto fw-bold">Type</h6>
                            </vs-th>
                            <vs-th sort @click="users = $vs.sortData($event ,users, 'shift_id')">
                                <h6 class="m-0 mx-auto fw-bold">Shift</h6>
                            </vs-th>
                        </vs-tr>
                    </template>
                    <template #tbody>
                        <vs-tr
                            v-for="(user, index) in $vs.getPage($vs.getSearch(users, search), pagination.page, pagination.max)"
                            :key="index"
                        >
                            <vs-td>
                                <b-avatar :src="`../../../../storage/profile/${user.profile}`"></b-avatar>
                            </vs-td>
                            <vs-td>
                                <h6 class="m-0 text-center mx-auto" style="width: 150px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                                   {{ user.title == 1 ? 'Pastor ' :user.title == 2 ? 'Bishop' : '' }}
                                    {{ user.name }}
                                </h6>
                            </vs-td>
                            <vs-td>
                                <h6 class="m-0 text-center mx-auto" style="width: 200px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                                    {{ user.from }}
                                </h6>
                            </vs-td>
                            <vs-td>
                                <h6 class="m-0 p-1 text-center mx-auto" style="width: 250px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                                    {{ user.phone_number }}
                                </h6>
                            </vs-td>
                            <vs-td>
                                <h6 class="m-0 p-1 text-center mx-auto" style="width: 250px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                                    {{ user.user_number }}
                                </h6>
                            </vs-td>
                            <vs-td>
                                <h6 class="m-0 p-1 text-center mx-auto" style="width: 250px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                                    <span class="badge bg-warning p-2" v-if="user.type == 1">
                                        Shift Leader
                                    </span>
                                    <span class="badge bg-success p-2" v-else-if="user.type == 2">
                                        Data Analyst
                                    </span>
                                    <span class="badge bg-dark p-2" v-else-if="user.type == 3">
                                        Member
                                    </span>
                                </h6>
                            </vs-td>
                            <vs-td>
                                <h6 class="m-0 text-center mx-auto">
                                    {{ allShifts.find(shift => shift.id === user.shift_id).name }}
                                </h6>
                            </vs-td>
                            <template #expand>
                                <div class="container py-3 bg-light shadow border rounded-3">
                                    <h6 class="fw-bold">
                                        <i class="fa-duotone fa-clock-rotate-left"></i>
                                        Attendance History
                                    </h6>
                                    <div class="p-2">
                                        <h6 class="text-muted">
                                            Options
                                        </h6>
                                        <vs-button size="small" dark @click="editRow(user)">
                                            Edit
                                        </vs-button>
                                    </div>
                                    <vs-table>
                                        <template #thead>
                                            <vs-th>
                                                <h6 class="m-0 mx-auto fw-bold">#</h6>
                                            </vs-th>
                                            <vs-th>
                                                <h6 class="m-0 mx-auto fw-bold">Session</h6>
                                            </vs-th>
                                            <vs-th>
                                                <h6 class="m-0 mx-auto fw-bold">Clocked In</h6>
                                            </vs-th>
                                            <vs-th>
                                                <h6 class="m-0 mx-auto fw-bold">Clocked Out</h6>
                                            </vs-th>
                                        </template>
                                        <template #tbody>
                                            <vs-tr
                                                v-for="(attendance, index) in user.attendances"
                                                :key="index"
                                            >
                                                <vs-td>
                                                    <h6 class="m-0 text-center">
                                                        {{ index + 1 }}
                                                    </h6>
                                                </vs-td>
                                                <vs-td>
                                                    <h6 class="m-0 text-center">
                                                        {{ user.shift.sessions.find(item => item.id === attendance.session_id).name }}
                                                   </h6>
                                                </vs-td>
                                                <vs-td>
                                                    <h6 class="m-0 text-center">
                                                        {{ formatDate(attendance.start) }}
                                                    </h6>
                                                </vs-td>
                                                <vs-td>
                                                    <h6 class="m-0 text-center">
                                                        {{ formatDate(attendance.end) }}
                                                    </h6>
                                                </vs-td>
                                            </vs-tr>
                                        </template>
                                    </vs-table>
                                </div>
                            </template>
                        </vs-tr>
                    </template>
                    <template #footer>
                        <vs-pagination color="dark" v-model="pagination.page" :length="$vs.getLength(users, pagination.max)" />
                    </template>
                </vs-table>
            </div>
            <b-modal
                id="edit-user"
                centered
                hide-footer
                hide-header-close
                title-html="<h4 class='fw-bold m-2'><i class='fa-duotone fa-plus'></i> Edit User</h4>"
                content-class="template-modal"
                header-class="template-modal-header"
            >
                <form
                    @submit.stop.prevent
                    id="updateUserForm"
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
                            <vs-input type="text" name="name" v-model="edit.name"></vs-input>
                        </div>
                        <div>
                            <h6 class="fw-bold d-flex flex-row align-items-center">
                                <i class="fa-duotone fa-at fa-2x"></i>
                                <span class="m-2">Email</span>
                            </h6>
                            <vs-input type="email" name="email" v-model="edit.email"></vs-input>
                        </div>
                    </div>
                    <div class="mb-3 container p-3">
                        <h6 class="fw-bold d-flex flex-row align-items-center justify-content-center">
                            <i class="fa-duotone fa-user fa-2x"></i>
                            <span class="m-2">Profile</span>
                        </h6>
                        <input type="file" name="profile" ref="profileUpdate" class="form-control border-0" style="border-radius: 10px;"/>
                    </div>
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                        <div>
                            <h6 class="fw-bold d-flex flex-row align-items-center">
                                <i class="fa-duotone fa-location-dot fa-2x"></i>
                                <span class="m-2">From</span>
                            </h6>
                            <vs-input type="text" name="from" v-model="edit.from"></vs-input>
                        </div>
                        <div>
                            <h6 class="fw-bold d-flex flex-row align-items-center">
                                <i class="fa-duotone fa-phone fa-2x"></i>
                                <span class="m-2">Phone Number</span>
                            </h6>
                            <vs-input type="tel" name="phone_number"  v-model="edit.phone"></vs-input>
                        </div>
                    </div>
                    <div class="d-flex flex-column flex-md-row align-items-center justify-content-evenly my-2 p-2">
                        <div class="flex-grow-1 m-2">
                            <h6 class="fw-bold d-flex flex-row align-items-center">
                                <i class="fa-duotone fa-user-group-crown fa-2x"></i>
                                <span class="m-2">Title</span>
                            </h6>
                            <select name="title" id="title"  v-model="edit.title" class="form-control border-0" style="border-radius: 10px;">
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
                            <select name="type" id="type"  v-model="edit.type" class="form-control border-0" style="border-radius: 10px;">
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
                        <select name="shift" id="shift"  v-model="edit.shift" class="form-control border-0" style="border-radius: 10px;">
                            <option
                                v-for="(shift, index) in allShifts"
                                :value="shift.id"
                                :key="index"
                            >
                                {{ shift.name }}
                            </option>
                        </select>
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
                            :loading="edit.loading"
                            @click="updateProfile()"
                        >
                            <h6 class="m-0 fw-bold">
                                Update
                            </h6>
                        </vs-button>
                        <vs-button class="my-3" danger flat @click="$bvModal.hide('edit-user')">
                            <h6 class="m-0 fw-bold">
                                <i class="fa-solid fa-times"></i>
                                Close
                            </h6>
                        </vs-button>
                    </div>
                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    data(){
        return{
            pagination:{
                page: 1,
                max: 15
            },
            search: '',
            users: [],
            loading: true,
            edit: {
                loading: false
            },
            tableKey: 0
        }
    },
    computed:{
        ...mapGetters(['allUsers', 'allShifts', 'csrfToken', 'sessions'])
    },
    mounted() {
        let globalThis = this;

        this.$nextTick(function(){
            globalThis.users = globalThis.allUsers;
            setTimeout(() => {
                globalThis.loading = false;
                globalThis.$bvModal.hide('edit-user');
            }, 3000);
        });
    },
    methods:{
        formatDate(date){
            if(date === null){
                return ' ----- ';
            }
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
        editRow(row){
            this.edit = {};
            let { shift } = row;
            delete row.shift;
            this.edit = {loading: false, shift: shift.id, ...row};
            this.$bvModal.show('edit-user');
        },
        updateProfile(){
            this.edit.loading = true;
            /**
             *
             */
            let form = document.querySelector('#updateUserForm');

            let updateForm = new FormData(form);

            updateForm.append('profile', this.$refs.profileUpdate.files[0]);

            let payload = {
                id: this.edit.id,
                data: updateForm
            };

            this.$store.dispatch('updateProfile', payload).then(response => {
                this.$store.dispatch('getUsers');
                this.$bvModal.hide('edit-user');
                this.openNotification(`<h5 class='m-0'>User</h5>`, `<h6 class='m-0'>Updated successfully</h6>`);
                this.edit.loading = true;
                this.users = response.data;
                // window.location.reload();
            });
        },
        openNotification(title, text) {
            const notification = this.$vs.notification({
                title,
                text
            });
        }
    }
}
</script>
