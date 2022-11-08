<template>
	<div class="bg-white shadow-sm p-2 text-center" style="border-radius: 15px; transition: all 3s">
		<!-- <div class="d-flex flex-row justify-content-center mb-5">
			<div class="d-flex flex-row align-items-center">
				<vs-button circle flat color="#9792E3" size="l" :active="formSection >= 0" @click="formSection = 0">
					<i class="fa-solid fa-1"></i>
				</vs-button>
				<ProgressBar class="flex-grow-1" :value="formSection == 0 ? 50 : formSection > 0 ? 100 : 0" :showValue="false" style="height: .2em; max-width: 10rem; min-width: 2.5rem" />
			</div>
			<div class="d-flex flex-row align-items-center">
				<vs-button circle flat color="#9792E3" size="l" :active="formSection >= 1" @click="formSection = 1">
					<i class="fa-solid fa-2"></i>
				</vs-button>
				<ProgressBar class="flex-grow-1" :value="formSection == 1 ? 50 : formSection > 1 ? 100 : 0" :showValue="false" style="height: .2em; max-width: 10rem; min-width: 2.5rem" />
			</div>
			<div class="d-flex flex-row align-items-center">
				<vs-button circle flat color="#9792E3" size="l" :active="formSection >= 2" @click="formSection = 2">
					<i class="fa-solid fa-3"></i>
				</vs-button>
				<ProgressBar class="flex-grow-1" :value="formSection == 2 ? 50 : formSection > 2 ? 100 : 0" :showValue="false" style="height: .2em; max-width: 10rem; min-width: 2.5rem" />
			</div>
			<div class="d-flex flex-row align-items-center">
				<vs-button circle flat color="#9792E3" size="l" :active="formSection >= 3">
					<i class="fa-solid fa-check"></i>
				</vs-button>
			</div>
		</div> -->
		<!-- <div class="mt-3 text-center mb-2">
			<h2 class="fw-bolder">Let's setup your account !</h2>
			<h6 class="text-muted" v-if="formSection == 0">Your basic information</h6>
			<h6 class="text-muted" v-else-if="formSection == 1">Tell us about your expirience</h6>
			<h6 class="text-muted" v-else-if="formSection == 2">More details about yourself</h6>
			<h6 class="text-muted" v-else>You are nearly there</h6>
		</div> -->
		<h3>Sign Up</h3>
		<h6>
			Enter your email and password to sign in
		</h6>
		<hr class="mt-0">
		<div class="mt-3">
			<form action="/register" method="POST">

				<!-- csrf Token -->
				<input type="text" :value="csrfToken" name="_token" hidden>
				<!-- csrf Token -->
				<div class="d-flex flex-column flex-md-row ">
					<!-- Form Section 1 -->
					<div >
						<div  class="row mx-0">
							<div class="col d-flex flex-column mb-2">
								<label for="name" class="my-1 text-start"><h5 class="m-0"><i class="fa-duotone fa-signature"></i> Name</h5></label>
								<vs-input id="name" autofocus name="name" v-model="registrationForm.name" placeholder="Full Name" type="text" aria-describedby="name-help"></vs-input>
								<!-- <small id="username1-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
						<div  class="row mx-0">
							<div class="col d-flex flex-column mb-2">
								<label for="email" class="my-1 text-start"><h5 class="m-0"><i class="fa-duotone fa-at"></i> Email</h5></label>
								<vs-input id="email" name="email"  v-model="registrationForm.email" type="email" placeholder="email@example.com" aria-describedby="email-help"></vs-input>
								<!-- <small id="email-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
						<div  class="row mx-0">
							<div class="col d-flex flex-column mb-2">
								<label for="phone" class="my-1 text-start"><h5 class="m-0"><i class="fa-duotone fa-phone"></i> Phone Number</h5></label>
								<vs-input id="phone" name="phone_number" required v-model="registrationForm.phone_number" type="tel" mask="9999-999-999" placeholder="0701-234-567"  aria-describedby="phone-help"></vs-input>
								<!-- <small id="email-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
						<div class="row mx-0">
							<div class="col flex-grow-1 d-flex flex-column mb-2 ">
								<label for="national-id" class="my-1 text-start"><h5 class="m-0"><i class="fa-duotone fa-id-card"></i> ID Number</h5></label>
								<vs-input  id="national-id" required name="national_id" type="number" v-model="registrationForm.national_id"  aria-describedby="national-id-help"></vs-input>
								<!-- <small id="national-id-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
					</div>
					<!-- Form Section 1 -->
					<Divider layout="vertical" class="d-none d-md-block" />
					<Divider layout="horizontal" class="d-block d-md-none" />
					<!-- Form Section 2 -->
					<div >
						<div class="row">
							<div class="col d-flex flex-column mb-2">
								<label for="company_email" class="my-1 text-start"><h5 class="m-0"><i class="fa-duotone fa-at"></i> Company Email</h5></label>
								<vs-input id="company_email" required name="company_email"  v-model="registrationForm.company_email" type="email" placeholder="email@example.com" aria-describedby="email-help"></vs-input>
								<small id="email-help">Your organization email</small>
							</div>
						</div>
						<div class="row">
							<div class="col d-flex flex-column mb-2">
								<label for="niche" class="my-1 text-start"><h5 class="m-0"><i class="fa-thin fa-list-check"></i> Niche</h5></label>
                                <select id="niche" required name="niche"  v-model="registrationForm.niche" placeholder="Niche name" aria-describedby="niche-help"
                                        class="form-control border-0" style="box-shadow: none !important; background-color: #f4f7f8 !important">
                                    <option
                                        v-for="(status, index) in ['Product Reviews','Travel','Pets','Health and Fitness','Tourism','Natural Healing', 'Fashion Accessories','natural Beauty Products']"
                                        :value="index + 1"
                                        :key="index"
                                    >
                                        {{ status }}
                                    </option>
                                </select>
								<small id="niche-help">Topic you are most comfortable with</small>
							</div>
						</div>
						<div class="row">
							<div class="col d-flex flex-column mb-2">
								<label for="niche_description" class="my-1 text-start"><h5 class="m-0"><i class="fa-duotone fa-pen"></i> Niche Experience</h5></label>
								<Textarea :autoResize="true" required id="niche_experience" name="niche_expirience"  v-model="registrationForm.niche_experience" placeholder="Describe your experience" rows="5" cols="30"
									style="border-radius: 15px; background-color: #f4f7f8 !important" class="border-0"/>
								<!-- <small id="email-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
					</div>
					<!-- Form Section 2 -->
					<Divider layout="vertical"  class="d-none d-md-block"/>
					<Divider layout="horizontal" class="d-block d-md-none" />
					<!-- Form Section 3 -->
					<div >
						<div class="row">
							<div class="col d-flex flex-column mb-2">
								<label for="english_proficiency" class="my-1 text-start"><h5 class="m-0">How proficient are you in English?</h5></label>
								<!-- <Rating id="english_proficiency" name="english_proficiency" v-model="registrationForm.english_proficiency" :stars="10" class="my-3" :cancel="false" /> -->
								<b-form-rating class="border-0" required id="english_proficiency" name="english_proficiency" v-model="registrationForm.english_proficiency" stars="10"></b-form-rating>
							</div>
						</div>
						<div class="row">
							<div class="col d-flex flex-column mb-2">
								<label for="daily_word_count" class="my-1 text-start"><h5 class="m-0">How many words can you write in a day?</h5></label>
								<vs-input id="daily_word_count" required type="number" name="daily_word_count" v-model="registrationForm.daily_word_count" aria-describedby="daily-word-count-help"></vs-input>
								<!-- <small id="email-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
						<div class="row">
							<div class="col d-flex flex-column mb-2 ">
								<label for="pricing" class="my-1"><h5 class="m-0">How much money do you expect for these words?</h5></label>
								<vs-input id="pricing" name="pricing" type="number" v-model="registrationForm.pricing" required  aria-describedby="pricing-help"></vs-input>
								<!-- <small id="national-id-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
						<div class="row">
							<div class="col d-flex flex-column mb-2">
								<label for="description" class="my-1"><h5 class="m-0">Write a short description about yourself</h5></label>
								<Textarea :autoResize="true" name="description" v-model="registrationForm.description" placeholder="Description" rows="5" cols="30"
									style="border-radius: 15px; background-color: #f4f7f8 !important" class="border-0"/>
								<!-- <small id="email-help">Enter your username to reset your password.</small> -->
							</div>
						</div>
					</div>
					<!-- Form Section 3 -->
					<Divider layout="vertical" class="d-none d-md-block" />
					<Divider layout="horizontal" class="d-block d-md-none" />
					<!-- Form Section 4 -->
					<div >
						<div class="row">
							<div class="col d-flex flex-column">
								<label for="password" class="my-1 text-start">
                                    <h5 class="m-0">
                                        <i class="fa-regular fa-key-skeleton"></i>
                                        Password
                                    </h5>
                                </label>
								<vs-input id="password" name="password" type="password" placeholder="********" v-model="registrationForm.password" ></vs-input>
							</div>
						</div>
						<div>
							<div class="col d-flex flex-column">
								<label for="confirm_password" class="my-1 text-start">
                                    <h5 class="m-0">
                                        <i class="fa-regular fa-key-skeleton"></i>
                                        Confirm Password
                                    </h5>
                                </label>
								<vs-input id="confirm_password" type="password" name="password_confirmation" placeholder="********" v-model="registrationForm.password_confirmation"></vs-input>
							</div>
						</div>
					</div>
					<!-- Form Section 4 -->
				</div>

				<div class="row mt-4">
					<div class="col">
						<vs-button type="submit" color="#EF0000" block class="mx-auto" :loading="register" @click="register = true">
							<h5 class="m-0 fw-bold">
								Sign Up
							</h5>
						</vs-button>
					</div>
				</div>
			</form>
			<hr>
			<h5>
				If you are already have an account
				<a href="/login" class="text-decoration-none">
					<vs-button color="#EF0000" transparent block class="mx-auto">
						<h5 class="m-0 ">Sign In</h5>
					</vs-button>
				</a>
			</h5>
		</div>
	</div>
</template>

<script>
import Divider from 'primevue/divider';
import Textarea from 'primevue/textarea';
import Rating from 'primevue/rating';
export default {
	props: {
		errors: {
			type: Object,
			required: false
		},
		old: {
			type: Object,
			required: false
		}
	},
	components: {
		Textarea, Rating, Divider
	},
	data(){
		return {
			formSection: 3,
			registrationForm: {
				name: '',
				email: '',
				company_email: '',
				national_id: '',
				phone_number: '',
				password: '',
				password_confirmation: '',
				niche: '',
				niche_experience: '',
				english_proficiency: '',
				daily_word_count: '',
				pricing: '',
				description: ''
			},
			register: false,
			oldInputs: JSON.parse(this.old),
			errorKeys: Object.keys(this.errors)
		}
	},
	methods:{
		gotoNextRegistrationSection(){
			/**
			 * Advance form
			 */
			this.formSection += 1;
		},
		gotoPreviousRegistrationSection(){
			/**
			 * Goto previous section
			 */
			this.formSection -= 1;
		},
		/**
		 * Register User Request
		 */
		async register(){
			let data = new FormData(document.getElementById('registration-form'));
			// console.log(data);
			/* await axios.post('/register',data).then(response => {
				if(response.status == 200){
					window.location.pathname = '/home';
				}
				console.log(response.data);
			}) */
		}
	},
	computed:{
		csrfToken(){
			return window.Laravel.csrfToken;
		}
	},
	mounted(){
		// let old = JSON.parse(this.old);

	}
}
</script>

<style>
.p-progressbar-value{
	background-color: #9792E3 !important;
}
.p-inputtext{
	background-color: transparent !important;
}
.p-inputtext:focus{
	outline: none !important;
	box-shadow: none !important;
	border-color: #9792E3 !important;
}
.p-button:focus{
	box-shadow: none !important;
	outline: none !important;
}
.no-outline:focus{
	outline: none !important;
	box-shadow: none !important;
}
.p-rating-icon{
	outline: none !important;
	box-shadow: none !important;
}
.pi-star-fill{
	color: #9792E3 !important;
}
</style>
