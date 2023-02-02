import supertest from "supertest";
import app from "index"
import { number, string } from "joi";

const api = supertest(app)

describe("GET /fruits", () => {
    it("should respond with status 200 and arry", async () => {
        const response = await api.get("/fruits");
        const status = response.status;
        const body = response.body;

        expect(status).toBe(200);
        expect(body).toEqual(expect.arrayContaining([]));
    })
});

describe("POST /fruits", () => {
    it("should respond with status 201 when a fruit is register", async () => {
        const body = {
            name: "banana",
            price: 20
        }
        const response = await api.post("/fruits").send(
            body
        );
        const status = response.status;

        expect(status).toBe(201);
    });

    it("should respond with status 422 when the fruit already exists", async () => {
        const body = {
            name: "banana",
            price: 20
        }
        const response = await api.post("/fruits").send(body);
        const status = response.status;

        expect(status).toBe(409);
    });

    it("should respond with status 422 when the body not exist", async () => {
        const response = await api.post("/fruits").send();
        const status = response.status;

        expect(status).toBe(422);
    });

    it("should respond with status 422 when the body is invalid", async () => {
        const bodyInvalid = {
            name: "abacate"
        }
        const response = await api.post("/fruits").send(bodyInvalid);
        const status = response.status;

        expect(status).toBe(422);
    });
});

describe("GET /fruits/:id", () => {
    it("should respond with status 200 and arry when the id exits", async () => {
        const id = 1
        const response = await api.get(`/fruits/${id}`);
        const status = response.status;
        const body = response.body;

        expect(status).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            "name": expect.any(String),
            "price": expect.any(Number),
            "id": expect.any(Number)
        }));
    });

    it("should respond with status 404 when the id not exits", async () => {
        const id = 0
        const response = await api.get(`/fruits/${id}`);
        const status = response.status;

        expect(status).toBe(404);
    })
})