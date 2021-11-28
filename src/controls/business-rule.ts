import FormLogic from '../formlogic';
import BaseControl from './base-control';
import {
  IDisplayRule, 
  IComputeRule,
  IMappingRule,
  ILinkingRule,
} from '../interface/rule';

export class BusinessRule implements IDisplayRule, IComputeRule, IMappingRule, ILinkingRule {

  displayRule: any; // 显示规则

  computeRule: any; // 计算规则

  mappingRule: any; // 充填规则

  linkingRule: any; // 关联规则

  protected control: BaseControl;

  protected $form: FormLogic;

  constructor(control: BaseControl, form: FormLogic) {
    this.control = control;
    this.$form = form;
  }

  public initDisplayRule() {
    const rule = this.control.displayRule;
    if (rule && rule.pubers && rule.suber) {
      this.control.subscribe(rule.pubers);
      this.executeDisplayRule(rule);
    }
  }

  public initComputeRule() {
    const rule = this.control.computeRule;
    if (rule && rule.pubers && rule.suber) {
      this.control.subscribe(rule.pubers);
      this.executeComputeRule(rule);
    }
  }

  public initMappingRule() {
  }

  public initLinkingRule() {
  }

  public executeDisplayRule(rule: Rule) {
    this.$form.$calculator.getRuleResult(rule);
  }
  
  public executeComputeRule(rule: Rule) {
    this.$form.$calculator.getRuleResult(rule);
  }

  public executeMappingRule(rule: Rule) {
  }

  public executeLinkingRule(rule: Rule) {
  }
}