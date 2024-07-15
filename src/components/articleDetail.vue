<template>
    <transition name="show" @enter="handleEnter" @leave="handleLeave">
      <div class="article-detail" v-if="selected">
        <div class="card_left">
          <img class="card_pic" :src="selected.card.imgSrc" />
        </div>
        <div class="card_right">
          <div class="card_user">
            <div class="user">
              <div class="avatar">
                <el-avatar :src="selected.card.avatar" class="custom-avatar" />
              </div>
              <div class="username">
                <span>{{ selected.card.username }}</span>
              </div>
            </div>
            <div class="follow">关注</div>
          </div>
          <div class="card_main">
            <div class="card_title">
              <h4>{{ selected.card.title }}</h4>
            </div>
            <div class="card_content"></div>
          </div>
          <div class="card_comments"></div>
        </div>
        <div class="card_func"></div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useCardStateStore } from '../pinia';
  // import { ElAvatar } from 'element-plus';
  import { storeToRefs } from 'pinia';


  const cardStateStore = useCardStateStore();
  // const selected = computed(() => cardStore.selected);
  // const unselect = computed(() => cardStore.unselect);

  const { selected, unselect } = storeToRefs(cardStateStore)
  const { unselectCard } = cardStateStore
  
  const top = ref(0);
  const left = ref(0);
  
  const handleEnter = async (el) => {
    const screenHeight = document.documentElement.scrollTop;
    const screenWidth = document.documentElement.scrollLeft;
    top.value = screenHeight;
    left.value = screenWidth;
  
    Object.assign(el.style, {
      top: `${selected.value.rect.top}px`,
      left: `${selected.value.rect.left}px`,
      width: `${selected.value.rect.width}px`,
      height: `${selected.value.rect.height}px`,
      opacity: 0,
    });
  
    const nextFrame = () => new Promise(requestAnimationFrame);
    await nextFrame();
  
    Object.assign(el.style, {
      top: `${top.value}px`,
      left: `${left.value}px`,
      width: `${selected.value.rect.appWidth}px`,
      height: `${selected.value.rect.appHeight}px`,
      opacity: 1,
    });
  };
  
  const handleLeave = async (el) => {
    Object.assign(el.style, {
      top: `${top.value}px`,
      left: `${left.value}px`,
      width: `${unselect.value.rect.appWidth}px`,
      height: `${unselect.value.rect.appHeight}px`,
      opacity: 1,
    });
  
    const nextFrame = () => new Promise(requestAnimationFrame);
    await nextFrame();
  
    Object.assign(el.style, {
      top: `${unselect.value.rect.top}px`,
      left: `${unselect.value.rect.left}px`,
      width: `${unselect.value.rect.width}px`,
      height: `${unselect.value.rect.height}px`,
      opacity: 0,
    });
  };
  </script>
  
  <style lang="scss" scoped>
  .article-detail {
    display: flex;
    position: absolute;
    border-radius: 1.2rem;
    overflow: hidden;
    backdrop-filter: blur(30px);
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 3;
    flex-direction: column;
  }
  
  .card_pic {
    width: 360px;
    height: 160px;
    object-fit: cover;
  }
  
  .card_left {
    flex: 1;
  }
  
  .card_right {
    flex: 0 0 46%;
    display: flex;
    flex-direction: column;
  }
  
  .card_user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 80px;
  }
  
  .user {
    display: flex;
    flex-direction: row;
  }
  
  .avatar {
    margin-left: 1em;
    margin-top: 1em;
  }
  
  .custom-avatar {
    width: 28px;
    height: 28px;
  }
  
  .username {
    margin-left: 12px;
    margin-top: 30px;
  }
  
  .follow {
    display: flex;
    width: 90px;
    height: 40px;
    background-color: #ff2944;
    margin-right: 20px;
    margin-top: 20px;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 20px;
  }
  
  .card_main {
  }
  
  .card_title {
    margin-top: -10px;
    margin-left: 20px;
    color: #2d2d2d;
    font-size: 18px;
  }
  
  .card_content {
    margin-top: -10px;
    margin-left: 20px;
    margin-right: 16px;
    color: #2d2d2d;
    font-size: 16px;
  }
  
  .card_comments {
  }
  
  .show-enter-active,
  .show-leave-active {
    transition: all 0.4s ease;
  }
  </style>
  