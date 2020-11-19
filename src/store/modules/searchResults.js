import axios from '@/axios';

const initialState = () => ({
  items: [],
});

const getters = {
  searchResults: (state) => state.items,
};

const actions = {
  async loadSearchResults({ commit }, q) {
    const { data } = await axios.get('/search/repositories', { params: { q } });

    commit('setSearchResults', data.items);
  },
};

const mutations = {
  setSearchResults(state, items) {
    state.items = items;
  },
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations,
};
