import { forwardRef } from "react";
import Group from "./Group";
import Checkbox from "./Checkbox";

const RefCheckboxComp = forwardRef(Checkbox)

type RefCheckboxCompType = typeof RefCheckboxComp

interface CheckboxInterFace extends RefCheckboxCompType {
  Group: typeof Group
}

const CheckboxComp: CheckboxInterFace = RefCheckboxComp as CheckboxInterFace

CheckboxComp.Group = Group

export default CheckboxComp