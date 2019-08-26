const blogs = [
  {
    title: "testiBlogi1",
    author: "Kirjoittaja1",
    url: "www.testblog.com",
    likes: 10,
    user: {
      username: "tester",
      name: "Donald Tester",
      id: "555555"
    },
    id: "666666"
  },
  {
    title: "testiBlogi2",
    author: "Kirjoittaja2",
    url: "www.testblog2.com",
    likes: 20,
    user: {
      username: "testiKäyttäjä2",
      name: "testiKäyttäjä2",
      id: "888888"
    },
    id: "9999999"
  }
];

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
  console.log("token", token);
};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };
