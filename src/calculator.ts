import FormLogic from './formlogic';
import { Rule } from './interface/rule';
export default class Calculator {
  private $form: FormLogic;

  constructor(formInstance: FormLogic) {
    this.$form = formInstance;
  }

  getRuleResult(rule: Rule) {
    const context = this.getCalcContext(rule);
    const expression = this.parseExpression(rule);
    return this.calcuExpression(expression, context);
  }

  /**
   * 获取计算表达式的上下文
   */
  getCalcContext(rule: Rule) {
    const fields = [rule.suber].concat(rule.pubers);
    let context = {};
    const controls = this.$form.controls;
    for(let i = 0; i < fields.length; i++) {
      const field = fields[i];
      for(let control of controls) {
        if (control.dataField === field) {
          context[field] = control.value;
        }
      }
    }
    return context;
  }

  /**
   * 中缀表达式转化成后缀表达式
   */
  parseExpression(rule: Rule) {

  }

  /**
   * 计算后缀表达式
   */
  calcuExpression(expression, context) {

  }
}
