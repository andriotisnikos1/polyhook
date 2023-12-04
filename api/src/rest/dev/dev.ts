import express from 'express'
import { db } from '../../central.config.js'
import { trpc } from '../../index.js'


const dev = express.Router()
dev.use(express.json())

dev.post("/register", async (req, res) => {
    const { name, urls } = req.body
    res.json(await trpc.polyhooks.create.query({ name, urls }))
})

dev.get("/invoke/:polyhookID", async (req, res) => {
    const { polyhookID } = req.params
    res.json(await trpc.polyhooks.dev_invoke.query({ polyhookID }))
})

export default dev
