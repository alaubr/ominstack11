const connection = require('../database/connection.js');

module.exports = {

    async login (request, response) {
        const {id} = request.body;
        const ong = await connection('ongs')
            .where('id', id)
            .select('nome')
            .first();
        
        if (!ong) {
            return response.status(400).json({error: 'ONG não encontrada'}); 
        } 

        return response.json(ong);
    }


}