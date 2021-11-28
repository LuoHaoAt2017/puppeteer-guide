import { RuleType } from '../enums';
import BaseControl from '../controls/base-control';
import { ControlOpts } from '../interface/control';
export interface IDisplayRule {
  displayRule: Rule; // 显示规则

  initDisplayRule(control: BaseControl, options: ControlOpts): void;

  executeDisplayRule(rule: Rule): void;
}

export interface IComputeRule {
  computeRule: Rule; // 计算规则

  initComputeRule(control: BaseControl, options: ControlOpts): void;

  executeComputeRule(rule: Rule): void;
}

export interface IMappingRule {
  mappingRule: Rule; // 充填规则

  initMappingRule(): void;

  executeMappingRule(rule: Rule): void;
}

export interface ILinkingRule {
  linkingRule: Rule; // 关联规则

  initLinkingRule(): void;

  executeLinkingRule(rule: Rule): void;
}

export interface Rule {
  pubers: Array<string>;
  suber: string;
  expression: string,
  type: RuleType
}
