<template>
  <div class="about">
    <h1>Here is what you saved:</h1>

    <list :items="bookmarks">
      <template v-slot:item="{ item }">
        <router-link :to="{
            name: 'Details',
            params: { owner: item.owner.login, repo: item.name },
          }">
          {{ item.name }}
        </router-link>
        <icon-base :width="24" :height="24" @click="removeBookmark(item)">
          <icon-bookmark />
        </icon-base>
      </template>
    </list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconBookmark from '@/components/icons/IconBookmark';

export default({
  components: {
    IconBookmark,
  },
  computed: {
    ...mapGetters('bookmarks', ['bookmarks']),
  },
  methods: {
    ...mapActions('bookmarks', ['removeBookmark']),
  },
});
</script>
