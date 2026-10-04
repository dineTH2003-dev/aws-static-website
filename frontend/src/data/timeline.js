export const EDUCATION_DATA = [
  {
    period: "2023 – Present",
    degree: "Bachelor of Information Technology",
    institution: "University of Moratuwa — Faculty of Information Technology",
    details: "Focusing on Software Engineering, Cloud Computing, Distributed Systems, Database Management Systems, Data Structures & Algorithms, Computer Networks, and Operating Systems.",
    current: true,
  },
  {
    period: "2019 – 2022",
    degree: "GCE Advanced Level (Physical Science Stream)",
    institution: "Northkanumuldeniya National School",
    details: "Combined Mathematics: A | Information Technology: A | Physics: B (Z-Score: 1.80)",
    current: false,
  },
];

export const LEADERSHIP_DATA = [
  {
    title: "Batch Representative",
    organization: "University of Moratuwa — Faculty of IT",
    desc: "Facilitated academic and logistical coordination between undergraduates and faculty management, helping organize student activities and batch communications.",
    icon: "🎓",
    color: "#8b5cf6",
  },
  {
    title: "Project Leader — 2nd Year Academic Project",
    organization: "University of Moratuwa — Faculty of IT",
    desc: "Led a student engineering team through a full software engineering project lifecycle, coordinating system architecture, sprint milestones, and code reviews.",
    icon: "🚀",
    color: "#f97316",
  },
  {
    title: "School Prefect",
    organization: "Northkanumuldeniya National School",
    desc: "Served in student leadership and school governance, supporting event organization, team discipline, and student welfare.",
    icon: "🏫",
    color: "#06b6d4",
  },
];

export const CLOUD_TOOLKIT = [
  {
    domain: "Compute & Virtualization",
    service: "Amazon EC2 & AWS Nitro",
    concept: "Hypervisor hardware offloading, fault-domain placement across Availability Zones, and auto-recovery.",
    icon: "aws",
  },
  {
    domain: "Storage & Origin Security",
    service: "Amazon S3 & EBS",
    concept: "Immutable object storage, encrypted block volumes, and zero-trust Origin Access Control (OAC).",
    icon: "aws",
  },
  {
    domain: "Global Edge & Routing",
    service: "CloudFront & Route 53",
    concept: "Edge PoP caching, TLS termination via ACM, low-latency DNS resolution, and cache invalidation policies.",
    icon: "aws",
  },
  {
    domain: "Identity & Perimeter Defense",
    service: "AWS IAM & AWS WAF",
    concept: "Least-privilege role policies, short-lived credentials, IP rate-limiting, and Layer 7 OWASP protection.",
    icon: "security",
  },
  {
    domain: "Containers & Orchestration",
    service: "Docker & Kubernetes (K3s)",
    concept: "Lightweight container runtimes, multi-stage Docker builds, Pod lifecycle management, and DaemonSets.",
    icon: "kubernetes",
  },
  {
    domain: "Telemetry & Observability",
    service: "OpenTelemetry & Prometheus",
    concept: "Three pillars of observability: contextual distributed tracing (Honeycomb), metric scraping, and Grafana.",
    icon: "opentelemetry",
  },
  {
    domain: "Infrastructure as Code",
    service: "Terraform",
    concept: "Declarative resource provisioning, state tracking, modular architectures, and repeatable cloud stacks.",
    icon: "terraform",
  },
  {
    domain: "CI/CD & Automation",
    service: "GitHub Actions",
    concept: "Automated linting, container builds, S3 asset synchronization, and CloudFront cache invalidation.",
    icon: "github",
  },
];
