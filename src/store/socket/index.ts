import { io, Socket } from 'socket.io-client';
import { Module } from 'vuex';
import { RootState } from '../types';

interface SocketState {
  cart: any[];
}

const socket: Socket = io('http://10.0.88.221:3000');

const state: SocketState = {
  cart: []
};

const mutations = {
  UPDATE_CART(state: SocketState, cart: any[]) {
    state.cart = cart;
  }
};

const actions = {
  initializeWebSocket({ commit }: any) {
    socket.on('cart', (cart: any[]) => {
      commit('UPDATE_CART', cart);
    });
  },
  addItemToCart(_: any, item: any) {
    socket.emit('add_item', item);
  }
};

const getters = {
  cart: (state: SocketState) => state.cart
};

const socketModule: Module<SocketState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default socketModule;
