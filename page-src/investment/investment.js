import axios from 'axios'
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "", value: 'image' },
            { text: 'Listing ID', value: 'listing_id' },
            { text: 'Investors name', value: 'name' },
            { text: 'Income', value: 'income' },
            { text: 'Price', value: 'price' },
            { text: 'Requested on', value: 'request_on' },
            { text: 'Shares', value: 'shares' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        investments: [],
        toggle:false,
        editedIndex: -1,
        editedItem: {
            listing_id: 0,
            name: '',
            income: 0,
            price: 0,
            request_on: 0,
            shares: 0,
        },
        defaultItem: {
            listing_id: 0,
            name: '',
            income: 0,
            price: 0,
            request_on: 0,
            shares: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.getInvestment()
    },
    mounted() {
        if (!localStorage.getItem('user_token')) {
            this.$router.push('/')
        }
    },
    methods: {
        toggleTab(item){
            this.toggle = !this.toggle
        },
        getInvestment() {
            console.log('hereeee')
            try {
                axios.get('http://34.125.158.199/admin/investment-requests', {
                    headers: {
                        Authorization: `Bearer ${localStorage.user_token}`
                    }

                }).then((response) => {
                    this.investments= response.data.data
                    console.log(response, "investments")

                })

            } catch (e) {

            }
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
}