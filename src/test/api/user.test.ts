import request from "supertest";
import app from "../../index";
import { createConnection, disconnect } from "../../db-init/dbConn";
import { User } from "../../db-init/model/user";

const email3 = "test12@gmail.com";
const email4 = "before@test.com";
const firstName = "firstname";
const lastName = "lastName";
const password1 = "password";
let result: any;

describe("Testing user API", () => {
  beforeAll(async () => {
    createConnection();
    jest.setTimeout(3000);
    result = await User.create({
      firstName: "test",
      lastName: "test",
      email: email3,
      password: password1,
    });
  });

  afterAll(async () => {
    await User.deleteOne({ email: email3 });
    await User.deleteOne({ email: email4 });
    setTimeout(() => {
      disconnect();
    }, 1500);
  });

  it("should not login a user if the route is wrong", async () => {
    const payload = {
      email: email3,
      password: "abcdef",
    };
    await request(app)
      .post("/api/auth/user/logi")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(404);
      });
  });

  it("should login a user ", async () => {
    const payload = {
      email: "tanya12@gmail.com",
      password: "tanya",
    };
    await request(app)
      .post("/api/auth/user/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should not login a user if the password is wrong", async () => {
    const payload = {
      email: "tanya12@gmail.com",
      password: "anya",
    };
    await request(app)
      .post("/api/auth/user/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it("should not login a user if the email id already exists", async () => {
    const payload = {
      firstName: "firstName",
      lastName: "lastName",
      email: email3,
      password: "abc",
    };
    await request(app)
      .post("/api/auth/user/sign_up")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it("should not login a user if the password is not provided", async () => {
    const payload = {
      firstName: "firstName",
      lastName: "lastName",
      email: email3,
    };
    await request(app)
      .post("/api/auth/user/sign_up")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
