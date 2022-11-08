<template>
    <div class="mt-4">
        <h6><i class="fad fa-info-circle"></i> Click on a job to see more information</h6>
        <vs-table :key="preview.id">
            <template #thead>
                <vs-tr class="text-capitalize">
                    <vs-th style="width: 5px !important">
                        <h5 class="m-0 mx-auto fw-bold">#</h5>
                    </vs-th>
                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Title</h6>
                    </vs-th>
                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Description</h6>
                    </vs-th>
                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Requirements</h6>
                    </vs-th>
                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Amount</h6>
                    </vs-th>
                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Turn around time</h6>
                    </vs-th>
<!--                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Documents</h6>
                    </vs-th>-->
<!--                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Comments</h6>
                    </vs-th>-->
                    <vs-th>
                        <h6 class="m-0 mx-auto fw-bold">Created</h6>
                    </vs-th>
                    <vs-th v-if="preview.show">
                        <h6 class="m-0 mx-auto fw-bold">Preview</h6>
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr
                    v-for="(job, index) in $vs.getPage(jobs, page, max)"
                    :key="index"
                >
                    <vs-td>
                        <h6 class="m-0 text-center">
                            {{ index + 1 }}
                        </h6>
                    </vs-td>
                    <vs-td>
                        <h6 class="m-0 text-center" style="width: 150px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                            {{ job.title }}
                        </h6>
                    </vs-td>
                    <vs-td>
                        <h6 class="m-0 text-center" style="width: 200px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                            {{ job.description }}
                        </h6>
                    </vs-td>
                    <vs-td>
                        <h6 class="m-0 p-1" style="width: 250px;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">
                            {{ job.requirements }}
                        </h6>
                    </vs-td>
                    <vs-td>
                        <h6 class="m-0 text-center">
                            {{ formatCurrency(job.amount) }}
                        </h6>
                    </vs-td>
                    <vs-td>
                        <h6 class="m-0 text-center">
                            {{ formatDeliveryTime(job.delivery_time) }}
                        </h6>
                    </vs-td>
                    <vs-td>
                        <h6 class="m-0 text-center">
                            {{ formatDate(job.created_at) }}
                        </h6>
                    </vs-td>
                    <vs-td v-if="preview.id === job.id">
                        <span class="badge bg-danger" v-b-tooltip title="Previewing this Job">
                            <h6 class="m-0 text-center text-nowrap">
                                <i class="fa-duotone fa-eye"></i>
                                {{ formatPreviewTime(preview.timer) }}
                            </h6>
                        </span>

                    </vs-td>

                    <template #expand>
                        <div class="container p-1">
                            <ul class="list-group">
                                <li class="list-group-item disabled text-center">
                                    <h5 class="m-0">
                                        Comments
                                    </h5>
                                </li>
                                <li
                                    v-for="comment in job.task_comments"
                                    :key="comment.id"
                                    class="list-group-item"
                                >
                                    {{ comment.comment }}
                                </li>
                                <li class="list-group-item disabled text-center">
                                    <h5 class="m-0">
                                        Description
                                    </h5>
                                </li>
                                <li class="list-group-item">
                                    {{ job.description }}
                                </li>
                                <li class="list-group-item disabled text-center">
                                    <h5 class="m-0">
                                        Requirements
                                    </h5>
                                </li>
                                <li class="list-group-item">
                                    {{ job.requirements }}
                                </li>
                            </ul>
                        </div>
                        
                        <div class="d-flex flex-row flex-wrap" v-if="userType === 1">
                            <vs-button size="small" color="danger" v-if="$route.path.includes('pending')">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-trash"></i>
                                    Remove Job
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="#8AA399" @click="showReviewForm(job, index)" v-if="$route.path.includes('submitted')">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-check-double"></i>
                                    Mark as Complete
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="warn" v-if="$route.path.includes('submitted')" @click="returnForRevision(jobId, index)">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-arrow-rotate-right"></i>
                                    Return for revision
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="#8AA399" :loading="loading.download" @click="downloadMaterials(job.id)" v-if="$route.path.includes('submitted')">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-cloud-arrow-down"></i>
                                    Download Job Materials
                                </h6>
                            </vs-button>
                        </div>
                        <div class="d-flex flex-row flex-wrap" v-else>
                            <vs-button size="small" color="#8AA399" :loading="loading.preview" @click="previewJob(job.id)" v-if="preview.show === false && $route.path.includes('pending')">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-eye"></i>
                                    Preview Job
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="dark" v-else-if="preview.show === true && $route.path.includes('pending')" @click="preview.cancel = true">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-eye-slash"></i>
                                    Cancel Preview ( {{ formatPreviewTime(preview.timer) }} )
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="#8AA399" :loading="loading.download" @click="downloadMaterials(job.id)" v-if="$route.path.includes('ongoing') || (preview.id === job.id)">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-cloud-arrow-down"></i>
                                    Download Job Materials
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="#8AA399" :loading="loading.pickJob" @click="pickJob(job.id)" v-if="$route.path.includes('pending')">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-check-double"></i>
                                    Pick Job
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="#8AA399" v-if="$route.path.includes('ongoing')" @click="showSubmitForm(job.id, index)">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-circle-plus"></i>
                                    Submit Job
                                </h6>
                            </vs-button>
                            <vs-button size="small" color="#8AA399" v-if="$route.path.includes('revision')" @click="showSubmitForm(job.id, index)">
                                <h6 class="m-0">
                                    <i class="fa-duotone fa-circle-plus"></i>
                                    Submit Revision
                                </h6>
                            </vs-button>
                        </div>
                    </template>
                </vs-tr>
            </template>
            <template #footer>
                <vs-pagination color="dark" v-model="page" :length="$vs.getLength(jobs, max)" />
            </template>
        </vs-table>
        <vs-dialog prevent-close v-model="submit.show">
            <h5 class="fw-bold">Files</h5>
            <form method="post" @submit.stop.prevent id="submitJobForm" >
                <div class="row mx-1 mt-5">
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
                    <div class="col-12 col-md-4 mx-auto mt-3">
                        <vs-button @click="submitJob()" danger block :loading="loading.submit">
                            <h5 class="m-0 fw-bold">
                                Submit Job
                            </h5>
                        </vs-button>
                    </div>
                </div>
            </form>
        </vs-dialog>
        <vs-dialog prevent-close v-model="ratings.show">
            <template #header>
                <h4 class="fw-bold">
                    Job Review
                </h4>
            </template>
            <div class="p-2">
                <h5>Please rate the writer</h5>
                <div class="p-1">
                    <div>
                        <h6 class="fw-bold">Criteria</h6>
                        <ul class="list-group list-group-horizontal list-group-horizontal-sm">
                            <li class="list-group-item"><strong>1. </strong> < 99%</li>
                            <li class="list-group-item"><strong>2. </strong> 99%</li>
                            <li class="list-group-item"><strong>3. </strong> 99.1 - 99.5%</li>
                            <li class="list-group-item"><strong>4. </strong> 99.6 - 99.9%</li>
                            <li class="list-group-item"><strong>5. </strong> 100%</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="mb-2">
                        <h6>Formatting/ Structure and grammar</h6>
                        <b-form-rating class="border-0" required id="formatting" name="formatting" v-model="ratings.formatting" stars="5"></b-form-rating>
                    </div>
                    <div class="mb-2">
                        <h6>Flow, proper use of key words and relevance</h6>
                        <b-form-rating class="border-0" required id="keywords_use" name="Keywords_use" v-model="ratings.keywords_use" stars="5"></b-form-rating>
                    </div>
                    <div class="mb-2">
                        <h6>Clarity and visually appealing</h6>
                        <b-form-rating class="border-0" required id="clarity" name="clarity" v-model="ratings.clarity" stars="5"></b-form-rating>
                    </div>
                    <div class="mb-2">
                        <h6>Creativity</h6>
                        <b-form-rating class="border-0" required id="creativity" name="creativity" v-model="ratings.creativity" stars="5"></b-form-rating>
                        <small>Attractive and holding interest</small>
                    </div>
                    <div class="mb-2">
                        <h6>Plagiarism</h6>
                        <b-form-rating class="border-0" required id="plagiarism" name="plagiarism" v-model="ratings.plagiarism" stars="5"></b-form-rating>
                    </div>
                    <div class="m-2 p-1">
                        <h6>Comment</h6>
                        <Textarea :autoResize="true" name="comment" v-model="ratings.data.comment" placeholder="Type a comment" rows="2" cols="55"
                                  style="border-radius: 15px; background-color: #f4f7f8 !important" class="border-0 no-outline p-2"/>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="markJobAsComplete" danger block :loading="loading.review">
                        <h5 class="m-0 fw-bold">
                            Submit
                        </h5>
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
        
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Textarea from "primevue/textarea";
export default {
    components: { Textarea },
    data() {
        return {
            page: 1,
            max: 15,
            jobs: null,
            options: {
                preview: false
            },
            submit:{
                jobId: '',
                show: false,
            },
            preview: {
                id: '',
                timer: 900000,
                show: false,
                cancel: false
            },
            loading: {
                download: false,
                pickJob: false,
                preview: false,
                review: false,
                submit: false
            },
            ratings: {
                index: 0,
                show: false,
                formatting: 0,
                keywords_use: 0,
                clarity: 0,
                creativity: 0,
                plagiarism: 0,
                data: {
                    job: null,
                    comment: ''
                }
            },

        }
    },
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters(['activeJobs', 'pendingJobs', 'completedJobs', 'submittedJobs', 'revisionJobs', 'cancelledJobs']),
        userType() {
            return window.Laravel.role;
        }
    },
    mounted() {
        if(this.slug !== ''){
            setTimeout(() => this.updateView(this.slug), 2000);
        }
        let jobPreview = localStorage.getItem('jobId');
        if(jobPreview !== null){
            setTimeout(() => {
                jobPreview = JSON.parse(jobPreview);
                let diff = new Date(new Date().setMilliseconds(0)).getTime() - jobPreview.tm;
                this.preview.timer = this.preview.timer - diff;
                this.previewJob(jobPreview.jb, true);
            }, 3000);
        }
    },
    watch: {
        slug(value){
            this.updateView(value);
        }
    },
    methods: {
        returnForRevision(jobId, index){

        },
        submitJob(){
            this.loading.submit = true;

            let form = document.querySelector('#submitJobForm');

            let submitForm = new FormData(form);
            /**
             * Add images
             */
            let images = Object.values(this.$refs['taskImages'].files);
            images.forEach(image => {
                submitForm.append('task_images[]', image);
            });
            /**
             * Add documents
             */
            let documents = Object.values(this.$refs['taskDocuments'].files);
            documents.forEach(document => {
                submitForm.append('task_documents[]', document);
            });
            let payload = { jobId: this.submit.jobId, form: submitForm};
            this.$store.dispatch('submitJob', payload).then(response => {
                this.$vs.notification({
                    title: 'Success',
                    text: `Job was submitted successfully`
                }, error => {
                    this.task.success = false;
                });
                window.location.reload();
            });
        },
        showSubmitForm(jobId, index){
            this.submit.jobId = jobId;
            this.submit.show = true;
        },
        showReviewForm(job, index){
            this.ratings.data.job = job;
            this.ratings.index = index;
            this.ratings.show = true;
        },
        markJobAsComplete(){
            this.loading.review = true;
            let payload = {
                action: 3,
                data: this.ratings.data,
                ratings: this.ratings
            };
            payload.ratings.task_id = this.ratings.data.job.id;
            payload.ratings.writer_id = this.ratings.data.job.writer_id;
            this.$store.dispatch('performJobAction', payload).then(response => {
                this.loading.review = false;
                this.ratings.show = false;
                this.preview.id = '2';
                this.jobs.splice(this.ratings.index, 1);
                this.jobNotification('Success', `The review was sent successfully.`);
            })
        },
        downloadMaterials(jobId){
            this.loading.download = true;

            this.$store.dispatch('downloadMaterials', jobId).then( response => {
                let link = document.createElement('a');
                link.href = response.data;
                link.click();
            }).catch(error => {
                console.log(error);
                this.jobNotification('Failed', `Something went wrong while fetching files.`);
            })
        },
        pickJob(jobId){
            if(this.preview.show){
                this.preview.cancel = true;
            }
            this.$store.dispatch('pickJob', jobId).then( response => {
                this.jobNotification('Successful', `You have been assigned to this job successfully`);
            }).catch(error => {
                this.jobNotification('Failed', `Something went wrong`);
                console.log(error);
            });
        },
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
        formatDeliveryTime(date){
            let delivery_time = new Date(Date.parse(date)).getTime();

            let remaining_hours = delivery_time - new Date().getTime();

            return Math.floor(remaining_hours / 3600000) + ' hours from now';
        },
        async updateView(value){
            if(this.userType == 1){
                switch (value) {
                    case 'pending':
                        this.jobs = this.pendingJobs;
                        break;
                    case 'ongoing':
                        await this.$store.dispatch('getAdminActiveJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'submitted':
                        await this.$store.dispatch('getAdminSubmittedJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'completed':
                        await this.$store.dispatch('getAdminCompletedJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'revisions':
                        await this.$store.dispatch('getAdminRevisionJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'cancelled':
                        await this.$store.dispatch('getAdminCancelledJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    default:
                        break;
                }

            }else{
                switch (value) {
                    case 'pending':
                        this.jobs = this.pendingJobs;
                        break;
                    case 'ongoing':
                        await this.$store.dispatch('getWriterActiveJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'submitted':
                        await this.$store.dispatch('getWriterSubmittedJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'completed':
                        await this.$store.dispatch('getWriterCompletedJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'revisions':
                        await this.$store.dispatch('getWriterRevisionJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    case 'cancelled':
                        await this.$store.dispatch('getWriterCancelledJobs').then(response => {
                            this.jobs = response.data;
                        });
                        break;
                    default:
                        break;
                }
            }
        },
        previewJob(jobId, resume = false){
            this.preview.id = jobId;
            this.preview.show = true;
            if(resume === false){
                localStorage.setItem('jobId', JSON.stringify({tm: new Date(new Date().setMilliseconds(0)).getTime(), jb: jobId}));
            }
            /**
             * preview minutes = 15 minutes = 900000ms
             */
            const timer = setInterval(() => {
                if(this.preview.cancel){
                    clearInterval(timer);
                    this.jobNotification('Preview', `The job preview was cancelled successfully`);
                    localStorage.removeItem('jobId');
                    this.preview = {id: '', timer: 900000,show: false,cancel: false};
                }
                if(this.preview.timer <= 0){
                    clearInterval(timer);
                    localStorage.removeItem('jobId');
                    this.preview = {id: '', timer: 900000,show: false,cancel: false};
                    this.$store.dispatch('pickJob', jobId);
                    this.jobNotification('Job Alert', `The job you were previewing was assigned to you`);
                }else{
                    this.preview.timer -= 1000;
                }

            }, 1000);
            this.jobNotification('Preview',`The preview timer has been started. It expires in ${Math.floor(this.preview.timer / 60000 )} minutes.`);
        },
        jobNotification(title, text){
            this.$vs.notification({
                title: title,
                text: text
            })
        },
        formatPreviewTime(time){
            let minutes = Math.floor(time / 60000);
            let seconds = (time % 60000) / 1000;
            return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        }
    }
}
</script>
<style>
.no-outline:focus{
    outline: none !important;
    box-shadow: none !important;
}
</style>
