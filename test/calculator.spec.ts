import FormLogic from "../src/formlogic";
import { ControlType, ControlKey, RuleType } from '../src/enums';

const formContext = {
  F0000001: {
    controlType: ControlType.FormNumber,
    controlKey: ControlKey.FormNumber,
    dataField: 'F0000001',
    visible: true,
    editable: true,
    required: true,
    value: 40,
    defaultValue: null,
    displayName: '速度（千米/小时）',
    computeRuleFields: null,
    computeRule: null,
  },
  F0000002: {
    controlType: ControlType.FormNumber,
    controlKey: ControlKey.FormNumber,
    dataField: 'F0000002',
    visible: true,
    editable: true,
    required: true,
    value: 0.2,
    defaultValue: null,
    displayName: '时间（小时）',
    computeRuleFields: null,
    computeRule: null,
  },
  F0000003: {
    controlType: ControlType.FormNumber,
    controlKey: ControlKey.FormNumber,
    dataField: 'F0000003',
    visible: true,
    editable: true,
    required: true,
    value: null,
    defaultValue: null,
    displayName: '路程（公里）',
    computeRuleFields: ['F0000001', 'F0000002'],
    computeRule: '{F0000001} + ({F0000001} + {F0000002}) * {F0000002} + {F0000001} * {F0000002}',
  },
};

describe('计算规则的解析和运算', () => {

  const form = new FormLogic(formContext);

  test('构建表达式的上下文', () => {
    const rule = {
      pubers: ['F0000001', 'F0000002'],
      suber: 'F0000003',
      expression: '{F0000001} * {F0000002}',
      type: RuleType.ComputeRule
    }
    const context = form.$calculator.getCalcContext(rule);
    expect(context['F0000001']).toBe(40);
    expect(context['F0000002']).toBe(0.2);
    expect(context['F0000003']).toBeNull();
  });

  test('解析表达式：将中缀表达式转换成后缀表达式', () => {
    const table = form.$dispatcher.getTable();
    const suber = 'F0000003';
    const pubers = table.get(suber);
    expect(pubers.length).toBe(2);
    expect(pubers[0]).toBe('F0000001'); // ['F0000002', 'F0000003']
    expect(pubers[1]).toBe('F0000002'); // ['F0000002', 'F0000003']
  });

  test('结合上下文计算后缀表达式', () => {
    const table = form.$dispatcher.getTable();
    const suber = 'F0000003';
    const pubers = table.get(suber);
    expect(pubers.length).toBe(2);
    expect(pubers[0]).toBe('F0000001'); // ['F0000002', 'F0000003']
    expect(pubers[1]).toBe('F0000002'); // ['F0000002', 'F0000003']
  });
});
 