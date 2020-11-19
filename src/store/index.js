import { createStore } from 'vuex';
import searchResults from './modules/searchResults';
import bookmarks from './modules/bookmarks';

export default createStore({
  modules: {
    searchResults,
    bookmarks,
  },
});
