import{c as u}from"./createLucideIcon-DPzUv13Z.js";import{r as s}from"./app-CR-dwGmk.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]],g=u("Table",l),n="view-mode",f=(t,e,i=365)=>{if(typeof document>"u")return;const a=i*24*60*60;document.cookie=`${t}=${e};path=/;max-age=${a};SameSite=Lax`},c=t=>{if(typeof window>"u")return t;const e=localStorage.getItem(n);return e==="grid"||e==="table"?e:t};function h(t="table"){const[e,i]=s.useState(()=>c(t)),a=s.useCallback(o=>{i(o),typeof window<"u"&&localStorage.setItem(n,o),f(n,o)},[]),d=s.useCallback(()=>{a(e==="table"?"grid":"table")},[e,a]);s.useEffect(()=>{const o=c(t);o!==e&&i(o)},[t]);const r=s.useMemo(()=>({isTable:e==="table",isGrid:e==="grid"}),[e]);return{mode:e,setMode:a,toggle:d,...r}}export{g as T,h as u};
