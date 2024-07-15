<!-- src/components/QRCode.vue -->
<template>
  <div>
    <h1>Scan to Join Shopping</h1>
    <img :src="qrCodeSrc" alt="QR Code" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const qrCodeSrc = ref('');

const fetchQRCode = async () => {
  try {
    const response = await fetch('http://10.0.88.221:3000/qrcode');
    const data = await response.json();
    qrCodeSrc.value = data.qrCode;
  } catch (error) {
    console.error('Error fetching QR Code:', error);
  }
};

onMounted(() => {
  fetchQRCode();
});
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
