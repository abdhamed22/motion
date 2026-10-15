import subprocess, os
shots=[l.split() for l in open('shots.txt') if l.strip()]
shots=[(float(s),int(b)) for s,b in shots]
shots[-1]=(262.0,18)
for k in (6,11,18): shots[k]=(shots[k][0],shots[k][1]+2)
BEAT=0.5; FPS=24; flash={0,8,17,24}
os.makedirs('clips',exist_ok=True)
lst=[]
# مقدمة سوداء
subprocess.run(["ffmpeg","-nostdin","-v","error","-y","-f","lavfi","-i",f"color=c=black:s=1920x864:r={FPS}:d={4*BEAT}","-c:v","libx264","-crf","12","-pix_fmt","yuv420p","clips/c_intro.mp4"],check=True)
lst.append("clips/c_intro.mp4")
for i,(s,b) in enumerate(shots):
    d=b*BEAT; n=int(round(d*FPS)); out=f"clips/c{i:02d}.mp4"
    z = f"1+0.08*on/{n}" if i%2==0 else f"1.08-0.08*on/{n}"
    vf=(f"crop=1920:864:0:108,zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x864:fps={FPS}")
    if i in flash: vf+=",fade=t=in:st=0:d=0.14:color=white"
    subprocess.run(["ffmpeg","-nostdin","-v","error","-y","-ss",str(s),"-t",str(d),"-i","/tmp/claude-0/flybaghdad.mp4","-vf",vf,"-frames:v",str(n),"-an","-c:v","libx264","-preset","fast","-crf","12","-pix_fmt","yuv420p","-r",str(FPS),out],check=True)
    lst.append(out)
open('list.txt','w').write(''.join(f"file '{p}'\n" for p in lst))
subprocess.run(["ffmpeg","-nostdin","-v","error","-y","-f","concat","-safe","0","-i","list.txt","-c","copy","merged.mp4"],check=True)
total=(4+sum(b for _,b in shots))*BEAT; print('total',total)
fc=("[0:v]eq=contrast=1.07:saturation=1.16:gamma=0.97,colorbalance=rs=-0.05:bs=0.07:bm=0.02:rh=0.06:gh=0.01:bh=-0.04,"
    "vignette=angle=PI/4.5,noise=c0s=7:c0f=t+u,format=yuv420p,pad=1920:1080:0:108:black,setsar=1[vp];"
    "[1:v]format=rgba,fade=t=in:st=0.2:d=0.5:alpha=1,fade=t=out:st=1.5:d=0.4:alpha=1[t1];"
    f"[1:v]format=rgba,fade=t=in:st={total-14*BEAT}:d=1.0:alpha=1[t2];"
    "[vp][t1]overlay=0:0:format=auto[vo1];[vo1][t2]overlay=0:0:format=auto[vo2];"
    f"[vo2]fade=t=out:st={total-0.9}:d=0.9:color=black[vout];"
    f"[2:a]afade=t=in:st=0:d=0.03,afade=t=out:st={total-4}:d=4,loudnorm=I=-14:TP=-1.5:LRA=11[aout]")
subprocess.run(["ffmpeg","-nostdin","-v","error","-y","-i","merged.mp4","-loop","1","-i","title.png","-ss","32.44","-t",str(total),"-i","/tmp/claude-0/flybaghdad.mp4",
  "-filter_complex",fc,"-map","[vout]","-map","[aout]","-t",str(total),"-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p","-c:a","aac","-b:a","192k","-movflags","+faststart","flybaghdad_60.mp4"],check=True)
print('done')
