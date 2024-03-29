const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (req, res, next) => {
    const {id} = req.params    
    const index = users.findIndex(user => user.id === id)

    if(index < 0) {
        return res.status(404).json({message: "user not faund"})
    }

    req.userIndex = index
    req.userId = id

    next()
}

app.get("/users", (request, response) => {

    return response.json(users)
})

app.post("/users", (request, response) => {
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put("/users/:id", checkUserId, (req, res) => {
    const index = req.userIndex
    const id = req.userId

    const {name, age} = req.body

    const updateUser = { id, name, age }

    users[index] = updateUser

    return res.json(updateUser)
})

app.delete("/users/:id", checkUserId, (req, res) => {

    const index = req.userIndex
    const id = req.userId

    users.splice(index, 1)

    return res.status(204).json()
})

app.listen(port, () => {
    console.log("Servidor conectado")
})
