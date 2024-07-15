import { Module } from 'vuex';
import { RootState } from '../types';

interface CardState {
  selected: any | null;
  unselect: any | null;
}

const state: CardState = {
  selected: null,
  unselect: null
};

const mutations = {
  SELECT_CARD(state: CardState, selectedv: any) {
    state.unselect = null;
    state.selected = selectedv;
  },
  UNSELECT_CARD(state: CardState) {
    state.unselect = state.selected;
    state.selected = null;
  }
};

const actions = {
  selectCard({ commit }: any, selectedv: any) {
    commit('SELECT_CARD', selectedv);
  },
  unselectCard({ commit }: any) {
    commit('UNSELECT_CARD');
  }
};

const getters = {
  selected: (state: CardState) => state.selected,
  unselect: (state: CardState) => state.unselect
};

const cardStateModule: Module<CardState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default cardStateModule;
