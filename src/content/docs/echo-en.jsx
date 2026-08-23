import { Link } from 'react-router-dom';
// Docs — ECHO models (EN)
export const blocks = [
  {
    h2: 'What is ECHO?',
    body: (
      <p>
        ECHO is the AI assistant built into EchOS. Unlike cloud assistants, ECHO's models ship inside the OS image and
        run entirely on your hardware. There is no account, no API key and no network dependency — inference never
        leaves the machine.
      </p>
    ),
  },
  {
    h2: 'Navi 10 — the desktop model',
    body: (
      <>
        <p>Navi 10 powers ECHO in the Complete Edition:</p>
        <ul>
          <li>Conversational assistant with a chat-style panel in Eclipse Shell.</li>
          <li>Task automation: opens apps, adjusts settings and queries system state on request.</li>
          <li>Context awareness of local files you explicitly share into a conversation.</li>
          <li>Runs on standard x86_64 CPUs; offloads to BrainChip Akida NPUs when present.</li>
        </ul>
        <p>
          On Akida silicon the runtime maps layers onto spiking neural cores, cutting power draw to milliwatt levels.
          On CPU-only machines, optimized kernels keep responses snappy.
        </p>
      </>
    ),
  },
  {
    h2: 'Navi Mini — the edge model',
    body: (
      <>
        <p>Navi Mini is the compact sibling shipped with the Edge edition:</p>
        <ul>
          <li>Small footprint — fits alongside your workload in constrained memory.</li>
          <li><strong>Retrainable on-device</strong>: adapt it to your sensors, commands or vocabulary without sending data anywhere.</li>
          <li>Invoked from the CLI or from your own automation scripts.</li>
        </ul>
      </>
    ),
  },
  {
    h2: 'Privacy guarantees',
    body: (
      <p>
        Both models execute inside a sandbox that has no network permission. Prompts, context files and answers are
        held in memory or in your local profile only. See our{' '}
        <Link to="/privacy">Privacy Policy</Link> for the formal commitments.
      </p>
    ),
  },
];
