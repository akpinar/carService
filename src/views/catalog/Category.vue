<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil"/>
              Kategori
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
<!--                    Kategori başarıyla kaydedildi.-->
<!--                  </CAlert>-->

<!--                  <CAlert-->
<!--                      v-for="value in errors"-->
<!--                      :key="value.message"-->
<!--                      color="danger"-->
<!--                      :show="isError"-->
<!--                  >-->
<!--                    {{ value.value }}-->
<!--                  </CAlert>-->
<!--                </div>-->
                <CRow></CRow>
                <CRow>
                  <CCol lg="5">
                    <CInput
                        label="Kategori Adı (Zorunlu Alan)"
                        description=""
                        autocomplete="autocomplete"
                        v-model="category.name"

                    />


                  </CCol>

                  <CCol lg="5">
                    <CSelect
                        :options="selectCategories"
                        label="Üst Kategori (Zorunlu Alan)"


                        :value.sync="category.parent"


                    />


                  </CCol>

                  <CCol lg="2">

                    <div class="form-actions" style="margin-top: 29px">
                      <CButton type="submit" color="primary" @click="addCategory"
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
                    :items="computedItemsCategory"
                    :fields="fieldsTableCategory"
                    column-filter
                    :border="true"
                    :items-per-page="20"
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
                        <CButton color="warning" @click="updateCategoryModal(item.id)">Güncelle</CButton>
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
        :show.sync="categoryUpdateModal"
        :no-close-on-backdrop="true"
        :centered="true"
        title="Modal title 2"
        size="xl"
        color="dark"
    >
      <CRow>
        <CCol lg="12">
          <transition name="fade">
            <CCard v-if="categoryUpdateModal">
              <template>
                <CCardBody>

<!--                  <div>-->
<!--                    <CAlert color="success" :show="isSuccessCar">-->
<!--                      Araba başarıyla kaydedildi.-->
<!--                    </CAlert>-->

<!--                    <CAlert-->
<!--                        v-for="item in errorsCar"-->
<!--                        :key="item.message"-->
<!--                        color="danger"-->
<!--                        :show="isError"-->
<!--                    >-->
<!--                      E-mail: {{ item }}-->
<!--                    </CAlert>-->
<!--                  </div>-->


                  <CRow>


                    <CCol lg="5">
                      <CInput
                          label="Kategori Adı"
                          description=""
                          autocomplete="autocomplete"
                          v-model="categoryUpdate.name"

                      />


                    </CCol>

                    <CCol lg="5">
                      <CSelect
                          :options="selectCategories"
                          label="Üst Kategori"
                          v-model="categoryUpdate.parent"
                          :value.sync="categoryUpdate.parent"


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
        <h6 class="modal-title">Kategori Güncelle</h6>
        <CButtonClose @click="categoryUpdateModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="categoryUpdateModal = false" color="danger">Kapat</CButton>
        <CButton @click="updateCategory" color="success">Güncelle</CButton>
      </template>
    </CModal>


    <CModal
        title="Modal title"
        color="danger"
        :show.sync="deleteModal"
    >
      Kategoriyi silmek istediğinizden emin misiniz?


      <template #header>
        <h6 class="modal-title">Uyarı</h6>
        <CButtonClose @click="deleteModal = false" class="text-white"/>
      </template>
      <template #footer>
        <CButton @click="deleteModal = false" color="danger">Hayır</CButton>
        <CButton @click="deleteCategory" color="success">Evet</CButton>
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


export default {
  name: "Category",

  data() {
    return {

      fieldsTableCategory: [
        {key: 'name', label: "Kategori Adı", _style: "min-width:100px"},
        {key: "parentPath", label: "Üst Kategori"},
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
      categoryUpdate: new Category("", "", "0"),
      isSuccess: false,
      isSuccessCar: false,
      isError: false,
      deleteModal: false,
      deleteId: 0,


      details: [],
      errors: [],
      errorsCar: [],

      collapseDuration: 0,
      darkModal: false,
      carModal: false,
      show: true,
      showAddCar: true,
      horizontal: {label: "col-3", input: "col-9"},
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
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.successHide();
        this.getCategories();
        this.getSelectCategories();
        this.category = new Category()
        this.$toast.success({
          title:'Bilgi',
          message:'Kategori başarıyla eklendi'
        })
      } else if (a.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        // this.isError = false;
        // this.isError = true;
        this.errors = a.response.data;
        for (const [key, value] of Object.entries(this.errors)){
          this.$toast.error({
          title:'Hata',
          message:`${key}:${value}`
        })
        }
        this.errorHide();
      }
    },

    async updateCategory() {

      let categoryResponse = await new CategoryService().categoryUpdate(this.categoryUpdate);

      if (categoryResponse.status === 200) {
        this.isSuccess = false;
        this.isSuccess = true;
        this.categoryUpdateModal = false;
        this.successHide();
        this.getCategories();
        this.categoryUpdate = new Category()
        this.$toast.success({
          title:'Bilgi',
          message:'Kategori başarıyla güncellendi'
        })
      } else if (categoryResponse.response.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = categoryResponse.response.data;
        for (const [key, value] of Object.entries(this.errors)){
          this.$toast.error({
          title:'Hata',
          message:`${key}: ${value}`
        })
        }
        this.errorHide();
      }


    },

    groupControl(){
      if(localStorage.getItem("user_group")==="Admin"){
        this.deleteButton = true
      }
    },
    setDeleteModal(id) {

      this.deleteId = id
      this.deleteModal = true

    },

    async deleteCategory() {

      let a = await new CategoryService().deleteCategory(this.deleteId);
      if (a.status === 200) {
        // this.isSuccess = false;
        // this.isSuccess = true;
        this.deleteModal = false;
        this.successHide();
        await this.getCategories();
        this.$toast.success({
          title: 'Bilgi',
          message: 'Kategori başarıyla güncellendi'
        })

      } else if (a.status === 300) {
        // this.isError = false;
        // this.isError = true;
        let x = 'Bu kategori, kaydedilen bir kategoriyle ilişkili olduğu için silinemez'
        this.errors = x;
        this.$toast.error({
            title: 'Hata',
            message: `${this.errors}`
          })
        this.errorHide();
      } else if (a.status === 204) {
        // this.isError = false;
        // this.isError = true;
        let x = 'Bu kategori, kaydedilen bir ürünle ilişkili olduğu için silinemez'
        this.errors = x;
        this.$toast.error({
            title: 'Hata',
            message: `${this.errors}`
          })
        this.errorHide();
      } else if (a.status === 401) {
        this.isError = false;
        this.isError = true;
        this.errorHide();
        await this.$router.push("/pages/login");
      } else {
        this.isError = false;
        this.isError = true;
        this.errors = a.data;
        for (const [key, value] of Object.entries(this.errors)){
          this.$toast.error({
          title:'Hata',
          message:`${key}: ${value}`
        })
        }
        this.errorHide();
      }
    },
    async updateCategoryModal(categoryId) {


      let response = await new CategoryService().getCategory(categoryId)
      this.categoryUpdate = response.data
      this.categoryUpdateModal = true


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
          .catch(err => {
            this.$router.push("/pages/login");
          }).finally(() => this.loading = false);
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


  }
  ,

  watch: {}
  ,

  created() {


  }
  ,
  async mounted() {
    this.groupControl()
    await this.getCategories();
    await this.getSelectCategories();

  }
  ,
  computed: {

    computedItemsCategory() {

      return this.categories.map(item => {
        return {
          ...item,


        }
      })
    }
  }

}
;
</script>
