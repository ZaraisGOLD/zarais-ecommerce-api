const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
require('../models')

const BASE_URL_USERS = '/api/v1/users/login'
const BASE_URL_CART = '/api/v1/cart'
let TOKEN
let userId
let cartId
let product

beforeAll(async () => {
    const user = {
        email: "joel@gmail.com",
        password: "joel1234"
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
})

test("POST -> 'BASE_URL_CART', should return status code 201 and res.body.quantity === body.quantity", async () => {

    const productBody = {
        title: "Xiaomi 12",
        description: "lorem 12",
        price: "189.23",
    }

    product = await Product.create(productBody)

    const cartBody = {
        quantity: 1,
        userId,
        productId: product.id
    }

    const res = await request(app)
        .post(BASE_URL_CART)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cartBody.quantity)
})

test("GET -> 'BASE_URL_CART', should return status code 200 and res.body.length === 1", async () => {

    const res = await request(app)
        .get(BASE_URL_CART)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("PUT -> 'BASE_URL_CART/:id', should return status code 200 and res.body.quantity === body.quantity", async () => {

    const cartBody = {
        quantity: 2
    }

    const res = await request(app)
        .put(`${BASE_URL_CART}/${cartId}`)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(cartBody.quantity)
})

test("DELETE -> 'BASE_URL_CART/:id', should return status code 204", async () => {

    const res = await request(app)
        .delete(`${BASE_URL_CART}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

    await product.destroy()
})