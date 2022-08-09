import React, {
  FC,
  useContext,
  useState,
  ReactElement,
  forwardRef,
  JSXElementConstructor,
  ForwardRefRenderFunction,
} from "react";
import { GlobalContext } from "../config/globalContext";
import Step from "./Step/Step";
import { getClassNames } from "../utils/tools";
import { StepsPropsType } from "./interface";

const Steps: ForwardRefRenderFunction<unknown, StepsPropsType> = (props) => {
  const { MessageConfig, classNamePrefix } = useContext(GlobalContext);
  const prefixCls = `${classNamePrefix}-steps`;
  const { current = 1, children, onChange } = props;

  const child = React.Children.map(children, (item: ReactElement, index) => {
    const childProps = {
      current,
      ...item.props,
      index,
      length: React.Children.toArray(children).length,
      onClick: onChange,
    };
    // 使用 元素和新的 props 克隆一个新的 react 元素
    return React.cloneElement(item, childProps);
  });
  return <div className={prefixCls}>{child}</div>;
};

const ForwardRefSteps = forwardRef<unknown, StepsPropsType>(Steps);

const StepsComponent = ForwardRefSteps as typeof ForwardRefSteps & {
  Step: typeof Step;
};

StepsComponent.displayName = "Steps";
StepsComponent.Step = Step;
export default StepsComponent;
