import axios from 'axios'
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  // components: {
  //   vueDropzone: vue2Dropzone
  // },
  data: () => ({
    //   dropzoneOptions: {
    //     url: 'https://httpbin.org/post',
    //     thumbnailWidth: 150,
    //     maxFilesize: 0.5,
    //     headers: { "My-Awesome-Header": "header value" }
    // },
    Property_type: null,
    location: null,
    location_map: null,
    unit_price: null,
    Property_desc: null,
    price: null,
    beds: null,
    bath: null,
    floor_number: null,
    area: null,
    land: null,
    built_up_area: null,
    anim: [],
    finishing: {},
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    files: [],
    newFiles: [0],
    readers: [],
    cities: [],
    bedrooms: [],
    bathrooms: [],
    floors: [],
    amenities: [0],
    properties: [],
    finishing_types: [],
    newwimageee:[],
    pushedImages:[]
  }),
  methods: {
    createListing() {
      var ListingData = {
        "attach": this.newFiles,
        "image_ids": this.files,
        "property_type": this.Property_type,
        "location": this.location,
        "property_description": this.Property_desc,
        "price": this.price,
        "bedrooms": this.beds,
        "bathrooms": this.bath,
        "floor_number": this.floor_number,
        "area": this.area,
        "land": this.land,
        "built_up_area": this.built_up_area,
        "amenities": this.anim,
        "finishing_type": this.finishing
      };
      console.log(ListingData, "ListingData111")
      try {
        axios.post('http://34.125.158.199/admin/listings/create-listing', ListingData, {
          headers: {
            Authorization: `Bearer ${localStorage.user_token}`,
            'Content-Type': 'multipart/form-data'
          }

        }).then((response) => {
          console.log(response, "created success")
          console.log(ListingData, "ListingData222")


        })
        console.log(ListingData, "ListingData333")


      } catch (e) {
      }
    },




    addFiles() {
      // console.log('files', this.files)
      this.files.forEach((file, f) => {
        this.readers[f] = new FileReader();
        this.readers[f].onloadend = (e) => {
          let fileData = this.readers[f].result
          let imgRef = this.$refs.file[f]
          imgRef.src = fileData
          // this.files = fileData
          console.log(imgRef, "imgRef ")
          console.log(fileData, "filee")
          // send to server here...
        }
       this.readers[f].readAsDataURL(this.files[f]);
      })
      // this.pushedImages.push(this.files)
      // console.log(this.files,"fileess")

    },


  },

  created() {
    console.log(this.$refs.dropzoneElement, "refss")
    try {
      axios.get('http://34.125.158.199/listing/get-create-list', {
        headers: {
          Authorization: `Bearer ${localStorage.user_token}`
        }

      }).then((response) => {
        this.cities = response.data.data.cities
        this.bedrooms = response.data.data.bedrooms
        this.bathrooms = response.data.data.bathrooms
        this.floors = response.data.data.floors
        this.amenities = response.data.data.amenities
        this.properties = response.data.data.properties
        this.finishing_types = response.data.data.finishing_types
        this.anim = this.amenities.map(x => x.code)
        this.finishing = this.finishing_types.type
        console.log(response, "createe")

      })

    } catch (e) {

    }
  },
  mounted() {


    // var fileupload = document.getElementById("FileUpload1");
    // var filePath = document.getElementById("spnFilePath");
    // var image = document.getElementById("imgFileUpload");
    // image.onclick = function () {
    //   fileupload.click();
    // };
    // fileupload.onchange = function () {
    //   var fileName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];
    //   filePath.innerHTML = "<b>Selected File: </b>" + fileName;
    // };
  }
}