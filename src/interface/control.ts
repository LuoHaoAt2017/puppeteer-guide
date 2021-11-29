import { ControlKey } from '../enums';

export interface ControlOpts {

  controlKey: ControlKey;

  dataField: string;

  displayName: string;

  visible: boolean;

  editable: boolean;

  valid: boolean;

  value: any;

  defaultValue: any;

  displayRule?: string; // 显示规则

  displayRuleFields?: string[];

  computeRule?: string; // 计算规则

  computeRuleFields?: string[];

  mappingRule?: string; // 充填规则

  mappingRuleFields?: string[];

  linkingRule?: string; // 关联规则

  linkingRuleFields?: string[];

  subscribe: Function;
}
