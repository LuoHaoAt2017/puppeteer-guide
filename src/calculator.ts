import FormLogic from './formlogic';
export default class Calculator {

  private $form: FormLogic;

  constructor(formInstance: FormLogic) {
    this.$form = formInstance;
  }

  getRuleResult(rule: Rule) {

  }
}