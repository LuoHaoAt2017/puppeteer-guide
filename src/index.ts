import FormLogic from './formlogic';
import { ControlType, ControlKey } from './enums';

const formContext = {
  F0000001: {
    controlType: ControlType.FormNumber,
    controlKey: ControlKey.FormNumber,
    dataFieled: 'F0000001',
    visible: true,
    editable: true,
    required: true,
    defaultValue: null,
    displayName: '速度（千米/小时）',
    computeRuleFields: null,
    computeRule: null,
  },
  F0000002: {
    controlType: ControlType.FormNumber,
    controlKey: ControlKey.FormNumber,
    dataFieled: 'F0000002',
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
    dataFieled: 'F0000003',
    visible: true,
    editable: true,
    required: true,
    value: null,
    defaultValue: null,
    displayName: '路程（公里）',
    computeRuleFields: ['F0000001', 'F0000002'],
    computeRule: '{F0000001} * {F0000002}',
  },
};

const form = new FormLogic(formContext);

const dispatcher = form.$dispatcher;

console.log('dispatcher', dispatcher);