<template>
    <div class="d-flex flex-row align-items-center justify-content-evenly" v-if="isLoggedIn">
        <router-link :to="{ name: 'home' }" class="text-decoration-none">
            <vs-button danger transparent :active="$route.path.includes('home')">
                <h6 class="m-0 fw-bold">
                    <i class="fa-duotone fa-home"></i>
                    Home
                </h6>
            </vs-button>
        </router-link>
        <router-link :to="{ name: 'reports' }" class="text-decoration-none">
            <vs-button danger transparent :active="$route.path.includes('reports')">
                <h6 class="m-0 fw-bold">
                    <i class="fa-duotone fa-chart-network"></i>
                    Reports
                </h6>
            </vs-button>
        </router-link>

        <form ref="logout-form" action="/logout" method="POST" class="d-none">
            <input type="text" name="_token" :value="csrfToken" hidden>
        </form>
        <vs-button flat dark :active="true" @click="$refs['logout-form'].submit()">
            <h6 class="m-0 fw-bold">
                Sign Out
            </h6>
        </vs-button>
    </div>
</template>

<script>
export default {
    computed:{
        csrfToken(){
            return window.Laravel.csrfToken;
        },
        isLoggedIn(){
            let status = window.Laravel.status;

            if(status === 0){
                return false;
            }else{
                return true;
            }
        }
    }
}
</script>

<style>

</style>
