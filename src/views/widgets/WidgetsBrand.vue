<template>

</template>

<script>
import { CChartLineSimple } from '../charts/index.js'

export default {
  name: 'WidgetsBrand',
  components: {
    CChartLineSimple
  },
  props: {
    noCharts: Boolean
  }
}
</script>

<style scoped>
.c-chart-brand {
  position: absolute;
  width: 100%;
  height: 100px;
}
</style>
