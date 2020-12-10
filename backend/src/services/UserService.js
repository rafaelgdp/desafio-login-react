const axios = require('axios');
const API_URL = require('../config/url-config')
const User = require('../models/User');
const validation = require('../utils/validation');

module.exports = {

    async registerUser(user) {
        axios.post(API_URL + '/user/register', user, (response) => {
            return response.json();
        });
    },

    async updateUser(user) {
        axios.patch(API_URL + '/user', user, (response) => {
            return response.json();
        });
    },

    async getUserByCPF(cpf) {
        return await User.findOne({cpf: cpf});
    },

    validateCompleteUserFields(user) {
        return  validation.validarCPF(user.cpf) &&
                validation.validarEmail(user.email) &&
                validation.validarData(user.nascimento)
    }

};