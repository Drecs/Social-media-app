module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        CommentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    });
    return Comments;
};
