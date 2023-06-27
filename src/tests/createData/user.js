const User = require("../../models/User")

const user = async () => {

    const userCreate = {
        firstName: "Joel",
        lastName: "Manzano",
        email: "joel@gmail.com",
        password: "joel1234",
        phone: "04141288543"
    }

    await User.create(userCreate)

}

module.exports = user