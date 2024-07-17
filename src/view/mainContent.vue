<template>
    <div id="content">
      <div class="mask" v-if="selected" @click="unselectCard">
        <!-- <button class="closeButtion" v-if="selected" @click="unselectCard">*</button> -->
      </div>
      <ArticleDetail />
      <!-- <div class="nav">
        <div class="nav-item nav-active">推荐</div>
        <div class="nav-item">美食</div>
        <div class="nav-item">影视</div>
        <div class="nav-item">摄影</div>
        <div class="nav-item">职场</div>
        <div class="nav-item">家居</div>
        <div class="nav-item">旅行</div>
      </div> -->
      <van-tabs v-model:active="active" 
        animated 
        line-width="26px" 
        sticky
        line-height="2px"
        color="#EA4148"
        title-inactive-color="#8b8c8b"
        title-active-color="#333333"
        >
          <van-tab title="关注">关注</van-tab>
          <van-tab title="发现">
            <div class="article">
        <!-- <el-empty description="暂无内容" v-if="blogList.length == 0 && loading != true" class="empty" /> -->
        <!-- <el-skeleton :loading="loading" animated> -->


        <ArticleItem
          v-for="song in songList"
          :key="song.id"
          :title="song.name"
          :avatar="'https://sns-avatar-qc.xhscdn.com/avatar/6448fd9cb72edfcefe4e9b21.jpg'"
          :username="song.ar[0].name"
          :content="song.al.name"
          :likeNum="song.pop.toString()"
          :imgSrc="song.al.picUrl"
          @select="selectCard"
        />
        <!-- <ArticleItem
          title="请记得多吃水果请记得多吃水果请记得多吃水果请记得多吃水果请记得多吃水果"
          :avatar="'https://sns-avatar-qc.xhscdn.com/avatar/6448fd9cb72edfcefe4e9b21.jpg'"
          username="请记得多吃水果"
          content="song.al.name"
          likeNum="78"
          :imgSrc="'https://sns-avatar-qc.xhscdn.com/avatar/6448fd9cb72edfcefe4e9b21.jpg'"
          @select="selectCard"
        /> -->


        <!-- </el-skeleton> -->
            </div>
          </van-tab>
          <van-tab title="重庆">重庆</van-tab>
        </van-tabs>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useCardStateStore } from '../pinia';
  import ArticleItem from '../components/articleItem.vue';
  import ArticleDetail from '../components/articleDetail.vue';
  import axios from 'axios';
  
  // 引入组件
  // const components = { ArticleItem };
  
  // 使用 Pinia store
  const cardStateStore = useCardStateStore();
  const songList = ref<any[]>([]);
  const loading = ref(false);
  const active = ref<number>(1)
  console.log(active.value)

  
  // 获取歌曲列表
  const getSongList = async () => {
    loading.value = true;
    try {
      const response = await axios.get('http://localhost:3000/data/song');
      songList.value = response.data.songs;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // 禁用滚动
  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  
  // 启用滚动
  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };
  
  // 切换滚动状态
  const changeScroll = () => {
    if (cardStateStore.selected !== null) disableScroll();
    else enableScroll();
  };
  
  // 初始化
  onMounted(() => {
    getSongList();
    changeScroll();
  });
  
  // 监听 selected 状态变化
  watch(() => cardStateStore.selected, changeScroll);
  


  const { selected } = storeToRefs(cardStateStore)
  const { selectCard, unselectCard } = cardStateStore


  </script>
  
  <style scoped>
  #content {
    position: relative;
    ::v-deep .van-tab {
    /* position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    box-sizing: border-box; */
    /* padding: 0 4px; */
    /* color: var(--van-tab-text-color);
    font-size: var(--van-tab-font-size);
    line-height: var(--van-tab-line-height);
    cursor: pointer; */
    }
    ::v-deep .van-tabs__line {
      bottom: 22px;
    }
  }
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .nav-item {
    margin-left: 10px;
    height: 40px;
    width: 66px;
    color: #545454;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    cursor: pointer;
  }
  
  .nav-item:hover {
    background-color: #f1f1f1;
  }
  
  .nav-active {
    background-color: #f1f1f1;
    font-weight: 500;
  }
  
  .article {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .item {
    flex: 0 0 calc(50% - 10px); /* 每个项目占据50%的宽度，并减去10px用于间隔 */
    margin: 5px; /* 每个项目上下左右都有5px的间隔 */
  }
  
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 2;
    backdrop-filter: blur(2px); /* 初始状态不模糊 */
  }
  
  .closeButtion {
    position: absolute;
    left: 20px;
    top: 20px;
    border-radius: 999px;
  }
  </style>
  