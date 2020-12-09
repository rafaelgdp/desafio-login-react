const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        lowercase: true,
    },
    hashsenha: {
        type: String,
        required: true,
    },
    nascimento: {
        type: Date,
        required: false,
    },
    naturalidade: {
        type: String,
        required: false,
    },
    nacionalidade: {
        type: String,
        required: false,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    }},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;