module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
                UserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    //sequelize.sync({ alter: true });


    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
    };


    return Users;
};