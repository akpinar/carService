<template>
  <div>
    <CRow>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.waitingApproveServiceCount"
            text="BEKLEYEN SERVİS"
            color="info"
            inverse
            :value="100"
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
      </CCol>

      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.uncompletedServiceCount"
            text="DEVAM EDEN SERVİS"
            color="warning"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilListRich"  name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
      </CCol>

      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.waitingCustomerApproveServiceCount"
            text="MÜŞTERİ ONAYI BEKLEYENLER"
            color="danger"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilListRich"  name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
      </CCol>

      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.completedServiceCount"
            text="TAMAMLANAN SERVİS"
            color="success"
            inverse
            :value="100"
        >
          <CIcon :content="$options.freeSet.cilCarAlt"  name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
    </CRow>





  </div>


</template>

<script>
import {CChartLineSimple, CChartBarSimple} from '../charts/index.js'
import {freeSet} from "@coreui/icons";

export default {
  name: 'WidgetsDropdown',
  components: {CChartLineSimple, CChartBarSimple},
  freeSet,
  props: {
    dashData: {
      type: Object,
      default: () => {
        return {}
      }


    }
  },
  mounted() {
  }
}
</script>