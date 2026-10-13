import {ZONES,snapshot,createIncident,acknowledge,exportIncidents} from './model.mjs';
const $=id=>document.getElementById(id);
let tick=0,scenario='normal',paused=false,selected=ZONES[0].id,incidents=[],sequence=0;
function node(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
function render(){
 const zones=snapshot(tick,scenario),valid=zones.filter(z=>!z.stale),zone=zones.find(z=>z.id===selected);
 $('attendance').textContent=valid.reduce((s,z)=>s+z.count,0).toLocaleString();
 $('coverage').textContent=`${valid.length}/${zones.length} feeds reporting · simulated`;
 $('risk-count').textContent=zones.filter(z=>['critical','watch'].includes(z.status)).length;
 $('health').textContent=`${valid.length}/${zones.length} online`;
 $('incident-count').textContent=incidents.filter(x=>x.status==='open').length;
 $('clock').textContent=`Simulation tick ${String(tick).padStart(3,'0')} · 3 sec / tick`;
 $('run-state').textContent=paused?'Ⅱ Simulation paused':'● Simulation running';
 $('map-zones').replaceChildren(...zones.map(z=>{const b=node('button',undefined,`map-point ${z.status}`);b.style.left=z.x+'%';b.style.top=z.y+'%';b.append(node('span',z.name),node('strong',z.stale?'Unknown':z.occupancy+'%'));b.setAttribute('aria-label',`${z.name}: ${z.stale?'unknown data':z.occupancy+' percent occupancy'}, ${z.status}`);b.setAttribute('aria-pressed',String(z.id===selected));b.onclick=()=>{selected=z.id;$('incident-zone').value=z.id;render();};return b;}));
 $('zone-name').textContent=zone.name;$('zone-occupancy').textContent=zone.stale?'—':zone.occupancy+'%';$('zone-occupancy').className=zone.status;
 $('zone-detail').textContent=zone.stale?'Feed unavailable. Current occupancy cannot be determined.':`${zone.count.toLocaleString()} observed / ${zone.capacity.toLocaleString()} illustrative capacity`;
 $('zone-meter').style.width=zone.stale?'0%':Math.min(zone.occupancy,100)+'%';$('zone-meter').style.background=`var(--${zone.status})`;
 $('zone-status').textContent=zone.stale?'Unknown · sensor outage':zone.status+' · synthetic signal';$('zone-status').className='status '+zone.status;
 $('zone-guidance').textContent={normal:'Continue monitoring the simulated precinct signal.',watch:'Review the elevated simulated occupancy and record an observation.',critical:'Record the simulated capacity breach and review it with a demo incident.',unknown:'Request a demo feed check. Do not infer safe occupancy from missing data.'}[zone.status];
 renderIncidents();
}
function renderIncidents(){
 if(!incidents.length){const tr=node('tr'),td=node('td','No incidents recorded. Choose Crowd surge to explore the response workflow.','empty');td.colSpan=5;tr.append(td);$('incident-list').replaceChildren(tr);return;}
 $('incident-list').replaceChildren(...incidents.slice().reverse().map(x=>{const tr=node('tr');tr.append(node('td',x.id),node('td',ZONES.find(z=>z.id===x.zone).name),node('td',x.message),node('td',x.status));const td=node('td');if(x.status==='open'){const b=node('button','Acknowledge');b.onclick=()=>{incidents=incidents.map(i=>i.id===x.id?acknowledge(i):i);render();};td.append(b);}else td.textContent='Recorded';tr.append(td);return tr;}));
}
$('incident-zone').replaceChildren(...ZONES.map(z=>{const o=node('option',z.name);o.value=z.id;return o;}));
$('scenario').onchange=e=>{scenario=e.target.value;tick=0;render();};
$('pause').onclick=()=>{paused=!paused;$('pause').textContent=paused?'Resume':'Pause';render();};
$('reset').onclick=()=>{tick=0;scenario='normal';paused=false;incidents=[];sequence=0;selected=ZONES[0].id;$('scenario').value='normal';$('incident-zone').value=selected;$('pause').textContent='Pause';$('form-feedback').textContent='';$('message').value='';render();};
$('inspect-incident').onclick=()=>{$('incident-zone').value=selected;$('message').focus();};
$('incident-form').onsubmit=e=>{e.preventDefault();try{const incident=createIncident($('incident-zone').value,$('message').value,`INC-${String(++sequence).padStart(3,'0')}`,new Date().toISOString());incidents.push(incident);$('message').value='';$('form-feedback').textContent='Demo incident recorded. No external notification sent.';render();}catch(err){$('form-feedback').textContent=err.message;}};
$('export').onclick=()=>{const url=URL.createObjectURL(new Blob([exportIncidents(incidents)],{type:'text/csv;charset=utf-8'}));const a=node('a');a.href=url;a.download='riverfire-demo-incidents.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
const viewCopy={operations:['Event operations','Explore crowd signals, triage incidents, and test response scenarios.'],delivery:['Delivery board','Inspect the original Agile backlog and its recorded coursework statuses.'],evidence:['Project evidence','Follow the decisions and requirements behind the portfolio implementation.']};
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view').forEach(v=>v.hidden=v.id!==b.dataset.view);document.querySelectorAll('[data-view]').forEach(n=>n.classList.toggle('active',n===b));$('page-title').textContent=viewCopy[b.dataset.view][0];$('page-description').textContent=viewCopy[b.dataset.view][1];});
async function loadBoard(){try{const response=await fetch('data/coursework.json');if(!response.ok)throw Error('Evidence unavailable');const data=await response.json();$('delivery-summary').textContent=`${data.epics.length} epics / ${data.user_stories.length} stories / ${data.tasks.length} tasks / ${data.issues.length} recorded issues / ${data.milestones.length} sprints`;
 $('board').replaceChildren(...['New','In progress','Ready for test'].map(status=>{const column=node('div',undefined,'board-column');const stories=data.user_stories.filter(s=>s.status===status);column.append(node('h3',`${status} (${stories.length})`));stories.forEach(s=>{const card=node('article',undefined,'story');card.append(node('small',`US-${s.ref} · ${s.milestone||'Backlog'}`),node('p',s.subject));const details=node('details');details.append(node('summary','View source requirement'),node('p',s.description));card.append(details);column.append(card);});return column;}));
 }catch{$('delivery-summary').textContent='Cannot load evidence. Start the project using npm start and reload.';}}
render();loadBoard();setInterval(()=>{if(!paused){tick++;render();}},3000);
