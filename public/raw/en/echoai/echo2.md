# ECHO-2 — closure, results and demonstration

**ECHO-2 closed on 9 September 2026.** The agent retains the ECHO-1 core and
adds viability, pattern recognition, stream operation, consolidation,
inheritance of one predisposition and regulation of two internal variables.
CAPACITY-1 justified a 512 LIF + 128 Adaptive-LIF monitor architecture, and
NEURAL-VIZ-1 made it observable in a native GUI.

## Direct demonstration

<figure class="echo2-video">
  <video controls preload="metadata" playsinline poster="/media/echoai/opengraph/echo2.png" aria-label="Demonstration of the native ECHO-2 GUI">
    <source src="/media/echoai/echo2-neural-viz-demo.mp4" type="video/mp4">
    Your browser cannot play MP4. <a href="/media/echoai/echo2-neural-viz-demo.mp4">Download the video</a>.
  </video>
  <figcaption>A direct 2:03 recording made on 9 September 2026. It visits the neural network, 3D drone, 16-byte WSP map and tutorial.</figcaption>
</figure>

This is not a promotional animation. The application runs `Agent.turn()` and
shows its WSP, CAM, T, PATTERN, Q, gate, homeostasis, death, respawn,
inheritance and occasional cortex calls. The drone represents the real pose of
the discrete Body3D body. VTK/OpenGL renders the view; aerodynamics, IMU,
motors and PID do not exist yet.

## Direct comparison with the previous scale

CAPACITY-1 repeated the exam with the 256-LIF architecture used as the ECHO-1
size baseline and with the ECHO-2 extension. This comparison ran inside the
same bench with reserved seeds and frozen memory; it is not a retrospective
score for the ECHO-1 release.

<div class="release-chart" role="img" aria-label="Correct held-out perceptual signatures: 256 LIF baseline, 829 of 2048; ECHO-2 with 512 LIF, 2048 of 2048">
  <h3>Held-out perceptual signatures</h3>
  <div class="release-bar"><span>Baseline · 256 LIF</span><i><b style="width:40.48%"></b></i><strong>829 / 2,048</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · 512 LIF</span><i><b style="width:100%"></b></i><strong>2,048 / 2,048</strong></div>
</div>

The gain is **+1,219 hits**, from 40.48% to 100%. Permuting the signatures
drops the same system to 142/2,048: the result depends on the representation,
not merely on adding rows.

<div class="release-chart" role="img" aria-label="Temporal discrimination: control with 640 static LIF, 0 of 256; ECHO-2 with 512 LIF and 128 Adaptive-LIF, 256 of 256">
  <h3>Temporal discrimination with 640 neurons in total</h3>
  <div class="release-bar"><span>Control · 640 LIF</span><i><b style="width:0%"></b></i><strong>0 / 256</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · 512 LIF + 128 ALIF</span><i><b style="width:100%"></b></i><strong>256 / 256</strong></div>
</div>

The total number of neurons is identical here. Temporal adaptation is the
changed cause: disabling it returns 0/256. The bench selected an eight-tick
memory and adaptation gain 4.

<div class="release-chart" role="img" aria-label="Exercised sequence scale: ECHO-1, 352 turns; ECHO-2 STREAM-1, 4608 frames">
  <h3>Exercised sequence scale</h3>
  <div class="release-bar"><span>ECHO-1 · core</span><i><b style="width:7.64%"></b></i><strong>352 turns</strong></div>
  <div class="release-bar is-echo2"><span>ECHO-2 · STREAM-1</span><i><b style="width:100%"></b></i><strong>4,608 frames</strong></div>
</div>

The third chart shows exercised scale, **not accuracy on the same task**: the
workloads differ. STREAM-1 processed 48 chunks, reached 4,512/4,512 known
predictions in the coherent arm and kept `dynamic_alias=0`.

## What each phase added

| Phase | Closure evidence |
|---|---|
| VITA-1 / FOOD-1 | `H` falls, death ends a life, and food/poison are learned from consequences |
| SURV-1 | medians with retained memory: 28/40/40 turns; with resets: 16/16/16 |
| SHIFT-S | adaptation over frozen Q: +421/+416/+446 turns; negative transfer is also published |
| PATTERN-1 | 32/32 held-out variants versus 0/32 for exact matching; no object id or position |
| STREAM-1 | 4,608 frames, 48 chunks and 4,512/4,512 coherent predictions |
| SLEEP-2 | 8,208 rows become 144 rules; 720/720 in the exam versus T at 0/720, without rewriting CAM/T/Q |
| GEN-1f | inherited budget 8: 360 late errors versus 602 for naïve; 52 wins, 24 losses, 52 ties |
| HEAT-1b | energy + temperature: 20,786 turns versus 7,221 without temperature and 7,186 without Q; load/cool exam 12/12 |
| CAPACITY-1 | 512 LIF: 2,048/2,048; 512 LIF + 128 ALIF: 256/256 temporal |
| NEURAL-VIZ-1 | one Python GUI displays the architecture and every auditable component live |

## What improves over ECHO-1

ECHO-1 closed memory, prediction, objects, discrete physical actions, temporal
patterns and transfer between worlds. ECHO-2 retains them and adds a
consequence across episodes: the body can die, respawn, regulate energy and
temperature, retain experience and transmit only an exploration predisposition
to a descendant whose memories start empty.

The neural extension is not accepted because of the number `640`. It is
accepted because it improves two causal exams and loses when the responsible
feature is removed or permuted.

## Integrity and data

- WSP remains 16 bytes and there is no second thought bus.
- `false_facts=0`, `destroyed=0`, with the cortex disabled in the main benches.
- The neural branch in the GUI is a perceptual monitor; Q remains the causal policy.
- Held-out exams are frozen during scoring.
- Earlier negative GEN-1 and HEAT-1 results remain published as red.
- This closure has no physical robot, camera, LiDAR, IMU, PX4 or AKD1500.

[Download the ECHO-2 summary and SHA-256 fingerprints](/data/echo2-benchmark.json).
That file also includes the MP4 hash.

— R.N.
