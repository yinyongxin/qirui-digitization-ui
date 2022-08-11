declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';


declare module '*.less' {
  const classes: { [className: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}