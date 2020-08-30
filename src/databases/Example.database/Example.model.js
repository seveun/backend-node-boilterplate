module.exports = (sequelize, { UUID}) => {

  const Example = sequelize.define('Example', {

    id: {
      allowNull: false,
      primaryKey: true,
      type: UUID,
    },
  });

  return Example;
};