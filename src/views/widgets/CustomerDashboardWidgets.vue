<template>
  <div>


    <CRow>
      <CCol col="12" sm="4" lg="4">
        <CWidgetIcon
            :header="this.dashData.totalCheckingAccount + ` ₺`"
            text="ÖDENEN TUTAR"
            color="primary"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney"  class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="4" lg="4">
        <CWidgetIcon
            :header="this.dashData.remainingDebt ? this.dashData.remainingDebt : '0.00' + ` ₺`"
            text="KALAN TUTAR"
            color="info"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney"  class="mx-2 " width="24"/>
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="4" lg="4">
        <CWidgetIcon
            :header="(Number(this.dashData.totalCheckingAccount)+Number(this.dashData.remainingDebt)) + ` ₺`"
            text="TOPLAM TUTAR"
            color="warning"
            :icon-padding="false"
        >
          <CIcon :content="$options.freeSet.cilMoney" name="cil-moon" class="mx-2 " width="24"/>
          <template #footer>
            <CCardFooter class="card-footer px-3 py-2">
              <CLink
                  class="font-weight-bold font-xs btn-block text-muted"
                  href="https://coreui.io/"
              >
                View more
                <CIcon  name="cil-arrowRight" class="float-right" width="16"/>
              </CLink>
            </CCardFooter>
          </template>
        </CWidgetIcon>
      </CCol>


    </CRow>


    <CRow>
      <CCol sm="6" md="3">
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
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.waitingApproveServiceCount"
            text="BEKLEYEN SERVİSLER"
            color="primary"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilCheck"  name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.uncompletedServiceCount"
            text="DEVAM EDEN SERVİSLER"
            color="warning"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilListRich"  name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="3">
        <CWidgetProgressIcon
            :header="this.dashData.completedServiceCount"
            text="TAMAMLANAN SERVİSLER"
            color="success"
            :value="100"
            inverse
        >
          <CIcon :content="$options.freeSet.cilCheck"  name="cil-chartPie" height="36"/>
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