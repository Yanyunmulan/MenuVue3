import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

const socket = io('http://10.0.88.221:3000');

interface Item {
  id: number;
  name: string;
}

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref<Item[]>([]);

  const initializeWebSocket = () => {
    socket.on('cart', (newCart: Item[]) => {
      cart.value = newCart;
    });
  };

  const addItemToCart = (item: Item) => {
    socket.emit('add_item', item);
  };

  return {
    cart,
    initializeWebSocket,
    addItemToCart,
  };
});
