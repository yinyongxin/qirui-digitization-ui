import { useRef } from "react";
import { DesignTypes } from "../typings";
import { pick } from "../utils/tools";
import { FormInstance, InnerMethodsReturnType } from "./interface";
import { Store } from "./StoreClass";

export function getFormInstance<
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
>(): FormInstance<FormData, FieldValue, FieldKey> {
  const store = new Store<FormData, FieldValue, FieldKey>();

  return {
    getFieldsValue: store.getFieldsValue,
    getFieldValue: store.getFieldValue,
    getFields: store.getFields,
    setFieldValue: store.setFieldValue,
    setFieldsValue: store.setFieldsValue,
    getInnerMethods: (): InnerMethodsReturnType<FormData, FieldValue, FieldKey> => {
      return {
        setStore: store.setStore,
        setInitialValues: store.setInitialValues,
        innerSetFieldValue: store.innerSetFieldValue,
        setUpdateCallBack: store.setUpdateCallBack,
        // updateCallBack: store.updateCallBack,
        // updateFieldsName: store.updateFieldsName,
      };
    },
  };
}

export function useForm<
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
>(
  form?: FormInstance<FormData, FieldValue, FieldKey>
): [FormInstance<FormData, FieldValue, FieldKey>] {
  const formRef = useRef<FormInstance<FormData, FieldValue, FieldKey>>();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      formRef.current = getFormInstance<FormData, FieldValue, FieldKey>();
    }
  }
  return [formRef.current];
}