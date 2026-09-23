const fs=require('fs'),f='src/app/page.tsx';let c=fs.readFileSync(f,'utf8');
function fb(s,t){const i=s.indexOf('title: "'+t+'"');if(i<0)return null;let st=i;while(st>0&&s[st]!=='{')st--;let d=0,en=st;for(let j=st;j<s.length;j++){if(s[j]==='{')d++;if(s[j]==='}'){d--;if(d===0){en=j;break;}}}return{s:st,e:en,t:s.substring(st,en+1)};}
function si(b,id){return b.replace(/(id:\s*)\d+/,'$1'+id);}
const cp=fb(c,'Clayton Prints'),cr=fb(c,'Cedar Rush'),eg=fb(c,'Elin Group'),mp=fb(c,'Mediapool');
if(!cp||!cr||!eg||!mp){console.error('Missing block:',{cp:!!cp,cr:!!cr,eg:!!eg,mp:!!mp});process.exit(1);}
const ci=cp.t.match(/id:\s*(\d+)/)[1],ri=cr.t.match(/id:\s*(\d+)/)[1],ei=eg.t.match(/id:\s*(\d+)/)[1],mi=mp.t.match(/id:\s*(\d+)/)[1];
console.log('IDs: CP='+ci+' CR='+ri+' EG='+ei+' MP='+mi);
const rp=[[mp.s,mp.e,si(cr.t,mi)],[eg.s,eg.e,si(cp.t,ei)],[cr.s,cr.e,si(mp.t,ri)],[cp.s,cp.e,si(eg.t,ci)]].sort((a,b)=>b[0]-a[0]);
for(const r of rp)c=c.substring(0,r[0])+r[2]+c.substring(r[1]+1);
console.log('PROJECTS swapped');
const fi=c.indexOf('company: "Freelance"'),di=c.indexOf('company: "Digisplash"',fi);
if(fi>0&&di>0){const es=c.substring(fi,di),esg=fb(es,'Elin Group'),ecp=fb(es,'Clayton Prints'),emp=fb(es,'Mediapool');
if(esg&&ecp){const a1=fi+esg.s,a2=fi+esg.e,b1=fi+ecp.s,b2=fi+ecp.e;const gt=c.substring(a1,a2+1),ct=c.substring(b1,b2+1);
if(a1>b1){c=c.substring(0,a1)+ct+c.substring(a2+1);c=c.substring(0,b1)+gt+c.substring(b2+1);}else{c=c.substring(0,b1)+gt+c.substring(b2+1);c=c.substring(0,a1)+ct+c.substring(a2+1);}
console.log('Experience EG<->CP swapped');
if(emp){const nf=c.indexOf('company: "Freelance"'),nd=c.indexOf('company: "Digisplash"',nf),ns=c.substring(nf,nd),neg=fb(ns,'Elin Group'),nmp=fb(ns,'Mediapool');
if(neg&&nmp){const ee=nf+neg.e,ms=nf+nmp.start,bt=c.substring(ee+1,ms).trim();
if(bt.length>5){const me=nf+nmp.end,mt=c.substring(ms,me+1);c=c.substring(0,ms)+c.substring(me+1);
const rf=c.indexOf('company: "Freelance"'),rd=c.indexOf('company: "Digisplash"',rf),rs=c.substring(rf,rd),reg=fb(rs,'Elin Group');
if(reg){const ae=rf+reg.e,ia=ae+1,nc=c[ae]!==',',ins=(nc?',':'')+'\n      '+mt;c=c.substring(0,ia)+ins+c.substring(ia);console.log('Mediapool moved after EG');}}}}}}
c=c.replace(/\},\s*\n\s*,/g,'},\n');fs.writeFileSync(f,c,'utf8');console.log('Done!');
