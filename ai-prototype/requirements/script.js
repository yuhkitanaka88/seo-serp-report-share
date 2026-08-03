const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const body=document.body;const htmlEl=document.documentElement;const toast=$('#toast');
const storage={get(key,fallback=null){try{return localStorage.getItem(key)??fallback}catch{return fallback}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
function showToast(message){toast.textContent=message;toast.classList.add('is-visible');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('is-visible'),1800)}
function copyHash(id){const url=new URL(location.href);url.hash=id;navigator.clipboard?.writeText(url.toString()).then(()=>showToast('リンクをコピーしました')).catch(()=>showToast(url.toString()))}
$$('[data-copy-link]').forEach(btn=>btn.addEventListener('click',()=>copyHash(btn.dataset.copyLink)));

const progress=$('#readingProgress');const completionBar=$('#completionBar');const completionPercent=$('#completionPercent');
const stageSections=$$('[data-stage]');let savedVisited=[];try{savedVisited=JSON.parse(storage.get('cc-ai-visited','[]'))}catch{}const visited=new Set(savedVisited);
function updateProgress(){const root=document.documentElement;const max=root.scrollHeight-innerHeight;const ratio=max>0?scrollY/max:0;progress.style.width=`${Math.min(100,ratio*100)}%`;const percent=Math.round(visited.size/stageSections.length*100);completionBar.style.width=`${percent}%`;completionPercent.textContent=`${percent}%`;stageSections.forEach(s=>s.classList.toggle('stage-complete',visited.has(s.id)))}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){$$('.toc a').forEach(a=>a.classList.toggle('is-active',a.dataset.nav===e.target.id));if(e.target.dataset.stage){visited.add(e.target.id);storage.set('cc-ai-visited',JSON.stringify([...visited]));updateProgress()}}})},{rootMargin:'-20% 0px -65%',threshold:.01});$$('main section[id]').forEach(s=>observer.observe(s));

const sidebar=$('#sidebar'),backdrop=$('#sidebarBackdrop'),menu=$('#menuButton');
function setMenu(open){sidebar.classList.toggle('is-open',open);backdrop.hidden=!open;menu?.setAttribute('aria-expanded',String(open))}
menu?.addEventListener('click',()=>setMenu(!sidebar.classList.contains('is-open')));backdrop.addEventListener('click',()=>setMenu(false));$$('.toc a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

$('#themeButton').addEventListener('click',()=>{const next=htmlEl.dataset.theme==='dark'?'light':'dark';htmlEl.dataset.theme=next;storage.set('cc-ai-theme',next)});htmlEl.dataset.theme=storage.get('cc-ai-theme','light');
let allOpen=false;$('#expandButton').addEventListener('click',()=>{allOpen=!allOpen;$$('.source-document').forEach(d=>d.open=allOpen);$('#expandButton').textContent=allOpen?'詳細を閉じる':'詳細をすべて開く'});$('#printButton').addEventListener('click',()=>window.print());

const search=$('#documentSearch');
function clearHighlights(){$$('mark.search-hit').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)))}
function applySearch(){clearHighlights();const q=search.value.trim().toLowerCase();$$('.section-card,.hero').forEach(sec=>sec.classList.remove('search-hidden'));if(!q)return;$$('.section-card,.hero').forEach(sec=>{const match=sec.textContent.toLowerCase().includes(q);sec.classList.toggle('search-hidden',!match);if(match&&sec.matches('.appendices'))$$('.source-document').forEach(d=>{if(d.textContent.toLowerCase().includes(q))d.open=true})})}
search.addEventListener('input',applySearch);addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}if(e.key==='Escape'&&document.activeElement===search){search.value='';applySearch();search.blur()}});

$$('[data-option-filter]').forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.optionFilter;$$('[data-option-filter]').forEach(b=>b.classList.toggle('is-active',b===btn));$$('[data-option]').forEach(card=>card.classList.toggle('is-dimmed',f!=='all'&&card.dataset.option!==f));const map={A:2,B:3,C:4};$$('.comparison-table tr').forEach(row=>$$('th,td',row).forEach((cell,i)=>cell.classList.toggle('is-dimmed',f!=='all'&&i>0&&i!==map[f]-1)))}));

const roleFilter=$('#keywordRoleFilter'),priorityFilter=$('#keywordPriorityFilter'),kwSearch=$('#keywordSearch'),kwRows=$$('#keywordTable tbody tr'),kwCount=$('#keywordCount');
function filterKeywords(){const role=roleFilter.value,pri=priorityFilter.value,q=kwSearch.value.trim().toLowerCase();let shown=0;kwRows.forEach(row=>{const ok=(role==='all'||row.dataset.role===role)&&(pri==='all'||row.dataset.priority===pri)&&(!q||row.textContent.toLowerCase().includes(q));row.hidden=!ok;if(ok)shown++});kwCount.textContent=`${shown}件を表示`}
[roleFilter,priorityFilter,kwSearch].forEach(el=>el.addEventListener('input',filterKeywords));filterKeywords();

// Programmatic Scroll Promise対応ブラウザでは完了をawaitし、未対応環境ではscrollend/タイマーでフォールバック。
async function scrollToTarget(target){const rect=target.getBoundingClientRect();const top=Math.max(0,scrollY+rect.top-Math.max(92,(innerHeight-rect.height)/2));let result;try{result=window.scrollTo({top,behavior:'smooth'})}catch{window.scrollTo(0,top)}if(result&&typeof result.then==='function'){const outcome=await result;return !outcome?.interrupted}return await new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;removeEventListener('scrollend',finish);clearTimeout(timer);resolve(true)};addEventListener('scrollend',finish,{once:true});const timer=setTimeout(finish,650)})}
const tourDialog=$('#tourDialog'),tourOverlay=$('#tourOverlay'),tourProgress=$('#tourProgress'),tourTitle=$('#tourTitle'),tourDescription=$('#tourDescription'),tourBack=$('#tourBack'),tourNext=$('#tourNext');
const tourSteps=[
{selector:'#decision',title:'1. 結論',description:'まず推奨案Aと、既存URL維持・ホワイトリスト静的化という確定方針を確認します。'},
{selector:'#current-structure',title:'2. 現行構造',description:'4カテゴリ、3研修形態、実施形式、研修詳細が交差するマトリクスとして理解します。'},
{selector:'#options',title:'3. 3案の比較',description:'案A・B・Cを同じ評価軸で比較し、案B・Cが成立する将来条件も確認します。'},
{selector:'#seo-controls',title:'4. ファセット制御',description:'通常の絞り込みは非インデックスとし、価値が証明された条件だけ静的化します。'},
{selector:'#keywords',title:'5. キーワード所有',description:'総称語・商品語・比較語・属性語を別の受け皿へ割り当て、カニバリを防ぎます。'},
{selector:'#implementation',title:'6. 実装順序',description:'データモデル、AIハブ、既存ページ整理、新規詳細、ファセットの順に実装します。'}
];let tourIndex=0,tourBusy=false;
function clearTour(){$('.tour-highlight')?.classList.remove('tour-highlight')}
async function showTour(index){if(tourBusy)return;tourBusy=true;clearTour();tourIndex=index;const step=tourSteps[index],target=$(step.selector);tourProgress.textContent=`${index+1} / ${tourSteps.length}`;tourTitle.textContent=step.title;tourDescription.textContent=step.description;tourBack.disabled=index===0;tourNext.textContent=index===tourSteps.length-1?'完了':'次へ';const completed=await scrollToTarget(target);if(completed)target.classList.add('tour-highlight');tourBusy=false}
function endTour(){clearTour();tourOverlay.hidden=true;if(tourDialog.open)tourDialog.close()}
$('#startTour').addEventListener('click',()=>{tourOverlay.hidden=false;tourDialog.show();showTour(0)});tourBack.addEventListener('click',()=>tourIndex>0&&showTour(tourIndex-1));tourNext.addEventListener('click',()=>tourIndex===tourSteps.length-1?endTour():showTour(tourIndex+1));$('#tourSkip').addEventListener('click',endTour);$('#tourClose').addEventListener('click',endTour);addEventListener('keydown',e=>{if(!tourDialog.open)return;if(e.key==='Escape')endTour();if(e.key==='ArrowRight')tourNext.click();if(e.key==='ArrowLeft')tourBack.click()});

if(location.hash){const target=$(location.hash);if(target)setTimeout(()=>target.scrollIntoView({block:'start'}),100)}
