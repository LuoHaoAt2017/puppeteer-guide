import FormLogic from './formlogic';
import { Rule } from './interface/rule';
export default class Calculator {
  private $form: FormLogic;

  constructor(formInstance: FormLogic) {
    this.$form = formInstance;
  }

  getRuleResult(rule: Rule) {}
}
