import axios from "axios"
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "", value: 'photos' },
            { text: 'Request ID', value: 'id' },
            { text: 'Property name', value: 'property_name' },
            { text: 'Property type', value: 'property_type' },
            { text: 'Location', value: 'location' },
            { text: 'Price', value: 'price', sortable: false },
            { text: 'Status', value: 'status', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        requests: [],
        editedIndex: -1,
        editedItem: {
            id: '',
            property_name: '',
            property_type: '',
            location: '',
            price: 0,
            status: '',
        },
        defaultItem: {
            id: '',
            property_name: '',
            property_type: '',
            location: '',
            price: 0,
            status: '',
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
        this.getRequests()
    },

    methods: {
        getRequests() {
            try {
                console.log(this.$v)
                axios.get('http://34.125.158.199/admin/requests', {
                    headers:{
                        Authorization : `Bearer ${localStorage.user_token}`
                    }

                }).then((response) => {
                    this.requests= response.data.data
                    console.log(response,"requestss")

                })

            } catch (e) {

            }
        },
       
        editItem(item) {
            this.editedIndex = this.requests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.requests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.requests.splice(this.editedIndex, 1)
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
                Object.assign(this.requests[this.editedIndex], this.editedItem)
            } else {
                this.requests.push(this.editedItem)
            }
            this.close()
        },
    },
}