import { Sequelize } from "sequelize";

const conn = new Sequelize("1_teste_api", "root", "Sen@iDev77!.", {
  host: "localhost",
  dialect: "mysql",
});

export default conn