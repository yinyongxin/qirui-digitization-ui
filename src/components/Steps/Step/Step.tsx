import {
  useContext,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";
import Icon from "../../Icon";
import { GlobalContext } from "../../config/globalContext";
import { getClassNames } from "../../utils/tools";
import { StepType } from "../interface";
const Step: ForwardRefRenderFunction<unknown, StepType> = (props) => {
  const { title, current = 1, index = 0, length = 2, onClick } = props;
  const { MessageConfig, classNamePrefix } = useContext(GlobalContext);

  const prefixCls = `${classNamePrefix}-step`;
  const iconClass = getClassNames([
    `${prefixCls}-icon`,
    current >= index + 1
      ? `${prefixCls}-iconChecked`
      : `${prefixCls}-iconDefault`,
  ]);
  const titleClass = getClassNames([
    `${prefixCls}-title`,
    current >= index + 1
      ? `${prefixCls}-titleChecked`
      : `${prefixCls}-titleDefault`,
  ]);
  const lineClass = getClassNames([
    `${prefixCls}-line`,
    current >= index + 2
      ? `${prefixCls}-lineChecked`
      : `${prefixCls}-lineDefault`,
  ]);

  function onClickStep() {
    onClick && onClick(index + 1);
  }

  return (
    <div className={prefixCls} onClick={onClickStep}>
      <div className={iconClass}>
        {current >= index + 2 ? (
          <Icon status="default" icon="fa-light fa-check" />
        ) : (
          index + 1
        )}
      </div>
      <div className={titleClass}>{title}</div>
      {length != index + 1 && <div className={lineClass}></div>}
    </div>
  );
};
const StepComponent = forwardRef<unknown, StepType>(Step);

StepComponent.displayName = "Step";

export default StepComponent;

export type { StepType };
