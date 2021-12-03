import request from "supertest";
import app from "../../index";
import { createConnection, disconnect } from "../../db-init/dbConn";
import { Category } from "../../db-init/model/categories";
import { getJWT } from "../../helpers/helperFile";

let result: any;
const name1 = "test";
let authToken: any = "";
const id1 = "abc";

describe("Testing user API", () => {
  beforeAll(async () => {
    createConnection();
    jest.setTimeout(3000);
    result = await Category.create({
      name: name1,
      id: id1,
    });

    const token = getJWT({
      name: "test",
      email: "test@test.com",
    });

    authToken = `Bearer ${token}`;
  });

  afterAll(async () => {
    await Category.deleteOne({ name: name1 });
    await Category.deleteOne({ name: "bulb" });
    setTimeout(() => {
      disconnect();
    }, 1500);
  });

  it("should fetch all the categories", async () => {
    await request(app)
      .get("/api/category/get_category")
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should not fetch all the categories if the route is wrong", async () => {
    await request(app)
      .get("/api/category/get_categor")
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should fetch category whose id is provided", async () => {
    const id = result._id;
    await request(app)
      .get("/api/category/" + id)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should not fetch category if id is not provided", async () => {
    const id = result._id;
    await request(app)
      .get("/api/category/")
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(404);
      });
  });

  it("should not add a new category if is not token provided ", async () => {
    const payload = {
      name: name1,
    };
    await request(app)
      .post("/api/category/")
      .send(payload)
      .set("Authorization", "")
      .then((response: any) => {
        expect(response.statusCode).toBe(403);
      });
  });

  it("should  add a new category if token provided ", async () => {
    const payload = {
      name: "bulb",
    };
    await request(app)
      .post("/api/category/")
      .send(payload)
      .set("Authorization", authToken)
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should not add a new category if name is already present", async () => {
    const payload = {
      name: "bulb",
    };
    await request(app)
      .post("/api/category/")
      .send(payload)
      .set("Authorization", authToken)
      .then((response: any) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it("should delete a category", async () => {
    const id = result._id;
    await request(app)
      .delete("/api/category/" + id)
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should not delete a category if id is not provided", async () => {
    const id = result._id;
    await request(app)
      .delete("/api/category/")
      .set("Content-type", "application/json")
      .then((response: any) => {
        expect(response.statusCode).toBe(404);
      });
  });
});
