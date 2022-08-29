import { type } from "os";
import React, { FormHTMLAttributes, PropsWithChildren, ReactNode } from "react"
import { InputCurrencyType } from "../Input/interface";
import { DesignTypes } from "../typings";
import { Store } from "./StoreClass";

export interface RulesProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > {
  validateTrigger?: string | string[];
  // 校验失败时候以 `error` 或 `warning` 形式展示错误信息。当设置为 `warning` 时不会阻塞表单提交
  validateLevel?: 'error' | 'warning';
  required?: boolean;
  type?: string;
  length?: number;
  // Array
  maxLength?: number;
  minLength?: number;
  includes?: boolean;
  deepEqual?: any;
  empty?: boolean;
  // Number
  min?: number;
  max?: number;
  equal?: number;
  positive?: boolean;
  negative?: boolean;
  // Object
  hasKeys?: string[];
  // String
  match?: RegExp;
  uppercase?: boolean;
  lowercase?: boolean;
  // Boolean
  true?: boolean;
  false?: boolean;
  // custom
  validator?: (value: FieldValue | undefined, callback: (error?: ReactNode) => void) => void;
  message?: ReactNode;
}

export type FormItemBaseType<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > = {
    /**
     * 是否显示标签后的一个冒号
     */
    colon?: boolean | ReactNode
    /**
     * 是否禁用，优先级高于 Form 的 disabled 属性
     */
    disabled?: boolean
    /**
     * 	隐藏表单项. 表单字段值仍然会被获取
     */
    hidden?: boolean
    /**
     * 	标签的文本对齐方式，优先级高于 Form
     * 默认 right
     */
    labelAlign?: 'left' | 'right'
    labelWidth?: number | string
    width?: string | number
    label?: ReactNode | ((validateStatus: FormItemBaseType['validateStatus']) => ReactNode)
    /**
     * 	是否在 required 的时候显示加重的红色星号，设置 position 可选择将星号置于 label 前/后
     * 默认 true
     */
    requiredSymbol?: boolean | { position: 'start' | 'end' }
    /**
     * 	校验状态
     */
    validateStatus?: 'success' | 'warning' | 'error' | 'validating'

    /**
     * 将Form内保存的当前控件对应的值进行一定的转换，再传递给控件
     */
    formatter?: (value: FieldValue) => any
    /**
   * 	表单的布局，有三种布局，水平、垂直、多列。
   * 默认 horizontal
   */
    layout?: 'horizontal' | 'vertical' | 'inline'
    /**
     * 将控件的 value 进行一定的转换再保存到form中。
     */
    name: string,
    message?: ReactNode,
    normalize?: (value: FieldValue, prevValue: FieldValue, allValues: Partial<FormData>) => any,
    children?: ReactNode | ((formData?: Partial<FormData>) => ReactNode) | undefined;
  } & Pick<JSX.IntrinsicElements['input'], 'style' | 'className'>

export type FormItemPropsType = FormItemBaseType

export interface FormBaseType<
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > extends Pick<FormItemBaseType, 'labelAlign' | 'colon' | 'requiredSymbol' | 'disabled' | 'layout'> {
  width?: string | number
  initialValues?: Partial<FormData>
  form?: FormInstance<FormData, FieldValue, FieldKey>
  /**
   * 表单为几列 
   * 默认为 1
   */
  columns?: number,
  /**
   * 	表单项值改变时候触发。和 onValuesChange 不同的是只会在用户操作表单项时触发
   */
  onChange?: (value: FormData, values: FormData, oldValue: FormData) => void
  /**
   * 任意表单项值改变时候触发。第一个参数是被改变表单项的值，第二个参数是所有的表单项值
   */
  onValuesChange?: (value: FormData, values: FormData, oldValue: FormData) => void
}

export interface FormPropsInterface<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > extends FormBaseType<FormData, FieldValue, FieldKey>, Omit<FormHTMLAttributes<any>, 'onChange' | 'onSubmit' | 'value' | 'children'> {
  children?: ReactNode | ((formData?: Partial<FormData>) => ReactNode) | undefined;
}

export type FormContextType<
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > = FormBaseType<FormData, FieldValue, FieldKey> & {
    /**
     * 组件是否再From组件下
     */
    inForm: boolean,
    store?: FormInstance<FormData, FieldValue, FieldKey>
    updataFieldsName: FieldKey[]
  }

export type FormItemContextType = FormItemBaseType & InputCurrencyType & {
  inFormItem: boolean
}

export type FormInstance<
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > = Pick<
    Store<FormData, FieldValue, FieldKey>,
    | 'getFields'
    | 'getOldFields'
    | 'getFieldsValue'
    | 'getFieldValue'
    | 'getOldFieldsValue'
    | 'getOldFieldValue'
    | 'setFieldValue'
    | 'setFieldsValue'
    | 'getOldStore'
    | 'getUpdateFieldsName'
  > & {
    getInnerMethods: () => InnerMethodsReturnType<FormData, FieldValue, FieldKey>;
  };

export type InnerMethodsReturnType<
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  > = Pick<
    Store<FormData, FieldValue, FieldKey>,
    'setStore' |
    'setInitialValues' |
    'innerSetFieldValue' |
    'updateCallBack' |
    'setUpdateCallBack' |
    'getUpdateFieldsName'
  >;