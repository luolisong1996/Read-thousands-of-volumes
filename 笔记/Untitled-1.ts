import { count } from "console";

/* 基础类型： 
布尔值： */
let isDone: boolean = false
/*数字：typescript里所有数字都是浮点数，这些浮点数的类型是number，除了支持十进制和十六进制，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量 */
let octalLiteral: number = 0o744;
// 字符串：
let name: string = ''
// 数组：定义方法有两种
// 1. 第一种：可以在元素类型后面接上[], 
let list: number[] = [1, 2]
// 2. 第二种：使用数组泛型 
let list: Array<number> = [1, 2, 3]
// 元组Tuple: 允许表达一个已知元素和类型的数组，各元素的类型不必相同 
let x: [string, number]; x = ['hello', 10];
// 枚举：enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字
//  枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字
// 将一组数集，进行归类，分别赋予名字，名字和数值想关联。可以通过关联关系找出彼此
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2];
console.log(colorName)

// any：允许在编译时可选择地包含或移除类型检查。你可能认为object有相似的作用，就像在其他语言中那样
// 但是object类型的变量只是允许你给他赋任意值，但是却不能够在它上面调用任意的方法
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

// Void: 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
function warnUser(): void {
  console.log("This is my warning message");
}
// null 和undefined undefined和null两者各自有自己的类型分别叫做undefined和null。
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量
// 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let u: undefined = undefined;
let n: null = null;
// Never: 永不存在的值的类型。例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// object  object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
declare function create(o: object | null): void;

// 类型断言：类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

// 类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// 另一个为as语法：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。

// 变量声明：
// var 的声明： 奇怪的作用域规则：var声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
// 有人称此为 var 作用域或函数作用域，函数参数也使用函数作用域
// let 声明: 块级作用域 不能在同一个作用域里声明多次
//  重定义及屏蔽：在一个嵌套作用域里引入一个新名字的行为称作屏蔽

// 接口：typescript 的核心原则之一是对值所具有的结构进行类型检查，它有时被称作 鸭式辩型法 或结构性子类型化。
// 在typescript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
interface LabelledValue {
  label: string;
  color?: number; // 可选属性 可以对可能存在的属性进行预定义，可以捕获引用不存在的属性的错误
  readonly x: number; // 只读属性，一些对象只能在对象刚刚创建的时候修改其值
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
  if (labelledObj.colo) {
    // 
  }
}
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
a = ro; // error!

// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
let myObj = { size: 10, label: "Size 10 Object", x: 2 };
printLabel(myObj);
// 必须包含一个label属性且类型为string，LabelledValue接口就好比一个名字，代表有一个label属性且类型为string
// 的对象，需要注意的是，我们在这里并不能像在其他语言里一样，说传给printLabel的对象实现了这个接口，我们只会去关注
// 值的外形，只要传入的对象满足上面提到的必要条件，那么它就是被允许的。类型检查器不会去检查属性的顺序，只要相应的属性
// 存在并且类型也是对的就可以

// readonly vs const最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
// 额外的属性检查：
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // 2 添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些作为特殊用途使用的额外属性，如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });

// 对面字面量会被特殊对待而且经过额外的属性检查，当将他们赋值给变量或作为参数传递时，如果一个对象字面量存在任何目标类型不包含的属性时，你会得到一个错误
// 使用类型断言
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
// 将对象赋值给另一个变量，因为squareOptions不会经过额外属性检查，所以编译器不会报错
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);

// 函数类型，为了使用接口表示函数类型，我们需要给接口定义一个调用签名，它就像是一个只有参数列表和返回值类型的函数定义，参数列表里的每个参数都需要名字和类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配，函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的，如果你不想制定类型，typescript会推断出参数类型，因为函数直接赋值给了SearchFunc函数变量
// 函数的返回值是通过其返回值推断出来的

mySearch = function (source: string, sub: string) {
  let result = source.search(sub);
  return result > -1;
}
// 可索引的类型：与使用接口描述函数类型差不多，我们也可以描述那些能够通过索引得到的类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
console.log(myArray[0])

// 类类型：明确的强制一个类去符合某种契约;
// 接口描述了类的公共部分，而不是公共和私有两部分，它不会帮你检查类是否具有某些私有成员
// 类是具有两个类型的：静态部分的类型和实例的类型，当用构造器签名去定义一个借口并试图定义一个类去实现这个接口时会得到一个错误


interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
class Clock implements ClockInterface {
  currentTime: Date;
  constructor(h: number, m: number) {
  }
  setTime(d: Date) { // 在接口中描述一个方法，在类里实现它
    this.currentTime = d
  }
}
// 在接口中描述一个方法，在类里实现它
interface ClockInterface {
  new(hour: number, minute: number); // 当一个类实现了一个接口时，只对其实例部分进行类型检查，constructor存在于类的静态部分，所以不在检查的范围内
}

// 我们应该直接操作类的静态部分，定义了两个接口，ClockConstrucor为构造函数所用和ClockInterFace为实例方法所用，为了方便我们定义一个构造函数，它用传入的类型创建实例
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface1 {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface1 {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface1 {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 继承接口：和类一样，接口也可相互继承，这让我们能够从一个接口里复制成员到另一个接口里
interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface Square extends Shape, PenStroke {
  sideLength: number
}
let square = <Square>{}
square.color = "blue"
square.sideLength = 10

// 混合类型：接口能够描述JavaScript里丰富的类型，因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多类型
// 一个对象可以同时作为函数和对象使用，并带有额外的属性
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { }
  return counter
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类：当接口继承一个类类型时，它会继承类的成员但不包括实现，就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样，接口同样会继承到类的
// private和protected成员，这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现

// 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
  select() { }
}

class Location {

}
// 在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。
// 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 实际上， SelectableControl接口和拥有select方法的Control类是一样的。 Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。























