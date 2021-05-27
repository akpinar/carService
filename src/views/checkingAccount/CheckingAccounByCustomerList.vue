<template>
  <div>

    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CRow>
                <CCol lg="3" class="text-left mt-3">
                  <h3>Cari Liste {{ this.message }}</h3>

                </CCol>

              </CRow>
            </CCardHeader>
            <template>
              <CCardBody>
                <div>
                  <CAlert color="success" :show="isSuccess">
                    Servis Durumu Başarıyla Değiştirildi
                  </CAlert>

                </div>

                <CDataTable
                    :items="computedItems"
                    :fields="fieldsTable"
                    column-filter
                    :border="true"
                    :items-per-page="10"
                    :activePage="4"
                    hover
                    sorter
                    pagination
                    :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"
                    clickableRows

                >

                  <template #paymentSituation="{item}">
                    <td>
                      <CBadge :color="getBadge(item.paymentSituation)">{{ item.paymentSituation }}</CBadge>

                    </td>
                  </template>

                  <template #buttons="{ item, index }">
                    <td class="py-2">


                      <CDropdown
                          color="link"
                          size="lg"
                          :caret="false"
                          placement="top-start"
                      >
                        <template #toggler-content>
                          &#x1F4C2;<span class="sr-only">sss</span>
                        </template>
                        <!--<CDropdownItem @click="getServiceDetail(item.uuid)">Servis Detay</CDropdownItem> -->
                        <CDropdownItem v-for="(button,key) in item.buttons" :key="key"
                                       @click="generalService(item.checkingAccountId,button.buttonFunction)">
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


              </CCardBody>
              <CCardFooter style="padding-bottom: 10px">

                <b class="float-right">Kalan Borç: {{ remainCheckout }} ₺</b>
                <b class="float-right" style="margin-right: 10px">Ödenen: {{ totalCheckout }} ₺</b>
              </CCardFooter>
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
        :show.sync="showMakePayment"
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
            <CCard v-if="showMakePayment">
              <template>
                <CCardBody>
                  <div>


                    <CAlert
                        v-for="(value,key) in errors"
                        :key="value.message"
                        color="danger"
                        :show="isError"
                    >
                      {{ key }}: {{ value[0] }}
                    </CAlert>
                  </div>
                  <CRow>
                    <CCol lg="12">
                      <CInput
                          label="Ödeme Miktarı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="payment.paymentAmount"
                          type="number"

                      />
                    </CCol>
                  </CRow>


                  <CRow>
                    <CCol lg="12">
                      <CSelect
                          :options="selectPaymentTypes"
                          label="Ödeme Tipi (Zorunlu Alan)"
                          v-model="payment.paymentType"
                          :value.sync="payment.paymentType"

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
        <h6 class="modal-title">Ödeme Yap</h6>
        <CButtonClose @click="showMakePayment = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showMakePayment = false" color="danger">Kapat</CButton>
        <CButton @click="addPayment" color="success">Kaydet</CButton>

      </template>
    </CModal>


    <CModal
        :show.sync="paymentsModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >

      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="show">
              <template>
                <CCardBody>

                  <CDataTable
                      :items="computedItemPaymentMovement"
                      :fields="fieldsTablePayment"
                      column-filter


                      :items-per-page="5"
                      :activePage="4"
                      hover
                      sorter
                      pagination
                      :noItemsView="{ noResults: 'Veri bulunamadı', noItems: 'Veri bulunamadı' }"

                      clickableRows

                  >


                  </CDataTable>


                </CCardBody>
              </template>
            </CCard>
          </transition>
        </CCol>
      </CRow>
      <template #header>
        <h6 class="modal-title">Ödeme Hareketleri</h6>
        <CButtonClose @click="paymentsModal = false" class="text-white"/>
      </template>
      <template #footer>
          <CButton @click="getPaymentMovementPdf" color="primary" class="float-right">Ekstre</CButton>
        <CButton @click="paymentsModal = false" color="danger">Kapat</CButton>

      </template>
    </CModal>


    <CModal
        :show.sync="discountModal"
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
            <CCard v-if="discountModal">
              <template>
                <CCardBody>
                  <div>


                    <CAlert
                        v-for="(value,key) in errors"
                        :key="value.message"
                        color="danger"
                        :show="isError"
                    >
                      {{ key }}: {{ value[0] }}
                    </CAlert>
                  </div>
                  <CRow>
                    <CCol lg="12">
                      <CInput
                          label="Ödeme Miktarı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="discount.paymentAmount"
                          type="number"

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
        <h6 class="modal-title">Ödeme Yap</h6>
        <CButtonClose @click="discountModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="discountModal = false" color="danger">Kapat</CButton>
        <CButton @click="makeDiscount" color="success">Kaydet</CButton>

      </template>
    </CModal>


  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import Category from "@/models/category";

import {freeSet} from '@coreui/icons'
import Service from "@/models/service";
import ServiceService from "@/services/service.service";
import CarService from "@/services/car.service";
import CheckingAccountService from "@/services/checkingAccount.service";
import Payment from "@/models/payment";
import Discount from "@/models/discount";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

export default {
  name: "CheckingAccountList",
  freeSet,


  data() {

    return {

      fieldsTable: [
        {key: "serviceNo", label: "Servis Numarası"},
        {key: 'customerName', label: "Müşteri", _style: "min-width:200px"},
        {key: "plate", label: "Plaka"},

        {key: "serviceDate", label: "Servis Tarihi"},
        {key: "netPrice", label: "Net Ücret"},
        {key: "taxPrice", label: "KDV"},
        {key: "totalPrice", label: "Toplam Ücret"},
        {key: "discount", label: "İndirim"},
        {key: "remainingPrice", label: "Kalan Ücret"},
        {key: "paymentSituation", label: "Ödeme Durumu"},
        {key: "buttons", label: "İşlemler"},
      ],
      fieldsTablePayment: [
        {key: 'paymentAmount', label: "Ödeme Miktarı", _style: "min-width:200px"},
        {key: "paymentDate", label: "Tarih"},
        {key: "paymentTypeDesc", label: "Ödeme Tipi"},

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
      selectPaymentTypes: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      payment: new Payment("", "", "", ""),
      discount: new Discount("", "", ""),
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
      showMakePayment: false,
      service: new Service(),
      services: [],
      checkingAccounts: [],
      serviceDetail: null,
      carPlate: '',
      paymentMovements: [],
      paymentsModal: false,
      discountModal: false,
      remainCheckout:0,
      totalCheckout:0,
      checkingAccountUUID:''
    };
  },

  props: ['message'],

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Ödendi":
          return "success";
        case "Kısmi Ödendi":
          return "warning";
        case "Ödenmedi":
          return "danger";
        default:
          return "warning";
      }
    },


    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },

    async getPaymentMovementPdf() {
      let response = await new CheckingAccountService().getPaymentMovementPdf(this.checkingAccountUUID);
    },


    async getServiceList() {

      let response = await new ServiceService().getServicesList();


      this.services = response.data.data

    },

    async getCheckingAccountList() {

      let response = await new CheckingAccountService().checkingAccountListByCustomer(this.$route.params.customerId);

      this.remainCheckout = response.data.remainCheckout
      this.totalCheckout = response.data.totalCheckout
      this.checkingAccounts = response.data.data

    },

    async getPaymentMovementsList(id) {

      this.checkingAccountUUID=id
      let response = await new CheckingAccountService().getPaymentMovement(id);

      this.paymentMovements = response.data
      this.paymentsModal = true

    },

    async getPaymentType() {
      let response = await new CheckingAccountService().getPaymentType();

      this.selectPaymentTypes = response.data
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
        this.getServiceList();

      }, 10000);
    },

    goServiceDetermation(serviceId) {
      this.$router.push({name: 'ServiceDetermination', params: {serviceId: serviceId}});
    },

    goServiceDetail(serviceId) {
      this.$router.push({name: 'ServiceDetail', params: {serviceId: serviceId}});
    },

    goServiceApprove(serviceId) {
      this.$router.push({name: 'ServiceApprove', params: {serviceId: serviceId}});
    },

    async serviceProcess(serviceId, situationNo) {

      let response = await new ServiceService().ServiceProcessing(serviceId, situationNo);

      if (response.status === 200) {
        this.isSuccess = true
        this.successHide()
        await this.getServiceList()
      }

    },

    generalService(checkingId, functionName) {


      if (functionName === 'getPaymentMovementsList') {
        this.getPaymentMovementsList(checkingId)
      } else if (functionName === 'makePayment') {

        this.showMakePayment = true
        this.payment.uuid = checkingId

      } else if (functionName === 'makeDiscount') {
        this.discountModal = true
        this.discount.uuid = checkingId

      }


    },

    async addPayment() {

      let a = await new CheckingAccountService().addPayment(this.payment);
      if (a.status === 200) {
        this.isSuccess = false;
        this.showMakePayment = false
        this.isSuccess = true;
        await this.getCheckingAccountList()
        this.successHide();


      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data;
        this.errorHide();
      }
    },

    async makeDiscount() {

      let a = await new CheckingAccountService().makeDiscount(this.discount);
      if (a.status === 200) {
        //this.isSuccess = false;
        this.discountModal = false
        //this.isSuccess = true;
        await this.getCheckingAccountList()
        //this.successHide();

        this.$toast.success({
          title: 'Başarılı',
          message: 'İndirim işlemi başarıyla gerçekleştirilmiştir'
        })

      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data;
        this.errorHide();
      }
    }


  },

  watch: {},

  created() {


  },
  mounted() {
    this.getCheckingAccountList()
    this.intervalFetchData()
    this.getPaymentType()


  },
  computed: {

    computedItems() {

      return this.checkingAccounts.map(item => {
        return {
          ...item,


        }
      })
    },
    computedItemPaymentMovement() {

      return this.paymentMovements.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
