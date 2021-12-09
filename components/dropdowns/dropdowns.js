import axios from "axios"
import Ranges from '../ranges/ranges.vue'
import Loader from '../loader/loader.vue'
export default {
    components: {
        Ranges,
        Loader
    },
    data() {
        return {
            selectedJob: { id: null, name: null },
            selectedCountry: { id: null, name: null },
            jobs: [],
            countries: [],
            salaryRanges: [],
            loading: false
        }
    },
    methods: {

        getJobs() {
            axios.get('http://34.68.200.24/index.php/category_positions').then((response) => {
                this.jobs = response.data.list.map(x => ({ name: x.positionName, id: x.id }))
                console.log(response.data.list)
            })
        },
        getCountries() {
            axios.get('http://34.68.200.24/index.php/countries').then((response) => {
                this.countries = response.data.list.map(x => ({ name: x.name, id: x.id }))
                console.log(this.countries, "joppsss")
            })
        },
        async searchSalary() {
            try {
                this.loading = true
                // console.log(this.loading,"firsstt")
               await axios.get(`http://34.68.200.24/index.php/country/${this.selectedCountry.id}/position/${this.selectedJob.id}/advanced`)
                    .then((response) => {
                        this.salaryRanges = response.data
                        // console.log(this.selectedJob.id, this.selectedJob.name, "ressssssssss");
                        // console.log(response, "laassttt")
                    });
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
                console.log(this.loading,"firsstt")
            }
        }
    },
    mounted() {
        this.getJobs();
        this.getCountries();
    }
}