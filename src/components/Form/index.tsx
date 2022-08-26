import Form from "./Form";
import FormItem from "./FormItem";
import { useForm } from "./useForm";

type RefForm = typeof Form;
export interface FormComponent extends RefForm {
  Item: typeof FormItem;
  useForm: typeof useForm;
}
const FormComp: FormComponent = Form as FormComponent;

FormComp.Item = FormItem;

FormComp.useForm = useForm;


export default FormComp;