module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hire: {
            type: DataTypes.BOOLEAN,
            default: false
        },
    }, { timestamps: true },)
    return Book
}