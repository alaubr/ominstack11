const connection = require('../database/connection');

module.exports = {
    async lista (request, response) {
        const {page = 1}  = request.query;
         
        const [count] = await connection('incidents').count();
        const dados = await connection('incidents')
            .join('ongs', 'ongs.id',  '=', 'incidents.ong_id') 
            .limit(5)  
            .offset((page-1) * 5)
            .select([
                'incidents.*', 
                'ongs.nome', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.cidade', 
                'ongs.uf']);

        response.header('X-total-Coudnt', count['count(*)']);
        return response.json(dados);
    },
    
    async insere (request, response) {
        const {title, description, value} = request.body;

        const ong_id = request.headers.authorization;
        console.log(ong_id);

        const [incident_id] = await connection('incidents').insert({
            title,
            description,
            value, 
            ong_id
        });   
        return response.json(incident_id);
    },

    async deleta (request, response) {
        const { incident_id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', incident_id).select('ong_id').first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operação não permitida'});
        }
        
        await connection('incidents').where('id', incident_id).delete();
        return response.status(204).send();


    }
};