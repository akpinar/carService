<template>
  <CChartPie
    :datasets="defaultDatasets"
    :labels="['Tamamlanan', 'Onay Bekleyen', 'Devam Eden', 'İptal Edilen']"
  />
</template>

<script>
import { CChartPie } from '@coreui/vue-chartjs'

export default {
  name: 'CChartPieExample',
  components: { CChartPie },

  props:{
    dashData: {
      type: Object,
      default: () => {
        return {}
      }


    }
  },
  computed: {
    defaultDatasets () {

      let data =[]
      data.push(this.dashData.completedServiceCount)
      data.push(this.dashData.waitingApproveServiceCount)
      data.push(this.dashData.uncompletedServiceCount)
      data.push(this.dashData.canceledServiceCount)
      return [
        {
          backgroundColor: [
            '#41B883',
            '#e4bf51',
            '#00D8FF',
            '#DD1B16'
          ],
          data: data
        }
      ]
    }
  }
}
</script>
