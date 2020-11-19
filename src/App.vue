<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/bookmarks">
      <icon-base :width="24" :height="24"><icon-bookmark-outlined /></icon-base>Bookmarks
      ({{ bookmarks.length }})
    </router-link>
  </div>
  <router-view v-slot="{ Component }">
    <keep-alive include="Home">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <toast v-model:show="showToast">
    <p>{{ toastMessage }}</p>
    <button @click="undo">Undo</button>
  </toast>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconBookmarkOutlined from './components/icons/IconBookmarkOutlined';

export default ({
  components: {
    IconBookmarkOutlined,
  },
  data: () => ({
    showToast: false,
    toastMessage: '',
    undo: () => {},
  }),
  computed: {
    ...mapGetters('bookmarks', ['bookmarks', 'lastAction']),
  },
  watch: {
    lastAction({ type, item }) {
      this.showToast = false;

      this.$nextTick(() => {
        if (type === 'add') {
          this.toastMessage = 'Bookmark added';
          this.undo = () => this.removeBookmark(item);
        } else if (type === 'remove') {
          this.toastMessage = 'Bookmark removed';
          this.undo = () => this.addBookmark(item);
        }
        this.showToast = true;
      });
    },
  },
  methods: {
    ...mapActions('bookmarks', ['addBookmark', 'removeBookmark']),
  },
});
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  padding: 30px

  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983
</style>
