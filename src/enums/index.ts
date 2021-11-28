export enum ControlType {
  FormTextbox = 0, // 文本控件
  FormNumber = 1, // 数字控件
  FormDate = 2, // 日期控件
  FormRadio = 3, // 单选控件
  FormCheckbox = 4, // 多选控件
  FormSwitch = 5, // 切换控件
  FormSelect = 6, // 下拉选择控件
  FormImage = 7, // 图片控件
  FormAttach = 8, // 附件控件
  FormAddress = 9, // 地址控件
  FormRelevance = 10, // 关联控件
  FormUser = 11, // 人员控件
  FormDept = 12, // 部门控件
  FormGrid = 13, // 子表控件
}

export enum ControlKey {
  FormTextbox = 'FormTextbox', // 文本控件
  FormNumber = 'FormNumber', // 数字控件
  FormDate = 'FormDate', // 日期控件
  FormRadio = 'FormRadio', // 单选控件
  FormCheckbox = 'FormCheckbox', // 多选控件
  FormSwitch = 'FormSwitch', // 切换控件
  FormSelect = 'FormSelect', // 下拉选择控件
  FormImage = 'FormImage', // 图片控件
  FormAttach = 'FormAttach', // 附件控件
  FormAddress = 'FormAddress', // 地址控件
  FormRelevance = 'FormRelevance', // 关联控件
  FormUser = 'FormUser', // 人员控件
  FormDept = 'FormDept', // 部门控件
  FormGrid = 'FormGrid', // 子表控件
}

export enum RuleType {
  DisplayRule = 0, // 显示规则
  ComputeRule = 1, // 计算规则
  MappingRule = 2, // 充填规则
  LinkingRule = 3, // 关联规则
}
