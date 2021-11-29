import { RuleType } from '../enums';
import { Message } from '../message';
import BaseControl from '../controls/base-control';
import { ControlOpts } from '../interface/control';
export interface IDisplayRule {
  displayRule: Rule; // 显示规则

  initDisplayRule(control: BaseControl, options: ControlOpts): void;

  executeDisplayRule(control: BaseControl, mesg: Message): void;
}

export interface IComputeRule {
  computeRule: Rule; // 计算规则

  initComputeRule(control: BaseControl, options: ControlOpts): void;

  executeComputeRule(control: BaseControl, mesg: Message): void;
}

export interface IMappingRule {
  mappingRule: Rule; // 充填规则

  initMappingRule(control: BaseControl, options: ControlOpts): void;

  executeMappingRule(control: BaseControl, mesg: Message): void;
}

export interface ILinkingRule {
  linkingRule: Rule; // 关联规则

  initLinkingRule(control: BaseControl, options: ControlOpts): void;

  executeLinkingRule(control: BaseControl, mesg: Message): void;
}

export interface Rule {
  pubers: Array<string>;
  suber: string;
  expression: string,
  type: RuleType
}
