declare enum RuleType {
  DisplayRule = 0, // 显示规则
  ComputeRule = 1, // 计算规则
  MappingRule = 2, // 充填规则
  LinkingRule = 3, // 关联规则
}

interface Rule {
  pubers: Array<string>;
  suber: string;
  expression: string,
  type: RuleType
}