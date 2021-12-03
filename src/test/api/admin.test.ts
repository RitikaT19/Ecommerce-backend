import request from "supertest";
import app from "../../index";
import { createConnection, disconnect } from "../../db-init/dbConn";
import { User } from "../../db-init/model/user";

const email1 = "test@test.com";
const email2 = "test2@test.com";
const password1 = "password";
let result: any;

describe("Testing user API", () => {
  beforeAll(async () => {
    createConnection();
    jest.setTimeout(3000);
    result = await User.create({
      email: email1,
      password: password1,
    });
  });

  afterAll(async () => {
    await User.deleteOne({ email: email1 });
    await User.deleteOne({ email: email2 });
    setTimeout(() => {
      disconnect();
    }, 1500);
  });

  it("should not login a admin if the password is wrong", async () => {
    const payload = {
      email: email1,
      password: "abcdef",
    };
    await request(app)
      .post("/api/auth/admin/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it("should login a admin ", async () => {
    const payload = {
      email: "ritika@gmail.com",
      password: "ritika",
    };
    await request(app)
      .post("/api/auth/admin/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should not login a admin if the password is wrong ", async () => {
    const payload = {
      email: "ritik@gmail.com",
      password: "riti",
    };
    await request(app)
      .post("/api/auth/admin/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it("should not login a admin if the route is wrong", async () => {
    const payload = {
      email: email1,
      password: "abcdef",
    };
    await request(app)
      .post("/api/auth/admin/logi")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(404);
      });
  });

  it("should not login a admin if the email id already exists", async () => {
    const payload = {
      firstName: "firstName",
      lastName: "lastName",
      email: email1,
      password: "abc",
    };
    await request(app)
      .post("/api/auth/admin/sign_up")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
