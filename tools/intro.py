import numpy as np, soundfile as sf
sr=24000; dur=4.0; t=np.arange(int(sr*dur))/sr
def env(t,a,d):  # soft attack, exponential decay
    return np.minimum(t/a,1)*np.exp(-t/d)
out=np.zeros_like(t)
# warm pad: Fmaj9 voicing, slow swell and fade
for f,g in [(174.61,.18),(261.63,.14),(329.63,.10),(392.0,.08),(440.0,.06)]:
    pad=np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t+0.5)
    out+=g*pad*np.minimum(t/1.2,1)*np.clip((dur-t)/1.8,0,1)
# two soft bell notes (C6 then G5), gentle
for start,f in [(0.35,1046.5),(0.95,783.99),(1.55,1318.5)]:
    tt=np.clip(t-start,0,None); m=(t>=start)
    bell=(np.sin(2*np.pi*f*tt)+0.25*np.sin(2*np.pi*2.76*f*tt))*env(tt,0.008,0.9)
    out+=0.10*bell*m
out=np.tanh(out*1.2)
# simple reverb-ish echo
for d,g in [(0.11,.25),(0.23,.15),(0.37,.08)]:
    n=int(d*sr); out[n:]+=g*out[:-n]
out=out/np.max(np.abs(out))*0.35
sf.write("intro.wav",out,sr)
