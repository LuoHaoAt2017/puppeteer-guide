
declare enum FormStatus {
  Readonly = 0,
  Write = 1
}

declare interface FormConfig {
  display_name: string; // 表单名称
  schema_code: string; // 表单编码
  readonly: boolean; // 表单状态
  controls: Array<FormControl> // 表单控件
}