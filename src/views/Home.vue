<template>
  <div class="home">
    <search @loading="loading = $event" @failed="error = $event" />

    <div v-if="loading" style="display: flex; justify-content: space-around; padding: 40px;">
      <spinner />
    </div>

    <list v-else-if="!error" :items="searchResults">
      <template v-slot:item="{ item }">
        <h3>
          <router-link :to="{
            name: 'Details',
            params: { owner: item.owner.login, repo: item.name },
          }">
            {{ item.name }}
          </router-link>
          <icon-base :width="24" :height="24" @click="toggleBookmark(item)">
            <icon-bookmark v-if="this.bookmarks.find((bookmark) => bookmark.id === item.id)" />
            <icon-bookmark-outlined v-else />
          </icon-base>
        </h3>
        <p>Author: {{ item.owner.login }}</p>
        <p>
            <span style="color: darkorange">
              {{ item.stargazers_count }}
              <icon-base><icon-star /></icon-base>
            </span>
          <span style="color: darkblue; margin-left: 4px;">
              {{ item.forks_count }}
              <icon-base><icon-fork /></icon-base>
            </span>
        </p>
      </template>
    </list>

    <div v-else>{{ error }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import IconStar from '@/components/icons/IconStar';
import IconFork from '@/components/icons/IconFork';
import IconBookmark from '@/components/icons/IconBookmark';
import IconBookmarkOutlined from '@/components/icons/IconBookmarkOutlined';
import Search from '../components/Search';

export default {
  name: 'Home',
  components: {
    Search,
    IconStar,
    IconFork,
    IconBookmark,
    IconBookmarkOutlined,
  },
  data: () => ({
    searchQuery: '',
    loading: false,
    error: '',
  }),
  computed: {
    ...mapGetters('searchResults', ['searchResults']),
    ...mapGetters('bookmarks', ['bookmarks']),
  },
  methods: {
    ...mapActions('bookmarks', ['addBookmark', 'removeBookmark']),
    toggleBookmark(item) {
      if (this.bookmarks.find((bookmark) => bookmark.id === item.id)) {
        this.removeBookmark(item);
      } else {
        this.addBookmark(item);
      }
    },
  },
};
</script>
