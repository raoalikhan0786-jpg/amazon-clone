export const getProducts = async (req, res) => {

  const products = [

    {
      _id: 1,
      title: "iPhone 15 Pro",
      price: 149999,
      image:
        "https://m.media-amazon.com/images/I/81CgtwSII3L._SL1500_.jpg"
    },

    {
      _id: 2,
      title: "Samsung Galaxy S24",
      price: 89999,
      image:
        "https://m.media-amazon.com/images/I/71RVuBs3q9L._SL1500_.jpg"
    },

    {
      _id: 3,
      title: "Sony Headphones",
      price: 19999,
      image:
        "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg"
    },

    {
      _id: 4,
      title: "Apple Watch",
      price: 45999,
      image:
        "https://m.media-amazon.com/images/I/71Swqqe7XAL._SL1500_.jpg"
    }

  ];

  res.json(products);

};