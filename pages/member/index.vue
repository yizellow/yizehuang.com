<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
//   signOut,
//   FacebookAuthProvider,
// } from "firebase/auth";
import { Result } from "postcss";

// const showNote = ref(false);
// const noteTitle = ref("");
// const noteText = ref("");

// const appleLogInIsNotReady = () => {
//   noteText.value = "Apple login function is not yet open.";
//   showNote.value = true;
// };
// const closeNote = () => {
//   showNote.value = false;
// };

// const router = useRouter();
// const email = ref("");
// const password = ref("");
// const loginText = ref("");

// const cleanInput = () => {
//   password.value = "";
//   email.value = "";
// };

// const register = () => {
//   createUserWithEmailAndPassword(getAuth(), email.value, password.value)
//     .then((data) => {
//       console.log("successfully registered");
//       router.push("/Member/MemberPage");
//       closeLog();
//     })
//     .catch((error) => {
//       console.log(error.code);
//       cleanInput();
//       if (error.code == "auth/missing-password") {
//         loginText.value = "Please enter the password.";
//       } else if (error.code == "auth/missing-email") {
//         loginText.value = "Please enter the email.";
//       } else if (error.code == "auth/invalid-email") {
//         loginText.value = "Invalid email address.";
//       } else if (error.code == "auth/email-already-in-use") {
//         loginText.value = "The account is already registered. Please log in.";
//       } else if (error.code == "auth/weak-password") {
//         loginText.value = "Password should be at least 6 characters";
//       } else {
//         loginText.value = "Registration failed.";
//       }
//     });
// };
// const logIn = () => {
//   signInWithEmailAndPassword(getAuth(), email.value, password.value)
//     .then((data) => {
//       console.log("successfully log in");
//       router.push("/Member/MemberPage");
//       closeLog();
//     })
//     .catch((error) => {
//       console.log(error.code);
//       cleanInput();
//       if (error.code == "auth/invalid-email") {
//         loginText.value = "Invail email.";
//       } else if (error.code == "auth/invalid-credential") {
//         loginText.value = "Email or password is incorrect";
//       } else if (error.code == "auth/missing-password") {
//         loginText.value = "Please enter the password.";
//       } else {
//         loginText.value = "Login failed.";
//       }
//     });
// };
// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(getAuth(), provider)
//     .then((result) => {
//       console.log(result.user);
//       closeLog();
//       router.push("/Member/MemberPage");
//     })
//     .catch((error) => {
//       loginText.value = error;
//     });
// };
// const signInWithFacebook = () => {
//   const provider = new FacebookAuthProvider();
//   signInWithPopup(getAuth(), provider)
//     .then((result) => {
//       console.log(result.user);
//       closeLog();
//       router.push("/Member/MemberPage");
//     })
//     .catch((error) => {
//       loginText.value = error;
//       console.error("Facebook Login Error:", error);
//     });
// };

const image = [
  "https://cdnb.artstation.com/p/assets/images/images/082/332/429/large/yize-huang-img-0912.jpg?1732700966",
  "https://cdna.artstation.com/p/assets/images/images/082/332/328/large/yize-huang-img-0937.jpg?1732700755",
  "https://cdna.artstation.com/p/assets/images/images/082/332/470/large/yize-huang-2024-11-27-5-48-00.jpg?1732701058",
  "https://cdnb.artstation.com/p/assets/images/images/082/332/475/large/yize-huang-2024-11-27-5-47-42.jpg?1732701073",
  "https://cdna.artstation.com/p/assets/images/images/082/332/324/large/yize-huang-img-0911.jpg?1732700747",
];
let currentIndex = ref(0);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % image.length;
  }, 6000);
});
onUnmounted(() => {
  clearInterval(intervalId);
});

// const props = defineProps({
//   log: Number,
// });
// const emit = defineEmits(["close"]);

// const closeLog = () => {
//   emit("close");
// };
</script>

<template>
  <main
    class="w-full h-full bg-green-400/90 fixed z-[60] flex items-center justify-center"
  >
    <Note
      v-if="showNote"
      :title="noteTitle"
      :text="noteText"
      @close="closeNote"
    />
    <div class="w-1/2 h-3/5 flex flex-row bg-white relative -translate-y-[5vh]">
      <section class="w-1/2 h-full absolute left-0 overflow-hidden">
        <transition name="blur-fade" mode="default">
          <img
            :key="currentIndex"
            :src="image[currentIndex]"
            class="w-full h-full object-cover object-center"
          />
        </transition>
      </section>
      <section class="w-1/2 h-full absolute right-0 bg-white flex-col block">
        <div class="max-h-1/4 grid">
          <Icon
            icon="material-symbols:close-rounded"
            color="gray"
            class="w-[2.5vw] h-auto justify-self-end flex-row items-self-start icon"
            @click="closeLog"
          />
          <p
            class="text-2xl text-gray-500 font-black justify-self-center items-self-start tracking-widest"
          >
            Log In
          </p>
        </div>
        <div
          class="flex flex-col w-full h-auto items-center justify-center my-[3vh]"
        >
          <input
            placeholder="Email"
            v-model="email"
            class="border-2 w-3/4 h-[4vh] border-gray-200 m-[1vh] p-1 outline-violet-500 text-green-500 tracking-widest"
          />
          <input
            placeholder="******"
            v-model="password"
            type="password"
            class="border-2 w-3/4 h-[4vh] border-gray-200 m-[1vh] p-1 outline-violet-500 text-green-500 tracking-widest"
          />
        </div>
        <div
          class="flex flex-col w-full h-1/5 items-center justify-center mx-auto"
        >
          <span class="w-full h-1/2 flex justify-center items-start text-xs">
            <p
              class="text-green-500 underline underline-offset-2 decoration-red-500"
            >
              {{ loginText }}
            </p>
          </span>
          <span class="w-full h-1/2 flex flex-row items-center justify-center">
            <button
              @click="register"
              class="w-4/12 h-full rounded-lg bg-violet-500 text-white tracking-widest mx-1 text-m poppins-medium mr-[3vh] icon"
            >
              Sign up
            </button>
            <button
              @click="logIn"
              class="w-4/12 h-full mx-1 rounded-lg bg-red-500 text-white tracking-widest text-m poppins-medium icon"
            >
              Log In
            </button>
          </span>
        </div>

        <div
          class="w-9/12 h-[6vh] mt-[3vh] mx-auto flex items-center justify-center border-gray-00 relative"
        >
          <div class="w-full border-t-[1px] border-gray-300 absolute"></div>
          <p
            class="text-xs block w-auto text-center px-[1vh] text-gray-400 bg-white absolute"
          >
            or sign up with
          </p>
        </div>

        <div
          class="w-3/4 h-1/5 p-[1vh] flex items-start justify-between mx-auto"
        >
          <Icon
            @click="signInWithGoogle"
            icon="logos:google-icon"
            class="w-[2.5vw] h-auto translate-y-[1vh] icon"
          />
          <Icon
            icon="logos:apple"
            @click="appleLogInIsNotReady"
            class="w-[2.5vw] h-auto opacity-75 icon"
          />
          <Icon
            icon="logos:facebook"
            class="w-[2.5vw] h-auto translate-y-[1vh] icon"
            @click="signInWithFacebook"
          />
        </div>
      </section>
    </div>
  </main>
</template>
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
/* 過渡效果，控制模糊與縮放 */
.blur-fade-enter-active,
.blur-fade-leave-active {
  transition: filter 1s ease, transform 1s ease;
}

/* 下一張圖片進入時的初始狀態（模糊 + 放大） */
.blur-fade-enter-from {
  filter: blur(8px);
  transform: scale(1.1); /* 微微放大 */
}

/* 上一張圖片離開時的最終狀態（模糊 + 放大） */
.blur-fade-leave-to {
  filter: blur(8px);
  transform: scale(1.1); /* 微微放大 */
}

/* 確保圖片進入後的狀態 */
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform-origin: center;
  transform: scale(1); /* 縮小回原本尺寸 */
  position: absolute; /* 疊層定位，避免切換空白 */
  top: 0;
  left: 0;
}

/* 父容器，確保圖片區域沒有空白 */
section {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 防止圖片溢出 */
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
</style>



