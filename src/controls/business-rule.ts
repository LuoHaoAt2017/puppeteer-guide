import FormLogic from '../formlogic';
import { RuleType } from '../enums';
import {
  Rule,
  IDisplayRule,
  IComputeRule,
  IMappingRule,
  ILinkingRule,
} from '../interface/rule';
import BaseControl from './base-control';
import { ControlOpts } from '../interface/control';
import { Message } from '../message';
export class BusinessRule implements IDisplayRule, IComputeRule, IMappingRule, ILinkingRule {
  displayRule: Rule = null; // 显示规则

  computeRule: Rule = null; // 计算规则

  mappingRule: Rule = null; // 充填规则

  linkingRule: Rule = null; // 关联规则

  isSubscriber: Boolean = false; // 是否是一个订阅者

  protected $form: FormLogic;

  constructor(form: FormLogic) {
    this.$form = form;
  }

  private formatRule(control: ControlOpts) {
    if (control.computeRule) {
      return {
        pubers: control.computeRuleFields,
        suber: control.dataField,
        expression: control.computeRule,
        type: RuleType.ComputeRule,
      };
    } else if (control.displayRule) {
      return {
        pubers: control.displayRuleFields,
        suber: control.dataField,
        expression: control.displayRule,
        type: RuleType.DisplayRule,
      };
    } else if (control.linkingRule) {
      return {
        pubers: control.linkingRuleFields,
        suber: control.dataField,
        expression: control.linkingRule,
        type: RuleType.LinkingRule,
      };
    } else if (control.mappingRule) {
      return {
        pubers: control.mappingRuleFields,
        suber: control.dataField,
        expression: control.mappingRule,
        type: RuleType.MappingRule,
      }
    } else {
      return null;
    }
  }

  public initDisplayRule(control: BaseControl, options: ControlOpts) {
    if (control.displayRule) {
      const rule: Rule = this.formatRule(options);
      this.displayRule = rule;
      control.subscribe(rule.pubers);
      this.setSubscriber(rule);
    }
  }

  public initComputeRule(control: BaseControl, options: ControlOpts) {
    if (options.computeRule) {
      const rule: Rule = this.formatRule(options);
      this.computeRule = rule;
      control.subscribe(rule.pubers);
      this.setSubscriber(rule);
    }
  }

  public initMappingRule() {}

  public initLinkingRule() {}

  /**
   * 无论是在什么业务规则场景中
   * 如果当前控件监听了其它控件
   * 那么当前控件就是一个订阅者
   */
  public setSubscriber(rule: Rule) {
    if (rule.pubers.length > 0) {
      this.isSubscriber = true;
    }
  }

  public executeDisplayRule(control: BaseControl, mesg: Message) {
    const value = this.$form.$calculator.getRuleResult(this.displayRule);
    control.value = value;
  }

  public executeComputeRule(control: BaseControl, mesg: Message) {
    this.$form.$calculator.getRuleResult(this.computeRule);
  }

  public executeMappingRule(control: BaseControl, mesg: Message) {}

  public executeLinkingRule(control: BaseControl, mesg: Message) {}
}
