import {Sequelize} from "sequelize";
const sequelize= new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    pool:{
      max: 5,
      min: 0,
      acquire: 300000,
      idle: 10000
    }
  }
);

const DataTypes = require("sequelize").DataTypes;
const _countries = require("./countries");
const _departments = require("./departments");
const _employees = require("./employees");
const _job_history = require("./job_history");
const _jobs = require("./jobs");
const _locations = require("./locations");
const _regions = require("./regions");

const  initModels=(sequelize)=> {
  const countries = _countries(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const job_history = _job_history(sequelize, DataTypes);
  const jobs = _jobs(sequelize, DataTypes);
  const locations = _locations(sequelize, DataTypes);
  const regions = _regions(sequelize, DataTypes);

  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department_department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  job_history.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(job_history, { as: "job_histories", foreignKey: "department_id"});
  departments.belongsTo(employees, {  foreignKey: "manager_id"});
  employees.hasMany(departments, {  foreignKey: "manager_id"});
  employees.belongsTo(employees, { as: "manager", foreignKey: "manager_id"});
  employees.hasMany(employees, { as: "employees", foreignKey: "manager_id"});
  job_history.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(job_history, { as: "job_histories", foreignKey: "employee_id"});
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id"});
  job_history.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(job_history, { as: "job_histories", foreignKey: "job_id"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  countries.belongsTo(regions, {  foreignKey: "region_id"});
  regions.hasMany(countries, {  foreignKey: "region_id"});

  return {
    countries,
    departments,
    employees,
    job_history,
    jobs,
    locations,
    regions,
  };
}
const models = initModels(sequelize);
export default models;
export {sequelize};
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
