import{r as F,G as A,g as v,j as e,T as o}from"./index.95bfb409.js";import{P as B,S}from"./index.2a186bee.js";var r="D:\\project\\components\\qirui-ui-github\\src\\components\\Card\\index.tsx";const l=(f,D)=>{const{classNamePrefix:d}=F.exports.useContext(A),u=`${d}-card`,{status:m,children:h,title:a,headerStyle:p={},footerStyle:E={},bodyStyle:w={},cardStyle:C={},width:t,header:n,footer:s,shadow:N="base",shadowShow:c="never",borders:x=["top","right","bottom","left"]}=f,b={comp:v([`${u}`,`${d}-shadow-time-base`,{[`${d}-shadow-${N}`]:c==="always",[`${d}-shadow-${N}-hover`]:c==="hover"},...x.map(g=>`${u}-border-${g}`)]),status:v([`${u}-status`,`${u}-status-${m}`])},y=()=>{if(n)return e("header",{className:`${u}-header`,children:n},void 0,!1,{fileName:r,lineNumber:54,columnNumber:9},void 0);if(a||m)return e("header",{style:p,className:`${u}-header-default`,children:[e("div",{children:a},void 0,!1,{fileName:r,lineNumber:62,columnNumber:11},void 0),m&&e("div",{className:b.status},void 0,!1,{fileName:r,lineNumber:64,columnNumber:13},void 0)]},void 0,!0,{fileName:r,lineNumber:61,columnNumber:9},void 0)},$=()=>{if(s)return e("footer",{style:E,className:`${u}-footer`,children:s},void 0,!1,{fileName:r,lineNumber:74,columnNumber:9},void 0)};return e("div",{style:{...t?{width:t}:{},...C},className:b.comp,children:[y(),e("main",{style:w,className:`${u}-body`,children:h},void 0,!1,{fileName:r,lineNumber:84,columnNumber:7},void 0),$()]},void 0,!0,{fileName:r,lineNumber:82,columnNumber:5},void 0)};var i="D:\\project\\components\\qirui-ui-github\\src\\doc\\exemples\\cardExemple.tsx";const q=()=>e(B,{pageHeader:{title:"\u5361\u7247 Card",descriptions:"\u5C06\u4FE1\u606F\u5206\u7C7B\u540E\u5206\u6807\u9898\u3001\u8BE6\u60C5\u7B49\u533A\u57DF\u805A\u5408\u5C55\u73B0\uFF0C\u4E00\u822C\u4F5C\u4E3A\u7B80\u6D01\u4ECB\u7ECD\u6216\u8005\u4FE1\u606F\u7684\u5927\u76D8\u548C\u5165\u53E3\u3002",breadcrumb:{list:[{title:"Home"},{title:"CardExemple",path:"/cardExemple"}]}},children:e(S,{children:[e(o,{type:"tooltip",title:"\u57FA\u672C",children:e(l,{children:"CardContent"},void 0,!1,{fileName:i,lineNumber:28,columnNumber:11},void 0)},void 0,!1,{fileName:i,lineNumber:27,columnNumber:9},void 0),e(o,{type:"tooltip",title:"\u5934\u90E8\u6807\u9898",children:e(l,{title:e("div",{children:"title"},void 0,!1,{fileName:i,lineNumber:34,columnNumber:24},void 0),children:"CardContent"},void 0,!1,{fileName:i,lineNumber:34,columnNumber:11},void 0)},void 0,!1,{fileName:i,lineNumber:33,columnNumber:9},void 0),e(o,{type:"tooltip",title:"\u5934\u90E8\u72B6\u6001",children:e("div",{className:"flex gap10",children:[e(l,{width:400,status:"success",children:"status"},void 0,!1,{fileName:i,lineNumber:41,columnNumber:13},void 0),e(l,{width:400,title:"title",status:"error",children:"title & status"},void 0,!1,{fileName:i,lineNumber:44,columnNumber:13},void 0)]},void 0,!0,{fileName:i,lineNumber:40,columnNumber:11},void 0)},void 0,!1,{fileName:i,lineNumber:39,columnNumber:9},void 0),e(o,{type:"tooltip",title:"\u81EA\u5B9A\u4E49\u5934\u90E8\u5E95\u90E8",children:e("div",{className:"flex gap10",children:[e(l,{header:e("div",{children:[e("div",{children:"header1"},void 0,!1,{fileName:i,lineNumber:55,columnNumber:19},void 0),e("div",{children:"header2"},void 0,!1,{fileName:i,lineNumber:56,columnNumber:19},void 0)]},void 0,!0,{fileName:i,lineNumber:54,columnNumber:17},void 0),width:400,status:"success",children:"\u81EA\u5B9A\u4E49\u5934\u90E8\u81EA\u5B9A\u4E49header"},void 0,!1,{fileName:i,lineNumber:52,columnNumber:13},void 0),e(l,{footer:e("div",{children:[e("div",{children:"footer1"},void 0,!1,{fileName:i,lineNumber:67,columnNumber:19},void 0),e("div",{children:"footer2"},void 0,!1,{fileName:i,lineNumber:68,columnNumber:19},void 0)]},void 0,!0,{fileName:i,lineNumber:66,columnNumber:17},void 0),width:400,children:"\u81EA\u5B9A\u4E49\u5E95\u90E8footer"},void 0,!1,{fileName:i,lineNumber:64,columnNumber:13},void 0)]},void 0,!0,{fileName:i,lineNumber:51,columnNumber:11},void 0)},void 0,!1,{fileName:i,lineNumber:50,columnNumber:9},void 0),e(o,{type:"tooltip",title:"\u8FB9\u6846\u914D\u7F6E borders",children:e(l,{width:500,borders:["right"],children:"border={['right']}"},void 0,!1,{fileName:i,lineNumber:79,columnNumber:11},void 0)},void 0,!1,{fileName:i,lineNumber:78,columnNumber:9},void 0),e(o,{type:"tooltip",title:"\u9634\u5F71 shadow",children:[e(l,{width:200,shadow:"base",shadowShow:"always",children:"border={['right']}"},void 0,!1,{fileName:i,lineNumber:84,columnNumber:11},void 0),e("div",{style:{height:30}},void 0,!1,{fileName:i,lineNumber:88,columnNumber:11},void 0),e(l,{width:200,shadow:"base",shadowShow:"hover",children:"border={['right']}"},void 0,!1,{fileName:i,lineNumber:89,columnNumber:11},void 0)]},void 0,!0,{fileName:i,lineNumber:83,columnNumber:9},void 0)]},void 0,!0,{fileName:i,lineNumber:25,columnNumber:7},void 0)},void 0,!1,{fileName:i,lineNumber:7,columnNumber:5},void 0);export{q as default};
