<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://www.oxit.com.tr" target="_blank"></a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
