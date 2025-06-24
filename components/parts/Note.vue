<template>
    <div
      class="www h-[auto] bg-purple-400/80 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Icon
        icon="material-symbols:close-rounded"
        color="gray"
        class="cancel m-[1vh] h-auto justify-self-end flex-row items-self-start icon"
        @click="closeNote"
      />
      <p
        class="title text-[#93f1b5] poppins-medium font-black justify-self-center items-self-start tracking-widest"
      >
        {{ title }}
      </p>
      <p class="text poppins-medium text-red-500 mb-[40px] mt-[20px]">
        {{ text }}
      </p>
    </div>
  </template>
  <script setup>
  import { Icon } from "@iconify/vue";
  import { ref } from "vue";
  import { useMediaQuery } from "@vueuse/core";
  
  defineProps(["title", "text"]);
  const emit = defineEmits(["close"]);
  
  const closeNote = () => {
    emit("close");
  };
  </script>
  <style scoped>
  .poppins-medium {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
  }
  .markazi-text {
    font-family: "Markazi Text", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  .icon {
    transition: transform 0.3s ease; /* 設定平滑過渡效果 */
    cursor: pointer;
  }
  
  .icon:hover {
    transform: scale(1.1); /* 當游標在上面時放大 */
  }
  
  .icon:active {
    transform: scale(1); /* 點擊時回到原始大小，視需求可調整 */
  }
  
  @media (min-width: 481px) {
    .www {
      width: 400px;
    }
    .cancel {
      width: 40px;
    }
  
    .title {
      font-size: large;
      text-align: center;
    }
    .text {
      font-size: larger;
      text-align: center;
    }
  }
  @media (max-width: 480px) {
    .www {
      width: 300px;
    }
    .cancel {
      width: 30px;
    }
  
    .title {
      font-size: medium;
      text-align: center;
    }
    .text {
      font-size: small;
      text-align: center;
    }
  }
  </style>