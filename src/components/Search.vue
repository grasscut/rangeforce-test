<template>
  <form @submit.prevent="search" class="search">
    <input
      v-model="searchQuery"
      name="q" placeholder="Search GitHub repos by keywords"
      class="search__input"
    />

    <button class="search__button" type="submit">Go</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  data: () => ({
    searchQuery: '',
  }),
  methods: {
    ...mapActions('searchResults', ['loadSearchResults']),
    async search() {
      this.$emit('failed', null);

      if (this.searchQuery) {
        try {
          this.$emit('loading', true);
          await this.loadSearchResults(this.searchQuery);
          this.$emit('loading', false);
        } catch {
          this.$emit('loading', false);
          this.$emit('failed', 'Loading failed. Please try again');
        }
      }
    },
  },
};
</script>

<style scoped lang="sass">
.search
  display: flex
  justify-content: center

  &__input
    flex-grow: 1
    max-width: 400px
    line-height: 28px
    font-size: 20px

  &__button
    background-color: #42b983
    min-width: 56px
    border: none
    color: white
    font-weight: 600
</style>
