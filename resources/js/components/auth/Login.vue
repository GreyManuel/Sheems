<template>
	<div class="bg-white shadow-sm p-2 text-center" style="border-radius: 15px;">
		<div class="p-1">
			<h3>Sheems</h3>
			<h6>
				Enter your password to continue
			</h6>
			<hr class="mt-1">
			<div>
				<div class="p-1 mt-2">
					<form action="/login" method="POST">
						<input type="text" name="_token" :value="csrfToken" hidden>
						<div class="d-flex flex-column ">
<!--							<label for="email" class="flex-grow-1 my-1">
								<h5 class="m-0 text-start"> <i class="fa-duotone fa-at"></i> Email</h5>
							</label>-->
							<vs-input v-model="credentials.email" name="email" type="email" hidden placeholder="email@example.com"></vs-input>
						</div>
						<div class="d-flex flex-column mb-2">
							<label for="email" class="flex-grow-1 my-1">
								<h5 class="m-0 text-start"> <i class="fa-duotone fa-key-skeleton"></i> Password</h5>
							</label>
							<vs-input v-model="credentials.password" maxlength="17" name="password" type="password" placeholder="********"></vs-input>
						</div>
						<small class="fw-bold text-danger" v-if="errors.email">
							{{ errors.email[0] }}
						</small>
<!--						<div class="d-flex flex-column my-2">
							<vs-checkbox type="checkbox" color="#9792E3" v-model="credentials.remember" name="remember">
								<h5 class="m-0 text-start">Remember me ?</h5>
							</vs-checkbox>
						</div>-->
						<vs-button type="submit" color="#EF0000" block class="mx-auto mt-3" @click="login = true" :loading="login">
							<h5 class="m-0 fw-bold">
								Sign In
							</h5>
						</vs-button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		errors: {
			type: Object,
			required: false
		},
		old:{
			type: Object,
			required: false
		}
	},
	data(){
		return{
			login: false,
			credentials: {
				email: 'mikekkamara@gmail.com',
				password: '',
				remember: false
			}
		}
	},
	computed:{
		csrfToken(){
			return window.Laravel.csrfToken
		}
	},
	mounted(){
		let old = JSON.parse(this.old);
		if(Object.keys(old).length > 1){
			this.credentials.email = old.email;
		}
	}
}
</script>

<style>
.vs-input-parent {
	width: 100% !important;
}
.vs-input-content{
	width: 100% !important;
}
.vs-input{
	width: 100% !important;
}
</style>
