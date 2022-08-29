import { DesignTypes } from "../typings";
import { cloneDeep, getValueFormObjectByStringDeep, setObjectValueByString } from "../utils/tools";

export type DeepPartial<T> = T extends object
  ? {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  : T;
export class Store<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
  >
{
  constructor() { }
  // 存储数据
  private store: Partial<FormData> = {};
  // 存储旧的数据
  private oldStore: Partial<FormData> = {};
  // 初始化数据(原始初始化数据)
  private initialValues: Partial<FormData> = {};
  // 更新字段名
  public updateFieldsName: FieldKey[] | any = []
  // 数据更新时的回调 （可通过setUpdateCallBack设置）
  public updateCallBack = () => { }
  /**
   * 获取所有的字段
   * @returns Partial<FormData>
   */
  public getFields = () => {
    return this.store
  }
  /**
 * 获取所有的旧的字段
 * @returns Partial<FormData>
 */
  public getOldFields = () => {
    return this.oldStore
  }
  /**
   * 根据一个字段名获取值
   * @param field 字段名 name
   * @returns FieldValue
   */
  public getFieldValue = (field: FieldKey): FieldValue => {
    return getValueFormObjectByStringDeep(this.store, field as string)
  }
  /**
   * 根据多个字段名获取多个值
   * @param fields 多个字段名
   * @returns Partial<FormData>
   */
  public getFieldsValue = (fields: FieldKey[]): Partial<FormData> => {
    const fieldsValue: any = {}
    fields.forEach(field => {
      fieldsValue[field as string] = getValueFormObjectByStringDeep(this.store, field as string)
    })
    return fieldsValue
  }
  /**
   * 根据一个字段名获取旧值
   * @param field 字段名 name
   * @returns FieldValue
   */
  public getOldFieldValue = (field: FieldKey): FieldValue => {
    return getValueFormObjectByStringDeep(this.oldStore, field as string)
  }
  /**
 * 根据多个字段名获取多个旧值
 * @param fields 多个字段名
 * @returns Partial<FormData>
 */
  public getOldFieldsValue = (fields: FieldKey[]): Partial<FormData> => {
    const fieldsValue: any = {}
    fields.forEach(field => {
      fieldsValue[field as string] = getValueFormObjectByStringDeep(this.oldStore, field as string)
    })
    return fieldsValue
  }

  /**
   * 更新旧值
   */
  private updateOldStore = () => {
    this.oldStore = cloneDeep(this.store)
  }

  /**
   * 
   * @param field 字段名
   * @param newValue 
   */
  public setFieldValue = (field: FieldKey, newValue: FieldValue) => {
    this.updateOldStore()
    setObjectValueByString(this.store, field as string, newValue)
    this.updateFieldsName = [field]
    this.updateCallBack?.()
  }

  public setFieldsValue = (values: DeepPartial<FormData>) => {
    this.updateOldStore()
    for (const key in values) {
      setObjectValueByString(this.store, key as string, values[key])
    }
    this.updateFieldsName = Object.keys(values) as FieldKey[]
    this.updateCallBack?.()
  }

  public innerSetFieldValue = (field: FieldKey, newValue: FieldValue) => {
    setObjectValueByString(this.store, field as string, newValue)
  }
  public setUpdateCallBack = (updateCallBack: () => void) => {
    this.updateCallBack = updateCallBack
  }

  public getUpdateFieldsName = () => {
    return this.updateFieldsName
  }

  public setStore = (store: Partial<FormData>) => {
    this.store = cloneDeep(store)
  }
  public getStore = () => {
    return this.store
  }
  public getOldStore = () => {
    return this.oldStore
  }

  public setInitialValues = (initialValues: Partial<FormData>) => {
    this.initialValues = cloneDeep(initialValues)
  }
  public getInitialValues = () => {
    return this.initialValues
  }
}