<template>
  <div v-if="item">
    <h3>
      <a :href="item.html_url" target="_blank">{{ item.name }}</a>
    </h3>

    <div v-if="readme" v-html="readme" class="readme" />
  </div>

  <div v-else-if="!error" style="display: flex; justify-content: space-around; padding: 40px;">
    <spinner />
  </div>

  <span v-else>{{ error }}</span>
</template>

<script>
import axios from '@/axios';

export default ({
  data: () => ({
    item: null,
    readme: null,
    error: null,
  }),
  async mounted() {
    const { owner, repo } = this.$route.params;

    try {
      const { data } = await axios.get(`/repos/${owner}/${repo}`);

      this.item = data;

      const { data: readmeData } = await axios.get(
        `/repos/${owner}/${repo}/readme`,
        { headers: { 'Accept': 'application/vnd.github.VERSION.html' } },
      );

      this.readme = readmeData;
    } catch (error) {
      this.error = error.message;
    }
  },
});
</script>

<style scoped lang="sass">
.readme
  border: 1px solid black
</style>
