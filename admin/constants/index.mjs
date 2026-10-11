const cat = {
  Services: "Services",
  Bikinis: "Bikinis",
};
export const categories = [
  {
    _id: 1001,
    name: "Bikinis",
    image: "https://i.ibb.co/kM0FR2h/cat-Tv-Audio.webp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "Bikinis",
  },
  {
    _id: 1002,
    name: "Services",
    image: "https://i.ibb.co/1JT9Ls4P/Screenshot-2025-10-12-152200.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.",
    _base: "Services",
  },
  
];

export const highlightsProducts = [
  {
    _id: 3001,
    name: "New Deals at Best Prices",
    title: "From $40.00",
    buttonTitle: "Browse Deals",
    image: "https://i.ibb.co/G951N5B/highlights-One.webp",
    _base: "/product",
    color: "#000000",
  },
  {
    _id: 3002,
    name: "Colorful Redmi  Note 6 Pro",
    title: "From $40.00",
    buttonTitle: "Shop Cellphone",
    image: "https://i.ibb.co/bLRNKGq/highlights-Two.webp",
    _base: "/category/cellPhones",
    color: "#ffffff",
  },
  {
    _id: 3003,
    name: "1000 mAh Power Bank",
    title: "From $40.00",
    buttonTitle: "Shop Now",
    image: "https://i.ibb.co/svWYstT/highlights-Three.webp",
    _base: "/product",
    color: "#ffffff",
  },
];

export const blogsData = [
  {
    _id: 4001,
    image: "https://i.ibb.co/XbQf5HS/blogOne.webp",
    title: "iPhone 15 rear camera design will be available",
    _base: "Technology",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae minus atque ratione. Sequi eos aspernatur delectus officia nemo ipsum facere debitis fugiat eum, quod quia, eligendi nihil sapiente perferendis modi quisquam reiciendis minima esse dolorem, molestias aut? Eum, repudiandae sit ipsum officiis unde reprehenderit inventore odio doloremque recusandae nobis voluptatem ipsa atque, veritatis adipisci reiciendis.",
  },
  {
    _id: 4002,
    image: "https://i.ibb.co/wzNpcwp/blogTwo.webp",
    title: "Setup your surround sound speaker",
    _base: "Samrt thing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae minus atque ratione. Sequi eos aspernatur delectus officia nemo ipsum facere debitis fugiat eum, quod quia, eligendi nihil sapiente perferendis modi quisquam reiciendis minima esse dolorem, molestias aut? Eum, repudiandae sit ipsum officiis unde reprehenderit inventore odio doloremque recusandae nobis voluptatem ipsa atque, veritatis adipisci reiciendis.",
  },
  {
    _id: 4003,
    image: "https://i.ibb.co/prdZ3s8/blog-Three.webp",
    title: "Hook up a receiver for your home theater",
    _base: "Life style",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae minus atque ratione. Sequi eos aspernatur delectus officia nemo ipsum facere debitis fugiat eum, quod quia, eligendi nihil sapiente perferendis modi quisquam reiciendis minima esse dolorem, molestias aut? Eum, repudiandae sit ipsum officiis unde reprehenderit inventore odio doloremque recusandae nobis voluptatem ipsa atque, veritatis adipisci reiciendis.",
  },
];

export const products = [
  {
    _id: 2001,
    name: "Red Bikini",
    images: [
      "https://i.ibb.co/4wSxRNm1/Screenshot-2025-10-11-224237.png",
      "https://ibb.co/wZQ1h60c",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.",
    regularPrice: 100,
    discountedPrice: 580,
    quantity: 1,
    rating: 4.5,
    reviews: 50,
    category: "Bikinis",
    colors: ["red", "blue", "green", "yellow", "black", "white"],
    brand: "Samsung",
    isStock: true,
    overView: "Red Bikini",
    isNew: true,
    _base: cat?.Bikinis,
  },
  {
    _id: 2002,
    name: "Blue Bikini",
    images: [
      "https://i.ibb.co/YBtpnq1R/Screenshot-2025-10-11-224348.png",
      "https://i.ibb.co/m6ZN7LX/soundBox.webp",
      "https://i.ibb.co/wdV3b9q/vaccum.webp",
      "https://i.ibb.co/tcdSfrr/blueGun.jpg",
      "https://i.ibb.co/pw0fGmx/gaming-Controller.webp",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.",
    regularPrice: 100,
    discountedPrice: 180,
    quantity: 1,
    rating: 4.8,
    reviews: 80,
    category: "Bikinis",
    colors: ["red", "blue", "green", "yellow", "black", "white"],
    brand: "Samsung",
    isStock: true,
    overView: "Blue Bikini",
    isNew: false,
    _base: cat?.Bikinis,
  },
  {
    _id: 2003,
    name: "Custom Design",
    images: [
      "https://i.ibb.co/1JT9Ls4P/Screenshot-2025-10-12-152200.png",
      "https://i.ibb.co/m6ZN7LX/soundBox.webp",
      "https://i.ibb.co/wdV3b9q/vaccum.webp",
      "https://i.ibb.co/tcdSfrr/blueGun.jpg",
      "https://i.ibb.co/pw0fGmx/gaming-Controller.webp",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.",
    regularPrice: 200,
    discountedPrice: 0,
    quantity: 1,
    rating: 4.2,
    reviews: 30,
    category: "Services",
    colors: ["red", "blue", "green", "yellow", "black", "white"],
    brand: "MI Exclusive",
    isStock: true,
    overView: "Custom Bikini",
    isNew: true,
    _base: cat?.Services,
  },
  
];
