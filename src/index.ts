import FormLogic from './formlogic';

const formContext = {
  F0000001: {
    controlType: 1,
    controlKey: 'FormNumber',
    dataFieled: 'F0000001',
    visible: true,
    editable: true,
    required: true,
    defaultValue: null,
    displayName: '速度（千米/小时）',
    computationRuleFields: null,
    computationRule: null,
  },
  F0000002: {
    controlType: 1,
    controlKey: 'FormNumber',
    dataFieled: 'F0000002',
    visible: true,
    editable: true,
    required: true,
    value: 0.2,
    defaultValue: null,
    displayName: '时间（小时）',
    computationRuleFields: null,
    computationRule: null,
  },
  F0000003: {
    controlType: 1,
    controlKey: 'FormNumber',
    dataFieled: 'F0000003',
    visible: true,
    editable: true,
    required: true,
    value: null,
    defaultValue: null,
    displayName: '路程（公里）',
    computationRuleFields: ['F0000001', 'F0000002'],
    computationRule: '{F0000001} * {F0000002}',
  },
};

const form = new FormLogic(formContext);