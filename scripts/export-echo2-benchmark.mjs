import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const lab = process.env.ECHOAI_LAB_DIR
  ? path.resolve(process.env.ECHOAI_LAB_DIR)
  : path.resolve(root, "..", "echoai", "lab");
const video = process.env.ECHOAI_VIDEO
  ? path.resolve(process.env.ECHOAI_VIDEO)
  : path.join(root, "public", "media", "echoai", "echo2-neural-viz-demo.mp4");

const reportNames = [
  "echo2_report.json",
  "echo2_pattern1_report.json",
  "echo2_shifts_report.json",
  "echo2_stream1_report.json",
  "echo2_sleep2_report.json",
  "echo2_gen1f_report.json",
  "echo2_heat1b_report.json",
  "echo2_capacity1_report.json",
];

const read = (name) => JSON.parse(fs.readFileSync(path.join(lab, name), "utf8"));
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const reports = reportNames.map(read);
const [base, pattern, shifts, stream, sleep, gen, heat, capacityReport] = reports;
const capacity = capacityReport.scientific;

for (let index = 0; index < reportNames.length; index += 1) {
  if (reports[index].green !== true) throw new Error(`${reportNames[index]} is not green`);
}
if (capacity.green !== true || capacity.wsp_bytes !== 16) {
  throw new Error("CAPACITY-1 scientific result or WSP lock is not green");
}
if (pattern.cortex_calls !== 0 || stream.cortex_calls !== 0 || sleep.cortex_calls !== 0
    || capacity.cortex_calls !== 0 || capacity.false_facts !== 0 || capacity.destroyed !== 0) {
  throw new Error("ECHO-2 fast-path integrity locks are not green");
}

const echo1 = JSON.parse(fs.readFileSync(path.join(root, "public", "data", "echo1-benchmark.json"), "utf8"));
const sources = reportNames.map((name) => ({
  file: `echoai/lab/${name}`,
  sha256: sha256(path.join(lab, name)),
}));

const output = {
  schema: "rxlabs.echo2-benchmark.v1",
  release: "ECHO-2",
  status: "closed",
  date: "2026-09-09",
  benchmarkKind: "causal acceptance benches with frozen held-out exams",
  sources,
  video: {
    file: "public/media/echoai/echo2-neural-viz-demo.mp4",
    sha256: sha256(video),
    durationSeconds: 123.466667,
    width: 1280,
    height: 720,
    videoCodec: "H.264",
    audioCodec: "AAC",
  },
  comparison: {
    note: "Capacity comparisons were run inside CAPACITY-1; 256 LIF is the ECHO-1-size baseline, not a retroactive ECHO-1 release score.",
    perception: {
      echo1SizeBaseline: { neurons: 256, hits: capacity.perception.lif256.hits, total: capacity.perception.lif256.total },
      echo2: { neurons: 512, hits: capacity.perception.lif512.hits, total: capacity.perception.lif512.total },
    },
    temporal: {
      staticControl: { neurons: 640, hits: capacity.temporal.lif512_lif128.hits, total: capacity.temporal.lif512_lif128.total },
      echo2: { lif: 512, adaptiveLif: 128, hits: capacity.temporal.lif512_alif128.hits, total: capacity.temporal.lif512_alif128.total },
    },
    streamScale: {
      note: "Different workloads; this comparison shows exercised sequence scale only.",
      echo1Turns: echo1.core.turns,
      echo2Frames: stream.stream_frames,
    },
  },
  survival: {
    seeds: base.survival.map((row) => ({ seed: row.seed, retainedMedian: row.persist.median, resetMedian: row.reset.median })),
    inertRetainedMedian: base.inert.persist.median,
    inertResetMedian: base.inert.reset.median,
  },
  pattern: {
    representation: pattern.representation,
    trainSamples: pattern.train_samples,
    heldOutHits: pattern.family_hits,
    heldOutTotal: pattern.exam_samples,
    exactBaselineHits: pattern.exact_hits,
    families: pattern.families,
    objectIdUsed: pattern.object_id_used_by_learner,
  },
  shift: {
    seeds: shifts.rows.map((row) => ({ seed: row.seed, gainVsFrozen: row.gain_vs_frozen, gainVsScratch: row.gain_vs_scratch })),
  },
  stream: {
    frames: stream.stream_frames,
    chunks: stream.chunks,
    coherentKnown: stream.coherent.prediction_known,
    coherentHits: stream.coherent.prediction_hits,
    dynamicAlias: stream.coherent.dynamic_alias,
  },
  sleep: {
    sourceRows: sleep.covered_rows,
    rules: sleep.rules,
    heldOutHits: sleep.exam.rule_hits,
    heldOutTotal: sleep.exam.points,
    tBaselineHits: sleep.exam.t_hits,
    sourceUnchanged: sleep.source_unchanged,
  },
  inheritance: {
    evidenceBudget: gen.transmitted_budget,
    inheritedLateErrors: gen.headline.inherited_late_errors,
    naiveLateErrors: gen.headline.naive_late_errors,
    strictWins: gen.headline.strict_wins,
    strictLosses: gen.headline.strict_losses,
    ties: gen.headline.ties,
    reached: gen.headline.reached,
  },
  heat: {
    jointTurns: heat.headline.total_turns.joint,
    temperatureBlindTurns: heat.headline.total_turns.blind,
    noQTurns: heat.headline.total_turns.no_q,
    resetTurns: heat.headline.total_turns.reset,
    loadCoolExam: {
      hits: heat.rows.filter((row) => {
        const probe = row.joint.probe.rows;
        return probe.length === 2 && probe[0].action === 0 && probe[1].action === 1;
      }).length,
      total: heat.rows.length,
    },
  },
  capacity: {
    lif: 512,
    adaptiveLif: 128,
    perceptionHits: capacity.perception.lif512.hits,
    perceptionTotal: capacity.perception.lif512.total,
    temporalHits: capacity.temporal.lif512_alif128.hits,
    temporalTotal: capacity.temporal.lif512_alif128.total,
    selectedMemoryTicks: capacity.selected_adaptive.memory_ticks,
    selectedAdaptGain: capacity.selected_adaptive.gain,
  },
  integrity: {
    wspBytes: capacity.wsp_bytes,
    falseFacts: capacity.false_facts,
    destroyed: capacity.destroyed,
    cortexCallsInCapacityBench: capacity.cortex_calls,
  },
};

const payload = `${JSON.stringify(output, null, 2)}\n`;
for (const target of ["src/data/echo2-benchmark.json", "public/data/echo2-benchmark.json"]) {
  const out = path.join(root, target);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, payload);
}
console.log(`echo2 benchmark: ${reportNames.length} green reports and ${output.video.durationSeconds.toFixed(2)} s video`);
