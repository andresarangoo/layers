module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
 
        order_id:{
            type: DataTypes.INTEGER(9),
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true
        },

        product_ID:{
            type: DataTypes.INTEGER(9),
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Product',
                key: 'product_id'
            }
        },
        
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        order_price: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
        },
        product_amount: {
            type: DataTypes.INTEGER(9),
            allowNull: false,
        },
        order_status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "En proceso"
        }
    },{
        tableName: 'Order',
        timestamps: false
    });
};