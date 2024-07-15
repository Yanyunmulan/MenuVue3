import { createPinia } from 'pinia';
import { useCartStore } from './socket';
import { useCardStateStore } from './cardState';

const pinia = createPinia();

export { pinia, useCartStore, useCardStateStore };
