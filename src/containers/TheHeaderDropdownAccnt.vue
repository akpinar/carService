<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div>
          {{username}}
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Bildirimler</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-bell"/> Bildirimler
      <CBadge color="info" class="ml-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Mesajlar
      <CBadge color="success" class="ml-auto"></CBadge>
    </CDropdownItem>
  
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Ayarlar</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profil
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Ayarlar
    </CDropdownItem>
    
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42,
      username:'',
      nameSurname:''
    }
  },

   mounted() {


    this.username = localStorage.getItem('username')
    this.nameSurname = localStorage.getItem('user_name_surname')


  },
  watch: {
   nameSurname() {
       this.nameSurname = localStorage.getItem('user_name_surname')
      // isOpen datasındaki değişliği yakaladık.
   }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>