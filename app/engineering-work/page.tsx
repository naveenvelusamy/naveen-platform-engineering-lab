import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../theme-toggle";
import EngineeringWorkContent from "../engineering-work-content";

export const metadata = {
  title: "Engineering Work | Naveen Velusamy",
  description:
    "Selected cloud platform engineering, infrastructure automation, and Kubernetes reliability work by Naveen Velusamy.",
};

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Engineering Work", href: "/engineering-work" },
  { label: "Writing", href: "/#writing" },
];

export default function EngineeringWorkPage() {
  return (
    <main className="site-page min-h-screen">
      <div className="site-geometry" aria-hidden="true" />
      <div className="site-main">
        <div className="portfolio-frame">
          <header className="profile-card">
            <div className="profile-identity">
              <Link href="/" aria-label="Naveen Velusamy home">
                <Image
                  src="/naveen-profile.jpg"
                  alt=""
                  width={96}
                  height={96}
                  priority
                  className="profile-header-photo"
                />
              </Link>
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
              <a
                className="profile-social profile-icon-link"
                href="https://github.com/naveenvelusamy"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 19.25c-4.2 1.25-4.2-2.1-5.9-2.5m11.8 5v-3.23a2.8 2.8 0 0 0-.78-2.17c2.6-.29 5.33-1.27 5.33-5.84a4.56 4.56 0 0 0-1.22-3.16 4.23 4.23 0 0 0-.12-3.12s-1-.3-3.26 1.21a11.2 11.2 0 0 0-5.93 0C6.66 3.93 5.65 4.23 5.65 4.23a4.23 4.23 0 0 0-.12 3.12 4.56 4.56 0 0 0-1.22 3.18c0 4.55 2.72 5.53 5.32 5.82a2.8 2.8 0 0 0-.77 2.15v3.25" />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
              <a
                className="profile-social profile-icon-link"
                href="https://www.linkedin.com/in/naveen-velusamy/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5.25 8.5v10.25M5.25 5.2v.05M9.5 18.75V8.5h3.3v1.4a3.62 3.62 0 0 1 3.15-1.7c2.72 0 3.8 1.72 3.8 4.55v6h-3.35v-5.33c0-1.42-.27-2.48-1.76-2.48-1.56 0-1.8 1.22-1.8 2.4v5.41z" />
                  <circle cx="5.25" cy="5.25" r="1.25" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <ThemeToggle />
            </div>
          </header>

          <nav className="site-nav" aria-label="Main navigation">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.label === "Engineering Work" ? "page" : undefined}
                className={`site-nav-link${item.label === "Engineering Work" ? " site-nav-link-active" : ""}`}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-content">
            <EngineeringWorkContent />
          </div>
        </div>
      </div>
    </main>
  );
}
