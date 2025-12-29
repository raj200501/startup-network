import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputDir = path.join(root, 'docs', 'screenshots');

const writeSvg = (name, content) => {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, name), content, 'utf8');
};

const baseStyles = `
  <style>
    .bg { fill: #0b0f1c; }
    .panel { fill: #121a2b; stroke: #1f2a44; stroke-width: 1; }
    .card { fill: #141f35; stroke: #223457; stroke-width: 1; }
    .soft { fill: #18243f; }
    .accent { fill: #4f7cff; }
    .accent-2 { fill: #6ee7f9; }
    .text { fill: #e6eefc; font-family: 'Inter', 'Segoe UI', sans-serif; }
    .muted { fill: #9bb0d3; font-family: 'Inter', 'Segoe UI', sans-serif; }
    .pill { fill: #23365b; }
    .border { stroke: #273455; stroke-width: 1; }
  </style>
`;

const landing = `
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  ${baseStyles}
  <rect class="bg" width="1440" height="900" />
  <rect class="panel" x="60" y="40" width="1320" height="80" rx="18" />
  <rect class="pill" x="90" y="65" width="140" height="30" rx="15" />
  <text class="text" x="110" y="86" font-size="14" letter-spacing="1">STARTUP NETWORK</text>
  <text class="muted" x="560" y="86" font-size="14">Product</text>
  <text class="muted" x="640" y="86" font-size="14">Investors</text>
  <text class="muted" x="735" y="86" font-size="14">Community</text>
  <rect class="accent" x="1180" y="58" width="160" height="44" rx="20" />
  <text class="text" x="1224" y="86" font-size="14">Get Started</text>

  <rect class="card" x="60" y="150" width="1320" height="680" rx="28" />
  <text class="text" x="120" y="240" font-size="52">Launch your startup with</text>
  <text class="text" x="120" y="300" font-size="52">founder-grade clarity</text>
  <text class="muted" x="120" y="350" font-size="18">Plan, ship, and fundraise from a unified cockpit with real-time metrics.</text>

  <rect class="accent" x="120" y="390" width="190" height="50" rx="25" />
  <text class="text" x="155" y="422" font-size="16">Create workspace</text>
  <rect class="soft" x="330" y="390" width="170" height="50" rx="25" />
  <text class="text" x="365" y="422" font-size="16">See tour</text>

  <rect class="panel" x="120" y="470" width="500" height="290" rx="24" />
  <rect class="accent-2" x="150" y="500" width="120" height="8" rx="4" />
  <rect class="soft" x="150" y="525" width="300" height="8" rx="4" />
  <rect class="soft" x="150" y="545" width="220" height="8" rx="4" />
  <rect class="soft" x="150" y="590" width="420" height="120" rx="16" />

  <rect class="panel" x="660" y="470" width="600" height="290" rx="24" />
  <rect class="accent" x="690" y="500" width="220" height="12" rx="6" />
  <rect class="soft" x="690" y="540" width="500" height="14" rx="7" />
  <rect class="soft" x="690" y="570" width="420" height="14" rx="7" />
  <rect class="soft" x="690" y="610" width="480" height="110" rx="18" />
</svg>
`;

const app = `
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  ${baseStyles}
  <rect class="bg" width="1440" height="900" />
  <rect class="panel" x="40" y="30" width="1360" height="70" rx="16" />
  <text class="text" x="80" y="75" font-size="18">Founder Mission Control</text>
  <rect class="accent" x="1220" y="50" width="150" height="36" rx="18" />
  <text class="text" x="1252" y="73" font-size="14">New update</text>

  <rect class="panel" x="40" y="120" width="300" height="740" rx="20" />
  <text class="muted" x="80" y="180" font-size="14">Overview</text>
  <text class="muted" x="80" y="220" font-size="14">Fundraising</text>
  <text class="muted" x="80" y="260" font-size="14">Pipeline</text>
  <text class="muted" x="80" y="300" font-size="14">Launch tracker</text>

  <rect class="card" x="370" y="120" width="1030" height="200" rx="26" />
  <text class="text" x="410" y="190" font-size="28">This week</text>
  <text class="muted" x="410" y="220" font-size="16">Pipeline velocity +33%, 4 new investors in review</text>
  <rect class="accent" x="410" y="245" width="180" height="10" rx="5" />
  <rect class="soft" x="410" y="265" width="360" height="10" rx="5" />

  <rect class="card" x="370" y="350" width="500" height="260" rx="24" />
  <rect class="card" x="900" y="350" width="500" height="260" rx="24" />
  <text class="text" x="410" y="400" font-size="20">Investor radar</text>
  <text class="muted" x="410" y="430" font-size="14">12 warm intros • 5 follow ups today</text>
  <rect class="soft" x="410" y="460" width="420" height="120" rx="16" />

  <text class="text" x="940" y="400" font-size="20">Product milestones</text>
  <text class="muted" x="940" y="430" font-size="14">Next release in 5 days</text>
  <rect class="soft" x="940" y="460" width="420" height="120" rx="16" />

  <rect class="card" x="370" y="640" width="1030" height="220" rx="24" />
  <text class="text" x="410" y="690" font-size="20">Community pulse</text>
  <rect class="soft" x="410" y="720" width="940" height="90" rx="18" />
</svg>
`;

const auth = `
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  ${baseStyles}
  <rect class="bg" width="1440" height="900" />
  <rect class="panel" x="120" y="120" width="1200" height="660" rx="30" />
  <rect class="card" x="220" y="200" width="420" height="460" rx="26" />
  <text class="text" x="270" y="270" font-size="28">Welcome back</text>
  <text class="muted" x="270" y="305" font-size="14">Sign in to continue building</text>
  <rect class="soft" x="270" y="340" width="320" height="40" rx="12" />
  <rect class="soft" x="270" y="395" width="320" height="40" rx="12" />
  <rect class="accent" x="270" y="455" width="320" height="48" rx="24" />
  <text class="text" x="350" y="486" font-size="16">Sign in</text>

  <rect class="card" x="700" y="200" width="520" height="460" rx="26" />
  <text class="text" x="760" y="270" font-size="24">Why founders stay</text>
  <rect class="soft" x="760" y="320" width="380" height="18" rx="9" />
  <rect class="soft" x="760" y="360" width="350" height="18" rx="9" />
  <rect class="soft" x="760" y="400" width="320" height="18" rx="9" />
  <rect class="soft" x="760" y="440" width="420" height="140" rx="18" />
</svg>
`;

const styleguide = `
<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  ${baseStyles}
  <rect class="bg" width="1440" height="900" />
  <rect class="panel" x="60" y="50" width="1320" height="800" rx="26" />
  <text class="text" x="120" y="120" font-size="28">UI System</text>
  <rect class="card" x="120" y="160" width="560" height="280" rx="24" />
  <rect class="card" x="740" y="160" width="560" height="280" rx="24" />
  <rect class="card" x="120" y="470" width="560" height="300" rx="24" />
  <rect class="card" x="740" y="470" width="560" height="300" rx="24" />
  <rect class="accent" x="160" y="210" width="180" height="38" rx="19" />
  <rect class="soft" x="160" y="270" width="420" height="12" rx="6" />
  <rect class="soft" x="160" y="295" width="360" height="12" rx="6" />
  <rect class="soft" x="780" y="220" width="200" height="12" rx="6" />
  <rect class="soft" x="780" y="245" width="300" height="12" rx="6" />
  <rect class="soft" x="780" y="540" width="440" height="150" rx="18" />
</svg>
`;

writeSvg('landing.svg', landing.trim());
writeSvg('app.svg', app.trim());
writeSvg('auth.svg', auth.trim());
writeSvg('styleguide.svg', styleguide.trim());

console.log('SVG previews generated in docs/screenshots.');
