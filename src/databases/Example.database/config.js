const { DWH_NAME, DWH_USER,
  DWH_PASSWORD, DWH_HOST, DWH_PORT } = process.env;

module.exports = {
  name: DWH_NAME,
  user: DWH_USER,
  password: DWH_PASSWORD,
  config: {
    dialect: 'postgres',
    host: DWH_HOST,
    logging: false,
    port: DWH_PORT,
  },
};