<template>
<div>
	<div class="row">
		<div class="col-12 col-md-11 col-lg-10 col-xl-9 mx-auto">
			<router-view></router-view>
		</div>
	</div>
</div>
</template>

<script>
export default {
    props: ['user'],
	data(){
		return{
			items: null
		}
	},
	created(){
        this.$store.dispatch('getUsers');
	}
}
</script>

<style>

</style>
