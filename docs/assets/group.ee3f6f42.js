import{S as C,a as _,G as w,b as y,P as B,W as k,B as E,M,C as G}from"./three.module.3e5e658d.js";import{d as x,o as z,a as A,b as S,c as H}from"./index.a81b0ca5.js";const L={id:"group"},q=x({name:"group",setup(P){const i=window.innerHeight-205,c=window.innerHeight-60,o=new C;function r(e,l="#ff0000"){const b=new E(...e),h=new M({color:l});return new _(b,h)}const d=r([1,1,1]),g=r([.5,.5,.5],"#0000ff"),m=r([.2,.2,.2],"#00ff00"),t=new w,n=new w;t.add(d),t.add(n),n.add(g),n.add(m),o.add(t),d.position.y=0,n.position.y=2,m.position.y=-1;const f=new y;o.add(f);const s=new B(75,i/c,.1,100);s.position.set(0,0,9),s.lookAt(0,0,0);const a=new k;a.setSize(i,c),a.render(o,s);const p=new G;function u(){t.rotation.z=p.getElapsedTime(),n.rotation.z=p.getElapsedTime(),requestAnimationFrame(u),a.render(o,s)}return u(),z(()=>{const e=document.getElementById("group");e==null||e.append(a.domElement)}),A(()=>{}),(e,l)=>(S(),H("div",L))}});export{q as default};
