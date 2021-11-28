import BaseControl from './base-control';
import FormLogic from '../formlogic';
import { ControlOpts } from '../interface/control';
class FormTextbox extends BaseControl {

  constructor(opts: ControlOpts, form: FormLogic) {
    super(opts, form);
  }
}

export default FormTextbox;