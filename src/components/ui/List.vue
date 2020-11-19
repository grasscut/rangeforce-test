<template>
  <div class="list">
    <div class="list__item" v-for="item in items" :key="item.id">
      <slot name="item" :item="item"></slot>
    </div>
  </div>
</template>

<script>
export default({
  name: 'List',
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
});
</script>

<style scoped lang="sass">
.list
  &__item
    border-bottom: 1px solid lightgray
</style>
