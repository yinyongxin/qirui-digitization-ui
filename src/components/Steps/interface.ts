import React, { PropsWithChildren } from "react";

type StepsType = {
  current?: number;
  status?: "wait" | "process" | "finish" | "error";
  children?: any;
  onChange?: (current: number) => void;
};

export type StepType = {
  length?: number;
  current?: number;
  status?: "wait" | "process" | "finish" | "error";
  title?: string;
  index?: number;
  onClick?: (index: number) => void;
};

export type StepsPropsType = PropsWithChildren<StepsType>;
