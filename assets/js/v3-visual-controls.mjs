/** Non-XR quality/diagnostic controls. No tracking or storage. */
import {V3_ASSETS,V3_PRESETS,v3RecommendedPreset,normalizedPreset} from './v3-assets.mjs';
import {loadAccentSofa} from './sofa-loader.mjs';

export function mountV3VisualControls(THREE,stage,renderer,scene,architecture){
  const parent=document.createElement('div');
  parent.className='rhxr-v3-quality';
  parent.style.cssText='position:absolute;right:12px;top:52px;max-width:220px;display:grid;gap:5px;z-index:4;padding:9px 10px;background:#142c39ec;border:1px solid #527287;border-radius:12px;color:#f4f7f4;box-shadow:0 6px 20px #0003;font:12px/1.35 system-ui,sans-serif';
  const label=document.createElement('label');
  label.textContent='Qualité du rendu 3D';
  label.setAttribute('for','rhxr-v3-quality');
  const select=document.createElement('select');
  select.id='rhxr-v3-quality';
  select.setAttribute('aria-label','Qualité graphique de la salle 3D');
  select.style.cssText='padding:6px;background:#f8faf7;color:#173547;border-radius:6px;width:100%';
  for(const [key,preset] of Object.entries(V3_PRESETS)){
    const opt=document.createElement('option');opt.value=key;opt.textContent=preset.name;
    select.appendChild(opt);
  }
  const info=document.createElement('small');info.textContent='Réglages locaux, sans sauvegarde';
  info.style.cssText='color:#bcd6dc;font-size:10px';
  const telemetry=document.createElement('small');
  telemetry.setAttribute('aria-live','off');
  telemetry.style.cssText='color:#c4dcbb;font-size:10px';
  const credits=document.createElement('a');
  credits.href=V3_ASSETS.sofa.licenseUrl;
  credits.target='_blank';credits.rel='noopener noreferrer';
  credits.textContent='Canapé 3D : Wayfair / Eric Chadwick — CC BY 4.0';
  credits.title=V3_ASSETS.sofa.credits;
  credits.style.cssText='color:#d9d1bd;font-size:9px;display:none';
  parent.append(label,select,info,telemetry,credits);
  stage.appendChild(parent);

  let current='';
  let sofa=null, sofaPending=null, sampleDt=0, frames=0;
  let glbStatus='non chargé';
  const width=()=>stage.clientWidth, height=()=>stage.clientHeight;

  const refresh=()=>{
    const profile=V3_PRESETS[current];
    const physicalPixelRatio=window.devicePixelRatio||1;
    if(!renderer.xr.isPresenting){
      renderer.setPixelRatio(Math.min(physicalPixelRatio,profile.pixelRatio));
      if(width()>0&&height()>0)renderer.setSize(width(),height());
    }
    architecture.setDetailEnabled(profile.architecture);
    if(sofa?.root)sofa.root.visible=profile.sofa;
    if(profile.sofa&&!sofa&&!sofaPending){
      sofaPending=loadAccentSofa(THREE,scene,{
        enabled:true,
        onStatus(status){glbStatus=status;}
      }).then(result=>{
        sofa=result.status==='ready'?result:null;
        if(sofa?.root)sofa.root.visible=V3_PRESETS[current].sofa;
        credits.style.display=sofa?'block':'none';
        info.textContent=result.status==='ready'?'Mobilier GLB détaillé chargé': 'Décor de secours préservé';
        return result;
      }).finally(()=>{sofaPending=null;});
    }
  };

  function setPreset(next){
    current=normalizedPreset(next,navigator.userAgent);
    select.value=current;
    refresh();
  }
  select.addEventListener('change',()=>setPreset(select.value));
  setPreset(v3RecommendedPreset(navigator.userAgent));

  return {
    getPreset:()=>current,
    onFrame(dt){
      if(!Number.isFinite(dt))return;
      frames++;sampleDt+=Math.min(.2,dt);
      if(sampleDt>=2){
        telemetry.textContent='≈ '+Math.round(frames/sampleDt)+' im/s · '+renderer.info.render.calls+' appels GPU · '+current;
        frames=0;sampleDt=0;
      }
    },
    getAssetStatus:()=>glbStatus
  };
}
