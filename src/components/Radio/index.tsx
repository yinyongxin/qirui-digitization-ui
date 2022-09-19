import { forwardRef } from "react";
import Group from "./Group";
import Radio from "./Radio";

const RefRadioComp = forwardRef(Radio)

type RefRadioCompType = typeof RefRadioComp

interface RadioInterFace extends RefRadioCompType {
  Group: typeof Group
}

const RadioComp: RadioInterFace = RefRadioComp as RadioInterFace

RadioComp.Group = Group

export default RadioComp