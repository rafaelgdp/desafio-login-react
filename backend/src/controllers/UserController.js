const User = require('../models/User');

const bcrypt = require('bcrypt');
const validador = require('../utils/validation');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const { validateCompleteUserFields } = require('../services/UserService');
const validation = require('../utils/validation')

module.exports = {

    async register (req, res) {

        let {
            nome,
            email,
            senha,
            cpf,
            nascimento,
            naturalidade,
            nacionalidade
        } = req.body;
        
        if (!nome || !cpf || !senha || !nascimento ) {
            return res.status(403).send('Requisição com campos obrigatórios faltantes.');
        }

        if (email && !validador.validarEmail(email)) {
            return res.status(400).send('E-mail inválido.');
        }

        if (!validador.validarData(nascimento)) {
            return res.status(400).send('Nascimento inválido.');
        }

        cpf = cpf.replace(/\D/g,'');
        if (!validador.validarCPF(cpf)) {
            return res.status(400).send('CPF inválido.');
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashsenha = await bcrypt.hash(senha, salt);
            const user = await User.create({
                    nome,
                    email,
                    hashsenha,
                    cpf,
                    nascimento,
                    naturalidade,
                    nacionalidade
                });
            return res.status(200).json(user);

        } catch (err) {
            console.error(err);
            if (err.code === 11000) {
                return res.status(500).send("Já existe esse CPF cadastrado.");    
            }
            return res.status(500).send("Erro ao cadastrar usuário.");
        }
        
    },
    
    async getUser (req, res) {

        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.secret, async function(err, decoded) {
            if (err) return res.status(500).send("Erro de autenticação.");
            try {
                const tokenId = decoded._id
                let user = await User.findOne({_id: tokenId});
                user.hashsenha = null;
                delete user.hashsenha;
                return res.send(user);
            } catch (err) {
                return res.status(500).send("Usuário não encontrado.");
            }
        });
    },
    
    async login(req, res) {
        const cpf = req.body.cpf.replace(/\D/g,'');
        const user = await UserService.getUserByCPF(cpf);
        if (!user) res.status(404).send("Usuário não encontrado.");
        const result = await bcrypt.compare(req.body.senha, user.hashsenha);
        if (!result) res.status(401).send("Senha incorreta.");
        const token = jwt.sign({ _id : user._id }, process.env.secret, {
            expiresIn: 3600
        });
        return res.send({ auth: true, token: token });
    },

    async updateUser (req, res) {
        const token = req.body.token;
        const reqUser = req.body.user;
        jwt.verify(token, process.env.secret, async function(err, decoded) {
            if (err) {
                return res.status(500).send("Erro de autenticação.");
            }

            try {
                const tokenId = decoded._id
                let user = await User.findOne({_id: tokenId});
                if (!user) {
                    return res.status(500).send("Erro de autenticação.");
                }

                const propsMutaveisDiretas = [
                    'nome', 'sexo', 'email',
                    'nascimento', 'naturalidade',
                    'nacionalidade', 'cpf'
                ];

                propsMutaveisDiretas.forEach((prop) => {
                    if (reqUser.hasOwnProperty(prop)) {
                        user[prop] = reqUser[prop];
                    }
                })
                
                if (reqUser.hasOwnProperty('senha') && validation.validarSenha(reqUser.senha)) {
                    user.hashsenha = await bcrypt.hash(reqUser.senha, 10);
                }

                if (!validateCompleteUserFields(user)) {
                    return res.status(500).send("Erro no formato dos campos!");
                }

                try {
                    const updatedUser = await user.save();
                    return res.send(updatedUser);
                } catch (err) {
                    console.error(err.message);
                    return res.status(500).send("Campos enviados inválidos ou indisponíveis.");
                }
                
            } catch (err) {
                return res.status(500).send("Erro na atualização dos dados.");
            }

        });
    },

}