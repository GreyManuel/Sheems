<template>
	<div class=" shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold col mt-3"><i class="fa-duotone fa-layer-plus"></i> Upload Jobs</h4>
        <router-link :to="{ name: 'jobDetails', params: { slug: 'pending' }   }" class="text-decoration-none">
            <vs-button size="small" flat  color="#DB7F8E">
                <h6 class="m-0 text-capitalize">
                    <i class="fa-solid fa-arrow-left"></i>
                    Back to all jobs
                </h6>
            </vs-button>
        </router-link>

        <div class="p-1 mt-3 mx-auto">
            <h5>Create a new job</h5>
            <hr class="my-1">
            <div v-if="task.success">
                <div class="card border-0 w-50 mx-auto text-center m-3">
                    <h4 class="card-title">
                        <i class="fa-thin fa-party-horn fa-3x text-success"></i>
                    </h4>
                    <h3 class="card-subtitle">
                        Success !
                    </h3>
                    <p class="card-text lead">
                        The job was uploaded successfully!
                    </p>
                    <vs-button color="#6A8E7F" block @click="task.success = ''">
                        <h6 class="m-0 fw-bold">
                            <i class="fa-duotone fa-layer-plus"></i>
                            Add Another Job
                        </h6>
                    </vs-button>
                </div>
            </div>
            <div v-else-if="task.success === false">
                <div class="card border-0 w-50 mx-auto text-center m-3">
                    <h4 class="card-title">
                        <i class="fa-duotone fa-cloud-xmark fa-3x text-danger"></i>
                    </h4>
                    <h3 class="card-subtitle">
                        Oops !
                    </h3>
                    <p class="card-text lead">
                        Something went wrong while uploading the job.
                    </p>
                    <vs-button color="#6A8E7F" block @click="task.success = ''">
                        <h6 class="m-0 fw-bold">
                            <i class="fa-duotone fa-layer-plus"></i>
                            Try again
                        </h6>
                    </vs-button>
                </div>
            </div>
            <form method="post" @submit.stop.prevent id="createJobForm" v-else>
                <input type="text" :value="csrfToken" name="_token" hidden>
                <div class="row mx-0 mb-2">
                    <div class="col-12 col-md-6">
                        <label for="title">
                            <h6 class="fw-bold">
                                Title
                            </h6>
                        </label>
                        <vs-input type="text" name="title" v-model="task.title"></vs-input>
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="description">
                            <h6 class="fw-bold">
                                Description
                            </h6>
                        </label>
                        <vs-input type="text" name="description" v-model="task.description"></vs-input>
                    </div>
                </div>
                <div class="row mx-0 ">
                    <div class="col-12 d-flex flex-column">
                        <label for="requirements">
                            <h6 class="fw-bold">
                                Requirements
                            </h6>
                        </label>
                        <Textarea name="requirements" :autoResize="true" v-model.lazy="task.requirements" rows="5" cols="30" style="border-radius: 15px; background-color: #f4f7f8 !important" class="border-0"/>
                    </div>
                </div>
                <div class="row mx-0 ">
                    <div class="col-12 d-flex flex-column">
                        <label for="comment">
                            <h6 class="fw-bold">
                                Comment
                            </h6>
                        </label>
                        <Textarea name="comment" :autoResize="true" v-model.lazy="task.comment" rows="5" cols="30" style="border-radius: 15px; background-color: #f4f7f8 !important" class="border-0"/>
                    </div>
                </div>
                <div class="container row mx-0 rounded-3 p-1 mb-3">
                    <h5 class="fw-bold">Upload Media</h5>
                    <div class="col-12 col-md-6 d-flex flex-column">
                        <label for="task_images">
                            <h6 class="fw-bold">
                                Images
                            </h6>
                        </label>
                        <input type="file" name="task_images" multiple ref="taskImages" class="form-control border-0" style="border-radius: 15px;">
                    </div>
                    <div class="col-12 col-md-6 d-flex flex-column">
                        <label for="task_images">
                            <h6 class="fw-bold">
                                Documents
                            </h6>
                        </label>
                        <input type="file" name="task_documents" multiple ref="taskDocuments" class="form-control border-0" style="border-radius: 15px;">
                    </div>
                </div>
                <div class="row mx-0 mb-2">
                    <div class="col-12 col-md-4">
                        <label for="status">
                            <h6 class="fw-bold">
                                Status
                            </h6>
                        </label>
                        <select v-model="task.status" name="status" class="form-control border-0" style="box-shadow: none !important;">
                            <option
                                v-for="(status, index) in statuses"
                                :value="status.value"
                                :key="index"
                            >
                                {{ status.text }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 col-md-4 d-flex flex-column">
                        <label for="amount">
                            <h6 class="fw-bold text-capitalize">
                                Delivery time
                            </h6>
                        </label>
                        <Calendar name="delivery_time" :minDate="new Date()" id="time24" v-model="task.tat" :showTime="true" :showSeconds="true"  style="background-color: #f4f7f8 !important;border-radius: 15px;"/>
                    </div>
                    <div class="col-12 col-md-4">
                        <label for="amount">
                            <h6 class="fw-bold">
                                Amount
                            </h6>
                        </label>
                        <vs-input name="amount" type="number" v-model="task.amount"></vs-input>
                    </div>
                </div>
                <div class="row mx-0">
                    <div class="col-12 col-md-6 col-lg-3">
                        <vs-button color="#8D8D92" flat @click="createJob" :active="true" :loading="loading">
                            <h5 class="m-0">
                                <i class="fa-solid fa-layer-plus"></i>
                                Create
                            </h5>
                        </vs-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Textarea from "primevue/textarea";
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
export default {
    components: { Textarea, Dropdown, Calendar },
    data(){
        return{
            loading: false,
            task:{
                title: '',
                description: '',
                requirements: '',
                amount: 0,
                tat: '',
                status: 0,
                comment: '',
                task_images: null,
                task_documents: null,
                success: ''
            },
            statuses: [
                {text: 'Pending', value: 0 },
                {text: 'Ongoing', value: 1},
                {text: 'Waiting for revision', value: 2},
                {text: 'Approved', value: 3},
                {text: 'Cancelled', value: 4},
                {text: 'Revision', value: 5}
            ]
        }
    },
    methods:{
        createJob(){
            this.loading = true;

            let form = document.querySelector('#createJobForm');

            let createForm = new FormData(form);
            /**
             * Add images
             */
            let images = Object.values(this.$refs['taskImages'].files);
            images.forEach(image => {
                createForm.append('task_images[]', image);
            });
            /**
             * Add documents
             */
            let documents = Object.values(this.$refs['taskDocuments'].files);
            documents.forEach(document => {
                createForm.append('task_documents[]', document);
            });

            this.$store.dispatch('createJob', createForm).then(response => {
                this.task.success = true;
                this.$vs.notification({
                    title: 'Success',
                    text: `Job was created successfully`
                }, error => {
                    this.task.success = false;
                });
                this.loading = false;
            });
        }
    },
    computed:{
        csrfToken(){
            return window.Laravel.csrfToken;
        }
    }
}
</script>

<style>
.p-inputtext{
    border: none !important;
}
</style>
