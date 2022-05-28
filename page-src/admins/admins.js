import axios from 'axios'
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "", value: 'image' },
            { text: 'Admin ID', value: 'id' },
            { text: 'Admin name', value: 'name' },
            { text: 'Admin type', value: 'role_name' },
            { text: 'Admin email', value: 'email' },
            { text: 'Access', value: 'permissions', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false },

        ],
        users: [],
        searchData: '',
        selected: [],
        checkbox1: true,
        roles: [],
        permesion: [],
        accessData: null,
        checkbox2: false,
        editedIndex: -1,
        editedItem: {
            id: '',
            name: '',
            role_name: '',
            email: '',
            permissions: [],
        },
        defaultItem: {
            id: '',
            name: '',
            role_name: '',
            email: '',
            permissions: [],
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        changeBtnsTitles(){
            this.formTitle === 'New Item' ?  'Create' : 'Save Changes'
        },
        findListing() {
            return this.users.filter(x => {
                return x.name.toLowerCase().includes(this.searchData.toLowerCase())
            })
        }
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
        try {
            axios.get('http://34.125.158.199/admin/users/add-admin', {
                headers: {
                    Authorization: `Bearer ${localStorage.user_token}`
                }

            }).then((response) => {
                this.roles = response.data.data.roles
                this.permesion = response.data.data.permissions
                console.log(this.permesion, "this.permesion")
                console.log(this.roles, response, "access")
            })

        } catch (e) {

        }
    },


    methods: {
        getListing() {
            try {
                axios.get('http://34.125.158.199/admin/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.user_token}`
                    }

                }).then((response) => {
                    this.users = response.data.data
                    console.log(response, "users")

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

        async deleteItemConfirm() {
            const id = this.users.splice(this.editedIndex, 1)
            console.log(id[0].id, "deleteddiddd")
            try {
                await axios.get(`http://34.125.158.199/admin/users/${id[0].id}/delete`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.user_token}`
                    }

                }).then((response) => {
                    console.log(response, "delet")

                })
            } catch (e) {
                console.log(e)
            }
            this.cl
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
        changeSelect() {
            console.log(this.selected, this.permissions, this.permesion, "changeee")
        },
        async save() {
            var postData = {
                "email": this.editedItem.email,
                "role_id": this.editedItem.id,
                "permission_ids": this.editedItem.permissions,
                "name": this.editedItem.name,
            };
            try {
                await axios.post(`http://34.125.158.199/admin/users/create-admin`, postData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.user_token}`
                    }

                }).then((response) => {
                    console.log(response, "createee")

                })
                console.log(this.editItem, "editt")
            } catch (e) {
                console.log(e)
            }

            if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem)
            } else {
                this.users.push(this.editedItem)
            }
            this.close()
        },
    },
}