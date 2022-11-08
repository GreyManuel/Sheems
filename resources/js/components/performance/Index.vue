<template>
	 <div class="shadow-sm p-2 m-1 bg-white" style="border-radius: 15px">
        <h4 class="fw-bold"><i class="fa-duotone fa-chart-network"></i> Performance</h4>
		<div class="row mx-0 mt-5" v-if="noRatings">
			<div class="col-12 d-flex flex-row justify-content-center align-items-center">
				<h6>Your ratings will appear here</h6>
			</div>
		</div>
		<div class="row mx-0 mt-5" v-else>
			<div class="col-12 col-md-2 text-center">
				<h5 class="fw-bold"><i class="fa-duotone fa-spell-check text-success"></i> Grammar</h5>
				<Knob v-model="writerRatings.formating" :strokeWidth="7"  :min="0" :max="5"  readonly
				:valueColor="writerRatings.formating > 3.5 ? '#6A8E7F' : writerRatings.formating > 2.5 ? '#ffc107' : '#EF0000'" rangeColor="whitesmoke"/>
			</div>
			<div class="col-12 col-md-2 text-center">
				<h5 class="fw-bold"><i class="fa-duotone fa-memo-circle-check"></i> Flow</h5>
				<Knob v-model="writerRatings.keywords_use" :strokeWidth="7"  :min="0" :max="5" readonly
				:valueColor="writerRatings.keywords_use > 3.5 ? '#6A8E7F' : writerRatings.keywords_use > 2.5 ? '#ffc107' : '#EF0000'" rangeColor="whitesmoke" />
			</div>
			<div class="col-12 col-md-2 text-center">
				<h5 class="fw-bold"><i class="fa-duotone fa-stars text-warning"></i> Clarity</h5>
				<Knob v-model="writerRatings.clarity" :strokeWidth="7"  :min="0" :max="5" readonly
				:valueColor="writerRatings.clarity > 3.5 ? '#6A8E7F' : writerRatings.clarity > 2.5 ? '#ffc107' : '#EF0000'" rangeColor="whitesmoke" />
			</div>

			<div class="col-12 col-md-2 text-center">
				<h5 class="fw-bold"><i class="fa-duotone fa-lightbulb-on text-warning"></i> Creativity</h5>
				<Knob v-model="writerRatings.creativity" :strokeWidth="7"  :min="0" :max="5" readonly
				:valueColor="writerRatings.creativity > 3.5 ? '#6A8E7F' : writerRatings.creativity > 2.5 ? '#ffc107' : '#EF0000'" rangeColor="whitesmoke" />
			</div>
			<div class="col-12 col-md-2 text-center">
				<h5 class="fw-bold"><i class="fa-duotone fa-copy text-danger"></i> Plagiarism</h5>
				<Knob v-model="writerRatings.plagiarism" :strokeWidth="7"  :min="0" :max="5" readonly
				:valueColor="writerRatings.plagiarism > 3.5 ? '#6A8E7F' : writerRatings.plagiarism > 2.5 ? '#ffc107' : '#EF0000'" rangeColor="whitesmoke" />
			</div>
			<div class="col-12 col-md-2 text-center">
				<h5 class="fw-bold"><i class="fa-duotone fa-timer"></i> Timelines</h5>
				<Knob v-model="writerRatings.timelines" :strokeWidth="7"  :min="0" :max="5" readonly
				:valueColor="writerRatings.timelines > 3.5 ? '#6A8E7F' : writerRatings.timelines > 2.5 ? '#ffc107' : '#EF0000'" rangeColor="whitesmoke" />
			</div>
		</div>
		<div class="container d-flex flex-row justify-content-end mt-4" v-if="noRatings == false">
			<div class="text-center">
				<h6>Showing performance between:</h6>
				<Calendar name="delivery_time" class="p-inputtext-sm" selectionMode="range" v-model="yearRange" :manualInput="false"  view="year" dateFormat="mm/yy" :yearNavigator="true" yearRange="2000:2030"  style="background-color: #f4f7f8 !important;border-radius: 15px;"/>
			</div>
		</div>
		<hr>
		<div class="container">
			<h5 class="fw-bold"><i class="fa-duotone fa-clock-rotate-left"></i> Recent</h5>
			<div>
				<the-table :slug="'ongoing'" />
			</div>
		</div>
	</div>
</template>

<script>
import TheTable from '../jobs/TheTable.vue';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Knob from 'primevue/knob';
import { mapGetters } from 'vuex';
export default {
	components: { Knob, Dropdown, Calendar, TheTable },
	data(){
		return {
			yearRange: [],
			noRatings: false
		}
	},
	computed: {
		...mapGetters(['writerRatings'])
	},
	mounted() {
        this.$store.dispatch('getWriterJobs').then(() => {
			this.$store.dispatch('getWriterRating').then(res => {
				if(res.status === 204){
					this.noRatings = true;
				}
			})
		});

		this.yearRange.push(new Date(Date.parse(this.$store.state.user.created_at)));
		
		let created_at = new Date(Date.parse(this.$store.state.user.created_at));

		let nextYear = created_at.setFullYear(created_at.getFullYear() + 1);

		this.yearRange.push(new Date(nextYear));
    }
}
</script>

<style>

</style>
