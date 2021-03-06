import { factory, BaseControl } from './controls';
import Dispatcher from './dispatcher';
import Calculator from './calculator';

export default class FormLogic {

  controls: BaseControl[] = [];

  $dispatcher: Dispatcher = null;

  $calculator: Calculator = null;

  constructor(context: any) {
    this.$dispatcher = new Dispatcher(this);
    this.$calculator = new Calculator(this);
    this.registerControls(context);
    this.executeInitRules();
  }

  registerControls(context: any) {
    Object.keys(context).forEach((prop) => {
      const current = context[prop];
      const control = factory(current, this);
      this.controls.push(control);
    });
  }

  executeInitRules() {
    for(let control of this.controls) {
      if (control.isSubscriber) {
        this.$dispatcher.pushMessage(control);
      }
    }
    // 变更行为，更新状态。
    this.$dispatcher.update();
  }

  getControl(dataField: string) {
    return this.controls.find(elem => elem.dataField === dataField);
  }
}