import axios from 'axios'
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "", value: 'image' },
            { text: 'Admin ID', value: 'id' },
            { text: 'Admin name', value: 'property_name' },
            { text: 'Admin type', value: 'property_type' },
            { text: 'Listings', value: 'location' },
            { text: 'Access', value: 'price', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },

        ],
        users: [],
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

    mounted() {
        if (!localStorage.getItem('user_token')) {
            this.$router.push('/')
        }
    },

    created() {
        this.getListing()
    },


    methods: {
        getListing() {
            try {
                console.log(this.$v)
                axios.get('http://34.125.158.199/admin/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.user_token}`
                    }

                }).then((response) => {
                    this.users = response.data.data
                    console.log(response, "users")
                    const status = this.listing.map(x => x.status)
                    console.log(status, "stuss")
                    if (status == 'Active') {
                        status[0].style.color = "green"
                    }

                })

            } catch (e) {

            }
        },


        editItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.users.splice(this.editedIndex, 1)
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
                Object.assign(this.users[this.editedIndex], this.editedItem)
            } else {
                this.users.push(this.editedItem)
            }
            this.close()
        },
    },
}