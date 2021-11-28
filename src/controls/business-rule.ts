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

export class BusinessRule implements IDisplayRule, IComputeRule, IMappingRule, ILinkingRule {
  displayRule: Rule; // 显示规则

  computeRule: Rule; // 计算规则

  mappingRule: Rule; // 充填规则

  linkingRule: Rule; // 关联规则

  protected $form: FormLogic;

  constructor(form: FormLogic) {
    this.$form = form;
  }

  private formatRule(control: ControlOpts) {
    if (control.computeRule) {
      return {
        pubers: control.computeRuleFields,
        suber: control.dataFieled,
        expression: control.computeRule,
        type: RuleType.ComputeRule,
      };
    } else if (control.displayRule) {
      return {
        pubers: control.displayRuleFields,
        suber: control.dataFieled,
        expression: control.displayRule,
        type: RuleType.DisplayRule,
      };
    } else if (control.linkingRule) {
      return {
        pubers: control.linkingRuleFields,
        suber: control.dataFieled,
        expression: control.linkingRule,
        type: RuleType.LinkingRule,
      };
    } else if (control.mappingRule) {
      return {
        pubers: control.mappingRuleFields,
        suber: control.dataFieled,
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
      this.executeDisplayRule(rule);
    }
  }

  public initComputeRule(control: BaseControl, options: ControlOpts) {
    if (options.computeRule) {
      const rule: Rule = this.formatRule(options);
      this.computeRule = rule;
      control.subscribe(rule.pubers);
      this.executeComputeRule(rule);
    }
  }

  public initMappingRule() {}

  public initLinkingRule() {}

  public executeDisplayRule(rule: Rule) {
    this.$form.$calculator.getRuleResult(rule);
  }

  public executeComputeRule(rule: Rule) {
    this.$form.$calculator.getRuleResult(rule);
  }

  public executeMappingRule(rule: Rule) {}

  public executeLinkingRule(rule: Rule) {}
}
