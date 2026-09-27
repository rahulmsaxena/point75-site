import json, sys, re, numpy as np, soundfile as sf, subprocess
from kokoro_onnx import Kokoro
from speakprep import prep
k = Kokoro("kokoro-v1.0.onnx", "voices-v1.0.bin")
intro, sr = sf.read("intro.wav")
texts = json.load(open("texts.json"))
only = sys.argv[1:] 
def say(t):
    s, r = k.create(prep(t), voice="af_heart", speed=0.95, lang="en-us"); assert r == sr; return s
def sil(x): return np.zeros(int(sr*x))
for path, d in texts.items():
    slug = path.strip('/')
    if only and slug not in only: continue
    segs = [say(d["title"]), sil(0.9)]
    for p in d["parts"]:
        heading = len(p) < 70 and not p.rstrip().endswith(('.', '?', '!'))
        if heading: segs += [sil(0.4), say(p), sil(0.7)]
        else: segs += [say(p), sil(0.55)]
    voice = np.concatenate(segs)
    start = int(2.6*sr); out = np.zeros(start+len(voice)+sr)
    out[:len(intro)] += intro; out[start:start+len(voice)] += voice*0.9
    out /= max(1, np.max(np.abs(out))/0.95)
    sf.write(f"{slug}.wav", out, sr)
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",f"{slug}.wav","-ac","1","-codec:a","libmp3lame","-b:a","64k",f"out/{slug}.mp3"], check=True)
    print(slug, round(len(out)/sr/60,1), "min", flush=True)
