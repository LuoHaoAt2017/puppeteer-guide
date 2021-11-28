import { Message } from '../message';
import FormLogic from '../formlogic';
import { BusinessRule } from './business-rule';
import { ControlKey } from '../enums';
import { ControlOpts } from '../interface/control';

class BaseControl extends BusinessRule {

  controlKey: ControlKey;

  dataFieled: string;

  displayName: string;

  visible: boolean = true;

  editable: boolean = true;

  valid: boolean = true;

  value: any;

  defaultValue: any;

  font: string = '#000'; // 控件字体颜色

  background: string = '#fff'; // 控件背景颜色

  border: string = "#eee"; // 控件边框颜色

  constructor(opts: ControlOpts, form: FormLogic) {
    super(form);
    this.displayName = opts.displayName;
    this.controlKey = opts.controlKey;
    this.dataFieled = opts.dataFieled;
    this.value = opts.defaultValue;
    // 初始化业务规则
    this.initDisplayRule(this, opts);
    this.initComputeRule(this, opts);
    this.initMappingRule();
    this.initLinkingRule();
  }

  public getValue() {
    return this.value;
  }

  public setValue(val: any) {
    this.value = val;
  }

  public getValid() {
    return this.valid;
  }

  public setValid(val: any) {
    this.valid = val;
  }

  public getVisible() {
    return this.visible;
  }

  public setVisible(val: any) {
    this.visible = val;
  }

  public getEditable() {
    return this.editable;
  }

  public setEditable(val: any) {
    this.editable = val;
  }

  public getDisplayRule() {

  }

  public setDisplayRule() {

  }

  public getComputeRule() {

  }

  public setComputeRule() {

  }

  public getMappingRule() {

  }

  public setMappingRule() {

  }

  public getLinkingRule() {

  }

  public setLinkingRule() {

  }

  public subscribe(pubers: Array<string>) {
    debugger;
    // z = x * y
    // 当前控件是订阅者，其余控件是发布者。
    this.$form.$dispatcher.subscribe(this.dataFieled, pubers);
  }

  public receive(mesg: Message) {

  }
}

export default BaseControl;
