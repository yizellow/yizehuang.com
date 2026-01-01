export type Work = {
  slug: string;
  title: string;
  year: string;
  cover: string;
  desc?: string;
  images: string[];
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
    slug: "light-installation",
    title: "Light Installation",
    year: "2025",
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/499/478/large/yize-huang-2024-12-03-12-39-17.jpg?1733157609",
    desc: "",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/499/478/large/yize-huang-2024-12-03-12-39-17.jpg?1733157609",
    ],
    layout: "single",
  },
];
