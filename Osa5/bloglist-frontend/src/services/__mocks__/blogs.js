const blogs = [
  {
    title: "testiBlogi1",
    author: "Kirjoittaja1",
    url: "www.testblog.com",
    likes: 10,
    user: [
      {
        username: "Mikko",
        name: "Donald Tester",
        id: "5d482153bd3d6534d8dd8396"
      }
    ],
    id: "5d482127bd3d6534d8dd8395"
  },
  {
    title: "testiBlogi2",
    author: "Kirjoittaja2",
    url: "www.testblog2.com",
    likes: 20,
    user: [
      {
        username: "testiKäyttäjä2",
        name: "testiKäyttäjä2",
        id: "888888"
      }
    ],
    id: "9999999"
  }
];

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken, blogs };
