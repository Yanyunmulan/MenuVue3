<!-- src/components/CartV3.vue -->
<template>
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        <li v-for="item in cart" :key="item.id">{{ item.name }}</li>
      </ul>
      <input v-model="newItemName" placeholder="Enter item name" />
      <button @click="addItem">Add Item</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useCartStore } from '../pinia'; // 修改为实际路径
  import { storeToRefs } from 'pinia';

  
  const cartStore = useCartStore();
  
  const newItemName = ref('');
  

  const { cart } = storeToRefs(cartStore)
  
  const addItem = () => {
    if (newItemName.value.trim()) {
      const item = {
        id: Date.now(),
        name: newItemName.value.trim()
      };
      cartStore.addItemToCart(item);
      newItemName.value = '';
    }
  };
  
  onMounted(() => {
    cartStore.initializeWebSocket();
  });
  </script>
  
  <style scoped>
  /* 你可以在这里添加样式 */
  </style>
  