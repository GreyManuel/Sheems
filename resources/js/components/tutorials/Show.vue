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
                <h5>
                    {{ tutorial.title }}
                </h5>
                <p class="p-1">
                    {{ tutorial.description }}
                </p>
                <hr>
                <div class="container">
                    <h5>
                        <i class="fa-duotone fa-books-medical"></i>
                        Tutorial Materials
                    </h5>
                    <div>
                        <div>
                            <h5>Tutorial Images</h5>
                           <div class="d-flex flex-row flex-wrap align-items-center justify-content-center">
                                <img 
                                    v-for="(image, index) in tutorial.tuitorial_images"
                                    :key="index"
                                    :src="'../../../../../storage/Tuitorial_Images/' + image.tuitorial_image_path" 
                                    class="img-fluid m-2" style="max-width: 300px"
                                />
                            </div>
                        </div>
                        <div>
                            <h5>
                                <i class="fa-duotone fa-file"></i>
                                Tutorial Documents
                            </h5>
                            <div class="container">
                                <ul class="list-group">
                                    <li 
                                        v-for="(document, index) in tutorial.tuitorial_documents"
                                        :key="index"
                                        class="list-group-item"
                                    >
                                        <a :href="'../../../../../storage/Tuitorial_Documents/' + document.tuitorial_document_path" target="_blank" class="nav-link">
                                            {{ `Document ${index + 1}` }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            tutorial: {}
        }
    },
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    computed: mapGetters(['allTutorials']),
    async mounted(){
        await this.$store.dispatch('getTutorials').then( () => {
            setTimeout(() => this.tutorial = this.allTutorials.find(tutorial => tutorial.id === String(this.slug)), 1000);
        });
    }
}
</script>
