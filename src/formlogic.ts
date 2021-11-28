import { factory, BaseControl } from './controls';
import Dispatcher from './dispatcher';
import Calculator from './calculator';

export default class FormLogic {

  controls: Map<string, BaseControl>;

  $dispatcher: Dispatcher;

  $calculator: Calculator;

  constructor(context: any) {
    this.controls = new Map<string, BaseControl>();
    this.$dispatcher = new Dispatcher(this);
    this.$calculator = new Calculator(this);
    this.registerControls(context);
  }

  registerControls(context: any) {
    Object.keys(context).forEach((prop) => {
      const current = context[prop];
      const control = factory(current, this);
      this.controls.set(current.dataFieled, control);
    });
  }

  getControl(dataField: string) {
    return this.controls.get(dataField);
  }
}