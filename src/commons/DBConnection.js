import { Sequelize } from 'sequelize';

const DBConnection = new Sequelize( 'MANGOSTA','root','Softtek82' ,{

    host: 'localhost',
    dialect: 'mysql',
    logging: true,
    
});

module.exports =  DBConnection;