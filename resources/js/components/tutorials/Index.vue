<template>
    <div class="shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold"><i class="fa-duotone fa-video"></i> Tutorials</h4>
        <div class="p-1 mt-3">
            <router-link :to="{ name: 'create-tutorials' }" class="text-decoration-none" v-if="userType === 1">
                <vs-button color="#6A8E7F">
                    <h6 class="m-0">
                        <i class="fa-duotone fa-folder-plus"></i>
                        Upload Tutorials
                    </h6>
                </vs-button>
            </router-link>
            <hr>
            <div class="container">
                <h5>Tutorials</h5>
                <div class="p-1" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(14.5rem,1fr)); grid-gap:0.7em;">
                    <vs-card
                        type="3"
                        v-for="(tutorial, index) in allTutorials"
                        :key="index"
                        @click="showTutorial(tutorial)"
                    >
                        <template #title>
                            <h3>{{ tutorial.title }}</h3>
                        </template>
                        <template #img>
                            <img :src="'../../../../storage/Tuitorial_Images/' + tutorial.tuitorial_images[0].tuitorial_image_path" alt="tutorial_image" srcset="">
                        </template>
                        <template #text>
                            <p style="width:200px; overflow:hidden; white-space: nowrap; text-overflow:ellipsis">
                               {{ tutorial.description }}
                            </p>
                        </template>
                    </vs-card>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(['allTutorials']),
        userType(){
            return window.Laravel.role;
        }
    },
    mounted(){
        this.$store.dispatch('getTutorials');
    },
    methods:{
        showTutorial(tutorial){
            this.$router.push({ name: 'show-tutorial', params: { slug: tutorial.id } });
        }
    }
}
</script>
