export default {
    props: ['salaryRanges', 'selectedCountry'],
    data() {
        return {
            radios: 'Annual'
        }
    },
    mounted() {
        console.log(this.salaryRanges)
    }
}