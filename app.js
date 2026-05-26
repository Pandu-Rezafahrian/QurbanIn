// npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string
// npx sequelize-cli model:generate --name UserProfile --attributes fullName:string,phone:string,address:string
// npx sequelize-cli model:generate --name Farm --attributes name:string,location:string,description:string
// npx sequelize-cli model:generate --name Animal --attributes name:string,type:string,weight:integer,age:integer,price:integer,status:string,imageUrl:string
// npx sequelize-cli model:generate --name OrderItem --attributes price:integer
// npx sequelize-cli model:generate --name Order --attributes totalPrice:integer,status:string,orderDate:integer
// fk userId, orderId, farmId, animalId