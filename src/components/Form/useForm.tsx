import { useRef } from "react";
import { DesignTypes } from "../typings";
import { pick } from "../utils/tools";
import { FormInstance, InnerMethodsReturnType } from "./interface";
import { Store } from "./StoreClass";

export function getFormInstance<
  FormData = any,
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
    getInnerMethods: (inner): InnerMethodsReturnType<FormData, FieldValue, FieldKey> => {
      const methods = {} as InnerMethodsReturnType<FormData, FieldValue, FieldKey>;
      const fns: [
        'setStore',
        'setInitialValues',
      ] = [
          'setStore',
          'setInitialValues',
          // 'registerField',
          // 'registerWatcher',
          // 'innerSetInitialValues',
          // 'innerSetInitialValue',
          // 'innerSetCallbacks',
          // 'innerSetFieldValue',
          // 'innerGetStore',
        ]
      if (inner) {
        fns.map((key) => {
          methods[key] = store[key];
        });
      }
      return methods;
    },
  };
}

export function useForm<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends DesignTypes['KeyType'] = keyof FormData
>(
  form?: FormInstance<FormData, FieldValue, FieldKey>,
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