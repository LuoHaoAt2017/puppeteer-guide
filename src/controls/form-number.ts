import BaseControl from './base-control';
import FormLogic from '../formlogic';

class FormNumber extends BaseControl {

  constructor(opts: BaseControl, form: FormLogic) {
    super(opts, form);
  }
}

export default FormNumber;