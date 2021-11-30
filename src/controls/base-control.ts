import { Message } from '../message';
import FormLogic from '../formlogic';
import { BusinessRule } from './business-rule';
import { ControlKey } from '../enums';
import { ControlOpts } from '../interface/control';

class BaseControl extends BusinessRule {

  controlKey: ControlKey;

  dataField: string;

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
    this.dataField = opts.dataField;
    this.value = opts.value;
    this.defaultValue = opts.defaultValue;
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
    // z = x * y
    // 当前控件是订阅者，其余控件是发布者。
    this.$form.$dispatcher.subscribe(this.dataField, pubers);
  }

  /**
   * 订阅者接受消息
   * 按照一定的顺序执行业务规则
   */
  public receive(mesg: Message) {
    if (this.displayRule) {
      this.executeDisplayRule(this, mesg);
    }
    if (this.computeRule) {
      this.executeComputeRule(this, mesg);
    }
    if (this.mappingRule) {
      this.executeMappingRule(this, mesg);
    }
    if (this.linkingRule) {
      this.executeLinkingRule(this, mesg);
    }
  }
}

export default BaseControl;
