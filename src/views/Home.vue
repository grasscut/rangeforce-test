<template>
  <div class="home">
    <search @loading="loading = $event" @failed="error = $event" />

    <div v-if="loading" style="display: flex; justify-content: space-around; padding: 40px;">
      <spinner />
    </div>

    <list v-else-if="!error" :items="searchResults">
      <template v-slot:item="{ item }">
        <repo-details :item="item" />
      </template>
    </list>

    <div v-else>{{ error }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from '../components/Search';
import RepoDetails from '../components/RepoDetails';

export default {
  name: 'Home',
  components: {
    Search,
    RepoDetails,
  },
  data: () => ({
    searchQuery: '',
    loading: false,
    error: '',
  }),
  computed: {
    ...mapGetters('searchResults', ['searchResults']),
  },
};
</script>
