import Sequelize from 'sequelize'

 const connection = new Sequelize('guiapress', 'root','12345678',{
    host: 'localhost',
    dialect: 'mysql'
})

export default connection

