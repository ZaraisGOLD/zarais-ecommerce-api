const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

test("GET -> 'URL_BASE', should return status code 200 and res.body to have length", async() =>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})