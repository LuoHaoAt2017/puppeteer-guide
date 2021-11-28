import BaseControl from './base-control';
import FormTextbox from './form-textbox';
import FormNumber from './form-number';
import FormLogic from '../formlogic';

function factory(opts: BaseControl, form: FormLogic): BaseControl {
  if(opts.controlKey === ControlKey.FormTextbox) {
    return new FormTextbox(opts, form);
  } else if(opts.controlKey === ControlKey.FormNumber) {
    return new FormNumber(opts, form);
  }
  return new FormTextbox(opts, form);
}

export {
  BaseControl,
  FormTextbox,
  factory
}