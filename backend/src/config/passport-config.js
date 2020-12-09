const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');


module.export = function initialize(passport) {
    const authenticateUser = (cpf, senha, done) => {
        
        const user = UserService.getUserByCPF(cpf);
        
        if (user == null) {
            return done(null, false, { message: "Nenhum usuário com esse CPF."});
        }

        try {
            if (await bcrypt.compare(senha, user.senha)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Senha incorreta.'});
            }
        } catch (e) {

        }
    }
    passport.use(new LocalStrategy({usernameField: cpf}), authenticateUser);
    passport.serializeUser((user, done) => {} )
}