const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

describe("Blogin User-testit", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "Hugo", password: "hugonSalasana" });
    await user.save();
  });

  test("Uuden henkilön lisääminen toimii", async () => {
    const usersAtStart = await helper.allUsersInDB();

    const newUser = {
      username: "Mikko",
      name: "Mikon testi",
      password: "salainen"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.allUsersInDB();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("Ei-Uniikki käyttäjänimi aiheuttaa virheen", async () => {
    const sameUser = {
      username: "Hugo",
      name: "Hugo uudelleenlisäys",
      password: "salainen"
    };

    const resultSameUser = await api
      .post("/api/users")
      .send(sameUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(resultSameUser.body.error).toBe("username must be unique");
  });

  test("Liian lyhyt käyttäjätunnus tai salasana aiheuttaa virheen", async () => {
    const shortUser = {
      username: "Hu",
      name: "Hu, eli liian vähän merkkejä",
      password: "salainen"
    };

    const resultShortUser = await api
      .post("/api/users")
      .send(shortUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(resultShortUser.body.error).toBe(
      "username and password must be at least 3 characters long"
    );
  });

  test("Olemattomat käyttäjätunnukset ja salasanat aiheuttavat virheen", async () => {
    const noUser = {
      name: "Ei usernamea tai passwordia"
    };

    const resultNoUser = await api
      .post("/api/users")
      .send(noUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(resultNoUser.body.error).toBe("username and password are required");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
