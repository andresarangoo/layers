module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {

        product_id:{
            type: DataTypes.INTEGER(9),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        product_href:{
            type: DataTypes.STRING(25),
            allowNull: false
        },
        
        product_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        product_category: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        product_description: {
            type: DataTypes.STRING(250),
            allowNull: false
        },

        product_photo: {
            type: DataTypes.STRING(250),
            allowNull: true 
        }, 

        product_price: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
        },
        product_amount: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
        }
    },{
        tableName: 'Product',
        timestamps: false
    });
};