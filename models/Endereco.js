const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco',
        {
          id: {type: DataTypes.INTEGER, primaryKey: true},
          cep: DataTypes.STRING,
          logradouro: DataTypes.STRING,
          numero: DataTypes.INTEGER,
          complemento: DataTypes.STRING,
          bairro: DataTypes.STRING,
          cidade: DataTypes.STRING,
          estado: DataTypes.STRING,
          municipioIBGE: DataTypes.STRING
        },
        { tableName: 'enderecos'}
        
    )
    return Endereco
}
