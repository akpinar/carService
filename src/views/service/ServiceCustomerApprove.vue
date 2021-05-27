<template>

  <div>

    <CRow>

      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Servis Bilgileri
              <div class="card-header-actions">
                <CLink href="#" class="card-header-action btn-setting">
                  <CIcon name="cil-settings"/>
                </CLink>
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
                <CLink
                    href="#"
                    class="card-header-action btn-close"
                    v-on:click="show = !show"
                >
                  <CIcon name="cil-x-circle"/>
                </CLink>
              </div>
            </CCardHeader>
            <template>
              <CCardBody>

                <CRow>
                  <CCol lg="12">
                    <transition name="fade">
                      <CCard>
                        <template>
                          <CCardBody>
                            <CRow>
                              <CCol lg="6">

                                <h6>Müşteri : {{ carPlate }}</h6>
                                <hr>
                                <h6>Plaka : {{ serviceDetail.plate }}</h6>
                                <hr>
                                <h6>Servis Tipi : {{ serviceDetail.serviceType }}</h6>
                                <hr>
                                <h6>KM : {{ serviceDetail.serviceKM }} KM</h6>
                                <hr>
                                <h6>Şikayet : {{ serviceDetail.complaint }} </h6>
                                <hr>

                              </CCol>

                              <CCol lg="6">

                                <h6>Servise Getiren Kişi : {{ serviceDetail.responsiblePerson }} </h6>
                                <hr>
                                <h6>Usta : {{ serviceDetail.serviceman }}</h6>
                                <hr>
                                <h6>Giriş Zamanı : {{ serviceDetail.creationDate }} </h6>
                                <hr>
                                <h6>
                                  Tespit: {{serviceDetail.description}}
                                </h6>
                                <hr>
                                <h6>
                                  Teslim Edilen Kişi: {{ serviceDetail.receiverPerson }}
                                </h6>
                                <hr>


                              </CCol>

                            </CRow>


                          </CCardBody>
                        </template>

                      </CCard>
                    </transition>
                  </CCol>
                </CRow>


              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>


    </CRow>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>

              <CIcon name="cil-list"/>

              Servis Ürün Listesi


              <CRow>

                <CCol lg="12">

<!--                  <CAlert-->
<!--                      :show.sync="dismissCountDown"-->
<!--                      closeButton-->
<!--                      color="success"-->
<!--                  >-->
<!--                    Servis işlemi gerçekleştirildi. {{ dismissCountDown }} saniye sonra Servis Listesine-->
<!--                    yönlendiriliceksiniz.-->
<!--                    <CProgress-->
<!--                        color="success"-->
<!--                        :max="dismissSecs"-->
<!--                        :value="dismissCountDown"-->
<!--                        height="4px"-->
<!--                    />-->
<!--                  </CAlert>-->


                </CCol>


              </CRow>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <div>
                  <CDataTable
                      :items="computedItems"
                      :fields="fieldsTableProduct"
                      column-filter
                      :border="true"
                      :items-per-page="5"
                      :activePage="4"
                      hover
                      sorter
                      pagination
                      :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                      clickableRows

                  >


                  </CDataTable>

                </div>

              </CCardBody>
              <CCardFooter style="padding-bottom: 10px">

                <b class="float-right">Toplam: {{ serviceDetail.totalPrice }} ₺</b>
                <b class="float-right" style="margin-right: 10px">Net: {{ serviceDetail.price }} ₺</b>
              </CCardFooter>

            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>

              <CIcon name="cil-list"/>

              Servis Araç Fotoğrafları


            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <div>
                  <CRow>
                    <CCol lg="4"
                          v-for="item in serviceProductImages"
                          :key="item.image"
                    >
                      <img class="img-responsive" :src="item.image" width="100%">
                    </CCol>
                  </CRow>
                </div>

              </CCardBody>

              <CCardFooter>

                <CButton color="success" class="float-right" style="margin-bottom: 10px;"
                         @click="acceptOrCanceledService(true)">
                  <CIcon :content="$options.freeSet.cilSave" name="cil-save"/>
                  Onayla
                </CButton>
                <CButton color="danger" class="float-right" style="margin-right:10px;margin-bottom: 10px;"
                         @click="acceptOrCanceledService(false)">
                  <CIcon :content="$options.freeSet.cilDelete" name="cil-delete"/>
                  İptal Et
                </CButton>
              </CCardFooter>


            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import Category from "@/models/category";
import Product from "@/models/product";
import product from "@/models/product";
import {freeSet} from '@coreui/icons'
import Service from "@/models/service";
import ServiceService from "@/services/service.service";
import CarService from "@/services/car.service";
import ProductService from "@/services/product.service";
import Cart from "@/models/cart";
import VueUploadMultipleImage from 'vue-upload-multiple-image';
import axios from "axios";
import authHeader from "@/services/auth-header";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

export default {
  name: "ServiceCustomerApprove",
  freeSet,


  data() {

    return {

      fieldsTable: [
        {key: 'serviceType', label: "Servis Tipi", _style: "min-width:200px"},
        {key: "plate", label: "Plaka"},
        {key: "serviceKM", label: "KM"},
        {key: "serviceSituation", label: "Durum"},
        {key: "serviceman", label: "Usta"},
        {key: "creationDate", label: "Tarih"},
        {key: "actions", label: "İşlemler"},
      ],
      fieldsTableProduct: [

        {key: 'barcodeNumber', label: "Barkod", _style: "min-width:100px"},

        {key: "name", label: "Ürün Adı"},
        {key: "brand", label: "Marka"},
        {key: "quantity", label: "Adet"},
        {key: "netPrice", label: "Net Fiyat"},
        {key: "taxRate", label: "KDV"},
        {key: "totalProduct", label: "Toplam Fiyat"},


      ],
      pageLabel: {label: 'sasasa', external: true,},
      page: 1,
      numberOfPages: 0,
      selected: [],
      rowsPerPageItems: [5],
      search: '',
      total: 0,
      loading: false,
      pagination: {external: true},
      categories: [],
      selectCategories: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      product: new Product("", "", "", "", "", "", "", "", "", "", ""),
      products: [],
      category: new Category("", "", "0"),
      categoryUpdate: new Category("", "", "0"),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      x: '',
      selectedFile: "Dosya Seçiniz",


      details: [],
      errors: [],
      errorsCar: [],
      images: [],

      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
      showAddProduct: false,
      horizontal: {label: "col-3", input: "col-9"},

      selectOptions: [
        "Option 1",
        "Option 2",
        "Option 3",
        {
          value: "some value",
          label: "Selected option",
        },
      ],
      selectedOption: "some value",

      formCollapsed: true,
      checkboxNames: [
        "Checkboxes",
        "Inline Checkboxes",
        "Checkboxes - custom",
        "Inline Checkboxes - custom",
      ],
      radioNames: [
        "Radios",
        "Inline Radios",
        "Radios - custom",
        "Inline Radios - custom",
      ],
      showServiceDetail: false,
      service: new Service(),
      services: [],
      serviceDetail: [],
      carPlate: '',
      barcodeSearch: '',
      carts: [],

      primaryText: "Fotoğraf Yükle",
      browseText: "Fotoğraf Yükle",
      dragText: "Fotğrafları Sürükle",
      markPrimary: "Ana fotoğraf yap",
      popupText: "Araç Resimleri",
      cartTotal: 0,
      determination: '',
      imagesPost: [],
      dismissSecs: 3,
      dismissCountDown: 0,
      serviceProducts: [],
      serviceProductImages: []


    };
  },

  methods: {
    // countDownChanged(dismissCountDown) {
    //   this.dismissCountDown = dismissCountDown
    // },
    // showAlert() {
    //   this.dismissCountDown = this.dismissSecs
    // },
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Tamamlandı":
          return "success";
        case "İşlem Bekleniyor":
          return "secondary";
        case "Müşteri Onayı Bekleniyor":
          return "warning";
        case "Banned":
          return "danger";
        case "İşlemde":
          return "info";
        default:
          "primary";
      }
    },
    addProductModal() {

      this.showAddProduct = true
    },
    getSelectCategories() {

      // get by search keyword

      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/category-select-api/", {headers: authHeader()})
          .then(res => {
            this.selectCategories = res.data;


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    async addDetermination() {

      let response = await new ServiceService().addServiceDetermination(this.$route.params.serviceId, this.imagesPost, this.carts, this.determination);

      if (response.status === 200) {

        // this.dismissCountDown = 3
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })

        setTimeout(() => this.$router.push({
          name: 'ServiceList',
          params: {message: "Arıza tespiti başarıyla yapıldı"}
        }), 3000);
      }


    },
    async acceptOrCanceledService(isAccept) {

      let response = await new ServiceService().acceptService(this.$route.params.serviceId, isAccept);

      if (response.status === 200) {

        // this.dismissCountDown = 3
        this.$toast.success({
          title: 'Başarılı',
          message: "işlem başarıyla gerçekleşti"
        })

        setTimeout(() => this.$router.push({
          name: 'ServiceList',
          params: {message: "Arıza tespiti başarıyla yapıldı"}
        }), 3000);
      }
      else {

        this.$toast.error({
          title: 'Hata',
          message: response.data
        })



      }


    },


    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },



    getBase64(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event[0]);
      this.selectedFile = event.length + ' dosya seçildi'
      var x = this
      reader.onload = function () {
        x.product.productImages = reader.result


      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };


      this.product.productImages = x
    }
    ,

    async getServiceList() {

      let response = await new ServiceService().getServicesList();

      this.services = response.data.data

    },

    async getServicProducts(id) {

      let response = await new ServiceService().getServiceProducts(id);


      this.serviceProducts = response.data


    },

    async getServiceImages(id) {

      let response = await new ServiceService().getServiceImages(id);


      this.serviceProductImages = response.data


    },


    async getServiceDetail(id) {

      let response = await new ServiceService().getServiceDetail(id);


      this.serviceDetail = response.data
      let responsePlate = await new CarService().getCarApi(this.serviceDetail.carUUID);


      var my_object = {
        barcodeNumber: '-',
        name: this.serviceDetail.laborName,
        brand: null,
        quantity: 1,
        netPrice: this.serviceDetail.laborPrice,
        taxRate: this.serviceDetail.laborTaxRate,
        totalProduct: (parseFloat(this.serviceDetail.laborPrice) + (parseFloat(this.serviceDetail.laborPrice) * parseFloat(this.serviceDetail.laborTaxRate) / 100)).toFixed(2)
      };
      this.serviceProducts.push(my_object)


      this.carPlate = responsePlate.data.profile.firmName + '-' + responsePlate.data.profile.user.first_name + ' ' + responsePlate.data.profile.user.last_name


    },


    async getSearchProduct() {

      this.products = []
      let response = await new ProductService().getSearchProduct(this.barcodeSearch);

      this.products = response.data


    },

    addCart(name, uuid, quantity, netPrice) {

      let cartItem = new Cart(uuid, name, quantity, netPrice)

      this.carts.push(cartItem)
      this.calculateCartTotal()


    },

    removeCart(index) {


      this.carts.splice(index, 1)
      this.calculateCartTotal()


    },

    calculateCartTotal() {
      let x = 0
      for (let i = 0; i < this.carts.length; i++) {

        x = parseFloat(x) + parseFloat(this.carts[i].netPrice);

      }


      this.cartTotal = x
    },


    updateCategoryModal(categoryId) {


      this.categoryUpdateModal = true
      this.categoryUpdate.id = categoryId
      this.categoryUpdate.parent = 5


    },

    serviceDetailModal() {

      this.showServiceDetail = true
    },

    errorHide() {
      setTimeout(() => (this.isError = false), 5000);
    },
    successHide() {
      setTimeout(() => (this.isSuccess = false), 5000);
    },
    errorHideCar() {
      setTimeout(() => (this.isErrorCar = false), 5000);
    },
    successHideCar() {
      setTimeout(() => (this.isSuccessCar = false), 5000);
    },
    async getCustomers() {
      let customersRes = await new CustomerService().customerGet('', '', '');
      this.customers = customersRes;
    },

    intervalFetchData: async function () {
      setInterval(() => {
        this.getServiceList();

      }, 10000);
    },
    uploadImageSuccess(formData, index, fileList) {
      this.imagesPost = fileList
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList) {
      done()
      this.imagesPost = fileList


    },
    editImage(formData, index, fileList) {
      this.imagesPost = fileList
    },
    async addProduct() {


      this.product.isOpen = true

      let productResponse = await new ProductService().addProduct(this.product);

      if (productResponse.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.showAddProduct = false;
        this.successHide();
        this.getProducts();

      } else if (productResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = productResponse.response.data["username"];
        this.errorHide();
      }

    },


  },

  watch: {},

  created() {


  },
  mounted() {
    this.getServiceDetail(this.$route.params.serviceId)
    this.getSelectCategories()
    this.getServicProducts(this.$route.params.serviceId)
    this.getServiceImages(this.$route.params.serviceId)


  },
  components: {
    VueUploadMultipleImage
  },
  computed: {

    computedItems() {

      return this.serviceProducts.map(item => {
        return {
          ...item,
          brand: item.brand != null ? item.brand.name : "",


        }
      })
    }
  }

};
</script>

<style>
#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 300px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  /*margin: 0 10px; */
}

a {
  color: #42b983;
}
</style>
