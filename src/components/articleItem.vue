<template>
  <div class="item" @click="handleClick" ref="cardRef">
    <div class="item-pic">
      <img class="pic" :src="imgSrc" />
    </div>
    <div class="bottom">
      <div class="title"><el-text size="large" line-clamp="2" truncated>{{ title }}</el-text></div>
      <div class="info">
        <div class="info-left">
          <div class="avatar">
            <el-avatar :size="28" :src="imgSrc" />          
          </div>
          <div class="user">
            <div class="username"><el-text size="default" truncated>{{ username }}</el-text></div>
            <div class="date"><el-text type="info" size="small">04-28</el-text></div>
          </div>
        </div>
        <div class="like">
          <van-icon name="like-o" />
          <div class="like-num"><el-text>{{ likeNum }}</el-text></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { ElText, ElAvatar } from 'element-plus';

const props = defineProps<{
  title: string;
  avatar: string;
  username: string;
  likeNum: string;
  imgSrc: string;
}>();

const emit = defineEmits(['select']);
const cardRef = ref<HTMLElement | null>(null);

const handleClick = () => {

  const appRect = document.querySelector('#app')?.getBoundingClientRect();
  const elRect = cardRef.value?.getBoundingClientRect();

  if (appRect && elRect) {
    const rect = {
      top: elRect.top - appRect.top,
      left: elRect.left - appRect.left,
      width: elRect.width,
      height: elRect.height,
      appWidth: 320,
      appHeight: 320,
    };

    const card = {
      title: props.title,
      avatar: props.avatar,
      username: props.username,
      likeNum: props.likeNum,
      imgSrc: props.imgSrc,
    };
    console.log("给父组件");
    emit('select', { rect, card });
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 48%;
  background-color: #fff;
  border-radius: 0.4rem;
  padding-bottom: 1%;
  margin-top: 6px;
  break-inside: avoid;
}
.item-pic {
  position: relative;
  width: 100%;
}
.pic {
  width: 100%;
  object-fit: contain;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  cursor: pointer;
}
.pic:hover {
  filter: brightness(80%);
}
.bottom {
  width: 92%;
  background-color: #fff;
  margin: 1.6%;
  margin-left: 4%;
  margin-right: 4%;
}

.title {
  // width: 90px;
  font-weight: 500;
  margin-top: 5%;
  // height: 80px;

.el-text{
    white-space: normal;
    height:auto;
}
}


.info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5%;
  .info-left {
    width: 60%;
    display: flex;
    flex-direction: row;
    .avatar {
      margin-top: -1.6%;
    }
    .user {
      width: 60%;
      margin-left: 6px;

      .username {
        width: 100%;
        margin-top: -6px;
      }
      .date {
        margin-top: -8px;
        
      }
      //   .el-text--large {
      //     --el-text-font-size: 17px;
      // }
    }
  }
}




.like {
  margin-top: -8px;
  margin-right: 4%;
  display: flex;
  align-items: center;
  .like-num {
    font-size: 3.4vw;
    margin-left: 8%;
  }
}



</style>
