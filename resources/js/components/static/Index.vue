<template>
    <div class="mt-5 row">
        <router-view :key="$route.path"  class="col-12 col-md-9 mx-auto"></router-view>
    </div>
</template>
<script>
export default {
    name: 'IndexOrganization',
}
</script>
<style scoped>

</style>
