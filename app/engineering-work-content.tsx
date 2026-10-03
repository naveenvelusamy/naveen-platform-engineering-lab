const workItems = [
  {
    index: "01",
    title: "Azure Platform Engineering",
    technologies: "Azure · AKS · Terraform · Kubernetes",
    featured: true,
    visual: "azure",
  },
  {
    index: "02",
    title: "Infrastructure Automation",
    technologies: "Terraform · Azure DevOps · Python",
    featured: false,
    visual: "automation",
  },
  {
    index: "03",
    title: "Kubernetes Platform & Reliability",
    technologies: "AKS · Helm · Istio · Observability",
    featured: false,
    visual: "kubernetes",
  },
] as const;

type EngineeringVisualKind = (typeof workItems)[number]["visual"];

function EngineeringVisual({ kind }: { kind: EngineeringVisualKind }) {
  const visualLabels = {
    azure: "Illustration of a conceptual Azure cloud platform, Kubernetes, and infrastructure as code.",
    automation:
      "Illustration of an infrastructure automation workflow moving through plan, review, and apply stages.",
    kubernetes:
      "Illustration of a conceptual Kubernetes control plane and connected worker nodes.",
  };

  return (
    <svg
      className={`engineering-visual engineering-visual-${kind}`}
      viewBox="0 0 360 190"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      role="img"
      aria-label={visualLabels[kind]}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`visual-line-${kind}`} x1="32" y1="30" x2="320" y2="170">
          <stop stopColor="#77B8C0" stopOpacity=".35" />
          <stop offset=".55" stopColor="#78C0BD" stopOpacity=".9" />
          <stop offset="1" stopColor="#719FB1" stopOpacity=".35" />
        </linearGradient>
        <radialGradient id={`visual-glow-${kind}`}>
          <stop stopColor="#78C0BD" stopOpacity=".2" />
          <stop offset="1" stopColor="#78C0BD" stopOpacity="0" />
        </radialGradient>
      </defs>

      {kind === "azure" ? (
        <>
          <path
            className="visual-connector"
            d="M180 56v34M180 90H81v25M180 90v25M180 90h99v25M81 142v18h198v-18"
          />
          <path className="visual-pulse visual-pulse-one" d="M81 142v18h198" />
          <circle className="visual-halo" cx="180" cy="45" r="38" fill={`url(#visual-glow-${kind})`} />
          <rect className="visual-node visual-node-main" x="126" y="24" width="108" height="42" rx="12" />
          <text className="visual-label" x="180" y="49" textAnchor="middle">AZURE PLATFORM</text>
          <g>
            <circle className="visual-halo" cx="81" cy="132" r="26" fill={`url(#visual-glow-${kind})`} />
            <rect className="visual-node" x="43" y="115" width="76" height="34" rx="7" />
            <text className="visual-label" x="81" y="136" textAnchor="middle">AKS</text>
          </g>
          <g>
            <circle className="visual-halo" cx="180" cy="132" r="26" fill={`url(#visual-glow-${kind})`} />
            <rect className="visual-node" x="136" y="115" width="88" height="34" rx="7" />
            <text className="visual-label" x="180" y="136" textAnchor="middle">TERRAFORM</text>
          </g>
          <g>
            <circle className="visual-halo" cx="279" cy="132" r="26" fill={`url(#visual-glow-${kind})`} />
            <rect className="visual-node" x="239" y="115" width="80" height="34" rx="7" />
            <text className="visual-label" x="279" y="136" textAnchor="middle">NETWORK</text>
          </g>
          <circle className="visual-dot" r="3" cx="0" cy="0">
            <animateMotion dur="7s" repeatCount="indefinite" path="M81 149v11h198v-18" />
          </circle>
        </>
      ) : null}

      {kind === "automation" ? (
        <>
          <path className="visual-connector" d="M96 93h46m30 0h46m30 0h45" />
          <path className="visual-pulse visual-pulse-one" d="M96 93h46m30 0h46m30 0h45" />
          {[
            { x: 25, title: "PLAN", sub: "IaC diff" },
            { x: 126, title: "REVIEW", sub: "approval" },
            { x: 227, title: "APPLY", sub: "provision" },
          ].map((stage, index) => (
            <g className={`automation-stage automation-stage-${index + 1}`} key={stage.title}>
              <circle className="visual-halo" cx={stage.x + 35} cy="91" r="39" fill={`url(#visual-glow-${kind})`} />
              <rect className="visual-node" x={stage.x} y="63" width="70" height="58" rx="8" />
              <circle className="visual-dot-small" cx={stage.x + 12} cy="76" r="2.5" />
              <text className="visual-label" x={stage.x + 37} y="91" textAnchor="middle">{stage.title}</text>
              <text className="visual-sub-label" x={stage.x + 37} y="106" textAnchor="middle">{stage.sub}</text>
            </g>
          ))}
          <path className="visual-connector visual-automation-base" d="M60 137v20h200v-20" />
          <text className="visual-caption" x="160" y="177" textAnchor="middle">REPEATABLE INFRASTRUCTURE WORKFLOW</text>
          <circle className="visual-dot" r="3" cx="0" cy="0">
            <animateMotion dur="6s" repeatCount="indefinite" path="M95 93h185" />
          </circle>
        </>
      ) : null}

      {kind === "kubernetes" ? (
        <>
          <rect className="visual-boundary" x="34" y="28" width="292" height="132" rx="12" />
          <text className="visual-caption" x="50" y="48">CLUSTER BOUNDARY</text>
          <path className="visual-connector" d="M180 76v23M95 99h170M95 99v22M180 99v22M265 99v22" />
          <path className="visual-pulse visual-pulse-one" d="M180 76v23h85v22" />
          <rect className="visual-node visual-control" x="126" y="54" width="108" height="28" rx="7" />
          <text className="visual-label" x="180" y="72" textAnchor="middle">CONTROL PLANE</text>
          {[
            { x: 58, label: "NODE 01" },
            { x: 143, label: "NODE 02" },
            { x: 228, label: "NODE 03" },
          ].map((node, index) => (
            <g className={`kube-node kube-node-${index + 1}`} key={node.label}>
              <rect className="visual-node" x={node.x} y="121" width="74" height="27" rx="6" />
              <text className="visual-label" x={node.x + 37} y="138" textAnchor="middle">{node.label}</text>
              <circle className="pod pod-one" cx={node.x + 16} cy="109" r="3" />
              <circle className="pod pod-two" cx={node.x + 37} cy="109" r="3" />
              <circle className="pod pod-three" cx={node.x + 58} cy="109" r="3" />
            </g>
          ))}
          <circle className="visual-dot" r="3" cx="0" cy="0">
            <animateMotion dur="7.5s" repeatCount="indefinite" path="M180 82v17H95v22" />
          </circle>
        </>
      ) : null}
    </svg>
  );
}

export default function EngineeringWorkContent() {
  return (
    <section className="engineering-work-page">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#247f75]">
        Selected Engineering Work
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#10243d] sm:text-4xl">
        Cloud platforms, automation, and reliability
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[#52677d]">
        A closer look at platform engineering, infrastructure automation, and
        Kubernetes reliability. The diagrams are conceptual illustrations, not
        representations of live production systems.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        {workItems.map((item) => (
          <article
            key={item.title}
            className={`work-card group relative flex overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
              item.featured
                ? "min-h-[560px] lg:row-span-2"
                : "min-h-[270px]"
            }`}
          >
            <div className="work-card-grid" aria-hidden="true" />
            <div className="work-card-inner relative flex h-full flex-col p-6">
              <div className="work-card-art relative flex min-h-0 flex-1 items-center justify-center">
                <p className="work-card-index absolute left-0 top-0 text-sm font-semibold">
                  {item.index}
                </p>
                <EngineeringVisual kind={item.visual} />
              </div>
              <div className="work-card-copy pt-4">
                <h2
                  className={`font-semibold tracking-[-0.02em] ${
                    item.featured
                      ? "max-w-xl text-4xl leading-tight"
                      : "text-2xl"
                  }`}
                >
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6">{item.technologies}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
