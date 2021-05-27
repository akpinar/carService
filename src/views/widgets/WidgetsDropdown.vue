<template>
  <div>
    <CRow>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.customerCount"
            text="MÜŞTERİ SAYISI"
            color="info"
            inverse
            :value="100"
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
      </CCol>

      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.carCount"
            text="ARAÇ SAYISI"
            color="success"
            inverse
            :value="100"
        >
          <CIcon :content="$options.freeSet.cilCarAlt"  name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.uncompletedServiceCount"
            text="DEVAM EDEN"
            color="warning"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilListRich"  name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.waitingApproveServiceCount"
            text="ONAY BEKLEYEN"
            color="primary"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilCheck"  name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.productCount"
            text="ÜRÜN SAYISI"
            color="danger"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilBlur" name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
            :header="this.dashData.outOfStockCount"
            text="STOK BİTENLER"
            color="info"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilSpeech" name="cil-speech" height="36"/>
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
}
</script>