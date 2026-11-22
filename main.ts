import fs from 'node:fs';
function run(P,I){
const S=new Int32Array(257),C=new Int32Array(64),M=new Int32Array(256),O=[],L={1:2,2:5,48:3,49:3,50:3,51:3};
let sp=0,cp=0,pc=0,st=0,ip=0,a,t;
for(;;){
if(st>=1e6)return[O,10];
if(pc<0||pc>=P.length)return[O,9];
const o=P[pc];
if(L[o]&&pc+L[o]>P.length)return[O,9];
switch(o){
case 0:return[O,0];
case 1:if(sp>255)return[O,3];S[sp++]=(P[pc+1]<<24)>>24;pc+=2;break;
case 2:if(sp>255)return[O,3];S[sp++]=P[pc+1]|P[pc+2]<<8|P[pc+3]<<16|P[pc+4]<<24;pc+=5;break;
case 3:if(sp<1)return[O,2];sp--;pc++;break;
case 4:if(sp<1)return[O,2];if(sp>255)return[O,3];S[sp]=S[sp-1];sp++;pc++;break;
case 5:if(sp<2)return[O,2];t=S[sp-1];S[sp-1]=S[sp-2];S[sp-2]=t;pc++;break;
case 6:if(sp<2)return[O,2];if(sp>255)return[O,3];S[sp]=S[sp-2];sp++;pc++;break;
case 7:if(sp<3)return[O,2];t=S[sp-3];S[sp-3]=S[sp-2];S[sp-2]=S[sp-1];S[sp-1]=t;pc++;break;
case 16:if(sp<2)return[O,2];S[sp-2]+=S[sp-1];sp--;pc++;break;
case 17:if(sp<2)return[O,2];S[sp-2]-=S[sp-1];sp--;pc++;break;
case 18:if(sp<2)return[O,2];S[sp-2]=Math.imul(S[sp-2],S[sp-1]);sp--;pc++;break;
case 19:if(sp<2)return[O,2];if(!S[sp-1])return[O,4];S[sp-2]/=S[sp-1];sp--;pc++;break;
case 20:if(sp<2)return[O,2];if(!S[sp-1])return[O,4];S[sp-2]%=S[sp-1];sp--;pc++;break;
case 21:if(sp<2)return[O,2];if(!S[sp-1])return[O,4];S[sp-2]=(S[sp-2]>>>0)/(S[sp-1]>>>0);sp--;pc++;break;
case 22:if(sp<2)return[O,2];if(!S[sp-1])return[O,4];S[sp-2]=(S[sp-2]>>>0)%(S[sp-1]>>>0);sp--;pc++;break;
case 23:if(sp<1)return[O,2];S[sp-1]=-S[sp-1];pc++;break;
case 24:if(sp<2)return[O,2];S[sp-2]&=S[sp-1];sp--;pc++;break;
case 25:if(sp<2)return[O,2];S[sp-2]|=S[sp-1];sp--;pc++;break;
case 26:if(sp<2)return[O,2];S[sp-2]^=S[sp-1];sp--;pc++;break;
case 27:if(sp<1)return[O,2];S[sp-1]=~S[sp-1];pc++;break;
case 28:if(sp<2)return[O,2];S[sp-2]<<=S[sp-1]&31;sp--;pc++;break;
case 29:if(sp<2)return[O,2];S[sp-2]>>=S[sp-1]&31;sp--;pc++;break;
case 30:if(sp<2)return[O,2];S[sp-2]>>>=S[sp-1]&31;sp--;pc++;break;
case 32:if(sp<2)return[O,2];S[sp-2]=S[sp-2]==S[sp-1]?1:0;sp--;pc++;break;
case 33:if(sp<2)return[O,2];S[sp-2]=S[sp-2]<S[sp-1]?1:0;sp--;pc++;break;
case 34:if(sp<2)return[O,2];S[sp-2]=(S[sp-2]>>>0)<(S[sp-1]>>>0)?1:0;sp--;pc++;break;
case 48:pc+=3+((P[pc+1]|P[pc+2]<<8)<<16>>16);break;
case 49:if(sp<1)return[O,2];a=S[--sp];pc+=a?3:3+((P[pc+1]|P[pc+2]<<8)<<16>>16);break;
case 50:if(sp<1)return[O,2];a=S[--sp];pc+=a?3+((P[pc+1]|P[pc+2]<<8)<<16>>16):3;break;
case 51:if(cp>63)return[O,7];C[cp++]=pc+3;pc=P[pc+1]|P[pc+2]<<8;break;
case 52:if(!cp)return[O,8];pc=C[--cp];break;
case 64:if(sp<1)return[O,2];a=S[sp-1];if(a<0||a>255)return[O,6];S[sp-1]=M[a];pc++;break;
case 65:if(sp<2)return[O,2];a=S[sp-1];if(a<0||a>255)return[O,6];M[a]=S[sp-2];sp-=2;pc++;break;
case 80:if(sp<1)return[O,2];a=S[--sp];t=String(a);if(O.length+t.length>65536)return[O,11];for(let i=0;i<t.length;i++)O.push(t.charCodeAt(i));pc++;break;
case 81:if(sp<1)return[O,2];if(O.length>65535)return[O,11];O.push(S[--sp]&255);pc++;break;
case 82:if(sp>255)return[O,3];S[sp++]=ip<I.length?I[ip++]:-1;pc++;break;
case 83:if(sp<1)return[O,2];return[O,S[--sp]&255];
default:return[O,5];
}
st++;
}
}
for(let n=1;n<=40;n++){
const id='i'+String(n).padStart(3,'0');
const P=fs.readFileSync('/input/'+id+'/program.bin'),I=fs.readFileSync('/input/'+id+'/input.bin');
const r=run(P,I);
fs.mkdirSync('/output/'+id,{recursive:true});
fs.writeFileSync('/output/'+id+'/stdout.bin',Buffer.from(r[0]));
fs.writeFileSync('/output/'+id+'/exit.txt',r[1]+'\n');
}
