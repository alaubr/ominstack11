const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async lista (request, response) {
        const dados = await connection('ongs').select('*');
        return response.json(dados);
    },

    async insere (request, response) {
        const {nome, email, whatsapp, cidade, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade, 
            uf
        });   
        return response.json(id);
     }
};