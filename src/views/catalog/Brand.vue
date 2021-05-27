<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Marka
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
            <CCollapse :show="formCollapsed">
              <CCardBody>
<!--                <div>-->
<!--                  <CAlert color="success" :show="isSuccess">-->
<!--                    Marka başarıyla kaydedildi.-->
<!--                  </CAlert>-->


<!--                  <CAlert-->
<!--                      v-for="(value,key) in errors"-->
<!--                      :key="value.message"-->
<!--                      color="danger"-->
<!--                      :show="isError"-->
<!--                  >-->
<!--                    {{ value }}-->

<!--                  </CAlert>-->
<!--                </div>-->
                <CRow></CRow>
                <CRow>
                  <CCol lg="5">
                    <CInput
                        label="Marka Adı (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="brand.name"

                    />


                  </CCol>


                  <CCol lg="2">

                    <div class="form-actions" style="margin-top: 29px">
                      <CButton type="submit" color="primary" @click="addBrand"
                      >Kaydet
                      </CButton>

                    </div>


                  </CCol>


                </CRow>


              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <template>
              <CCardBody>

                <CDataTable
                    :items="computedItemsBrands"
                    :fields="fieldsTableBrands"
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

                  <template #actions="{ item, index }">
                    <td class="py-2">

                      <CButtonGroup class="mx-1 d-sm-down-none">
                        <CButton v-if="deleteButton" color="danger" @click="setDeleteModal(item.id)">Sil</CButton>
                        <CButton color="warning" @click="getSingleBrand(item.id)">Güncelle</CButton>
                      </CButtonGroup>


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
            </template>
          </CCard>
        </transition>
      </CCol>
    </CRow>


    <CModal
        :show.sync="showUpdateBrand"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="showUpdateBrand">
              <template>
                <CCardBody>
                  <div>
<!--                    <CAlert color="success" :show="isSuccessCar">-->
<!--                      Marka kaydedildi.-->
<!--                    </CAlert>-->

<!--                    <CAlert-->
<!--                        v-for="(value,key) in errorsCar"-->
<!--                        :key="value.message"-->
<!--                        color="danger"-->
<!--                        :show="isError"-->
<!--                    >-->
<!--                      {{ key }}: {{ value[0] }}-->
<!--                    </CAlert>-->
                  </div>


                  <CRow>


                    <CCol lg="12">
                      <CInput
                          label="Marka Adı (Zorunlu Alan)"
                          description=""
                          autocomplete="autocomplete"
                          v-model="updateBrand.name"


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
        <h6 class="modal-title">Marka Güncelle</h6>
        <CButtonClose @click="showUpdateBrand = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="showUpdateBrand = false" color="danger">Kapat</CButton>
        <CButton @click="updateBrands()" color="success">Güncelle</CButton>
      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModel"
    >
      Markayı silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModel = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModel = false" color="danger">Hayır</CButton>
        <CButton @click="deleteBrand" color="success">Evet</CButton>
      </template>


    </CModal>


  </div>
</template>

<script>

import CustomerService from "@/services/customer.service";

import axios from "axios";
import authHeader from "@/services/auth-header";

import Category from "@/models/category";
import CategoryService from "@/services/category.service";
import Brand from "@/models/brand";
import BrandService from "@/services/brand.service";


export default {
  name: "Brand",

  data() {
    return {

      fieldsTableBrands: [
        {key: 'name', label: "Marka Adı", _style: "min-width:100px"},

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
      categories: [],
      selectCategories: [],
      categoryUpdateModal: false,
      showUpdateCategory: true,
      category: new Category("", "", "0"),
      brand: new Brand("", ""),
      updateBrand: new Brand("", ""),
      categoryUpdate: new Category("", "", "0"),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,


      details: [],
      errors: [],
      errorsCar: [],
      brands: [],

      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      showUpdateBrand: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},
      deleteId: 0,
      deleteModel: false,
      deleteButton:false,

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
    };
  },

  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
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



    async addCategory() {
      let a = await new CategoryService().categoryAdd(this.category);
      if (a.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.successHide();
        this.getCategories();
        this.getSelectCategories();
        this.category = new Category()
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data["username"];
        this.errorHide();
      }
    },
    async addBrand() {

      let a = await new BrandService().addBrand(this.brand);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.$toast.success({
          title: 'Başarılı',
          message: "Marka ekleme işlemi başarıyla gerçekleşti"
        })
        this.brand.name=''
        this.successHide();
        await this.getBrands();

      } else if (a.response.status === 401) {
        // this.isError = false;
        // this.isError = true;
        this.$toast.error({
          title: 'Hata',
          message: "Yetkiniz bulunmamaktadır."
        })
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        // this.isError = false;
        // this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)){
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
        })
        }
        this.errorHide();
      }
    },

    updateCa(categoryId) {


      this.categoryUpdateModal = true
      this.categoryUpdate.id = categoryId
      this.categoryUpdate.parent = 5


    },

    async updateBrands() {

      let a = await new BrandService().updateBrand(this.updateBrand);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.showUpdateBrand = false;
        this.successHide();
        await this.getBrands();
        this.updateBrand = new Brand()
        this.$toast.success({
          title: 'Bilgi',
          message: 'Marka güncelleme işi başarı ile gerçekleşti'
        })

      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        this.$toast.error({
          title: 'Hata',
          message: 'Yetkiniz Bulunmamaktadır.'
        })
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)){
          this.$toast.error({
            title: 'Hata',
            message: `${key}: ${value}`
        })
        }
        this.errorHide();
      }
    },

    async deleteBrand() {

      let a = await new BrandService().deleteBrand(this.deleteId);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.deleteModel = false;
        this.successHide();
        await this.getBrands();
        this.updateBrand = new Brand()
        this.$toast.success({
          title: 'Bilgi',
          message: 'Marka başarıyla silindi'
        })

      } else if (a.status === 204) {
        // this.isError = false;
        // this.isError = true;
        let x = [{'1': 'Bu marka, kaydedilen bir ürünle ilişkili olduğu için silinemez'}]
        this.errors = x;
        this.errors.forEach((mess)=>{
          this.$toast.error({
            title:'Uyarı',
            message:mess[1]
          })

        })
        this.errorHide();
      } else if (a.status === 401) {
        // this.isError = false;
        // this.isError = true;
        this.$toast.error({
          title:'Uyarı',
          message:'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        // this.isError = false;
        // this.isError = true;
        this.errors = a.data;
        this.$toast.error({
          title:'Uyarı',
          message:'Lütfen daha sonra tekrar deneyiniz'
        })
        this.errorHide();
      }
    },

    groupControl(){
      if(localStorage.getItem("user_group")==="Admin"){
        this.deleteButton = true
      }
    },

    async getSingleBrand(id) {


      let response = await new BrandService().getBrand(id);
      this.updateBrand = response.data
      this.showUpdateBrand = true

    },

    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModel = true

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

    async getBrands() {
      let response = await new BrandService().getBrands();

      if (response.status === 200) {
        this.brands = response.data.data
      } else {
        await this.$router.push("/pages/login");
      }


    },

    getCategories() {

      // get by search keyword
      this.loading = true;
      //const {page, itemsPerPage} = this.options;
      //let pageNumber = page;


      axios.get(process.env.VUE_APP_API_URL + "/car-service/category-api/", {headers: authHeader()})
          .then(res => {
            this.categories = res.data;
            this.total = res.data.recordsTotal;
            this.numberOfPages = 2;

          })
          .catch(err => console.log(err.response.data))
          .finally(() => this.loading = false);
      this.loading = false
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


  },

  watch: {},

  created() {


  },
  async mounted() {
    this.groupControl()
    await this.getBrands()
    //await this.getCategories();
    //await this.getSelectCategories();

  },
  computed: {

    computedItemsBrands() {

      return this.brands.map(item => {
        return {
          ...item,


        }
      })
    }
  }

};
</script>
