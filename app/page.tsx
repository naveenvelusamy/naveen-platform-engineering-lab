import Image from "next/image";
import styles from "./hero.module.css";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Engineering Work", href: "/engineering-work" },
  { label: "Writing", href: "#writing" },
];

const credentials = [
  {
    title: "13+ Years",
    detail: "IT & Infrastructure Engineering",
  },
  {
    title: "CKA",
    detail: "Certified Kubernetes Administrator",
  },
  {
    title: "RHCE",
    detail: "Red Hat Certified Engineer",
  },
  {
    title: "AWS Associate",
    detail: "AWS Certified Associate-level certification",
  },
];

const experiences = [
  {
    company: "Alegeus Technologies",
    role: "Senior DevOps Engineer → Cloud Platform Engineering",
    period: "Nov 2021 — Present",
    location: "Bengaluru, India",
    description:
      "Engineering and operating cloud platforms across Azure and Kubernetes environments, with a focus on infrastructure automation, reliability, observability, and reusable platform capabilities.",
    details: [
      "My work spans Azure and AKS infrastructure, Terraform-based Infrastructure as Code, Kubernetes and Helm, Azure DevOps CI/CD, service mesh, autoscaling, networking, secrets and certificate management.",
      "I also work across production reliability and platform operations—building Python-based automation, improving observability with Prometheus, Grafana, Mimir, Loki and Azure Monitor, and troubleshooting issues across Kubernetes, ingress, networking, applications and cloud infrastructure.",
      "A significant part of the role involves improving reusable infrastructure patterns, platform standards and operational consistency, while evaluating cloud-native technologies through technical investigations and POCs.",
    ],
    focus:
      "Azure · AKS · Kubernetes · Terraform · Helm · Azure DevOps · Python · Linux · Istio · Prometheus · Grafana · Mimir · Loki · KEDA",
  },
  {
    company: "Tata Consultancy Services",
    role: "Senior SysOps Engineer",
    period: "Apr 2016 — Nov 2021",
    location: "Bengaluru, India",
    description:
      "My time at TCS marked the transition from traditional Linux infrastructure engineering into AWS cloud engineering, infrastructure automation and DevOps.",
    details: [
      "Worked on large-scale migration of Linux server environments from on-premises infrastructure to AWS and automated recurring operational workflows using Ansible and Jenkins.",
      "Built automation for Tomcat maintenance during payroll cycles, vulnerability remediation, password rotation, Linux repository management and the recurring creation of multiple custom AWS AMI variants.",
      "Designed and deployed AWS application infrastructure for Jira and Confluence, incorporating scalable application nodes, PostgreSQL, shared storage, load balancing, DNS and CDN capabilities for availability and performance.",
      "Expanded further into Infrastructure as Code using AWS CloudFormation and Terraform to create reusable and standardized cloud infrastructure.",
    ],
    focus:
      "AWS · Linux · Ansible · Jenkins · Terraform · CloudFormation · EC2 · Auto Scaling · EFS · PostgreSQL · Route 53 · CI/CD",
  },
  {
    company: "NTT DATA",
    role: "Senior Linux Engineer",
    period: "Jun 2013 — Mar 2016",
    location: "Bengaluru, India",
    description:
      "Built my core production Linux engineering experience working as an L2 Linux Engineer supporting enterprise infrastructure.",
    details: [
      "Responsible for operating system installation and upgrades, Linux troubleshooting, server provisioning and decommissioning, and day-to-day administration across production environments.",
      "Worked with Linux services and infrastructure including user administration, DNS, Apache, Tomcat and nginx, while monitoring systems using IBM Tivoli Netcool and responding to operational incidents based on severity.",
      "This role established the Linux and production troubleshooting foundation that later became central to my cloud, DevOps and platform engineering work.",
    ],
    focus:
      "Linux · RHEL/CentOS · Apache · Tomcat · nginx · DNS · IBM Tivoli Netcool · Production Operations",
  },
  {
    company: "Samagra Info Solutions Pvt. Ltd.",
    role: "Linux System Administrator",
    period: "Jan 2013 — May 2013",
    location: "Bengaluru, India",
    description:
      "Started my IT infrastructure career managing Linux, macOS and Windows systems and supporting development environments.",
    details: [
      "Worked on Apache environments with multiple PHP versions, Linux package administration, MySQL master-slave and master-master replication, and SVN configuration on Ubuntu Linux.",
      "This was where my journey into Linux systems and infrastructure engineering began.",
    ],
    focus: "Linux · CentOS · Ubuntu · Apache · PHP · MySQL · SVN · macOS",
  },
];

export default function Home() {
  return (
    <main className="site-page min-h-screen">
      <div className="site-geometry" aria-hidden="true" />
      <div className="site-main">
        <div className="portfolio-frame">
          <header className="profile-card">
            <div className="profile-identity">
              <Image
                src="/naveen-profile.jpg"
                alt="Naveen Velusamy"
                width={96}
                height={96}
                priority
                className="profile-header-photo"
              />
              <div className="profile-copy">
                <h2>Naveen Velusamy</h2>
                <p>Senior DevOps Engineer | Cloud Platform Engineer | SRE</p>
              </div>
            </div>
            <div className="profile-actions">
              <a
                className="profile-resume profile-icon-link"
                href="/naveen-velusamy-resume.pdf"
                aria-label="Resume"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 3.75h8l4 4v12.5H6z" />
                  <path d="M14 3.75v4h4M9 12h6M9 15.5h6" />
                </svg>
                <span>Resume</span>
              </a>
              <details
                className="profile-contact profile-contact-github"
                name="profile-contact"
              >
                <summary
                  className="profile-icon-link"
                  aria-label="Show GitHub profile"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 19.25c-4.2 1.25-4.2-2.1-5.9-2.5m11.8 5v-3.23a2.8 2.8 0 0 0-.78-2.17c2.6-.29 5.33-1.27 5.33-5.84a4.56 4.56 0 0 0-1.22-3.16 4.23 4.23 0 0 0-.12-3.12s-1-.3-3.26 1.21a11.2 11.2 0 0 0-5.93 0C6.66 3.93 5.65 4.23 5.65 4.23a4.23 4.23 0 0 0-.12 3.12 4.56 4.56 0 0 0-1.22 3.18c0 4.55 2.72 5.53 5.32 5.82a2.8 2.8 0 0 0-.77 2.15v3.25" />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </summary>
                <div className="profile-contact-popover">
                  <span>GitHub</span>
                  <a
                    href="https://github.com/naveenvelusamy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub profile
                  </a>
                </div>
              </details>
              <details
                className="profile-contact profile-contact-linkedin"
                name="profile-contact"
              >
                <summary
                  className="profile-icon-link"
                  aria-label="Show LinkedIn profile"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5.25 8.5v10.25M5.25 5.2v.05M9.5 18.75V8.5h3.3v1.4a3.62 3.62 0 0 1 3.15-1.7c2.72 0 3.8 1.72 3.8 4.55v6h-3.35v-5.33c0-1.42-.27-2.48-1.76-2.48-1.56 0-1.8 1.22-1.8 2.4v5.41z" />
                    <circle cx="5.25" cy="5.25" r="1.25" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </summary>
                <div className="profile-contact-popover">
                  <span>LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/naveen-velusamy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View LinkedIn profile
                  </a>
                </div>
              </details>
              <details className="profile-contact" name="profile-contact">
                <summary aria-label="Show email address" title="Email">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                    <path d="m4.5 7 7.5 6 7.5-6" />
                  </svg>
                </summary>
                <div className="profile-contact-popover">
                  <span>Email</span>
                  <a href="mailto:naveenveluchami@gmail.com">
                    naveenveluchami@gmail.com
                  </a>
                </div>
              </details>
              <details className="profile-contact" name="profile-contact">
                <summary aria-label="Show mobile number" title="Phone">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.1 3.75h3l1.4 4-2 1.65a15.4 15.4 0 0 0 5.1 5.1l1.65-2 4 1.4v3c0 1.1-.9 2-2 2A15.5 15.5 0 0 1 5.1 5.75c0-1.1.9-2 2-2Z" />
                  </svg>
                </summary>
                <div className="profile-contact-popover">
                  <span>Mobile</span>
                  <a href="tel:+918056507858">+918056507858</a>
                </div>
              </details>
            </div>
          </header>

          <nav className="site-nav" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`site-nav-link${index === 0 ? " site-nav-link-active" : ""}`}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
        <div className="site-content">
          <section className={`site-hero ${styles.hero} relative overflow-hidden`}>
            <div className={styles.heroGrid} aria-hidden="true" />
            <div className={styles.heroGlow} aria-hidden="true" />

            <div className={`${styles.heroLayout} relative w-full`}>
              <div className={styles.copy}>
                <p className={`${styles.eyebrow} text-xs font-semibold uppercase tracking-[0.2em] text-[#247f75]`}>
                  CLOUD / PLATFORM / SRE
                </p>
                <h1 className={`${styles.name} mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#10243d] sm:text-5xl lg:text-[3.7rem]`}>
                  Hi, I&apos;m Naveen.
                </h1>
                <p className={`${styles.statement} mt-6 max-w-3xl text-2xl font-semibold leading-[1.18] tracking-[-0.035em] text-[#173653] sm:text-3xl`}>
                  I build reliable cloud platforms, automation and
                  infrastructure.
                </p>
                <p className={`${styles.description} mt-6 max-w-2xl text-base leading-8 text-[#52677d] sm:text-lg`}>
                  13+ years of engineering experience evolving from Linux
                  systems and production infrastructure to AWS, Azure,
                  Kubernetes, DevOps and cloud platform engineering.
                </p>

                <div className={`${styles.actions} mt-8 flex flex-wrap gap-3`}>
                  <a
                    href="/engineering-work"
                    className={`${styles.primaryCta} inline-flex items-center gap-3 bg-[#2f777b] px-5 py-3.5 text-sm font-semibold text-white`}
                  >
                    Explore Engineering Work <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href="/naveen-velusamy-resume.pdf"
                    className={`${styles.secondaryCta} inline-flex items-center px-5 py-3.5 text-sm font-semibold`}
                  >
                    Resume
                  </a>
                </div>

                <div className={`${styles.credentials} mt-8 grid grid-cols-1 gap-4 border-t border-[#c8d5e2] pt-5 sm:grid-cols-3 sm:gap-0`}>
                  {credentials.slice(1).map((item, index) => (
                    <div className={styles.credential} key={item.title} style={{ animationDelay: `${520 + index * 70}ms` }}>
                      <p className={styles.credentialTitle}>
                        {item.title}
                      </p>
                      <p className={styles.credentialDetail}>
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={styles.topology}
                role="img"
                aria-label="Conceptual platform engineering topology showing infrastructure as code feeding a platform connected to CI/CD, runtime, and observability."
              >
                <svg
                  className={styles.topologySvg}
                  viewBox="0 0 560 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect className={styles.topologyBoundaryOuter} x="42" y="124" width="476" height="274" rx="28" />
                  <rect className={styles.topologyBoundaryInner} x="62" y="144" width="436" height="234" rx="22" />
                  <text className={styles.topologyMeta} x="84" y="169">PLATFORM LAYER</text>

                  <path className={styles.topologyPath} d="M280 91V179" />
                  <path className={styles.topologyPath} d="M280 237V275H112V307" />
                  <path className={styles.topologyPath} d="M280 237V307" />
                  <path className={styles.topologyPath} d="M280 275H448V307" />
                  <path className={`${styles.topologyPath} ${styles.topologyPulse}`} d="M280 91V179" />
                  <path className={`${styles.topologyPath} ${styles.topologyPulse} ${styles.topologyPulseDelayed}`} d="M280 237V275H112V307" />
                  <path className={`${styles.topologyPath} ${styles.topologyPulse} ${styles.topologyPulseThird}`} d="M280 237V307" />
                  <path className={`${styles.topologyPath} ${styles.topologyPulse} ${styles.topologyPulseFourth}`} d="M280 237V275H448V307" />

                  <g className={`${styles.topologyNode} ${styles.iacNode}`}>
                    <rect className={styles.topologyNodeSurface} x="200" y="34" width="160" height="58" rx="18" />
                    <circle className={styles.topologyNodeDot} cx="208" cy="63" r="3.5" />
                    <text className={styles.topologyLabel} x="285" y="67" textAnchor="middle">INFRASTRUCTURE AS CODE</text>
                  </g>

                  <g className={`${styles.topologyNode} ${styles.platformNode}`}>
                    <rect className={styles.topologyNodeSurface} x="190" y="179" width="180" height="58" rx="18" />
                    <circle className={styles.topologyNodeDot} cx="215" cy="208" r="4" />
                    <text className={styles.topologyPlatformLabel} x="285" y="213" textAnchor="middle">PLATFORM</text>
                  </g>

                  <g className={`${styles.topologyNode} ${styles.cicdNode}`}>
                    <rect className={styles.topologyNodeSurface} x="62" y="307" width="100" height="52" rx="15" />
                    <circle className={styles.topologyNodeDot} cx="78" cy="333" r="3" />
                    <text className={styles.topologyLabel} x="117" y="337" textAnchor="middle">CI/CD</text>
                  </g>
                  <g className={`${styles.topologyNode} ${styles.runtimeNode}`}>
                    <rect className={styles.topologyNodeSurface} x="230" y="307" width="100" height="52" rx="15" />
                    <circle className={styles.topologyNodeDot} cx="246" cy="333" r="3" />
                    <text className={styles.topologyLabel} x="285" y="337" textAnchor="middle">RUNTIME</text>
                  </g>
                  <g className={`${styles.topologyNode} ${styles.observabilityNode}`}>
                    <rect className={styles.topologyNodeSurface} x="398" y="307" width="100" height="52" rx="15" />
                    <circle className={styles.topologyNodeDot} cx="402" cy="333" r="3" />
                    <text className={styles.topologyLabel} x="453" y="337" textAnchor="middle">OBSERVABILITY</text>
                  </g>
                </svg>
              </div>
            </div>
          </section>

          <section id="experience" className="experience-section">
            <header className="experience-heading">
              <p className="experience-kicker">My professional journey</p>
              <h2 className="experience-title">Engineering Journey</h2>
              <div className="experience-pathway">
                {[
                  "Linux",
                  "Enterprise Infrastructure",
                  "AWS & Automation",
                  "DevOps",
                  "Azure Cloud Engineering & Automation",
                  "Platform Engineering",
                ].map((step, index, steps) => (
                  <span key={step} className="flex items-center">
                    <span>{step}</span>
                    {index < steps.length - 1 ? (
                      <span className="mx-2 text-[#8aa0b4]">→</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </header>

            <div className="experience-timeline">
              <div className="experience-spine" aria-hidden="true" />
              <div className="experience-list">
                {experiences.map((item, index) => {
                  const isCurrent = item.company === "Alegeus Technologies";
                  const isLeft = index % 2 === 1;
                  const displayCompany =
                    item.company === "Samagra Info Solutions Pvt. Ltd."
                      ? "Samagra Info Solutions"
                      : item.company;
                  const displayPeriod = isCurrent
                    ? "2021 — Present"
                    : item.company === "Tata Consultancy Services"
                      ? "2016 — 2021"
                      : item.company === "NTT DATA"
                        ? "2013 — 2016"
                        : "2013";

                  return (
                    <article
                      key={item.company}
                      className={`experience-item ${isLeft ? "is-left" : "is-right"}${isCurrent ? " is-current" : ""}`}
                    >
                      <span className="experience-marker" aria-hidden="true" />
                      <div className="experience-card">
                        <h3 className="experience-company">{displayCompany}</h3>
                        <p className="experience-role">{item.role}</p>
                        {item.company === "Tata Consultancy Services" ? (
                          <p className="experience-transition">
                            Linux → AWS → Automation → DevOps
                          </p>
                        ) : null}
                        <p className="experience-summary">{item.description}</p>
                        <div className="experience-meta">
                          <span>{displayPeriod}</span>
                          <span>{item.location}</span>
                        </div>
                        <details className="experience-details">
                          <summary>View experience details</summary>
                          <div className="experience-details-content">
                            <p>
                              <span className="experience-focus-label">
                                Engineering Focus:
                              </span>{" "}
                              {item.focus}
                            </p>
                            {item.details.map((detail) => (
                              <p key={detail}>{detail}</p>
                            ))}
                          </div>
                        </details>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="writing" className="writing-section border-b border-[#c8d5e2] py-12">
            <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#247f75]">
                03 / Writing
              </p>
              <article className="border-l-2 border-[#247f75] py-2 pl-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-[#247f75]">
                  <span>Medium</span>
                  <span>December 2025</span>
                </div>
                <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#10243d]">
                  <a
                    href="https://medium.com/@naveenveluchami/are-devops-engineers-forgetting-linux-a-deep-dive-into-the-cloud-native-paradox-f04807737c1f"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-200 hover:text-[#247f75]"
                  >
                    Are DevOps Engineers Forgetting Linux?
                    <span className="mt-2 block text-lg font-medium leading-snug text-[#52677d]">
                      A Deep Dive Into the Cloud-Native Paradox
                    </span>
                  </a>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#52677d]">
                  Cloud-native platforms hide much of the operating system, but
                  Linux fundamentals remain critical when abstractions fail.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Linux", "Kubernetes", "Cloud Native", "SRE"].map(
                    (topic) => (
                      <span
                        key={topic}
                        className="border border-[#c8d5e2] px-3 py-1 text-xs font-medium text-[#52677d]"
                      >
                        {topic}
                      </span>
                    ),
                  )}
                </div>
                <a
                  href="https://medium.com/@naveenveluchami/are-devops-engineers-forgetting-linux-a-deep-dive-into-the-cloud-native-paradox-f04807737c1f"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex text-sm font-semibold text-[#247f75] transition-transform duration-200 hover:translate-x-1"
                >
                  Read article →
                </a>
              </article>
            </div>
          </section>

          <section id="about" className="py-12">
            <div className="grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#247f75]">
                04 / About
              </p>
              <p className="max-w-3xl text-lg leading-8 text-[#10243d]">
                Cloud Platform Engineer with 13+ years of experience across
                Linux infrastructure, AWS and Azure cloud engineering, DevOps,
                Kubernetes, automation, reliability, and platform engineering.
                Built on a strong Linux and production infrastructure
                foundation, my work today focuses on designing and improving
                Azure and Kubernetes-based platforms through Infrastructure as
                Code, CI/CD, observability, automation, and production
                engineering, with a fundamentals-first approach to building
                reliable, scalable, and maintainable systems.
              </p>
            </div>
          </section>

          <footer className="site-footer border-t border-[#c8d5e2] py-8 text-sm text-[#52677d]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>Naveen Velusamy</p>
              <div className="site-footer-actions flex flex-wrap items-center gap-4">
                <a
                  href="/naveen-velusamy-resume.pdf"
                  className="transition-colors duration-200 hover:text-[#247f75]"
                >
                  Resume
                </a>
                <a
                  href="https://github.com/naveenvelusamy"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-[#247f75]"
                >
                  GitHub
                </a>
                <ThemeToggle />
              </div>
            </div>
          </footer>
        </div>
      </div>
      </div>
    </main>
  );
}
