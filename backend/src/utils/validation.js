const validadorCPF = require('gerador-validador-cpf');

module.exports = {
    validarEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    validarData(date) {
        let ehDataValida = Date.parse(date);
        if (isNaN(ehDataValida)) return false;
        return true;
    },
    validarCPF(cpf) {
        return validadorCPF.validate(cpf);
    }
}
