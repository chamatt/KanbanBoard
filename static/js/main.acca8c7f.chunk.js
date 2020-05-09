(this["webpackJsonpreact-drag-n-drop"]=this["webpackJsonpreact-drag-n-drop"]||[]).push([[0],{51:function(e,t,n){e.exports=n(70)},69:function(e,t,n){},70:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(20),i=n.n(o),c=n(26),l=n(40),d=n(37),s=n(18),u={tasks:{"task-1":{id:"task-1",content:"Wash the dishes",priority:"low"},"task-2":{id:"task-2",content:"Procratinate",priority:"high"},"task-3":{id:"task-3",content:"Do some actual work",priority:"medium"},"task-4":{id:"task-4",content:"Sleep, please! \ud83d\ude22\ud83d\ude22\ud83d\ude22\ud83d\ude22",priority:"low"},"task-5":{id:"task-5",content:"Stay awake at all costs!",priority:"high"}},columns:{"column-1":{id:"column-1",title:"To Do",taskIds:["task-1","task-2"]},"column-2":{id:"column-2",title:"Doing",taskIds:["task-3","task-4","task-5"]}},columnOrder:["column-1","column-2"]},p=n(24),m=n(16),b=n(17);function f(){var e=Object(m.a)(["\n  padding: 8px;\n"]);return f=function(){return e},e}function g(){var e=Object(m.a)(["\n  padding: 8px;\n"]);return g=function(){return e},e}function x(){var e=Object(m.a)(["\n  margin: 8px;\n  border: 1px solid lightgrey;\n  border-radius: 2px;\n  min-width: 300px;\n  background-color: #f9f9f9;\n"]);return x=function(){return e},e}b.a.div(x()),b.a.h3(g()),b.a.div(f());var k=n(76);function v(){var e=Object(m.a)(["\n  /* background-color: ","; */\n  /* width: 30px; */\n  /* border-radius: 5px;\n  padding: 5px;\n  font-size: 10px;\n  color: white; */\n  /* display: inline-flex; */\n  /* justify-content: center;\n  align-items: center;\n  align-self: flex-end; */\n"]);return v=function(){return e},e}function E(){var e=Object(m.a)(["\n  border: 1px solid lightgrey;\n  border-radius: 2px;\n  padding: 8px;\n  margin-bottom: 8px;\n  background-color: white;\n  display: flex;\n  flex-direction: column;\n"]);return E=function(){return e},e}b.a.div(E());var j=function(e){return{high:"red",medium:"blue",low:"green"}[e]||"blue"},h=Object(b.a)(k.a).attrs((function(e){return{variantColor:j(e.priority),rounded:"md",fontSize:"10px",p:"5px",variant:"subtle"}}))(v(),(function(e){return j(e.priority)})),O=n(23),y=n(72),I=n(73);var w=function(e){var t=e.task,n=e.index,a=Object(O.b)(),o=a.colorMode,i=(a.toggleColorMode,{light:"whiteAlpha.900",dark:"gray.800"});return r.a.createElement(p.b,{draggableId:t.id,index:n},(function(e){var n=e.draggableProps,a=e.dragHandleProps,c=e.innerRef;return r.a.createElement(y.a,Object.assign({bg:i[o],direction:"column",p:2,mb:2,boxShadow:"md",rounded:!0},n,a,{ref:c}),r.a.createElement(I.a,{fontSize:"sm"},null===t||void 0===t?void 0:t.content),r.a.createElement(y.a,{justify:"flex-end"},r.a.createElement(h,{priority:t.priority},t.priority)))}))},S=n(74),z=n(50),M=n(4);var W=function(e){var t=e.column,n=e.tasks;return r.a.createElement(M.a,{minH:"60vh",minW:200,w:{base:"100%",sm:"50%",md:300},p:3},t?r.a.createElement(y.a,{mb:4,px:2,justify:"space-between",align:"center"},r.a.createElement(I.a,{fontSize:"md",fontWeight:"bold"},t.title),r.a.createElement(S.a,{bg:"transparent",size:"sm"},r.a.createElement(z.a,{name:"add"}))):r.a.createElement(y.a,{mb:4,px:2,justify:"space-between",align:"center"},r.a.createElement(S.a,{leftIcon:"add",size:"sm",bg:"transparent"},"Add a group")),t&&n&&r.a.createElement(p.c,{droppableId:t.id},(function(e){var t=e.droppableProps,a=e.innerRef,o=e.placeholder;return r.a.createElement(M.a,Object.assign({ref:a},t),null===n||void 0===n?void 0:n.map((function(e,t){return r.a.createElement(w,{key:e.id,task:e,index:t})})),o)})))},C=n(75),D=n(25),P=n(77);var A=function(){var e=Object(O.b)(),t=e.colorMode,n=e.toggleColorMode;return r.a.createElement(y.a,{w:"100%",h:50,justify:"space-between",align:"center",px:8,py:4,borderWidth:"1px"},r.a.createElement(M.a,{flex:2},r.a.createElement(I.a,{fontWeight:"bold"},"Kaban Board")),r.a.createElement(y.a,{flex:1,justify:"flex-end"},r.a.createElement(S.a,{size:"sm",onClick:n},r.a.createElement(z.a,{name:"light"===t?"moon":"sun"}))))},B=["360px","768px","1024px","1440px"];B.sm=B[0],B.md=B[1],B.lg=B[2],B.xl=B[3];var H=Object(s.a)({},C.a,{breakpoints:B});var J=function(){var e=Object(a.useState)(u.tasks),t=Object(d.a)(e,2),n=t[0],o=(t[1],Object(a.useState)(u.columns)),i=Object(d.a)(o,2),m=i[0],b=i[1],f=Object(a.useState)(u.columnOrder),g=Object(d.a)(f,2),x=g[0];return g[1],r.a.createElement(D.a,{theme:H},r.a.createElement(O.a,null,r.a.createElement(P.a,null),r.a.createElement(y.a,{h:"100%",direction:"column"},r.a.createElement(A,null),r.a.createElement(y.a,{flex:1,mt:15,wrap:!1,overflowX:"scroll"},r.a.createElement(p.a,{onDragEnd:function(e){var t=e.destination,n=e.source,a=e.draggableId;if(t&&(t.droppableId!==n.droppableId||t.index!==n.index)){var r,o=m[n.droppableId],i=m[t.droppableId],d=Object(l.a)(o.taskIds),u=Object(l.a)(i.taskIds);if(t.droppableId===n.droppableId)d.splice(n.index,1),d.splice(t.index,0,a),b(Object(s.a)({},m,Object(c.a)({},n.droppableId,Object(s.a)({},o,{taskIds:d}))));else d.splice(n.index,1),u.splice(t.index,0,a),b(Object(s.a)({},m,(r={},Object(c.a)(r,n.droppableId,Object(s.a)({},o,{taskIds:d})),Object(c.a)(r,t.droppableId,Object(s.a)({},i,{taskIds:u})),r)))}}},x.map((function(e){var t=null===m||void 0===m?void 0:m[e],a=t.taskIds.map((function(e){return n[e]}));return r.a.createElement(W,{key:t.id,column:t,tasks:a})})),r.a.createElement(W,{key:"new-column"}))))))};n(69);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.acca8c7f.chunk.js.map