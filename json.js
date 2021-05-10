// JSON
// JavaScript Object Notation

// 1. Object to JSON
//stringify(obj)

// boolean 타입도 가능
let json = JSON.stringify(true);
console.log(json);

// JSON interface 안에 두가지 API가 있다. (parse, stringify)

// parse : JSON string data를 어떤 타입의 오브젝트로 변환, reviver으로 결과값을 세밀하게 조정
// stringify : 어떤 타입의 object를 받아와 string으로 변환, replacer으로 결과값을 세밀하게 조정
// stringify 매개변수가 다르지만 동일한 함수가 두 개 존재
// => 오버로딩(Overloading) : 함수의 이름은 동일하지만 매개변수에 따라 다른방식으로 호출한다.

json = JSON.stringify(['apple', 'banana']);
console.log(json); //["apple","banana"] 더블쿼트가 JSON의 규격사항

const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${this.name} can jump`);
  },
};

json = JSON.stringify(rabbit);
console.log(json); //{"name":"tori","color":"white","size":null,"birthDAte":"2021-05-10T12:07:26.959Z"}

// 토끼객체에서 이름과 색깔만 JSON으로 만들고싶을 때?
// 배열의 property 이름 색깔 전달
json = JSON.stringify(rabbit, ['name', 'color']);
console.log(json); //{"name":"tori"}

//함수는 포함되지 않음 object의 데이터가 아님, Symbol같은 JS자체에 들어있는 데이터도 포함되지않음

// callback 함수로 더 세밀하게 전달받기

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return value;
});
console.log(json);

// 제일 처음에 전달받는 것은 토끼 obj를 싸고있는 최상위 object

//key에 name이 들어오게 되면 hiko 라는 값으로 성정하고 key가 name이 아닌 경우 원래 값으로 설정
json = JSON.stringify(rabbit, (key, value) => {
  return key === 'name' ? 'hiko' : value;
});
//{"name":"hiko","color":"white","size":null,"birthDAte":"2021-05-10T12:19:29.606Z"}

console.log(json);

// 2. JSON to Object
// parse(JSON)
console.clear();
json = JSON.stringify(rabbit);

//변환하고 싶은 JSON을 전달하기만하면 된다.
// const obj = JSON.parse(json);
// console.log(obj); //{name: "tori", color: "white", size: null, birthDAte: "2021-05-10T12:22:18.592Z"}

// 그러나 직렬화된 (JSON으로 다시 변환된) 객체에는 함수가 없음
rabbit.jump();
// obj.jump(); //json.js:69 Uncaught TypeError: obj.jump is not a function

// console.log(obj.birthDate.getDate());
//Uncaught TypeError: obj.birthDate.getDate is not a function
//object 자체 였던 birthDate는 string으로 변환되었기 때문에 출력 X

//직렬화된 데이터를 콜백함수를 이용해 생성

const obj = JSON.parse(json, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === 'birthDate' ? new Date(value) : value;
});

console.log(obj.birthDate.getDate());
