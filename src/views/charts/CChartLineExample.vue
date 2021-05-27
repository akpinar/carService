<template>
  <CChartLine
    :datasets="defaultDatasets"
    labels="indexes"

  />
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'

export default {
  name: 'CChartLineExample',
  components: { CChartLine },
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



      return [
        {
          label: 'Aylık Ciro',
          backgroundColor: 'rgb(228,102,81,0.9)',
          data: this.dashData.lineChartIncome
        },

      ]
    }
  }
}
</script>
