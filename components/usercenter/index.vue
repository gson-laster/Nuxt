<template>
 <li @click="router">
  <div :class="classname">

  </div>
  <p>{{name}}</p>
</li>
</template>

<script>
  export default {
    props: [
      'classname',
      'name',
      'path'
    ],
    methods: {
      router () {
      
        this.$emit('router', this.path)
      }
    }
  }
</script>

<style>
</style>