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
    year: "2025",
    medium: "Mixed media / ...",
    video: "https://www.youtube.com/embed/sQpa6tkxzg8", // 沒有就刪掉這行
    cover:
      "https://cdna.artstation.com/p/assets/images/images/082/633/124/large/yize-huang-2024-12-06-9-01-23.jpg?1733490357",
    desc: "作品介紹...",
    images: [
      "https://cdna.artstation.com/p/assets/images/images/082/633/124/large/yize-huang-2024-12-06-9-01-23.jpg?1733490357",
      "https://cdna.artstation.com/p/assets/images/images/081/756/450/large/yize-huang-.jpg?1731128444",
      "https://cdna.artstation.com/p/assets/images/images/081/756/438/large/yize-huang-.jpg?1731128376",
      "https://cdnb.artstation.com/p/assets/images/images/081/756/441/large/yize-huang-.jpg?1731128424",
    ],
    layout: "single",
    clips: [
      {
        title: "Psychological Test V",
        url: "https://www.youtube.com/embed/sQpa6tkxzg8",
      },
      { title: "Clip 2", url: "https://www.youtube.com/embed/Ze51L77-feU" },
      { title: "Clip 2", url: "https://www.youtube.com/embed/Ze51L77-feU" },

      { title: "Clip 2", url: "https://www.youtube.com/embed/Ze51L77-feU" },

      { title: "Clip 2", url: "https://www.youtube.com/embed/Ze51L77-feU" },

      { title: "Clip 2", url: "https://www.youtube.com/embed/Ze51L77-feU" },
    ],
  },
  {
    slug: "king",
    title: "king",
    year: "2019",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/052/116/789/large/yize-huang-plastic-wrap-protection-laocoon-and-his-sons.jpg?1658985491",
    desc: "",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/052/116/789/large/yize-huang-plastic-wrap-protection-laocoon-and-his-sons.jpg?1658985491",
    ],
    layout: "single",
  },
  {
    slug: "me-2019",
    title: "Me 2019",
    year: "2019",
    cover:
      "https://cdnb.artstation.com/p/assets/images/images/082/626/611/large/yize-huang-j4.jpg?1733473161",
    desc: "When I was nineteen, I was diagnosed with Asperger’s syndrome. It explained why I had always felt out of place among others. I felt relieved, but also angry about the injustices I had endured in the past. Before that, I was like a robot hiding in human society, doing everything I could to imitate others’ behavior in order not to be discovered. Whenever I told people I had Asperger’s, they usually showed a look of disbelief. I would tell them, “I don’t really feel anything about what you’re going through, but I will pretend to cry for you.” Even after saying this, some people still didn’t believe me, which meant I had acted well enough. I heard that people with mild symptoms like mine often have similar experiences. Because we are naturally sensitive and intelligent, able to imitate and predict others’ behavior, we often appear more socially skilled than average, but without true empathy. When faced with situations that require a genuine emotional response, we crash—such as love.MyMyMyMy,My first solo exhibition was held at 8 and one-half Gallery at Taipei National University of the Arts. The exhibition focuses primarily on self-portraits, taking myself as the point of departure.",
    medium: "Oil painting, Acrylic painting, Oil pastel",
    images: [
      "https://cdnb.artstation.com/p/assets/images/images/082/626/611/large/yize-huang-j4.jpg?1733473161",
      "https://cdna.artstation.com/p/assets/images/images/082/626/570/small/yize-huang-jj88.jpg?1733473076",
      "https://cdna.artstation.com/p/assets/images/images/082/626/582/small/yize-huang-jj55.jpg?1733473096",
    ],
    layout: "single",
  },
  {
    slug: "travel-and-my-film-camera",
    title: "Travel and my film camera",
    year: "2025",
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
