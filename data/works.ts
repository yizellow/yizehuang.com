export type Work = {
  slug: string;
  title: string;
  year: string;
  cover: string;
  desc?: string;
  images?: string[];
  layout?: "single" | "grid";
  video?: string;
  medium?: string;
  clips?: { title?: string; url: string }[];
};

export const works: Work[] = [
  {
    slug: "chips",
    title: "CHIPS",
    year: "2020",
    medium: "video game",
    video: "https://www.youtube.com/embed/sQpa6tkxzg8", // 沒有就刪掉這行
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/633/124/large/yize-huang-2024-12-06-9-01-23.jpg?1733490357",
    desc: `About Chips:
"Chips" is a game centered on dance, combining animation, drama, and music, inspired by Greek tragedy. The protagonist is in his mental world, searching for an imaginary figure while dealing with inner trauma. The game starts with animations and psychological tests to select a character, then shifts to an RPG mode.
In a Möbius-strip-like playground, players advance the story through character dialogues, exploring memories, navigating labyrinths, and playing various mini-games. Every choice leads to a different ending.
---
My Role:
Main producer, responsible for scriptwriting, animation, visual design, game design, and administration.
---
Process:
During university, I was eager to collaborate with students from other departments, believing that interdisciplinary projects would challenge me. Collaborating with the dance department did just that. At the same time, I wanted to fulfill my dream of creating a game, which led to the creation of Chips. This project took a year and a half to complete and was successfully selected for the 2021 GenieLab Hybrid Cup.
Originally, the game was planned to go beyond online activities. We envisioned transforming campus vending machines into game-themed installations and setting up a stage around them to reinterpret the work through dance and performance art while promoting the game. However, due to the pandemic, it was ultimately showcased through an online curation format, where it received analysis and feedback from many players as well as art critics from professionals.
---
團隊名單 Credit:
美術系 黃亦澤 HUANG Yi-Ze
美術系 張瑜晴 CHANG Yu-Ching
新媒系 劉張妙齊 LIU CHANG Miao-Chi
舞蹈系 黃孝傑 HUANG Hsiao-Chieh
舞蹈系 梁保昇 LEONG Pou-Seng
舞蹈系 許雅昕 HSU Ya-Hsin
舞蹈系 段予誠 TUAN Yu-Cheng
劇設系 林子璇 LIN Tzu-Hsuan
音樂系 余辰曜 YU Chen-Yao
`,

    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/633/124/large/yize-huang-2024-12-06-9-01-23.jpg?1733490357",
      "https://cdna.artstation.com/p/assets/images/images/081/756/450/large/yize-huang-.jpg?1731128444",
      "https://cdna.artstation.com/p/assets/images/images/081/756/438/large/yize-huang-.jpg?1731128376",
      "https://cdnb.artstation.com/p/assets/images/images/081/756/441/large/yize-huang-.jpg?1731128424",
      "https://cdna.artstation.com/p/assets/images/images/082/633/132/large/yize-huang-2024-12-06-9-03-18.jpg?1733490373",
      "https://cdnb.artstation.com/p/assets/images/images/082/657/009/large/yize-huang-2024-12-07-4-58-21.jpg?1733561974",
      "https://cdnb.artstation.com/p/assets/images/images/081/756/469/large/yize-huang-.jpg?1731128470",
      "https://cdnb.artstation.com/p/assets/images/images/081/759/565/large/yize-huang-maze.jpg?1731143047",
      "https://cdnb.artstation.com/p/assets/images/images/081/759/583/large/yize-huang-1.jpg?1731143083",
      "https://cdna.artstation.com/p/assets/images/images/081/914/924/large/yize-huang-2024-11-11-8-47-48.jpg?1731558884",
      "https://cdnb.artstation.com/p/assets/images/images/082/660/331/large/yize-huang-ae-a-2024-11-26-a-a-6-09-53.jpg?1733574260",
      "https://cdnb.artstation.com/p/assets/images/images/081/756/461/large/yize-huang-1.jpg?1731128459",
      "https://cdnb.artstation.com/p/assets/images/images/081/756/435/large/yize-huang-.jpg?1731128356",
      "https://yizehuang.com/assets/mmm-4veXUDdw.png",
      "https://cdnb.artstation.com/p/assets/images/images/081/756/471/large/yize-huang-2-3chips2.jpg?1731128477",
    ],
    layout: "single",
    clips: [
      {
        title: "Psychological Test V",
        url: "https://www.youtube.com/embed/sQpa6tkxzg8",
      },
      {
        title: "Psychological Test IV",
        url: "https://www.youtube.com/embed/Ze51L77-feU",
      },
      {
        title: "Happy Story",
        url: "https://www.youtube.com/watch?v=QYmHc7AvEUE",
      },

      {
        title: "Vintage Dance",
        url: "https://www.youtube.com/watch?v=PgUw_T_wPaw",
      },

      {
        title: "Version of Sadness",
        url: "https://www.youtube.com/watch?v=N0B_bga1va8",
      },

      {
        title: "Imagined Daily Life",
        url: "https://www.youtube.com/embed/HiRsTjugXlk",
      },
      {
        title: "Imagined Daily Life",
        url: "https://www.youtube.com/embed/r8zMd8Arwa8",
      },
      {
        title: "Imagined Daily Life",
        url: "https://www.youtube.com/embed/r8zMd8Arwa8",
      },
      {
        title: "Psychological Test III",
        url: "https://www.youtube.com/embed/gmkw-ZdAMAQ",
      },
    ],
  },
  {
    slug: "yizellow",
    title: "Yizellow",
    medium: "color pencil",
    year: "2020~",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/081/859/773/medium/yize-huang-2024-11-12-11-55-05.jpg?1731427234",
    desc: `

Yizellow is a project based on the theme of “The Basics of Styling”. Every artist has their own style, and the process of finding that style requires deep exploration. During my studies at art school, I realized that my motivation to create was often too purposeful, which made me feel constrained and unable to express myself freely. So I decided to take a more relaxed approach, experimenting with random doodles and sketches, including some oil paintings. Eventually, these works were assembled into my first solo exhibition: 《Yizellow》 (《Myself》)in 2019.
---

A FEEDBACK:
After the exhibition, an elder man told me that many artists create what they lack, but he saw “pure happiness, childishness and innocence” in my work. Indeed, what he said was exactly what I was looking for in my work, and this has become my rethinking of my creation

---
HOW TO SHOW:
During the process of creating many doodles, I began to think about how artists can show their work and share it with more people. So, I created an Instagram account for Yizellow to share my pieces. Interestingly, this account became the only way to save some of my works after my hard drive broke, even though some of the images were damaged.
    `,
    images: [
      "https://cdna.artstation.com/p/assets/images/images/081/859/804/medium/yize-huang-2024-11-12-11-56-03.jpg?1731427275",
      "https://cdnb.artstation.com/p/assets/images/images/081/859/817/medium/yize-huang-2024-11-12-11-55-55.jpg?1731427285",
      "https://cdna.artstation.com/p/assets/images/images/095/017/686/medium/yize-huang-2026-01-02-15-07-34.webp?1767363573",
      "https://cdna.artstation.com/p/assets/images/images/081/859/824/medium/yize-huang-2024-11-12-11-55-31.jpg?1731427298",
      "https://cdnb.artstation.com/p/assets/images/images/081/859/833/medium/yize-huang-2024-11-12-11-55-38.jpg?1731427307",
      "https://cdna.artstation.com/p/assets/images/images/081/859/838/medium/yize-huang-2024-11-12-11-56-29.jpg?1731427313",
      "https://cdna.artstation.com/p/assets/images/images/095/017/688/medium/yize-huang-2026-01-02-15-08-29.webp?1767363578",
      "https://cdnb.artstation.com/p/assets/images/images/081/859/869/medium/yize-huang-2024-11-12-11-57-39.jpg?1731427360",
      "https://cdnb.artstation.com/p/assets/images/images/081/859/881/medium/yize-huang-2024-11-12-11-56-42.jpg?1731427382",
      "https://cdnb.artstation.com/p/assets/images/images/081/860/593/medium/yize-huang-2024-11-13-12-18-39.jpg?1731428338",
      "https://cdna.artstation.com/p/assets/images/images/081/860/708/medium/yize-huang-2024-11-13-12-21-14.jpg?1731428504",
      "https://cdna.artstation.com/p/assets/images/images/081/860/596/medium/yize-huang-2024-11-13-12-18-22.jpg?1731428344",
      "https://cdnb.artstation.com/p/assets/images/images/081/860/607/medium/yize-huang-2024-11-13-12-17-50.jpg?1731428358",
    ],
  },
  {
    slug: "how-to-face-my-shadows_the-crouching",
    title: "How to face my shadows? The Crouching Boy",
    video: "https://www.youtube.com/embed/fUosYq6PAGU", // 沒有就刪掉這行
    medium: "3D Blender",
    year: "2022",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/052/484/594/medium/yize-huang-0019.jpg?1659929880",
    desc: `
    3D Modeling, Experiment, Material and Light
    ---
    This is an experimental project created with Blender, aimed at exploring the interplay between materials, light, and shadow in 3D modeling. I am particularly captivated by the subtle interactions between light transmission, refraction, and material textures. These subtle changes show the unique charm of digital media.

    During the creation process, I observed that objects made through 3D modeling often display a quality of "excessive perfection." This is evident in their highly precise details, flawless surfaces, and meticulously calculated lighting effects. While these features appear realistic, they simultaneously surpass the imperfections and randomness present in naturally occurring objects.

   This not only gives the works a refined and surreal quality but also reminds me of the idealized characteristics found in classical realist sculptures. Combining this quality with classical aesthetics introduces a playful dimension to modern digital creations, further opening up new possibilities for artistic exploration.
     `,
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/082/499/223/medium/yize-huang-2024-12-03-12-35-13.jpg?1733157350",
      "https://cdna.artstation.com/p/assets/images/images/052/484/594/medium/yize-huang-0019.jpg?1659929880",
    ],
  },
  {
    slug: "me-2019",
    title: "Me 2019",
    year: "2019",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/082/626/611/large/yize-huang-j4.jpg?1733473161",
    desc: "My first solo exhibition was held at 8 and one-half Gallery at Taipei National University of the Arts. The exhibition focuses primarily on self-portraits, taking myself as the point of departure.",
    medium: "Oil painting, Acrylic painting, Oil pastel",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/082/626/611/large/yize-huang-j4.jpg?1733473161",
      "https://cdna.artstation.com/p/assets/images/images/082/626/570/small/yize-huang-jj88.jpg?1733473076",
      "https://cdna.artstation.com/p/assets/images/images/082/626/582/small/yize-huang-jj55.jpg?1733473096",
    ],
    layout: "single",
  },
  {
    slug: "plastic_wrap_protection_Laocoon_and_his_sons",
    title: "Plastic wrap protection_Laocoon and his sons",
    medium: "3D Blender",
    year: "2022",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/052/116/789/large/yize-huang-plastic-wrap-protection-laocoon-and-his-sons.jpg?1658985491",
    desc: `
    3D Modeling, Experiment, Material and Light
    ---
    This is an experimental project created with Blender, aimed at exploring the interplay between materials, light, and shadow in 3D modeling. I am particularly captivated by the subtle interactions between light transmission, refraction, and material textures. These subtle changes show the unique charm of digital media.

    During the creation process, I observed that objects made through 3D modeling often display a quality of "excessive perfection." This is evident in their highly precise details, flawless surfaces, and meticulously calculated lighting effects. While these features appear realistic, they simultaneously surpass the imperfections and randomness present in naturally occurring objects.

   This not only gives the works a refined and surreal quality but also reminds me of the idealized characteristics found in classical realist sculptures. Combining this quality with classical aesthetics introduces a playful dimension to modern digital creations, further opening up new possibilities for artistic exploration.
     `,
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/052/116/789/large/yize-huang-plastic-wrap-protection-laocoon-and-his-sons.jpg?1658985491",
    ],
  },
  {
    slug: "republic_china_and_its_dick_david",
    title: "Republic China and Its Dick_David",
    medium: "3D Blender",
    year: "2022",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/052/282/401/large/yize-huang-ft.jpg?1659416553",
    desc: `
    3D Modeling, Experiment, Material and Light
    ---
    This is an experimental project created with Blender, aimed at exploring the interplay between materials, light, and shadow in 3D modeling. I am particularly captivated by the subtle interactions between light transmission, refraction, and material textures. These subtle changes show the unique charm of digital media.

    During the creation process, I observed that objects made through 3D modeling often display a quality of "excessive perfection." This is evident in their highly precise details, flawless surfaces, and meticulously calculated lighting effects. While these features appear realistic, they simultaneously surpass the imperfections and randomness present in naturally occurring objects.

   This not only gives the works a refined and surreal quality but also reminds me of the idealized characteristics found in classical realist sculptures. Combining this quality with classical aesthetics introduces a playful dimension to modern digital creations, further opening up new possibilities for artistic exploration.
     `,
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/052/282/401/large/yize-huang-ft.jpg?1659416553",
      "https://cdna.artstation.com/p/assets/images/images/052/282/402/large/yize-huang-new-whole.jpg?1659416565",
      "https://cdna.artstation.com/p/assets/images/images/052/282/404/large/yize-huang-sde.jpg?1659416576",
    ],
  },
  {
    slug: "a_karaoke_machine_themed_around_taiwanese_romance",
    title: "A karaoke machine themed around Taiwanese romance",
    video: "https://www.youtube.com/embed/0X4zjlFPPtc", // 沒有就刪掉這行
    medium: "Light Installation",
    year: "2022",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/499/478/medium/yize-huang-2024-12-03-12-39-17.jpg?1733157609",
    desc: `
  This experimental piece, based on Arduino, is themed around "Taiwanese Romance." It is an outdoor installation designed to resemble a shower room. When audiences step into the installation and pick up the showerhead, it triggers a mechanism that transforms the space into a karaoke mode, inviting audiences to sing along and immerse themselves in the vibe of "Taiwanese Romance." `,
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/095/020/235/medium/yize-huang-1.webp?1767370578",
      "https://cdna.artstation.com/p/assets/images/images/082/499/478/medium/yize-huang-2024-12-03-12-39-17.jpg?1733157609",
      "https://cdnb.artstation.com/p/assets/images/images/095/020/241/medium/yize-huang-3.webp?1767370597",
      "https://cdnb.artstation.com/p/assets/images/images/095/020/239/medium/yize-huang-5.webp?1767370586",
      "https://cdna.artstation.com/p/assets/images/images/095/020/244/medium/yize-huang-2.webp?1767370601",
    ],
  },
  {
    slug: "design_your_room",
    title: "Design your room",
    medium: "3D Blender",
    year: "2022",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/095/016/643/large/yize-huang-3droom-d4t-yeda.webp?1767361273",
    desc: `
    3D Modeling, Experiment, Material and Light
    ---
    This is an experimental project created with Blender, aimed at exploring the interplay between materials, light, and shadow in 3D modeling. I am particularly captivated by the subtle interactions between light transmission, refraction, and material textures. These subtle changes show the unique charm of digital media.

    During the creation process, I observed that objects made through 3D modeling often display a quality of "excessive perfection." This is evident in their highly precise details, flawless surfaces, and meticulously calculated lighting effects. While these features appear realistic, they simultaneously surpass the imperfections and randomness present in naturally occurring objects.

   This not only gives the works a refined and surreal quality but also reminds me of the idealized characteristics found in classical realist sculptures. Combining this quality with classical aesthetics introduces a playful dimension to modern digital creations, further opening up new possibilities for artistic exploration.
     `,
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/095/016/643/large/yize-huang-3droom-d4t-yeda.webp?1767361273",
    ],
  },
  {
    slug: "film_camera_before_2025",
    title: "Film Camera Before 2025",
    year: "~2025",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/332/470/large/yize-huang-2024-11-27-5-48-00.jpg?1732701058",
    desc: "",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/332/470/large/yize-huang-2024-11-27-5-48-00.jpg?1732701058",
    ],
    layout: "single",
  },
  {
    slug: "zora",
    title: "Zora",
    year: "2019",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/626/608/large/yize-huang-jjj3.jpg?1733473156",
    desc: "This is Zora as I painted her many years ago.Back then, she was in her early twenties, unmarried, and without children.Now, although she looks much the same, you can tell at a glance—she has become a mother.",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/626/608/large/yize-huang-jjj3.jpg?1733473156",
    ],
    medium: "oil painting on canvas",

    layout: "single",
  },
  {
    slug: "the_men_with_a_flower",
    title: "The men with a flower",
    year: "2019",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/626/602/large/yize-huang-pp2.jpg?1733473140",
    desc: "This series participated in the Picking Up Color Project: Pocket Book for Autumn.",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/626/602/large/yize-huang-pp2.jpg?1733473140",
      "https://cdnb.artstation.com/p/assets/images/images/082/626/605/large/yize-huang-pp1.jpg?1733473149",
      "https://cdna.artstation.com/p/assets/images/images/095/020/560/medium/yize-huang-1.webp?1767371386",
      "https://cdna.artstation.com/p/assets/images/images/095/020/558/medium/yize-huang-.webp?1767371379",
      "https://cdna.artstation.com/p/assets/images/images/082/626/586/large/yize-huang-pp3.jpg?1733473101",
    ],
    medium: "oil painting on canvas",

    layout: "single",
  },
  {
    slug: "an_arizona_boy",
    title: "An Arizona boy",
    year: "2021",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/626/590/large/yize-huang-jj1.jpg?1733473110",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/626/590/large/yize-huang-jj1.jpg?1733473110",
    ],
    medium: "Acrylic and colored pencils",

    layout: "single",
  },
  {
    slug: "tattoos",
    title: "Tattoos",
    year: "2019-2024",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/095/016/998/medium/yize-huang-2026-01-02-14-52-00.webp?1767362073",
    desc: 'The "Yizellow" of this project were favored by many people, and they even wanted to make these pictures into tattoos, so I started working as a tattooist. But as more and more people liked it, I gradually professionalized the technique and even apprenticed at a studio in Sydney, Australia. However, with a lot of practice, I came to realize that tattooing was not the right direction for me, and I felt a lack of freedom in it, so I decided to give it up, even though being a tattooist could be very lucrative.',
    images: [
      "https://cdna.artstation.com/p/assets/images/images/095/016/998/medium/yize-huang-2026-01-02-14-52-00.webp?1767362073",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/009/medium/yize-huang-2026-01-02-14-52-28.webp?1767362090",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/011/medium/yize-huang-2026-01-02-14-52-42.webp?1767362094",
      "https://cdna.artstation.com/p/assets/images/images/095/017/016/medium/yize-huang-2026-01-02-14-52-48.webp?1767362098",
      "https://cdna.artstation.com/p/assets/images/images/095/017/022/medium/yize-huang-2026-01-02-14-53-01.webp?1767362106",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/025/medium/yize-huang-2026-01-02-14-53-09.webp?1767362111",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/035/medium/yize-huang-2026-01-02-14-53-38.webp?1767362121",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/029/medium/yize-huang-2026-01-02-14-53-15.webp?1767362115",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/037/medium/yize-huang-2026-01-02-14-53-51.webp?1767362126",
      "https://cdnb.artstation.com/p/assets/images/images/095/017/003/medium/yize-huang-2026-01-02-14-52-23.webp?1767362084",
      "https://cdna.artstation.com/p/assets/images/images/095/016/994/medium/yize-huang-2026-01-02-14-51-55.webp?1767362067",
      "https://cdna.artstation.com/p/assets/images/images/095/017/000/medium/yize-huang-2026-01-02-14-52-12.webp?1767362079",
    ],
    medium: "Tattoo",

    layout: "single",
  },
];
