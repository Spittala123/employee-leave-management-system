export interface Employee
{
    id:number,
    firstname:string,
    lastname:string,
    email:string,
    phone:number,
    officeAddress:string,
    leavebalance:number,
}
export interface User
{
    id:number,
    username:string,
    Password:string,
    UserRole:string
}
export interface Registerform
{
    id:number
    Employee :Employee,
    User:User
}