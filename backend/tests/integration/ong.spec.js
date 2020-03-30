const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('should to able to create a new ONG', async() => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Tia house - Teste",
            email: "alguem@danet.com",
            whatsapp: "4736422412",
            city: "Mafra",
            uf: "SC"
        });

        console.log(response.body);

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
         
    });
});