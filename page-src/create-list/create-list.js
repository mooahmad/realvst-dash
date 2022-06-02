export default {
  data: () => ({
    Property_type: null,
    location: null,
    location_map: null,
    unit_price: null,
    Property_desc: null,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    files: [],
    newFiles: [0],
    readers: [],
  }),
  methods: {
    addFiles() {
      console.log('files', this.files)
      this.files.forEach((file, f) => {
        this.readers[f] = new FileReader();
        this.readers[f].onloadend = (e) => {
          let fileData = this.readers[f].result
          let imgRef = this.$refs.file[f]
          imgRef.src = fileData
          console.log(fileData)
          // send to server here...
        }

        this.readers[f].readAsDataURL(this.files[f]);
      })
    },
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