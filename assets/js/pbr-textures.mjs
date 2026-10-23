/**
 * Compact procedural PBR microtextures: no external JPEG files or network request.
 * Visual addition only. Generated once when the 3D room starts.
 */
export const TEXTURE_SETTINGS = Object.freeze({
  resolution: 256,
  maxAnisotropy: 2,
  styles: Object.freeze(['wood','fabric','plaster','rug'])
});

function clampByte(x) { return Math.max(0,Math.min(255,Math.round(x))); }
function noise(x,y,seed=0) {
  const a=Math.sin(x*127.1+y*311.7+seed*17.13)*43758.5453;
  return a-Math.floor(a);
}
function makeCanvas(kind) {
  const canvas=document.createElement('canvas');
  const n=TEXTURE_SETTINGS.resolution;
  canvas.width=n;canvas.height=n;
  const ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)return null;
  const image=ctx.createImageData(n,n);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const grain=noise(x,y,13),low=noise(Math.floor(x/13),Math.floor(y/13),23);
    let value;
    switch(kind) {
      case 'wood': {
        const bend=Math.sin((y+Math.sin(x*.03)*6+low*7)*.20);
        value=205+11*bend+8*grain+5*low;
        break;
      }
      case 'fabric': {
        const weave=((x%5===0)?-12:0)+((y%5===0)?-10:0);
        value=223+weave+8*grain;
        break;
      }
      case 'rug':
        value=224+14*(low-.5)+10*(grain-.5);
        break;
      default:
        value=237+7*(grain-.5)+5*(low-.5);
    }
    const i=4*(y*n+x);
    image.data[i]=clampByte(value);
    image.data[i+1]=clampByte(value-.4);
    image.data[i+2]=clampByte(value-1.3);
    image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);
  return canvas;
}

export function upgradePbrMaterials(THREE,m) {
  const cache=new Map();
  const get=(kind)=>{
    if(cache.has(kind))return cache.get(kind);
    const canvas=makeCanvas(kind);
    if(!canvas)return null;
    const texture=new THREE.CanvasTexture(canvas);
    texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
    texture.colorSpace=THREE.SRGBColorSpace;
    texture.anisotropy=TEXTURE_SETTINGS.maxAnisotropy;
    texture.minFilter=THREE.LinearMipmapLinearFilter;
    texture.needsUpdate=true;
    cache.set(kind,texture);
    return texture;
  };
  const assign=(keys,kind,repeatX=1,repeatY=1)=>{
    const texture=get(kind);
    if(!texture)return;
    texture.repeat.set(repeatX,repeatY);
    for(const key of keys){
      if(!m[key])continue;
      m[key].map=texture;
      m[key].needsUpdate=true;
    }
  };
  assign(['oak','oakLight','oakDark','floor'],'wood',2,3);
  assign(['chair','cushion','chairSide','leather'],'fabric',1.5,1.5);
  assign(['rug','rugEdge'],'rug',4,4);
  assign(['wall','blueWall'],'plaster',3,3);
  return {count:cache.size,resolution:TEXTURE_SETTINGS.resolution};
}
