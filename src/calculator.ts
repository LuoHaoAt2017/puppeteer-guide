import FormLogic from './formlogic';
import { Rule } from './interface/rule';
import Stack from './utils/stack';
import Queue from './utils/queue';
// 单目运算符：算术运算符、逻辑运算符、位逻辑运算符、位移运算符、关系运算符、自增自减运算符。
const UnaryOperators = ['!', '++', '--', '-'];
// 双目运算符：算术运算符，关系运算符，逻辑运算符，位运算符，赋值运算符，逗号运算符。
const BinocularOperators = [
  '+',
  '-',
  '*',
  '/',
  '%',
  '==',
  '!=',
  '<',
  '>',
  '<=',
  '>=',
  '&&',
  '||',
];
// 运算符优先级：单目运算符的优先级高于双目运算符的优先级
const SplitOperators =
  /(!==|!=|===|==|&&|\|\||<=|<|>=|>|\+|-|\*|%|!|\/|\(|\))/g;
export default class Calculator {
  private $form: FormLogic;

  constructor(formInstance: FormLogic) {
    this.$form = formInstance;
  }

  getRuleResult(rule: Rule) {
    const context = this.getCalcContext(rule);
    const suffix = this.parseExpression(rule, context);
    return this.calcuExpression(suffix, context);
  }

  /**
   * 获取计算表达式的上下文
   */
  getCalcContext(rule: Rule) {
    const fields = [rule.suber].concat(rule.pubers);
    let context = {};
    const controls = this.$form.controls;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      for (let control of controls) {
        if (control.dataField === field) {
          context[field] = control.value;
        }
      }
    }
    return context;
  }

  /**
   * Dijsktra 调度场算法
   * 中缀表达式(人所能理解的)转化成后缀表达式(机器能处理的)
   * ({F0000001} + ({F0000001} * {F0000002})) * ({F0000002} + {F0000001} * {F0000002}) + ({F0000001} + {F0000002})
   */
  parseExpression(rule: Rule, context: Object) {
    let middle = rule.expression;
    // 清除表达式中的空白
    middle = middle.replace(/\s/g, '');
    // 使用数值替换掉花括号
    middle = middle.replace(/\{.*?\}/g, (elem) => {
      if (elem.startsWith('{') && elem.endsWith('}')) {
        const key = elem.slice(1, -1);
        return context[key];
      }
      return elem;
    });
    // 将表达式进行拆解: 在操作符左右加上空白符，根据空白符将表达式切分。
    const items = middle.replace(SplitOperators, ' $1 ').split(/\s+/);
    // 使用调度场算法进行转化
    const queue = new Queue(); // 存放输出结果
    const stack = new Stack(); // 存放操作符
    for (let i = 0; i < items.length; i++) {
      // 读取一个记号
      const item = items[i];
      // 如果这个记号是一个左括号，将左括号添加到 stack 中。
      if (item === '(') {
        stack.push(item);
      }
      // 如果这个记号是一个右括号，栈顶元素依次出栈，添加到队列中。直到遇到左括号，左括号出栈，丢弃。
      else if (item === ')') {
        while (!stack.isEmpty() && stack.top() !== '(') {
          const top = stack.pop();
          queue.enqueue(top);
        }
        if (stack.isEmpty()) {
          console.error('表达式中存在不匹配的括号');
          return [];
        }
        if (stack.top() === '(') {
          stack.pop();
        }
      }
      // 如果这个记号表示一个操作符
      else if (
        UnaryOperators.includes(item) ||
        BinocularOperators.includes(item)
      ) {
        // 如果栈顶运算符的优先级不小于当前运算符的优先级，栈顶运算符依次出栈，添加到输出队列中。
        // 直到栈顶运算符的优先级小于当前运算符的优先级，当前运算符添加到输出队列中。
        while (!stack.isEmpty() && this.compareLevel(stack.top(), item) >= 0) {
          const top = stack.pop();
          queue.enqueue(top);
        }
        stack.push(item);
      }
      // 如果这个记号表示一个数字，那么将其添加到输出队列中。
      else {
        queue.enqueue(item);
      }
    }
    // 如果此时在栈当中还有操作符
    while (!stack.isEmpty()) {
      const item = stack.pop();
      if (item === '(') {
        // 如果此时位于栈顶端的操作符是一个括号，那么就表示在表达式中存在不匹配的括号。
        console.error('表达式中存在不匹配的括号');
        return [];
      }
      // 将操作符逐个弹出并放入输出队列中。
      queue.enqueue(item);
    }
    return queue.getStore();
  }

  /**
   * 计算后缀表达式
   */
  calcuExpression(suffixs: any[], context: Object) {
    console.table(suffixs);
  }

  /**
   * 定义操作符的优先级
   */
  operatorLevel(operator) {
    let level = 0;
    switch (operator) {
      case '!':
        level = 7;
        break;
      case '*':
      case '/':
      case '%':
        level = 6;
        break;
      case '+':
      case '-':
        level = 5;
        break;
      case '<':
      case '<=':
      case '>':
      case '>=':
        level = 4;
        break;
      case '==':
      case '===':
      case '!=':
      case '!==':
        level = 3;
        break;
      case '&&':
        level = 2;
        break;
      case '||':
        level = 1;
        break;
      default:
        level = 1;
    }
    return level;
  }

  compareLevel(operator1, operator2) {
    const level1 = this.operatorLevel(operator1);
    const level2 = this.operatorLevel(operator2);
    if (level1 > level2) {
      return 1;
    } else if (level1 < level2) {
      return -1;
    } else {
      return 0;
    }
  }
}
