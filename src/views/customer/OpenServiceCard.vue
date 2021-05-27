<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader >
              <CIcon name="cil-pencil"/>
              Servis <span v-text="this.carPlate"></span>
              <div class="card-header-actions">
                <CLink
                    class="card-header-action btn-minimize"
                    @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                      :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CRow>
                  <CCol lg="4">

                    <CSelect
                        :options="serviceTypes"
                        label="Servis Tipi (Zorunlu Alan)"
                        v-model="service.serviceType"
                        :value.sync="service.serviceType"

                    />
                    <CInput
                          label="Sorumlu Kişi"
                          description=""
                          autocomplete="autocomplete"
                          v-model="service.responsiblePerson"

                      />
                  </CCol>

                  <CCol lg="4">
                    <CTextarea
                        :rows="5"
                        label="Şikayet (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="service.complaint"
                    />


                  </CCol>


                </CRow>

                <div class="form-actions">
                  <CButton type="submit" color="primary" @click="addOpenServiceCard"
                  >Kaydet
                  </CButton>

                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Customer from "../../models/customer";
import Car from "@/models/car";
import CarService from "@/services/car.service";
import Service from "@/models/service";
import ServiceService from "@/services/service.service";
import StaffService from "@/services/staff.service";
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'



export default {
  name: "OpenServiceCard",

  data() {
    return {
      fieldsTable: [
        {key: 'serviceType', label: "Servis Tipi", _style: "min-width:200px"},
        {key: "serviceKM", label: "KM"},
        {key: "serviceSituation", label: "Durum"},
        {key: "serviceman", label: "Usta"},
        {key: "creationDate", label: "Tarih"},
        {key: "actions", label: "İşlemler"},
      ],
      fieldsTableCar: [
        {key: 'plate', label: "Plaka", _style: "min-width:100px"},
        {key: "brand", label: "Marka"},
        {key: "model", label: "Model"},
        {key: "year", label: "Yıl"},
        {key: "chassisNumber", label: "Şase No"},
        {key: "engineNumber", label: "Motor No"},
        {key: "actions", label: "İşlemler"}
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
      servicemen: [],
      cars: [],
      cameras:[],

      service: new Service(),
      customer: new Customer("", "", "", "", "", "", "", ""),
      car: new Car("", "", "", "", "", "", "", "", "", "", ""),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,


      details: [],
      errors: [],
      errorsCar: [],
      isCorporate: false,
      collapseDuration: 0,
      darkModal: false,
      serviceTypes: [],
      services :[],

      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},
      options: ["Option 1", "Option 2", "Option 3"],
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
      carPlate: "",
    };
  },

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    redirectUser(){
      this.$router.push("/service/service-list")
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
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },

    isCorporateControl() {
      this.isCorporate = !this.isCorporate;
      this.customer.isCorporate = this.isCorporate;
    },
    addCarModal(profileUuid) {

      this.carModal = true
      this.car.profileUuid = profileUuid

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


    async getServiceType() {
      let response = await new ServiceService().getServiceType();

      this.serviceTypes = response.data
    },

    async getServicemanSelect() {
      let response = await new StaffService().getServicemanSelect();

      this.servicemen = response.data
    },

    async getCamerasSelect() {
      let response = await new ServiceService().getServiceCameraSelect();

      this.cameras = response.data
    },

    async getCar() {
      let response = await new CarService().getCarApi(this.$route.params.carId);

      this.carPlate = response.data.plate +'-'+response.data.profile.firmName+'-'+response.data.profile.user.first_name+' ' +response.data.profile.user.last_name
    },

    async getCarServices() {

      let response = await new ServiceService().getCarServices(this.$route.params.carId);

      this.services = response.data

     },



    goService() {
      this.$router.push({name: '/customer/open-service', params: {userId: "bar"}});
    }
    ,

    async addOpenServiceCard() {
      this.service.carUUID = this.$route.params.carId
      let a = await new ServiceService().addService(this.service);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.$toast.success({
          title: 'Başarılı',
          message: "Servis kaydı başarıyla oluşturuldu"
        })
        this.service.serviceType=''
        this.service.camera=''
        this.service.responsiblePerson=''
        this.service.serviceKM=''
        this.service.serviceman=''
        this.service.complaint=''
        this.successHide();
        this.getCarServices()
      } else if (a.response.status === 401) {
        // this.isError = false;
        // this.isError = true;
        this.$toast.error({
          title: 'Hata',
          message: "Yetkiniz Bulunmamaktadır"
        })
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        /*this.isError = false;
        this.isError = true;*/
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)){
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
        })
        }
        this.errorHide();
      }
    }

  },

  watch: {}
  ,

  created() {
    this.isCorporateControl();

  }
  ,
  mounted() {
    this.getServiceType()
    this.getServicemanSelect()
    this.getCar()
    this.getCarServices()
    this.getCamerasSelect()


  }
  ,
  computed: {
      computedItems() {

        return this.services.map(item => {
          return {
            ...item,


          }
        })
      }

  }

}
;
</script>
