<template>
  <transition name="slide-fade">
    <div v-if="show" class="toast">
      <slot />
    </div>
  </transition>
</template>

<script>
let hideTimeout;

export default({
  name: 'Toast',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(value) {
      clearTimeout(hideTimeout);

      if (value) {
        hideTimeout = setTimeout(() => {
          this.$emit('update:show');
        }, 5000);
      }
    },
  },
});
</script>

<style scoped lang="sass">
.toast
  min-width: 200px
  background-color: #42b983
  box-shadow: 0 0 8px gray
  color: white
  text-align: center
  border-radius: 2px
  padding: 16px
  position: fixed
  z-index: 1
  top: 0
  right: 0
  margin: 16px

button
  background-color: white
  border: none
  height: 20px

.slide-fade-enter-active
  transition: all 0.3s ease-out

.slide-fade-leave-active
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1)

.slide-fade-enter-from,
.slide-fade-leave-to
  transform: translateY(-40px)
  opacity: 0
</style>
