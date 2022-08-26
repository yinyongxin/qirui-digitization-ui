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
  constructor() {
  }
  private store: Partial<FormData> = {};
  private initialValues: Partial<FormData> = {};

  public getFields = () => {
    return this.store
  }
  public getFieldValue = (field: FieldKey): FieldValue => {
    return getValueFormObjectByStringDeep(this.store, field as string)
  }
  public getFieldsValue = (fields: FieldKey[]): Partial<FormData> => {
    const fieldsValue: any = {}
    fields.forEach(field => {
      fieldsValue[field as string] = getValueFormObjectByStringDeep(this.store, field as string)
    })
    return fieldsValue
  }

  public setFieldValue = (field: FieldKey, newValue: FieldValue) => {
    return setObjectValueByString(this.store, field as string, newValue)
  }
  public setFieldsValue = (values: DeepPartial<FormData>) => {
    for (const key in values) {
      setObjectValueByString(this.store, key as string, values[key])
    }
  }

  public setStore = (store: Partial<FormData>) => {
    this.store = cloneDeep(store)
  }
  public setInitialValues = (initialValues: Partial<FormData>) => {
    this.initialValues = cloneDeep(initialValues)
  }
}