//1.alloc
let buf = Buffer.alloc(10);
console.log(buf);
console.log('-------')
// 2.allocUnsafe;
let buf_2 = Buffer.allocUnsafe(10000);
console.log(buf_2);
console.log('-------')
//3.from
//打印出ASCII码值
let buf_3 = Buffer.from('hello');
console.log(buf_3);
console.log('-------');
//打印出二进制的值
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4);
console.log('-------');
//1-字符串转换
const str = buf_4.toString();
console.log(str);

let buf_5 = Buffer.from('hello');
//1-[]括号进行单个元素的查看 二进制转换的查看
console.log(buf_5[0]);//打印出十进制
console.log(buf_5[0].toString(2));//实际上是01101000
//2-单个元素的修改
// 直接修改
buf_5[0] = 95;
//查看修改后的字符串的值
console.log(buf_5.toString());//输出_ello
//溢出
buf_5[0] = 361;//舍弃高位超出8位的数字 0001 0110 1001
console.log(buf_5);//69  0001被舍弃，留下0110 1001
//中文
let buf_6 = Buffer.from('你好');//utf-8编码方式 1个汉字对应3个中文
console.log(buf_6);//输出<Buffer e4 bd a0 e5 a5 bd>












