import request from "supertest";
import app from "../../../api-gateway/app.js";

describe("Test suite: Database Service", () => {
  it("Create a new connection", async () => {
    const connection_name = "connection_test_1";
    const connectionData = {
      parameters: {
        param1: "value1",
        param2: "value2",
      },
    };

    const response = await request(app)
      .post(`/api/connections/${connection_name}`)
      .send(connectionData)
      .set("Content-Type", "application/json");

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.body).toBeDefined();
  });

  it("Get an existing connection", async () => {
    const response = await request(app)
      .get(`/api/connections/connection_test_1`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.body).toBeDefined();
    expect(response.body.body.connection_name).toBe("connection_test_1");
  });
});
