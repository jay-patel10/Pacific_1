module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Jay@2512",
  DB: "jay",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
