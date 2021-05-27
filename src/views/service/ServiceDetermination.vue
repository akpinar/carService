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
<!--                <CLink href="#" class="card-header-action btn-setting">-->
<!--                  <CIcon name="cil-settings"/>-->
<!--                </CLink>-->
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
<!--                <CLink-->
<!--                    href="#"-->
<!--                    class="card-header-action btn-close"-->
<!--                    v-on:click="show = !show"-->
<!--                >-->
<!--                  <CIcon name="cil-x-circle"/>-->
<!--                </CLink>-->
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
                                  Tespit: {{ serviceDetail.description }}
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
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <b>Servis Tespit Ekranı</b>


                </CCol>
                <CCol lg="9">
                  <CButton color="primary" class="float-right" @click="addProductModal">
                    <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>&nbsp;Ürün Ekle
                  </CButton>
                </CCol>

              </CRow>
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
<!--                  <div>-->
<!--                    <CAlert color="success" :show="isSuccess">-->
<!--                      Ürün başarıyla kaydedildi.-->
<!--                    </CAlert>-->

<!--                    <CAlert-->
<!--                        v-for="item in errors"-->
<!--                        :key="item.message"-->
<!--                        color="danger"-->
<!--                        :show="isError"-->
<!--                    >-->
<!--                      E-mail: {{ item }}-->
<!--                    </CAlert>-->
<!--                  </div>-->
                  <CRow></CRow>
                  <CRow>
                    <CCol lg="9">
                      <CTextarea
                          :rows="3"
                          label="Arıza Tespiti"
                          description=""
                          autocomplete="autocomplete"
                          v-model="determination"

                      />
                      <CRow>

                        <CCol lg="4">
                          <CInput
                              label="Hizmet Adı"
                              description=""
                              autocomplete="autocomplete"
                              v-model="laborName"

                          />
                        </CCol>

                        <CCol lg="4">
                          <CInput
                              label="Hizmet Net Fiyat"
                              description=""
                              autocomplete="autocomplete"
                              v-model="laborPrice"
                              type="number"

                          />
                        </CCol>


                        <CCol lg="4">
                          <CInput
                              label="Hizmet KDV Oranı(%)"
                              description=""
                              autocomplete="autocomplete"
                              v-model="laborTaxRate"
                              type="number"

                          />
                        </CCol>


                      </CRow>


                    </CCol>
                    <CCol lg="3">


                      <div id="my-strictly-unique-vue-upload-multiple-image"
                           style="display: flex; justify-content: center;">
                        <vue-upload-multiple-image
                            @upload-success="uploadImageSuccess"
                            @before-remove="beforeRemove"
                            @edit-image="editImage"
                            :data-images="images"
                            idUpload="myIdUpload"
                            editUpload="myIdEdit"
                            :primary-text="primaryText"
                            :browse-text="browseText"
                            :drag-text="dragText"
                            :markIsPrimaryText="markPrimary"
                            :popupText="popupText"
                            :max-image="100"

                        ></vue-upload-multiple-image>
                      </div>


                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="12">

                      <CRow>
                        <CCol col="12">
                          <CCard>
                            <CCardHeader>
                              <CRow lg="12">
                                <CCol lg="4">
                                  <CIcon name="cil-justify-center"/>
                                  <strong> Parça Listesi </strong>

                                </CCol>

                                <CCol lg="8">
                                  <CRow lg="12">

                                    <CCol lg="6">
                                      <CInput


                                          v-model="barcodeSearch"
                                          placeholder="Ürün Adı"


                                      />

                                    </CCol>


                                    <CCol lg="2">
                                      <div class="form-actions">
                                        <CButton type="submit" color="primary" @click="getSearchProduct"
                                        >Ara
                                        </CButton>

                                      </div>

                                    </CCol>

                                  </CRow>
                                </CCol>
                              </CRow>

                            </CCardHeader>
                            <CCardBody>
                              <CCardGroup deck>
                                <CCard>
                                  <CCardHeader>
                                    <b>Ürünler</b>

                                  </CCardHeader>
                                  <CListGroup


                                  >
                                    <CListGroupItem class="d-flex justify-content-between align-items-center"
                                                    v-for="(product,key) in products" :key="key" href="#">
                                      <CButton align="right" size="sm" color="success"
                                               @click="addCart(product.name,product.uuid,1,product.netPrice,product.barcodeNumber, product.quantity)">
                                        <CIcon :content="$options.freeSet.cilPlus" name="cil-plus"/>
                                      </CButton>
                                      <span>{{ product.barcodeNumber }}  | {{ product.name }} | {{ product.netPrice }} ₺ |  %{{
                                          product.taxRate
                                        }}</span>

                                      <CBadge color="primary" shape="pill">{{ product.quantity }}</CBadge>
                                    </CListGroupItem>

                                  </CListGroup>

                                </CCard>
                                <CCard>
                                  <CCardHeader><b>Sepet</b> <span class="float-right">Toplam: {{ cartTotal }} ₺</span>
                                  </CCardHeader>
                                  <CListGroup flush>
                                    <CListGroupItem class="d-flex  align-items-center"
                                                    v-for="(cart,index) in carts" :key="index" href="#">
                                      <CButton align="left" style="margin-right: 10px" size="sm" color="danger" @click="removeCart(index)">
                                        <CIcon :content="$options.freeSet.cilMinus" name="cil-minus"/>
                                      </CButton>
                                      <CButton align="left"  style="margin-right: 10px"  size="sm" color="success" @click="editCartModal(index,cart.netPrice)">
                                        <CIcon :content="$options.freeSet.cilMoney" name="cil-minus"/>
                                      </CButton>
                                      <span  style="margin-right: 10px" >{{ cart.barcodeNumber }} | {{ cart.name }} | {{ cart.netPrice }} ₺</span>


                                      <CBadge color="primary" shape="pill">{{ cart.quantity }}</CBadge>
                                    </CListGroupItem>
                                  </CListGroup>

                                </CCard>
                              </CCardGroup>

                            </CCardBody>
                          </CCard>
                        </CCol>


                      </CRow>

                    </CCol>
                    <CCol lg="12">
                      <CButton color="success" class="float-right" @click="addDetermination">
                        <CIcon :content="$options.freeSet.cilSave" name="cil-save"/>
                        Kaydet
                      </CButton>
                    </CCol>

                  </CRow>


                </div>

              </CCardBody>

            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="showAddProduct"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showAddProduct">
              <template>
                <CCardBody>
<!--                  <div>-->
<!--                    <CAlert color="success" :show="isSuccessCar">-->
<!--                      Ürün başarıyla kaydedildi.-->
<!--                    </CAlert>-->


<!--                    <CAlert-->
<!--                        v-for="(value,key) in errors"-->
<!--                        :key="value.message"-->
<!--                        color="danger"-->
<!--                        :show="isError"-->
<!--                    >-->
<!--                      {{ key }}: {{ value[0] }}-->
<!--                    </CAlert>-->
<!--                  </div>-->


                  <CRow>


                    <CCol lg="6">
                      <CInput
                          label="Barkod Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.barcodeNumber"

                      />
                      <CInput
                          label="Ürün Adı."
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.name"

                      />

                      <CInput
                          label="Alış Fiyatı"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.purchasePrice"
                          type="number"

                      />
                      <CInput
                          label="Net Ücret"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.netPrice"
                          type="number"

                      />
                      <CInput
                          label="KDV Oranı(%)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.taxRate"
                          type="number"

                      />


                    </CCol>
                    <CCol lg="6">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori"
                          v-model="product.categories"
                          :value.sync="product.categories"

                      />

                      <CSelect
                          :options="selectBrands"
                          label="Marka"
                          v-model="product.brand"
                          :value.sync="product.brand"

                      />

                      <CInput
                          label="Stok"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.quantity"
                          type="number"


                      />

                      <CInput
                          label="Raf Numarası"
                          description=""
                          autocomplete="autocomplete"
                          v-model="product.shelf"

                      />
                      <CInputFile
                          label="Resim Ekle"
                          horizontal
                          @change="getBase64"
                          custom
                          multiple
                          :placeholder="selectedFile"

                      />


                    </CCol>


                  </CRow>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ürün EKle</h6>
        <CButtonClose @click="showAddProduct = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showAddProduct = false" color="danger">Kapat</CButton>
        <CButton @click="addProduct()" color="success">Kaydet</CButton>
      </template>
    </CModal>

    <CModal
        :show.sync="showServiceDetail"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showServiceDetail">
              <template>
                <CCardBody>
                  <h5>Müşteri : {{ carPlate }}</h5>
                  <hr>
                  <h5>Plaka : {{ serviceDetail.plate }}</h5>
                  <hr>
                  <h5>Servis Tipi : {{ serviceDetail.serviceType }}</h5>
                  <hr>
                  <h5>KM : {{ serviceDetail.serviceKM }} KM</h5>
                  <hr>
                  <h5>Servise Getiren Kişi : {{ serviceDetail.responsiblePerson }} </h5>
                  <hr>
                  <h5>Usta : {{ serviceDetail.serviceman }}</h5>
                  <hr>
                  <h5>Giriş Zamanı : {{ serviceDetail.creationDate }} </h5>
                  <hr>
                  <h5>Şikayet : {{ serviceDetail.complaint }} </h5>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Servis Detay</h6>
        <CButtonClose @click="showServiceDetail = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showServiceDetail = false" color="danger">Kapat</CButton>

      </template>
    </CModal>








    <CModal
        :show.sync="showCartEditPrice"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="lg"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showCartEditPrice">
              <template>
                <CCardBody>
                  <CInput
                          label="Fiyat"
                          description=""
                          autocomplete="autocomplete"
                          v-model="editPrice"

                      />


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ürün Fiyatı</h6>
        <CButtonClose @click="showCartEditPrice = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showCartEditPrice = false" color="danger">Kapat</CButton>
         <CButton @click="editCartPrice" color="success">Düzenle</CButton>

      </template>
    </CModal>










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
  name: "ServiceDetermination",
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
      selectBrands: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      product: new Product("", "", "", "", "", "", "", "", "", "", "", "", ""),
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
      showCartEditPrice:false,
      editPrice:0,

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
      laborPrice: 0,
      laborTaxRate: 0,
      laborName: 'İşcilik Hizmeti',

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


    };
  },

  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
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

      let response = await new ServiceService().addServiceDetermination(this.$route.params.serviceId, this.imagesPost, this.carts, this.determination, this.laborPrice, this.laborTaxRate, this.laborName);

      if (response.status === 200) {
        this.$toast.success({
          title:'Bilgi',
          message:'Servis işlemi başarılı servis listesine yönlendiriliyorsununz'
        })


        setTimeout(() => this.$router.push({
          name: 'ServiceList',
          params: {message: "Arıza tespiti başarıyla yapıldı"}
        }), 3000);
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


    async getServiceDetail(id) {

      let response = await new ServiceService().getServiceDetail(id);


      this.serviceDetail = response.data
      let responsePlate = await new CarService().getCarApi(this.serviceDetail.carUUID);

      this.carPlate = responsePlate.data.profile.firmName + '-' + responsePlate.data.profile.user.first_name + ' ' + responsePlate.data.profile.user.last_name


    },


    async getSearchProduct() {

      this.products = []
      let response = await new ProductService().getSearchProduct(this.barcodeSearch);

      this.products = response.data


    },
    getSelectBrands() {

      // get by search keyword

      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      // let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/brand-select-api/", {headers: authHeader()})
          .then(res => {
            this.selectBrands = res.data;


          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
    },

    addCart(name, uuid, quantity, netPrice, barcodeNumber,originalStock) {

      let cartItem = new Cart(uuid, name, quantity, netPrice, barcodeNumber)
      var isExist = false

      for (var i = 0; i < this.carts.length; i++) {
        if (this.carts[i].uuid === uuid) {
          if(originalStock<parseInt(this.carts[i].quantity) + parseInt(quantity)){
               this.$toast.error({
          title: 'Hata',
          message: "Ürün Stokta Yok"
        })
          }
          else {
             this.carts[i].quantity = parseInt(this.carts[i].quantity) + parseInt(quantity)
          }

          isExist = true
        }

      }
      if (!isExist){

         if(originalStock===0){
               this.$toast.error({
          title: 'Hata',
          message: "Ürün Stokta Yok"
        })
          }
          else {
             this.carts.push(cartItem)
          }




      }


      this.calculateCartTotal()


    },

    removeCart(index) {


      this.carts.splice(index, 1)
      this.calculateCartTotal()


    },
    editCartModal(index,price) {
      this.showCartEditPrice=true
      this.editPrice = price
      this.activeIndex = index
    },
    editCartPrice(){

      if(this.editPrice!=null){


        this.carts[this.activeIndex].netPrice=this.editPrice
         this.showCartEditPrice=false
        this.$toast.success({
          title: 'Başarılı',
          message: "Ürün Fiyatı Düzenlendi"
        })
        this.calculateCartTotal()

      }



    },

    calculateCartTotal() {
      let x = 0
      for (let i = 0; i < this.carts.length; i++) {

        x = parseFloat(x) + (parseFloat(this.carts[i].netPrice)*parseInt(this.carts[i].quantity));

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
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.showAddProduct = false;
        this.successHide();
        this.getProducts();
        this.$toast.success({
          title:'Bilgi',
          message:'Ürün başarıyla kaydedildi'
        })
      } else if (productResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = productResponse.response.data;
        for (const [key, value] of Object.entries(this.errors)){
           this.$toast.error({
          title:'Bilgi',
          message:`${key}: ${value}`
        })
        }
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
    this.getSelectBrands()


  },
  components: {
    VueUploadMultipleImage
  },
  computed: {

    computedItems() {

      return this.services.map(item => {
        return {
          ...item,


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

/*li {
  display: inline-block;
  margin: 0 0px;
}*/

a {
  color: #42b983;
}
</style>
