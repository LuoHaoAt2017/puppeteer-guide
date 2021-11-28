import BaseControl from './base-control';
import FormLogic from '../formlogic';
class FormTextbox extends BaseControl {

  constructor(opts: BaseControl, form: FormLogic) {
    super(opts, form);
  }
}

export default FormTextbox;