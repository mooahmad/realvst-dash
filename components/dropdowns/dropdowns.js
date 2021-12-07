import axios from "axios"
export default {

    data() {
        return {
            // items: ['foo', 'bar', 'fizz', 'buzz'],
            // // values: ['foo', 'bar'],
            selectedJob: { id: null, name: null },
            selectedCountry: { id: null, name: null },
            jobs: [],
            countries: [],
            allJops: [],
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
        searchSalary() {
            axios.get(`http://34.68.200.24/index.php/country/${this.selectedCountry.id}/position/${this.selectedJob.id}/advanced`)
            .then((response) => {

            console.log(this.selectedJob.id, this.selectedJob.name, "ressssssssss");
              console.log(response,"laassttt")
            });
        }
    },
    mounted() {
        this.getJobs();
        this.getCountries();
    }
}