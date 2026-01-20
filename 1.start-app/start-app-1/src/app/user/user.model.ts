// 用户有很多的方法，可以通过interface或者type直接把用户定义为一个user对象
// type User = {
//   id: string,
//   avatar: string,
//   name: string
// }

export interface User {
  id: string;
  avatar: string;
  name: string;
}
