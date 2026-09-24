import test from 'node:test';import assert from 'node:assert/strict';
import {analyzeFrame} from '../src/analysis/frame2d.js';
const E=200e6,A=.01,I=8e-5,L=6;
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function beam(left,right,q=-10,tip=[0,0,0]){return {nodes:[{id:'A',x:0,y:0,fix:left},{id:'B',x:L,y:0,fix:right,load:tip}],elements:[{id:'AB',parent:'AB',i:0,j:1,E,A,I,qY:q}]};}
test('Viga simplemente apoyada: reacciones, qL²/8 y 5qL⁴/384EI',()=>{
 const r=analyzeFrame(beam([true,true,false],[false,true,false])),mid=r.elements[0].samples.find(s=>s.x===L/2);
 close(r.reactions[0].Ry,30);close(r.reactions[1].Ry,30);close(mid.M,45);close(mid.uy,-5*10*L**4/(384*E*I));for(const x of r.balance)close(x,0);
});
test('Voladizo puntual: PL³/3EI y PL²/2EI',()=>{const r=analyzeFrame(beam([true,true,true],[false,false,false],0,[0,-20,0]));close(r.displacements[1].uy,-20*L**3/(3*E*I));close(r.displacements[1].rz,-20*L**2/(2*E*I));close(r.reactions[0].M,120);close(r.elements[0].samples.at(-1).M,0);});
test('Voladizo repartido: qL⁴/8EI',()=>{const r=analyzeFrame(beam([true,true,true],[false,false,false]));close(r.displacements[1].uy,-10*L**4/(8*E*I));close(r.reactions[0].Ry,60);close(r.reactions[0].M,180);});
test('Biempotrada: momentos y flecha interior exacta',()=>{const r=analyzeFrame(beam([true,true,true],[true,true,true]));close(r.reactions[0].M,30);close(r.reactions[1].M,-30);close(r.elements[0].samples.find(s=>s.x===3).uy,-10*L**4/(384*E*I));});
test('Barra axial: PL/EA y tracción positiva',()=>{const r=analyzeFrame(beam([true,true,true],[false,false,false],0,[100,0,0]));close(r.displacements[1].ux,100*L/(E*A));close(r.elements[0].samples[0].N,100);});
test('Columna vertical: transformación de flexión transversal',()=>{const m=beam([true,true,true],[false,false,false],0,[20,0,0]);m.nodes[1].x=0;m.nodes[1].y=L;const r=analyzeFrame(m);close(r.displacements[1].ux,20*L**3/(3*E*I));close(r.reactions[0].M,120);});
test('Barra inclinada: invariancia de carga axial',()=>{const m=beam([true,true,true],[false,false,false],0,[60,80,0]);m.nodes[1].x=L*.6;m.nodes[1].y=L*.8;const r=analyzeFrame(m);close(r.displacements[1].ux,100*L/(E*A)*.6);close(r.displacements[1].uy,100*L/(E*A)*.8);});
test('Modelo libre: rechaza mecanismo',()=>assert.throws(()=>analyzeFrame(beam([false,false,false],[false,false,false])),/inestable/));
test('Longitud cero rechazada',()=>{const m=beam([true,true,true],[false,false,false]);m.nodes[1].x=0;assert.throws(()=>analyzeFrame(m),/longitud nula/);});
test('Superposición: duplicar cargas duplica desplazamientos',()=>{const a=analyzeFrame(beam([true,true,true],[false,false,false],-10)),b=analyzeFrame(beam([true,true,true],[false,false,false],-20));close(b.displacements[1].uy,2*a.displacements[1].uy);});
