export const ZONES = [
 {id:'south-bank',name:'South Bank',capacity:6000,base:4200,x:38,y:68},
 {id:'kangaroo-point',name:'Kangaroo Point',capacity:3500,base:2300,x:72,y:62},
 {id:'city-reach',name:'City Reach',capacity:4000,base:2600,x:49,y:29},
 {id:'howard-smith',name:'Howard Smith Wharves',capacity:2500,base:1700,x:79,y:24}
];
export function classify(count,capacity,stale=false){
 if(!Number.isFinite(count)||count<0||!Number.isFinite(capacity)||capacity<=0) throw new RangeError('Invalid occupancy data');
 if(stale) return 'unknown';
 return count/capacity>=.9?'critical':count/capacity>=.75?'watch':'normal';
}
export function snapshot(tick=0,scenario='normal'){
 if(!['normal','surge','outage'].includes(scenario)||!Number.isInteger(tick)||tick<0) throw new RangeError('Invalid scenario or tick');
 return ZONES.map((z,i)=>{
  const stale=scenario==='outage'&&i===1;
  const count=Math.max(0,z.base+Math.round(Math.sin(tick/3+i)*z.capacity*.055)+(scenario==='surge'&&i===0?1700:0));
  return {...z,count,stale,status:classify(count,z.capacity,stale),occupancy:Math.round(count/z.capacity*100)};
 });
}
export function createIncident(zone,message,id,time){
 if(!ZONES.some(z=>z.id===zone)) throw new RangeError('Unknown zone');
 if(typeof message!=='string'||message.trim().length<5||message.trim().length>240) throw new RangeError('Message must be 5–240 characters');
 return {id,zone,message:message.trim(),time,status:'open'};
}
export function acknowledge(incident){return {...incident,status:'acknowledged'};}
export function csvCell(value){const s=String(value);const safe=/^[=+\-@\t\r]/.test(s)?"'"+s:s;return '"'+safe.replaceAll('"','""')+'"';}
export function exportIncidents(incidents){return ['id,zone,message,time,status',...incidents.map(x=>['id','zone','message','time','status'].map(k=>csvCell(x[k])).join(','))].join('\r\n');}
