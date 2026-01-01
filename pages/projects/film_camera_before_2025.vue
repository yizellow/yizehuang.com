<script>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { useMediaQuery } from "@vueuse/core";

export default {
  setup() {
    const isComputer = useMediaQuery("(min-width: 481px)");
    const isMobile = useMediaQuery("(max-width: 480px)");
    const images = [
      "https://cdnb.artstation.com/p/assets/images/images/082/332/459/large/yize-huang-2024-11-27-5-48-34.jpg?1732701036",
      "https://cdna.artstation.com/p/assets/images/images/082/332/324/large/yize-huang-img-0911.jpg?1732700747",
      "https://cdnb.artstation.com/p/assets/images/images/082/332/431/large/yize-huang-img-0910.jpg?1732700973",
      "https://cdnb.artstation.com/p/assets/images/images/082/332/475/large/yize-huang-2024-11-27-5-47-42.jpg?1732701073",
      "https://cdnb.artstation.com/p/assets/images/images/082/332/479/large/yize-huang-2024-11-27-5-47-26.jpg?1732701086",
      "https://cdna.artstation.com/p/assets/images/images/082/332/482/large/yize-huang-2024-11-27-5-46-27.jpg?1732701097",
      "https://cdna.artstation.com/p/assets/images/images/082/332/488/large/yize-huang-2024-11-27-5-46-41.jpg?1732701109",
      "https://cdna.artstation.com/p/assets/images/images/082/332/492/large/yize-huang-2024-11-27-5-46-59.jpg?1732701122",
      "https://cdnb.artstation.com/p/assets/images/images/082/332/429/large/yize-huang-img-0912.jpg?1732700966",
      "https://cdnb.artstation.com/p/assets/images/images/082/332/463/large/yize-huang-2024-11-27-5-48-13.jpg?1732701047",
      "https://cdna.artstation.com/p/assets/images/images/082/332/470/large/yize-huang-2024-11-27-5-48-00.jpg?1732701058",
      "https://cdna.artstation.com/p/assets/images/images/082/332/328/large/yize-huang-img-0937.jpg?1732700755",
    ];

    // 點擊事件，觸發動畫並刪除圖片

    // hover 事件，當游標懸停時觸發動畫

    // 滑鼠移出事件，恢復原始狀態

    return {
      isComputer,
      isMobile,
      images,
    };
  },
};
</script>

<template>
  <div v-if="isComputer">
    <main>
      <div class="bg">
        <p>&#35; Travel and my film camera</p>
      </div>
      <div class="picsLayer">
        <img :src="images[1]" class="p2" />
        <img :src="images[2]" class="p2" />
        <img :src="images[0]" class="p1" />
        <img :src="images[3]" class="p1" />
        <img :src="images[4]" class="p1" />
        <img :src="images[5]" class="p1" />
        <img :src="images[6]" class="p1" />
        <img :src="images[7]" class="p1" />
        <img :src="images[8]" class="p1" />
        <img :src="images[9]" class="p1" />
        <img :src="images[10]" class="p1" />
        <img :src="images[11]" class="p1" />
      </div>
    </main>
  </div>
  <div v-if="isMobile">
    <main>
      <div class="bg">
        <p>&#35; Travel and my film camera</p>
      </div>
      <div class="picsLayer">
        <img :src="images[1]" class="p2" />
        <img :src="images[2]" class="p2" />
        <img :src="images[0]" class="p1" />
        <img :src="images[3]" class="p1" />
        <img :src="images[4]" class="p1" />
        <img :src="images[5]" class="p1" />
        <img :src="images[6]" class="p1" />
        <img :src="images[7]" class="p1" />
        <img :src="images[8]" class="p1" />
        <img :src="images[9]" class="p1" />
        <img :src="images[10]" class="p1" />
        <img :src="images[11]" class="p1" />
      </div>
    </main>
  </div>
</template>

<style scoped>
@media (min-width: 481px) {
  .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 0;
    text-align: justify;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .picsLayer {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
    color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .bg p {
    word-wrap: break-word;
    color: white;
    font-size: 6rem;
    -webkit-text-stroke: 1.5px rgb(159, 159, 159);
  }
  .box {
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  }
  img {
    width: 65%;
    height: auto;
    padding: 10vh;
    align-self: self-start;
  }
}
@media (max-width: 480px) {
  main {
    margin-top: 6vh;
  }
  .bg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 0;
    text-align: justify;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .picsLayer {
    width: 100%;
    position: relative;
    z-index: 1;
    color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .bg p {
    word-wrap: break-word;
    color: white;
    font-size: 6rem;
    -webkit-text-stroke: 1.5px rgb(159, 159, 159);
  }
  .box {
    max-width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  img {
    margin: 20px;
    margin-bottom: 80px;
    width: 80%;
    height: auto;
    align-self: center;
  }
}
</style>
