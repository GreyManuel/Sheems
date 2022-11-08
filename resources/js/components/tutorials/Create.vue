<template>
    <div class="shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold"><i class="fa-duotone fa-video"></i> Tutorials</h4>
        <div class="p-1 mt-3">
            <router-link :to="{ name: 'tutorials' }" class="text-decoration-none">
                <vs-button size="small" flat  color="#DB7F8E">
                    <h6 class="m-0 text-capitalize">
                        <i class="fa-solid fa-arrow-left"></i>
                        Back to all tutorials
                    </h6>
                </vs-button>
            </router-link>
            <hr>
            <div class="container">
                <h5>Create a new tutorial</h5>
                <form method="post" id="createTutorialForm" @submit.stop.prevent="createTutorial">
                    <input type="text" name="_token" :value="csrfToken" hidden>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="row m-1">
                                <div class="col-12 d-flex flex-column">
                                    <label for="title">
                                        <h6 class="fw-bold">
                                            Title
                                        </h6>
                                    </label>
                                    <vs-input type="text" name="title" v-model="tutorial.title" block></vs-input>
                                </div>
                            </div>
                            <div class="row m-1">
                                <div class="col-12 d-flex flex-column">
                                    <label for="title">
                                        <h6 class="fw-bold">
                                            Description
                                        </h6>
                                    </label>
                                    <Textarea name="description" :autoResize="true" v-model.lazy="tutorial.description" rows="5" cols="30" style="border-radius: 15px; background-color: #f4f7f8 !important" class="border-0"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="container row mx-0 rounded-3 p-1">
                                <h5 class="fw-bold">Upload Media</h5>
                                <div class="col-12 d-flex flex-column mb-3">
                                    <label for="task_images">
                                        <h6 class="fw-bold">
                                            Images
                                        </h6>
                                    </label>
                                    <input type="file" name="tuitorial_images" multiple ref="tutorialImages" class="form-control border-0" style="border-radius: 15px;">
                                </div>
                                <div class="col-12 d-flex flex-column">
                                    <label for="task_images">
                                        <h6 class="fw-bold">
                                            Documents
                                        </h6>
                                    </label>
                                    <input type="file" name="tuitorial_documents[]" multiple ref="tutorialDocuments" class="form-control border-0" style="border-radius: 15px;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-1">
                        <div class="col-12 col-md-6">
                            <vs-button color="#8D8D92" flat :active="true" :loading="loading" type="submit">
                                <h5 class="m-0">
                                    <i class="fa-duotone fa-folder-plus"></i>
                                    Create
                                </h5>
                            </vs-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Textarea from "primevue/textarea";
export default {
    components: { Textarea },
    data(){
        return{
            loading: false,
            tutorial: {
                title:'',
                description: ''
            }
        }
    },
    computed:{
        csrfToken(){
            return window.Laravel.csrfToken;
        }
    },
    methods:{
        createTutorial() {
            this.loading = true;

            let form = document.querySelector('#createTutorialForm');

            let createForm = new FormData(form);
            /**
             * Add images
             */
            let images = Object.values(this.$refs['tutorialImages'].files);
            images.forEach(image => {
                createForm.append('tuitorial_images[]', image);
            });
            /**
             * Add documents
             */
            let documents = Object.values(this.$refs['tutorialDocuments'].files);
            documents.forEach(document => {
                createForm.append('tuitorial_documents[]', document);
            });

            this.$store.dispatch('createTutorial', createForm).finally(() => {
                this.$vs.notification({
                    title: 'Success',
                    text: `Job was created successfully`
                });
                this.loading = false;
            });
        }
    }
}
</script>
