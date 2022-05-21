export default {
    data() {
        return {
            tabsection: 0,
            tabs: [
                { name: 'Investors', image: require('../../../assets/images/sidemenu-images/investors.png'), link: 'investors' },
                { name: 'Listing', image: require('../../../assets/images/sidemenu-images/listing.png'), link: 'listing' },
                { name: 'Listing requests', image: require('../../../assets/images/sidemenu-images/listing-request.png'), link: 'requests' },
                { name: 'Investment requests', image: require('../../../assets/images/sidemenu-images/investments-requests.png'), link: 'exploitation' },
                { name: 'Admins', image: require('../../../assets/images/sidemenu-images/admins.png'), link: 'admins' }

            ],
            bucket: 'http://localhost:3000'
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem("user_token")
            this.$router.push('/')

        }
    },
    mounted() {
        if (window.location.href.indexOf("investors") > -1)
            this.tabsection = 0;
        else if (window.location.href.indexOf("listing") > -1)
            this.tabsection = 1;
        else if (window.location.href.indexOf("requests") > -1)
            this.tabsection = 2;
        else if (window.location.href.indexOf("exploitation") > -1)
            this.tabsection = 3;
        else if (window.location.href.indexOf("admins") > -1)
            this.tabsection = 4;
    }

}