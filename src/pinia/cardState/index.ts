import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStateStore = defineStore('cardState', () => {
  // 使用 ref 来定义状态
  const selected = ref<any | null>(null);
  const unselect = ref<any | null>(null);

  // 定义 actions
  const selectCard = (selectedv: any) => {
    unselect.value = null;
    selected.value = selectedv;
  };

  const unselectCard = () => {
    unselect.value = selected.value;
    selected.value = null;
  };

  // 返回状态和 actions
  return {
    selected,
    unselect,
    selectCard,
    unselectCard,
  };
});