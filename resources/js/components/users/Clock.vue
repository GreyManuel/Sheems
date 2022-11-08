<template>
    <div class="p-2">
        <div class="d-flex flex-column flex-md-row align-items-md-center">
            <div class="text-center">
                <label for="random_number">
                    <h6 class="fw-bold d-flex flex-row align-items-center">
                        <i class="fa-duotone fa-hashtag-lock fa-2x"></i>
                        User Random Number
                    </h6>
                </label>
                <vs-input
                    id="random_number"
                    autofocus
                    block
                    name="random_number"
                    maxlength="3"
                    type="text"
                    list="users-list"
                    v-model.trim="search"
                ></vs-input>
                <datalist id="users-list">
                    <option
                        v-for="user in allUsers"
                        :key="user.id"
                        :value="user.user_number"
                    >
                        {{ user.name }}
                    </option>
                </datalist>
                <transition name="fade" mode="in-out">
                    <h6 v-if="notFound" class="text-center text-danger fw-bold my-2">
                        Not found
                    </h6>
                </transition>
                <vs-button
                    block
                    class="mt-3"
                    flat
                    dark
                    :disabled="search === ''"
                    @click="findUser()"
                    :loading="loading"
                >
                    <h6 class="m-0 fw-bold">
                        <i class="fa-duotone fa-magnifying-glass"></i>
                        Find
                    </h6>
                </vs-button>
            </div>

            <div class="flex-grow-1 m-3">
                <transition name="fade" mode="in-out">
                    <router-view :key="$route.params.slug"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    data(){
        return {
            search: '',
            loading: false,
            notFound: false
        }
    },
    computed:{
        ...mapGetters(['allUsers', 'allShifts'])
    },
    methods:{
        findUser(){
            this.loading = true;
            let user = this.allUsers.find(user => user.user_number.toLowerCase() === this.search.toLowerCase());
            if(user === undefined){
                this.notFound = true;
            }else{
                if(!this.$route.path.includes(user.id)){
                    this.notFound = false;
                    this.$router.push({ name: 'clockUser', params: { slug: user.id }})
                }
            }
            this.loading = false
        },
        openNotification(title, text) {
            const notification = this.$vs.notification({
                title,
                text
            });
        }
    },
    watch:{
        search(value){
            if(value === ''){
                this.$router.push({ name: 'clock' })
            }
        }
    }
}
</script>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
