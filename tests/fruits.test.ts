import supertest from "supertest";
import app from "index"

const api = supertest(app)

describe("GET /fruits", () => {
    it("should respond with status 200 and arry", async () => {
        const res = await api.get("/fruits");
        const status = res.status;
        const body = res.body;

        expect(status).toBe(200);
        expect(body).toEqual(expect.arrayContaining([]));
    })
});

describe("POST /fruits", () => {
    it("should respond with status 201", async () => {
        const res = await api.post("/fruits").send(
            {
                name: "banana",
                price: 20
            }
        );
        const status = res.status;

        expect(status).toBe(201);
    })
});