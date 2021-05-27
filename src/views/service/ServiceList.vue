<template>
  <div>

    <CRow>

      <!--<video id="test_video" controls autoplay>
        <source src="rtsp://uzak:atakul1453@85.105.9.65:554/1/1">
      </video>-->
      <!--<video id="test_video" controls autoplay>
        <source src="rtsp://uzak:Atakul1453@85.105.9.65:554/6/2">
      </video>-->
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h3>Servis Listesi {{ this.message }}</h3>

                </CCol>

              </CRow>
            </CCardHeader>
            <template>
              <CCardBody>
                <div>
<!--                  <CAlert color="success" :show="isSuccess">-->
<!--                    Servis Durumu Başarıyla Değiştirildi-->
<!--                  </CAlert>-->

                </div>

                <CDataTable
                    :items="computedItems"
                    :fields="fieldsTable"

                    :border="true"

                    :footer="true"

                    hover

                    :loading="load"

                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >

                  <template #serviceSituation="{item}">
                    <td>
                      <CBadge :color="getBadge(item.serviceSituation)">{{ item.serviceSituation }}</CBadge>
                    </td>
                  </template>

                  <template #buttons="{ item, index }">
                    <td class="py-2">


                      <CDropdown
                          color="link"
                          size="lg"
                          :caret="false"
                      >
                        <template #toggler-content>
                          &#x1F4C2;<span class="sr-only">sss</span>
                        </template>
                        <!--<CDropdownItem @click="getServiceDetail(item.uuid)">Servis Detay</CDropdownItem> -->
                        <CDropdownItem v-for="(button,key) in item.buttons" :key="key"
                                       @click="generalService(item.uuid,button.buttonFunction)">
                          {{ button.buttonName }}
                        </CDropdownItem>

                      </CDropdown>


                    </td>
                  </template>
                  <template #details="{ item }">
                    <CCollapse
                        :show="Boolean(item._toggled)"
                        :duration="collapseDuration"
                    >

                    </CCollapse>
                  </template>


                </CDataTable>

                <template>
                  <div>

                    <CPagination
                        :activePage.sync="page"
                        :pages="pageCount"
                        size="sm"
                        align="end"
                    />
                  </div>
                </template>


              </CCardBody>
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


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
        :show.sync="receivingModal"
        :no-close-on-backdrop="true"
        :centered="true"
        :draggable="false"
        title="Modal title 2"
        :backdrop="true"
        size="sm"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="receivingModal">
              <template>
                <CCardBody>
<!--                  <div>-->


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
                    <CCol lg="12">
                      <CInput
                          label="Teslim Alan Kişi (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="receivingPerson"
                          type="text"

                      />
                    </CCol>
                  </CRow>


                  <CCol lg="2"></CCol>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Teslim Et</h6>
        <CButtonClose @click="receivingModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="receivingModal = false" color="danger">Kapat</CButton>
        <CButton @click="serviceProcessDeliver(serviceId,receivingPerson)" color="success">Kaydet</CButton>

      </template>
    </CModal>


    <CModal
        :show.sync="cameraModal"
        :no-close-on-backdrop="true"
        :centered="true"
        :draggable="false"
        title="Modal title 2"
        :backdrop="true"
        size="lg"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="cameraModal">
              <template>
                <CCardBody>

                  <CRow>
                    <CCol lg="12">


                      <iframe width="640" height="480" v-bind:src="this.camera" frameborder="0"
                              allowfullscreen></iframe>


                    </CCol>
                  </CRow>


                  <CCol lg="2"></CCol>


                </CCardBody>
              </template>

            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <CButtonClose @click="cameraModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="cameraModal = false" color="danger">Kapat</CButton>


      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModal"
    >
      Servisi silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModal = false" color="danger">Hayır</CButton>
        <CButton @click="deleteService" color="success">Evet</CButton>
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
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
// import ProductService from "@/services/product.service";

export default {
  name: "ServiceList",
  freeSet,


  data() {

    return {

      fieldsTable: [
        {key: 'id', label: "Servis No"},
        {key: 'serviceType', label: "Servis Tipi", _style: "min-width:200px"},
        {key: "creationDate", label: "Tarih"},
        {key: "buttons", label: "İşlemler"},
      ],
      load:false,
      pageCount:0,
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

      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
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
      serviceDetail: null,
      carPlate: '',
      messages: 'dhjksdjhsjkdhjkshdj',
      receivingPerson: '',
      receivingModal: false,
      serviceId: '',
      cameraModal: false,
      camera: '',
      deleteId : '',
      deleteModal : false,
      deleteButton:false
    };
  },

  props: ['message'],

  methods: {
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
        case "Müşteri Onayı Alındı":
          return "success";
        case "İptal Edildi":
          return "danger";
        case "Teslim Edildi":
          return "danger";
        default:
          return "warning";
      }
    },

    groupControl(){
      if(localStorage.getItem("user_group")==="Admin"){
        this.deleteButton = true
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


    async getServiceList(activePage) {

      this.load=true
      /*this.$toast.success({
        title:'',
        message:this.denemes()
      })*/

      let response = await new ServiceService().getServicesList(activePage);

      console.log(response.data)

      this.services = response.data.data
      this.pageCount = response.data.activePage
      this.load=false

    },


    async getServiceDetail(id) {

      let response = await new ServiceService().getServiceDetail(id);


      this.serviceDetail = response.data
      let responsePlate = await new CarService().getCarApi(this.serviceDetail.carUUID);

      this.carPlate = responsePlate.data.profile.firmName + '-' + responsePlate.data.profile.user.first_name + ' ' + responsePlate.data.profile.user.last_name

      this.serviceDetailModal()

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
        this.getServiceList(this.page);

      }, 30000);
    },

    goServiceDetermation(serviceId) {
      this.$router.push({name: 'ServiceDetermination', params: {serviceId: serviceId}});
    },

    serviceDeleteModal(id) {

      this.deleteId = id
      this.deleteModal = true

    },

    async deleteService() {


      let a = await new ServiceService().deleteService(this.deleteId);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.deleteModal = false;
        this.successHide();
        this.$toast.success({
          title: 'Bilgi',
          message: 'Servis silme işlemi başarıyla gerçekleşti'
        })
        await this.getProducts();

      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.data;
        this.$toast.error({
          title: 'Uyarı',
          message: 'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
      }
    },

    async goWatchCamera(serviceId) {
      let cameraRes = await new ServiceService().getServiceCamera(serviceId)

      this.camera = cameraRes.data.camera

      this.cameraModal = true
    },

    goServiceDetail(serviceId) {
      this.$router.push({name: 'ServiceDetail', params: {serviceId: serviceId}});
    },

    goServiceApprove(serviceId) {
      this.$router.push({name: 'ServiceApprove', params: {serviceId: serviceId}});
    },

    async serviceProcess(serviceId, situationNo, receivingPerson) {

      let response = await new ServiceService().ServiceProcessing(serviceId, situationNo, receivingPerson);

      if (response.status === 200) {
        this.isSuccess = true
        this.successHide()
        await this.getServiceList()
        this.receivingModal = false
        this.$toast.success({
          title: 'Bilgi',
          message: 'İşlem başarıyla tamamlandı'
        })
      }

    },

    generalService(serviceId, functionName) {


      if (functionName === 'goServiceDetail') {
        this.goServiceDetail(serviceId)
      } else if (functionName === 'goServiceApprove') {

        this.goServiceApprove(serviceId)

      } else if (functionName === 'goServiceDetermination') {

        this.goServiceDetermation(serviceId)

      } else if (functionName === 'goServiceDetermination') {

        this.goServiceDetermation(serviceId)

      } else if (functionName === 'serviceGetProcess') {

        this.serviceProcess(serviceId, 1, "")

      } else if (functionName === 'serviceProcessComplete') {

        this.serviceProcess(serviceId, 2, "")

      } else if (functionName === 'serviceDeliver') {

        this.serviceId = serviceId
        this.receivingModal = true
        //this.serviceProcess(serviceId,3,this.receivingPerson)

        //this.serviceProcessDeliver(serviceId,this.receivingPerson)

      } else if (functionName === 'goWatchCamera') {

        this.goWatchCamera(serviceId)

      }
       else if (functionName === 'serviceDelete') {

        this.serviceDeleteModal(serviceId)

      }


    },

    serviceProcessDeliver(serviceId, receivingPerson) {
      this.serviceProcess(serviceId, 3, receivingPerson)
      this.receivingPerson = ''
    }


  },

  watch: {

    page: function (val) {
      console.log(val)
      this.getServiceList(this.page)

    },
  },

  created() {


  },
  mounted() {
    this.groupControl()
    this.getServiceList(this.page)
    this.intervalFetchData()


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
