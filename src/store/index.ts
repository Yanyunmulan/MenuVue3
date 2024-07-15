import { createStore } from 'vuex';
import cardState from './cardState';
import socket from './socket';

export default createStore({
  modules: {
    cardState,
    socket
  }
});
