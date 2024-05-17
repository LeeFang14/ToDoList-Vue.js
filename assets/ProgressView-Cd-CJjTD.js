import{u as L,o as x,r as h,a as d,c,n as b,t as u,b as f,d as t,F as y,e as P,f as o,w as r,v as _,g as U,h as w,i as A,j as E}from"./index-Dyl6OMUK.js";const M={class:"task-list"},q=["id"],B={class:"task-header"},H=["onClick"],j=t("i",{class:"fa-solid fa-check"},null,-1),z=[j],R={class:"title-dashboard"},Y=["onUpdate:modelValue"],G=["onClick"],J=t("i",{class:"fa-star fa-regular"},null,-1),K=[J],O=["onClick"],Q=t("i",{class:"fa-pen fa-light"},null,-1),W=[Q],X={class:"content-status"},Z=t("i",{class:"fa-solid fa-calendar-days"},null,-1),I={key:0,class:"fa-light fa-file"},tt={key:1,class:"fa-regular fa-comment-dots"},st=["id"],et={class:"task-header"},at=t("div",null,[t("button",{type:"button",class:"check",disabled:""},[t("i",{class:"fa-solid fa-check"})])],-1),it={class:"title-dashboard"},ot=t("button",{type:"button",class:"subscribe",disabled:""},[t("i",{class:"fa-star fa-regular"})],-1),nt=["disabled"],lt=t("i",{class:"fa-pen fa-light"},null,-1),dt=[lt],ct={class:"task-body"},rt={class:"deadline"},ut=t("div",{class:"title-icon"},[t("i",{class:"fa-solid fa-calendar-days"})],-1),ft=t("p",{class:"title"},"Deadline",-1),_t={class:"deadline-content"},ht={class:"file"},pt=t("div",{class:"title-icon"},[t("i",{class:"fa-light fa-file"})],-1),kt=t("p",{class:"title"},"File",-1),mt={class:"file-content"},vt={class:"file-detail"},gt={class:"name"},bt={class:"upload-date"},yt=["for"],wt=t("i",{class:"fa-light fa-plus"},null,-1),St=["id"],Tt={class:"comment"},Dt=t("div",{class:"title-icon"},[t("i",{class:"fa-regular fa-comment-dots"})],-1),Ct=t("p",{class:"title"},"Comment",-1),Vt={class:"comment-content"},Nt=E('<div class="task-footer"><button type="reset"><i class="fa-light fa-xmark"></i><span>Cancel</span></button><button type="submit"><i class="fa-light fa-plus"></i><span>Save</span></button></div>',1),$t={class:"task-counter"},xt={__name:"ProgressView",setup(Ft){const s=L();x(()=>{s.fetchTaskList("progress")});const p=h(!1),k=h(!1),m=h(""),v=h("");function l(n,e){m.value=n,v.value=e,k.value=!0,setTimeout(()=>{S()},3e3)}function S(){k.value=!1,m.value="",v.value=""}async function T(n){await s.fetchTask(n)===200&&(p.value=!0)}async function D(n){try{if(l("修改中...","loading"),await s.updateTask(n,{fields:s.task.fields})===200)l("操作成功","success"),s.fetchTaskList(""),s.task={};else throw new Error("API請求失敗")}catch(e){console.error("API請求失敗:",e),l("操作失敗","error")}}async function C(n){try{l("修改中...","loading");const a={...s.taskList.find(g=>g.id===n)};if(a.fields.doneState=!a.fields.doneState,await s.updateTask(a.id,{fields:a.fields})===200)l("操作成功","success"),s.fetchTaskList(""),s.task={};else throw new Error("API請求失敗")}catch(e){console.error("API請求失敗:",e),l("操作失敗","error")}}async function V(n){try{l("修改中...","loading");const a={...s.taskList.find(g=>g.id===n)};if(a.fields.subscribeState=!a.fields.subscribeState,await s.updateTask(a.id,{fields:a.fields})===200)l("操作成功","success"),s.fetchTaskList(""),s.task={};else throw new Error("API請求失敗")}catch(e){console.error("API請求失敗:",e),l("操作失敗","error")}}function N(){p.value=!1,s.task={}}function $(n){const e=n.target.files;e.length&&(s.task.fields.fileName=e[0].name,s.task.fields.fileUploadDate=F())}function F(){const n=new Date,e=n.getFullYear(),a=(n.getMonth()+1).toString().padStart(2,"0"),i=n.getDate().toString().padStart(2,"0");return`${e}-${a}-${i}`}return(n,e)=>(d(),c(y,null,[k.value?(d(),c("div",{key:0,class:b(["popup",v.value])},u(m.value),3)):f("",!0),t("div",M,[(d(!0),c(y,null,P(o(s).taskList,a=>(d(),c("div",{class:b(["task-item-content",{finished:a.fields.doneState,important:a.fields.subscribeState}]),key:a.id},[o(s).task.id!==a.id?(d(),c("form",{key:0,id:a.id,class:"task-title"},[t("div",B,[t("div",null,[t("button",{type:"button",class:"check",onClick:i=>C(a.id)},z,8,H)]),t("div",null,[t("div",R,[r(t("input",{type:"text",name:"title",placeholder:"Typing something Here...","onUpdate:modelValue":i=>a.fields.title=i,disabled:"",required:""},null,8,Y),[[_,a.fields.title]]),t("button",{type:"button",class:"subscribe",onClick:i=>V(a.id)},K,8,G),t("button",{type:"button",class:"edit",onClick:i=>T(a.id)},W,8,O)]),t("div",X,[t("span",null,[Z,U(u(a.fields.deadlineDate),1)]),a.fields.fileName?(d(),c("i",I)):f("",!0),a.fields.comment?(d(),c("i",tt)):f("",!0)])])])],8,q)):f("",!0),o(s).task.id===a.id?(d(),c("form",{key:1,id:o(s).task.id,class:"task-item editing",onReset:e[5]||(e[5]=w(i=>N(o(s).task.id),["prevent"])),onSubmit:e[6]||(e[6]=w(i=>D(o(s).task.id),["prevent"]))},[t("div",et,[at,t("div",it,[r(t("input",{type:"text",name:"title",placeholder:"Typing something Here...","onUpdate:modelValue":e[0]||(e[0]=i=>o(s).task.fields.title=i),required:""},null,512),[[_,o(s).task.fields.title]]),ot,t("button",{type:"button",class:"edit",disabled:p.value},dt,8,nt)])]),t("div",null,[t("div",ct,[t("div",rt,[ut,t("div",null,[ft,t("div",_t,[r(t("input",{name:"date",type:"date","onUpdate:modelValue":e[1]||(e[1]=i=>o(s).task.fields.deadlineDate=i),required:""},null,512),[[_,o(s).task.fields.deadlineDate]]),r(t("input",{name:"time",type:"time","onUpdate:modelValue":e[2]||(e[2]=i=>o(s).task.fields.deadlineTime=i),required:""},null,512),[[_,o(s).task.fields.deadlineTime]])])])]),t("div",ht,[pt,t("div",null,[kt,t("div",mt,[r(t("div",vt,[t("p",gt,u(o(s).task.fields.fileName),1),t("p",bt," uploaded "+u(o(s).task.fields.fileUploadDate),1)],512),[[A,o(s).task.fields.fileName]]),t("label",{for:`file-${o(s).task.id}`,class:"add-file"},[wt,t("input",{id:`file-${o(s).task.id}`,type:"file",name:"file",onInput:e[3]||(e[3]=i=>$(i))},null,40,St)],8,yt)])])]),t("div",Tt,[Dt,t("div",null,[Ct,t("div",Vt,[r(t("textarea",{name:"comment",rows:"5",placeholder:"Type your memo here…","onUpdate:modelValue":e[4]||(e[4]=i=>o(s).task.fields.comment=i)},null,512),[[_,o(s).task.fields.comment]])])])])]),Nt])],40,st)):f("",!0)],2))),128))]),t("p",$t,u(o(s).taskList.length)+" tasks left",1)],64))}};export{xt as default};
