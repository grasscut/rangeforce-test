const initialState = () => ({
  items: JSON.parse(localStorage.getItem('bookmarks')) || [],
  lastAction: { type: '', item: null },
});

const getters = {
  bookmarks: (state) => state.items,
  lastAction: (state) => state.lastAction,
};

const actions = {
  addBookmark({ commit }, item) {
    commit('add', item);
    commit('setLastAction', { type: 'add', item });
  },
  removeBookmark({ commit }, item) {
    commit('remove', item);
    commit('setLastAction', { type: 'remove', item });
  },
};

const mutations = {
  add(state, payload) {
    state.items = [
      ...state.items,
      payload,
    ];
    localStorage.setItem('bookmarks', JSON.stringify(state.items));
  },
  remove(state, payload) {
    const index = state.items.findIndex((item) => item.id === payload.id);

    if (index >= 0) {
      state.items = [
        ...state.items.slice(0, index),
        ...state.items.slice(index + 1),
      ];
      localStorage.setItem('bookmarks', JSON.stringify(state.items));
    }
  },
  setLastAction(state, payload) {
    state.lastAction = payload;
  },
};

export default {
  namespaced: true,
  state: initialState(),
  getters,
  actions,
  mutations,
};
