/*
 * DESIGN SYSTEM: "Cartographic Data Science"
 * Warm parchment (#FAF7F2) bg, charcoal text, forest green (#2D6A4F) accent
 * Playfair Display headers, Source Serif 4 body, JetBrains Mono code
 * Two-column editorial layout, academic journal meets data dashboard
 */

import { useEffect, useRef, useState } from "react";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "landscape", label: "Source Landscape" },
  { id: "architecture", label: "System Architecture" },
  { id: "html-scraper", label: "HTML Scraper" },
  { id: "pdf-pipeline", label: "PDF Pipeline" },
  { id: "data-model", label: "Data Model" },
  { id: "orchestration", label: "Orchestration" },
  { id: "compliance", label: "Compliance" },
  { id: "assumptions", label: "Assumptions" },
];

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="arch-card text-center py-6 px-4">
      <div
        className="text-4xl font-bold mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.42 0.10 155)" }}
      >
        {value}
      </div>
      <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.32 0.012 60)" }}>
        {label}
      </div>
      {sub && <div className="text-xs mt-1" style={{ color: "oklch(0.52 0.015 60)" }}>{sub}</div>}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ children, type }: { children: React.ReactNode; type: "collection" | "processing" | "storage" | "output" | "monitoring" }) {
  return (
    <span
      className={`badge-${type} inline-block text-xs font-semibold px-2 py-0.5 rounded`}
      style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.03em" }}
    >
      {children}
    </span>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ number, title, sub }: { number: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 reveal">
      <div
        className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
        style={{ color: "oklch(0.42 0.10 155)", fontFamily: "'JetBrains Mono', monospace" }}
      >
        Section {number}
      </div>
      <h2
        className="text-3xl font-bold leading-tight mb-2"
        style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.012 60)" }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-base" style={{ color: "oklch(0.45 0.015 60)", fontFamily: "'Source Serif 4', serif" }}>
          {sub}
        </p>
      )}
      <div className="mt-4 h-px" style={{ background: "oklch(0.88 0.012 80)" }} />
    </div>
  );
}

// ─── Architecture diagram: System Overview ────────────────────────────────────
function SystemDiagram() {
  const layers = [
    {
      label: "LAYER 1 — DISCOVERY",
      badge: "collection" as const,
      color: "oklch(0.90 0.06 155)",
      borderColor: "oklch(0.60 0.10 155)",
      textColor: "oklch(0.22 0.10 155)",
      nodes: ["Jurisdiction Registry\n(33,295 cities)", "Source Classifier\n(Platform Detector)", "robots.txt / ToS\nCompliance Check"],
    },
    {
      label: "LAYER 2 — CRAWLING",
      badge: "collection" as const,
      color: "oklch(0.92 0.05 155)",
      borderColor: "oklch(0.62 0.09 155)",
      textColor: "oklch(0.22 0.10 155)",
      nodes: ["Scrapy Cluster\n(HTML/JS Crawlers)", "Playwright Workers\n(JS-rendered pages)", "PDF Downloader\n(Direct + Proxy)"],
    },
    {
      label: "LAYER 3 — PROCESSING",
      badge: "processing" as const,
      color: "oklch(0.95 0.06 50)",
      borderColor: "oklch(0.72 0.12 50)",
      textColor: "oklch(0.30 0.12 50)",
      nodes: ["HTML Parser\n(BeautifulSoup / lxml)", "PDF Extractor\n(pdfplumber / OCR)", "NLP Field Extractor\n(spaCy / LLM)"],
    },
    {
      label: "LAYER 4 — STORAGE",
      badge: "storage" as const,
      color: "oklch(0.92 0.06 280)",
      borderColor: "oklch(0.65 0.12 280)",
      textColor: "oklch(0.28 0.12 280)",
      nodes: ["Raw Document Store\n(S3 / Object Storage)", "Structured DB\n(PostgreSQL)", "Search Index\n(Elasticsearch)"],
    },
    {
      label: "LAYER 5 — OUTPUT",
      badge: "output" as const,
      color: "oklch(0.90 0.06 200)",
      borderColor: "oklch(0.60 0.12 200)",
      textColor: "oklch(0.26 0.12 200)",
      nodes: ["Compliance API\n(REST / GraphQL)", "Design Checker\n(Rule Engine)", "Update Notifier\n(Webhook / Email)"],
    },
  ];

  return (
    <div className="reveal my-8 overflow-x-auto">
      <div className="min-w-[640px]">
        {layers.map((layer, li) => (
          <div key={li} className="mb-3">
            <div
              className="flex items-center gap-2 mb-2"
            >
              <Badge type={layer.badge}>{layer.label}</Badge>
            </div>
            <div
              className="rounded border p-3 grid gap-3"
              style={{
                background: layer.color,
                borderColor: layer.borderColor,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              {layer.nodes.map((node, ni) => (
                <div
                  key={ni}
                  className="rounded p-3 text-center text-sm font-medium"
                  style={{
                    background: "oklch(1 0 0 / 0.65)",
                    color: layer.textColor,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    lineHeight: "1.5",
                    border: `1px solid ${layer.borderColor}`,
                    whiteSpace: "pre-line",
                  }}
                >
                  {node}
                </div>
              ))}
            </div>
            {li < layers.length - 1 && (
              <div className="flex justify-center my-1">
                <div
                  className="flex flex-col items-center gap-0.5"
                  style={{ color: "oklch(0.52 0.015 60)" }}
                >
                  <div className="w-px h-3" style={{ background: "oklch(0.72 0.015 60)" }} />
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M6 8L0 0h12L6 8z" fill="oklch(0.52 0.015 60)" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HTML Scraper flow diagram ────────────────────────────────────────────────
function HtmlScraperFlow() {
  const steps = [
    { icon: "🗺️", title: "Platform Detection", desc: "Identify hosting platform: Municode, American Legal, eCode360, CodePublishing, or custom city portal" },
    { icon: "🤖", title: "robots.txt Check", desc: "Parse and respect crawl directives; log disallowed paths; apply configurable override policy for public-domain content" },
    { icon: "🌐", title: "Static vs. Dynamic", desc: "Detect JS-rendered content via response headers and DOM analysis; route to Scrapy (static) or Playwright (dynamic)" },
    { icon: "🧭", title: "TOC Traversal", desc: "Parse table of contents or sitemap to enumerate all zoning chapters; extract chapter URLs for the zoning title (Title 17, 19, 21, etc.)" },
    { icon: "📄", title: "Section Extraction", desc: "For each section: extract raw HTML, strip navigation chrome, preserve tables and lists, capture section number and title" },
    { icon: "🔍", title: "Field Parsing", desc: "Apply regex + NLP patterns to extract: setbacks, height limits, FAR, lot coverage, parking ratios, density limits per zone" },
    { icon: "💾", title: "Structured Output", desc: "Emit normalized JSON record per zone per jurisdiction; attach source URL, version date, and confidence score" },
  ];

  return (
    <div className="reveal my-6">
      <div className="relative">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 mb-4">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 font-bold"
                style={{ background: "oklch(0.90 0.06 155)", border: "2px solid oklch(0.60 0.10 155)", color: "oklch(0.22 0.10 155)" }}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 mt-1" style={{ background: "oklch(0.75 0.08 155)", minHeight: "20px" }} />
              )}
            </div>
            <div className="pb-4 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{step.icon}</span>
                <span className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
                  {step.title}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.38 0.012 60)" }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PDF Pipeline flow ────────────────────────────────────────────────────────
function PdfPipelineFlow() {
  const stages = [
    {
      phase: "Acquisition",
      badge: "collection" as const,
      steps: [
        "Detect PDF link from city portal or platform page",
        "Download via requests with retry/backoff",
        "Store raw PDF in object storage with SHA-256 checksum",
        "Record metadata: source URL, download timestamp, file size",
      ],
    },
    {
      phase: "Pre-processing",
      badge: "processing" as const,
      steps: [
        "Validate PDF integrity (not corrupted/password-protected)",
        "Detect PDF type: native text-layer vs. scanned image",
        "For scanned: apply Tesseract OCR with deskew + denoise",
        "Extract text with pdfplumber preserving layout coordinates",
      ],
    },
    {
      phase: "Structure Recovery",
      badge: "processing" as const,
      steps: [
        "Detect table of contents via font size + position heuristics",
        "Segment document into chapters by heading detection",
        "Identify zoning title/chapter (Title 17, 19, 21, Appendix A, etc.)",
        "Extract tables using camelot or tabula-py for structured data",
      ],
    },
    {
      phase: "Field Extraction",
      badge: "processing" as const,
      steps: [
        "Apply zone-code regex patterns to identify district definitions",
        "Extract numeric parameters: setbacks, heights, FAR, coverage %",
        "Use LLM-assisted extraction for complex conditional regulations",
        "Resolve cross-references (e.g., 'see Section 17.04.060')",
      ],
    },
    {
      phase: "Validation & Output",
      badge: "output" as const,
      steps: [
        "Validate extracted values against physical plausibility ranges",
        "Flag low-confidence extractions for human review queue",
        "Merge with HTML-sourced data; resolve conflicts by recency",
        "Emit structured JSON record with extraction provenance",
      ],
    },
  ];

  return (
    <div className="reveal my-6 space-y-4">
      {stages.map((stage, si) => (
        <div key={si} className="arch-card">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "oklch(0.42 0.10 155)", color: "white" }}
            >
              {si + 1}
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.012 60)" }}>
              {stage.phase}
            </span>
            <Badge type={stage.badge}>{stage.badge.toUpperCase()}</Badge>
          </div>
          <ul className="space-y-1">
            {stage.steps.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm" style={{ color: "oklch(0.38 0.012 60)" }}>
                <span style={{ color: "oklch(0.42 0.10 155)", flexShrink: 0 }}>→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Data model table ─────────────────────────────────────────────────────────
function DataModelTable() {
  const fields = [
    { field: "jurisdiction_id", type: "UUID", layer: "collection", desc: "Unique identifier for the city/township/county" },
    { field: "jurisdiction_name", type: "TEXT", layer: "collection", desc: "Official name (e.g., 'City of Austin, TX')" },
    { field: "state_fips", type: "CHAR(2)", layer: "collection", desc: "2-digit FIPS state code" },
    { field: "county_geoid", type: "CHAR(5)", layer: "collection", desc: "5-digit county FIPS code" },
    { field: "source_url", type: "TEXT", layer: "collection", desc: "Canonical URL of the zoning code source" },
    { field: "source_platform", type: "ENUM", layer: "collection", desc: "Municode | AMLegal | eCode360 | CodePublishing | Custom" },
    { field: "zone_code", type: "TEXT", layer: "processing", desc: "Raw zone designation (e.g., 'R-1', 'MF-2', 'C-3')" },
    { field: "zone_type", type: "ENUM", layer: "processing", desc: "Residential | Commercial | Industrial | Mixed | Special | Overlay" },
    { field: "zone_description", type: "TEXT", layer: "processing", desc: "Full text description of zone intent" },
    { field: "min_lot_area_sqft", type: "FLOAT", layer: "processing", desc: "Minimum lot size in square feet" },
    { field: "min_lot_width_ft", type: "FLOAT", layer: "processing", desc: "Minimum lot width in feet" },
    { field: "max_height_ft", type: "FLOAT", layer: "processing", desc: "Maximum building height in feet" },
    { field: "max_height_stories", type: "INT", layer: "processing", desc: "Maximum building height in stories" },
    { field: "max_far", type: "FLOAT", layer: "processing", desc: "Maximum floor area ratio (gross floor area / lot area)" },
    { field: "min_front_setback_ft", type: "FLOAT", layer: "processing", desc: "Required front yard setback in feet" },
    { field: "min_rear_setback_ft", type: "FLOAT", layer: "processing", desc: "Required rear yard setback in feet" },
    { field: "min_side_setback_ft", type: "FLOAT", layer: "processing", desc: "Required side yard setback in feet (per side)" },
    { field: "max_lot_coverage_pct", type: "FLOAT", layer: "processing", desc: "Maximum building footprint as % of lot area" },
    { field: "max_impervious_pct", type: "FLOAT", layer: "processing", desc: "Maximum impervious surface coverage %" },
    { field: "min_open_space_pct", type: "FLOAT", layer: "processing", desc: "Minimum open/green space as % of lot" },
    { field: "max_density_du_acre", type: "FLOAT", layer: "processing", desc: "Maximum dwelling units per acre" },
    { field: "parking_min_spaces", type: "JSONB", layer: "processing", desc: "Min parking spaces by use type (e.g., {residential: 2, retail: 4/1000sqft})" },
    { field: "permitted_uses", type: "JSONB", layer: "processing", desc: "Array of by-right permitted land uses" },
    { field: "conditional_uses", type: "JSONB", layer: "processing", desc: "Array of conditional use permit (CUP) uses" },
    { field: "overlay_districts", type: "TEXT[]", layer: "processing", desc: "Applicable overlay zones (flood, historic, transit, etc.)" },
    { field: "raw_text_ref", type: "TEXT", layer: "storage", desc: "S3 key to raw source document (PDF or HTML)" },
    { field: "extraction_confidence", type: "FLOAT", layer: "storage", desc: "0.0–1.0 confidence score for extracted values" },
    { field: "extraction_method", type: "ENUM", layer: "storage", desc: "regex | nlp | llm | manual | ocr" },
    { field: "source_version", type: "TEXT", layer: "storage", desc: "Code version/supplement number from source" },
    { field: "scraped_at", type: "TIMESTAMPTZ", layer: "storage", desc: "UTC timestamp of data collection" },
    { field: "effective_date", type: "DATE", layer: "storage", desc: "Ordinance effective date if parseable" },
    { field: "needs_review", type: "BOOLEAN", layer: "storage", desc: "Flag for human review queue" },
  ];

  const badgeType: Record<string, "collection" | "processing" | "storage" | "output"> = {
    collection: "collection",
    processing: "processing",
    storage: "storage",
    output: "output",
  };

  return (
    <div className="reveal my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <thead>
          <tr style={{ background: "oklch(0.94 0.012 80)", borderBottom: "2px solid oklch(0.88 0.012 80)" }}>
            <th className="text-left py-2 px-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "oklch(0.32 0.012 60)" }}>Field</th>
            <th className="text-left py-2 px-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "oklch(0.32 0.012 60)" }}>Type</th>
            <th className="text-left py-2 px-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "oklch(0.32 0.012 60)" }}>Layer</th>
            <th className="text-left py-2 px-3 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "oklch(0.32 0.012 60)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((f, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 0 ? "oklch(0.992 0.005 80)" : "oklch(0.978 0.008 80)",
                borderBottom: "1px solid oklch(0.92 0.008 80)",
              }}
            >
              <td className="py-1.5 px-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "oklch(0.28 0.10 155)", whiteSpace: "nowrap" }}>{f.field}</td>
              <td className="py-1.5 px-3" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "oklch(0.38 0.12 50)", whiteSpace: "nowrap" }}>{f.type}</td>
              <td className="py-1.5 px-3"><Badge type={badgeType[f.layer]}>{f.layer}</Badge></td>
              <td className="py-1.5 px-3 text-xs" style={{ color: "oklch(0.38 0.012 60)" }}>{f.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Platform table ───────────────────────────────────────────────────────────
function PlatformTable() {
  const platforms = [
    {
      name: "Municode Library",
      url: "library.municode.com",
      cities: "~3,500+",
      format: "HTML (React SPA)",
      api: "Unofficial REST API",
      challenge: "JavaScript-rendered; requires Playwright or API reverse-engineering",
      badge: "collection" as const,
    },
    {
      name: "American Legal Publishing",
      url: "codelibrary.amlegal.com",
      cities: "~1,800+",
      format: "HTML + PDF",
      api: "eCode ALP API (partial)",
      challenge: "Multi-version support; login required for some exports",
      badge: "collection" as const,
    },
    {
      name: "eCode360",
      url: "ecode360.com",
      cities: "~1,200+",
      format: "HTML (structured)",
      api: "Public REST API available",
      challenge: "Rate limiting; chapter navigation requires session cookies",
      badge: "collection" as const,
    },
    {
      name: "Code Publishing Co.",
      url: "codepublishing.com",
      cities: "~900+",
      format: "HTML (static pages)",
      api: "None — direct HTML scraping",
      challenge: "Consistent URL pattern; relatively straightforward Scrapy spider",
      badge: "collection" as const,
    },
    {
      name: "General Code",
      url: "generalcode.com",
      cities: "~600+",
      format: "HTML + PDF",
      api: "None",
      challenge: "Mixed delivery; requires per-city URL discovery",
      badge: "collection" as const,
    },
    {
      name: "City Direct Portals",
      url: "city.gov/zoning",
      cities: "~26,000+",
      format: "PDF / HTML / GIS",
      api: "OpenData APIs (Socrata, ArcGIS) where available",
      challenge: "Highly heterogeneous; requires per-city spider templates; GIS data often separate from text codes",
      badge: "processing" as const,
    },
  ];

  return (
    <div className="reveal my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[800px]">
        <thead>
          <tr style={{ background: "oklch(0.94 0.012 80)", borderBottom: "2px solid oklch(0.88 0.012 80)" }}>
            {["Platform", "Coverage", "Format", "API Access", "Key Challenge"].map((h) => (
              <th key={h} className="text-left py-2 px-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "oklch(0.32 0.012 60)", fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {platforms.map((p, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "oklch(0.992 0.005 80)" : "oklch(0.978 0.008 80)", borderBottom: "1px solid oklch(0.92 0.008 80)" }}>
              <td className="py-2 px-3">
                <div className="font-semibold text-xs" style={{ color: "oklch(0.22 0.10 155)", fontFamily: "'JetBrains Mono', monospace" }}>{p.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.015 60)" }}>{p.url}</div>
              </td>
              <td className="py-2 px-3 text-xs font-semibold" style={{ color: "oklch(0.32 0.012 60)" }}>{p.cities}</td>
              <td className="py-2 px-3 text-xs" style={{ color: "oklch(0.38 0.012 60)" }}>{p.format}</td>
              <td className="py-2 px-3 text-xs" style={{ color: "oklch(0.38 0.012 60)" }}>{p.api}</td>
              <td className="py-2 px-3 text-xs" style={{ color: "oklch(0.42 0.012 60)" }}>{p.challenge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tech stack table ─────────────────────────────────────────────────────────
function TechStackTable() {
  const stack = [
    { component: "Crawl Orchestration", tech: "Apache Airflow", rationale: "DAG-based scheduling; retry logic; monitoring dashboard; supports distributed workers" },
    { component: "Task Queue", tech: "Celery + Redis", rationale: "Distributed task execution; priority queues per platform type; dead-letter queue for failures" },
    { component: "HTML Crawling (static)", tech: "Scrapy 2.x", rationale: "Battle-tested; built-in rate limiting, deduplication, and middleware pipeline" },
    { component: "HTML Crawling (dynamic)", tech: "Playwright + scrapy-playwright", rationale: "Handles React/Vue SPAs (Municode, eCode360); supports headless Chromium" },
    { component: "PDF Download", tech: "requests + aiohttp", rationale: "Async batch downloading with retry/backoff; checksum verification" },
    { component: "PDF Text Extraction", tech: "pdfplumber + PyMuPDF", rationale: "pdfplumber for layout-aware extraction; PyMuPDF for speed on large documents" },
    { component: "OCR (scanned PDFs)", tech: "Tesseract 5 + pytesseract", rationale: "Industry-standard OCR; deskew and denoise preprocessing via OpenCV" },
    { component: "Table Extraction", tech: "camelot-py + tabula-py", rationale: "camelot for lattice tables; tabula for stream tables; fallback to LLM for complex layouts" },
    { component: "NLP Field Extraction", tech: "spaCy + custom patterns", rationale: "Named entity recognition for numeric values; custom regex patterns for zoning-specific terms" },
    { component: "LLM Extraction (fallback)", tech: "GPT-4o / Claude 3.5", rationale: "For complex conditional regulations and cross-references; used only when rule-based fails" },
    { component: "Raw Storage", tech: "AWS S3 / MinIO", rationale: "Immutable raw document archive; versioned by scrape timestamp" },
    { component: "Structured Database", tech: "PostgreSQL 16", rationale: "JSONB for flexible fields; PostGIS for spatial data; full-text search" },
    { component: "Search Index", tech: "Elasticsearch 8", rationale: "Full-text search across ordinance text; fuzzy matching for zone code lookup" },
    { component: "Change Detection", tech: "Redis + SHA-256 hashing", rationale: "Content fingerprinting to detect ordinance updates; avoid redundant re-processing" },
    { component: "Monitoring", tech: "Prometheus + Grafana", rationale: "Crawl success rates, extraction confidence, queue depth, error rates" },
    { component: "API Layer", tech: "FastAPI", rationale: "High-performance REST API; OpenAPI docs auto-generated; async support" },
  ];

  return (
    <div className="reveal my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <thead>
          <tr style={{ background: "oklch(0.94 0.012 80)", borderBottom: "2px solid oklch(0.88 0.012 80)" }}>
            {["Component", "Technology", "Rationale"].map((h) => (
              <th key={h} className="text-left py-2 px-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "oklch(0.32 0.012 60)", fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stack.map((s, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "oklch(0.992 0.005 80)" : "oklch(0.978 0.008 80)", borderBottom: "1px solid oklch(0.92 0.008 80)" }}>
              <td className="py-2 px-3 font-semibold text-xs" style={{ color: "oklch(0.22 0.10 155)", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{s.component}</td>
              <td className="py-2 px-3 text-xs font-semibold" style={{ color: "oklch(0.30 0.12 50)", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{s.tech}</td>
              <td className="py-2 px-3 text-xs" style={{ color: "oklch(0.38 0.012 60)" }}>{s.rationale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Compliance section ───────────────────────────────────────────────────────
function ComplianceSection() {
  const items = [
    {
      title: "robots.txt Compliance",
      icon: "🤖",
      content: "The crawler reads and respects robots.txt directives for all target domains. Disallowed paths are logged and skipped. A configurable override policy is available for jurisdictions where the content is explicitly public-domain (government records), with full audit logging of any override decisions.",
    },
    {
      title: "Rate Limiting & Politeness",
      icon: "⏱️",
      content: "Per-domain rate limits are enforced via Scrapy's DOWNLOAD_DELAY and AutoThrottle middleware. Default: 2 seconds between requests per domain. Municode and eCode360 receive more conservative limits (5s). Crawls are scheduled during off-peak hours (2–6 AM local time) where possible.",
    },
    {
      title: "Terms of Service",
      icon: "📋",
      content: "A ToS classifier reviews each platform's terms before crawling begins. Platforms with explicit prohibitions on automated access are flagged for manual review. The system prioritizes official government portals and open data APIs over third-party aggregators where both are available.",
    },
    {
      title: "Legal Basis",
      icon: "⚖️",
      content: "US municipal zoning codes are government records and, in most jurisdictions, are in the public domain under 17 U.S.C. § 105 (federal) or equivalent state provisions. The hiQ Labs v. LinkedIn (9th Cir. 2022) precedent supports scraping of publicly accessible information. All collected data is used for non-commercial compliance analysis.",
    },
    {
      title: "Data Freshness & Versioning",
      icon: "🔄",
      content: "Each jurisdiction is re-crawled on a configurable schedule (default: monthly). Content fingerprinting (SHA-256) detects changes and triggers selective re-processing. Version history is preserved in the raw document store. The API exposes both current and historical versions of each zone's parameters.",
    },
    {
      title: "Human Review Queue",
      icon: "👁️",
      content: "Extractions with confidence scores below 0.75 are automatically queued for human review. Complex conditional regulations, cross-references, and scanned PDFs with poor OCR quality are flagged. A review dashboard allows annotators to correct and re-train extraction models.",
    },
  ];

  return (
    <div className="reveal my-6 grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="arch-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{item.icon}</span>
            <h4 className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
              {item.title}
            </h4>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "oklch(0.38 0.012 60)" }}>
            {item.content}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Orchestration diagram ────────────────────────────────────────────────────
function OrchestrationDiagram() {
  const dags = [
    {
      name: "dag_discovery",
      schedule: "Weekly",
      desc: "Refresh jurisdiction registry; detect new cities; update platform mappings",
      badge: "collection" as const,
    },
    {
      name: "dag_crawl_platforms",
      schedule: "Monthly",
      desc: "Crawl all platform-hosted codes (Municode, AMLegal, eCode360, CodePublishing); detect changes via fingerprint",
      badge: "collection" as const,
    },
    {
      name: "dag_crawl_direct",
      schedule: "Monthly",
      desc: "Crawl direct city portals; prioritize OpenData APIs; fall back to HTML scraping",
      badge: "collection" as const,
    },
    {
      name: "dag_process_html",
      schedule: "On trigger",
      desc: "Parse HTML documents; extract structured fields; emit to processing queue",
      badge: "processing" as const,
    },
    {
      name: "dag_process_pdf",
      schedule: "On trigger",
      desc: "Download PDFs; classify text vs. scanned; run extraction pipeline; OCR if needed",
      badge: "processing" as const,
    },
    {
      name: "dag_validate_store",
      schedule: "On trigger",
      desc: "Validate extracted data; flag low-confidence records; write to PostgreSQL and Elasticsearch",
      badge: "storage" as const,
    },
    {
      name: "dag_review_queue",
      schedule: "Daily",
      desc: "Aggregate low-confidence records; notify reviewers; process approved corrections",
      badge: "monitoring" as const,
    },
    {
      name: "dag_change_notify",
      schedule: "On store update",
      desc: "Detect changed zone parameters; emit webhooks to downstream consumers; update API cache",
      badge: "output" as const,
    },
  ];

  return (
    <div className="reveal my-6 space-y-2">
      {dags.map((dag, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded border"
          style={{ background: "oklch(0.992 0.005 80)", borderColor: "oklch(0.88 0.012 80)" }}
        >
          <div className="flex-shrink-0 mt-0.5">
            <Badge type={dag.badge}>{dag.schedule}</Badge>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.28 0.10 155)" }}>
              {dag.name}
            </div>
            <div className="text-xs" style={{ color: "oklch(0.38 0.012 60)" }}>{dag.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Assumptions section ──────────────────────────────────────────────────────
function AssumptionsSection() {
  const assumptions = [
    {
      category: "Scope",
      items: [
        "The system targets all 33,295 identified US jurisdictions with zoning authority, as catalogued by the National Zoning Atlas.",
        "Priority is given to incorporated cities and towns; unincorporated county areas are included but may have lower coverage initially.",
        "The primary use case is automated building design compliance checking — not legal advice. Extracted data is supplementary to, not a replacement for, official code review.",
        "International jurisdictions are out of scope for this design.",
      ],
    },
    {
      category: "Data Quality",
      items: [
        "Not all zoning parameters will be extractable with high confidence from all jurisdictions. An estimated 15–25% of jurisdictions will require manual review for at least one parameter.",
        "Scanned PDF codes (estimated 20–30% of direct city portals) will have higher error rates and lower extraction confidence.",
        "Complex conditional regulations (e.g., 'setback is 20ft unless adjacent to a Type A arterial, in which case 30ft') are flagged for human review rather than auto-extracted.",
        "Overlay districts are catalogued but their parameter modifications are not always computable without base-district context.",
      ],
    },
    {
      category: "Technical",
      items: [
        "The system assumes Python 3.11+ runtime environment with GPU access available for OCR acceleration.",
        "LLM-assisted extraction (GPT-4o / Claude 3.5) is used as a fallback only, not as the primary extraction method, due to cost and latency constraints.",
        "The design assumes a cloud-native deployment (AWS or GCP) with auto-scaling worker pools.",
        "API rate limits for Municode and eCode360 are estimated at 1 request/2s per IP; the system uses IP rotation for higher throughput.",
      ],
    },
    {
      category: "Legal & Compliance",
      items: [
        "Municipal zoning codes are treated as public-domain government records. The system does not scrape content behind authentication walls without explicit permission.",
        "The ToS of third-party aggregators (Municode, AMLegal) may restrict automated access. The system includes a ToS review workflow and prefers direct city portals and OpenData APIs where available.",
        "Data is collected for non-commercial compliance analysis purposes. Commercial redistribution of raw code text is not within scope.",
        "The system maintains full audit logs of all crawl activity, including robots.txt compliance decisions.",
      ],
    },
  ];

  return (
    <div className="reveal my-6 space-y-6">
      {assumptions.map((section, si) => (
        <div key={si}>
          <h4
            className="font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.42 0.10 155)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {section.category}
          </h4>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm" style={{ color: "oklch(0.38 0.012 60)" }}>
                <span className="flex-shrink-0 font-bold" style={{ color: "oklch(0.42 0.10 155)" }}>
                  {si + 1}.{i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  const [activeSection, setActiveSection] = useState("overview");
  const contentRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.978 0.008 80)" }}>
      {/* ── Top nav bar ── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "oklch(0.992 0.005 80 / 0.95)",
          borderColor: "oklch(0.88 0.012 80)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "oklch(0.42 0.10 155)" }}
            >
              ZC
            </div>
            <div>
              <div
                className="text-sm font-bold leading-none"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.012 60)" }}
              >
                ZoneCrawl
              </div>
              <div
                className="text-xs leading-none mt-0.5"
                style={{ color: "oklch(0.52 0.015 60)", fontFamily: "'JetBrains Mono', monospace" }}
              >
                Architecture Design v1.0
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: activeSection === item.id ? "oklch(0.42 0.10 155)" : "oklch(0.45 0.015 60)",
                  background: activeSection === item.id ? "oklch(0.90 0.06 155)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div
            className="text-xs px-2 py-1 rounded"
            style={{
              background: "oklch(0.90 0.06 155)",
              color: "oklch(0.22 0.10 155)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Design Phase
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "420px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663522684805/9Z47sHDCGMgzxPLxzQLJNQ/hero-banner-MJzuiiC6eNaHMx2SuF9XLw.webp)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, oklch(0.12 0.012 60 / 0.72) 0%, oklch(0.12 0.012 60 / 0.55) 60%, oklch(0.978 0.008 80 / 0.95) 100%)" }}
        />
        <div className="relative container py-16 md:py-24">
          <div className="max-w-3xl">
            <div
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded mb-4"
              style={{
                background: "oklch(0.42 0.10 155 / 0.9)",
                color: "white",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Architecture Design Document
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 8px oklch(0 0 0 / 0.4)" }}
            >
              US Municipal Zoning Code
              <br />
              <span style={{ color: "oklch(0.85 0.10 155)" }}>Crawler & Scraper System</span>
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.90 0.005 80)", fontFamily: "'Source Serif 4', serif", maxWidth: "600px" }}
            >
              A comprehensive design for an automated pipeline that collects, processes, and normalizes
              building and zoning regulations from all 33,295 US jurisdictions — enabling automated
              compliance checking for pre-built building and house designs.
            </p>
            <div className="flex flex-wrap gap-2">
              {["33,295 Jurisdictions", "HTML + PDF Sources", "Distributed Architecture", "NLP Extraction"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(1 0 0 / 0.15)",
                    color: "white",
                    border: "1px solid oklch(1 0 0 / 0.3)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key stats ── */}
      <section className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
          <StatCard value="33,295" label="US Jurisdictions" sub="with zoning authority" />
          <StatCard value="102,000+" label="Zoning Districts" sub="across all jurisdictions" />
          <StatCard value="5" label="Major Platforms" sub="Municode, AMLegal, eCode360, CodePublishing, General Code" />
          <StatCard value="32" label="Data Fields" sub="per zone per jurisdiction" />
        </div>
      </section>

      {/* ── Main content ── */}
      <main className="container pb-24" ref={contentRef}>
        <div className="max-w-4xl mx-auto">

          {/* ── 1. Overview ── */}
          <section id="overview" className="pt-12">
            <SectionHeading number="1" title="Project Overview" sub="Problem statement, objectives, and design scope" />
            <div className="prose-like space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                Every city and township in the United States maintains its own set of zoning ordinances — legally binding regulations that govern what can be built, where, and how. These codes define the precise parameters that determine whether a pre-designed building or house is permissible on a given lot: setback distances from property lines, maximum building height, floor area ratio (FAR), lot coverage percentage, minimum parking spaces, and permitted land uses, among others.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The National Zoning Atlas has identified <strong>33,295 jurisdictions</strong> with zoning authority across the United States, collectively defining over <strong>102,000 distinct zoning districts</strong>. These regulations are published in two primary formats: structured HTML documents hosted on third-party municipal code platforms (Municode, American Legal Publishing, eCode360, Code Publishing Co.), and PDF documents published directly on city government portals. A significant minority are scanned image PDFs requiring optical character recognition.
              </p>
              <div className="pullquote">
                "Zoning is decentralized, inconsistent, and convoluted. Making key information about zoning centralized, standardized, and accessible requires reading over 1.1 million pages of codes."
                <div className="text-xs mt-2 not-italic" style={{ color: "oklch(0.52 0.015 60)", fontFamily: "'JetBrains Mono', monospace" }}>
                  — National Zoning Atlas, 2024
                </div>
              </div>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                <strong>ZoneCrawl</strong> is designed as a fully automated, distributed pipeline that systematically discovers, crawls, processes, and normalizes these regulations into a queryable structured database. The system is purpose-built for downstream use by automated building design compliance engines — given a building design and a lot location, the compliance engine queries ZoneCrawl's database to determine whether the design meets all applicable zoning requirements.
              </p>
            </div>
          </section>

          {/* ── 2. Source Landscape ── */}
          <section id="landscape" className="pt-16">
            <SectionHeading number="2" title="Source Landscape" sub="Where US city codes live and how they are structured" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                US municipal codes are not hosted in a single repository. They are distributed across a small number of commercial code-hosting platforms and thousands of individual city government websites. Understanding this landscape is the first step in designing an effective crawler. The table below summarizes the major platforms, their estimated coverage, content delivery format, and key scraping challenges.
              </p>
            </div>
            <PlatformTable />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The zoning code within each city's municipal code is typically organized under a dedicated <strong>Title</strong> (commonly Title 17, 19, or 21) or a standalone <strong>Zoning Ordinance</strong> document. Within this title, districts are defined in individual chapters or articles, each specifying permitted uses, development standards (setbacks, heights, FAR), and special conditions. The crawler must navigate this hierarchical structure to locate and extract the relevant sections.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                Beyond text codes, many jurisdictions publish companion <strong>GIS shapefiles</strong> or interactive zoning maps through OpenData portals (Socrata, ArcGIS Online). These spatial datasets define the geographic boundaries of each zone and are essential for lot-level compliance checking. The ZoneCrawl design includes a parallel GIS acquisition pipeline that harvests these datasets alongside the text codes.
              </p>
            </div>
          </section>

          {/* ── 3. System Architecture ── */}
          <section id="architecture" className="pt-16">
            <SectionHeading number="3" title="System Architecture" sub="Five-layer distributed pipeline from discovery to output" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The ZoneCrawl system is organized into five logical layers, each with distinct responsibilities. Data flows sequentially from the Discovery layer through Crawling, Processing, and Storage, ultimately surfacing through the Output layer as a queryable API. The diagram below shows the three primary components at each layer.
              </p>
            </div>
            <SystemDiagram />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The <strong>Jurisdiction Registry</strong> is the authoritative list of all 33,295 jurisdictions, seeded from the National Zoning Atlas and supplemented by US Census TIGER/Line data. Each jurisdiction record includes its canonical code source URL, hosting platform, last-scraped timestamp, and content fingerprint. The <strong>Source Classifier</strong> determines the appropriate crawl strategy for each jurisdiction based on its platform and content type.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The crawling layer bifurcates into three parallel tracks: a <strong>Scrapy cluster</strong> for static HTML pages, <strong>Playwright workers</strong> for JavaScript-rendered single-page applications (Municode, eCode360), and a <strong>PDF Downloader</strong> for document-based codes. All three tracks write raw content to object storage before processing begins, ensuring a complete audit trail and enabling re-processing without re-crawling.
              </p>
            </div>
            <div className="reveal mt-6">
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
                Technology Stack
              </h3>
              <TechStackTable />
            </div>
          </section>

          {/* ── 4. HTML Scraper ── */}
          <section id="html-scraper" className="pt-16">
            <SectionHeading number="4" title="HTML Scraper Design" sub="Platform-aware crawling for structured web documents" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The HTML scraper is the primary data collection mechanism for platform-hosted codes, covering an estimated 8,000–10,000 jurisdictions. It operates as a multi-stage pipeline, with each stage handling a specific aspect of the crawl process. Platform-specific spider templates are maintained for each major hosting platform, with a generic fallback spider for custom city portals.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                A critical design decision is the handling of <strong>JavaScript-rendered content</strong>. Municode's library and eCode360 are React-based single-page applications that load code content dynamically. The scraper detects JS-rendered pages by checking for empty body content on initial load and routes these to Playwright-based workers that execute the JavaScript before extracting content. Static HTML pages (CodePublishing, AMLegal) are handled by the lighter-weight Scrapy pipeline.
              </p>
            </div>
            <HtmlScraperFlow />
            <div className="reveal mt-4">
              <h4 className="font-semibold text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
                Platform-Specific Spider Templates
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  {
                    platform: "Municode",
                    approach: "Reverse-engineer the unofficial REST API (GET /api/library/browse/codes/{client}/{code}/nodes) to enumerate chapters without Playwright. Fall back to Playwright for content rendering.",
                    complexity: "High",
                  },
                  {
                    platform: "American Legal Publishing",
                    approach: "Navigate the eCode ALP API for chapter listing; download individual section HTML pages. Handle multi-version supplements by targeting 'current' version endpoint.",
                    complexity: "Medium",
                  },
                  {
                    platform: "eCode360",
                    approach: "Use the public REST API (GET /api/1/library/{clientId}/nodes) for TOC enumeration. Respect rate limits strictly (1 req/3s). Session cookie management required.",
                    complexity: "Medium",
                  },
                  {
                    platform: "Code Publishing Co.",
                    approach: "Consistent URL pattern: /CA/{CityName}/html/{CityName}{Title}/{CityName}{Chapter}.html. Pure Scrapy spider with link-following. No JS rendering required.",
                    complexity: "Low",
                  },
                  {
                    platform: "Direct City Portals",
                    approach: "Generic spider template with configurable CSS selectors. Prioritize OpenData API endpoints (Socrata, ArcGIS REST) over HTML scraping. Manual configuration for ~500 largest cities.",
                    complexity: "Variable",
                  },
                  {
                    platform: "OpenData APIs",
                    approach: "Socrata SODA API and ArcGIS REST API for GIS zoning boundary data. Bulk download preferred over paginated API calls. GeoJSON output normalized to PostGIS geometry.",
                    complexity: "Low-Medium",
                  },
                ].map((item, i) => (
                  <div key={i} className="arch-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.22 0.10 155)" }}>
                        {item.platform}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          background: item.complexity === "Low" ? "oklch(0.90 0.06 155)" : item.complexity === "High" ? "oklch(0.92 0.06 30)" : "oklch(0.95 0.06 50)",
                          color: item.complexity === "Low" ? "oklch(0.22 0.10 155)" : item.complexity === "High" ? "oklch(0.30 0.12 30)" : "oklch(0.30 0.12 50)",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {item.complexity}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "oklch(0.38 0.012 60)" }}>{item.approach}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. PDF Pipeline ── */}
          <section id="pdf-pipeline" className="pt-16">
            <SectionHeading number="5" title="PDF Processing Pipeline" sub="Acquisition, extraction, and structured output from document-based codes" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                An estimated 40–50% of jurisdictions publish their zoning codes primarily or exclusively as PDF documents. These range from well-structured, text-layer PDFs generated from word processors, to scanned image PDFs of physical documents requiring OCR. The PDF pipeline is designed to handle the full spectrum of document quality, with graceful degradation and confidence scoring at each stage.
              </p>
              <div className="grid grid-cols-3 gap-3 reveal">
                <div className="arch-card text-center">
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.42 0.10 155)" }}>~60%</div>
                  <div className="text-xs" style={{ color: "oklch(0.45 0.015 60)" }}>Native text-layer PDFs</div>
                  <div className="text-xs mt-1" style={{ color: "oklch(0.55 0.015 60)", fontFamily: "'JetBrains Mono', monospace" }}>High confidence extraction</div>
                </div>
                <div className="arch-card text-center">
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.65 0.15 50)" }}>~25%</div>
                  <div className="text-xs" style={{ color: "oklch(0.45 0.015 60)" }}>Scanned image PDFs</div>
                  <div className="text-xs mt-1" style={{ color: "oklch(0.55 0.015 60)", fontFamily: "'JetBrains Mono', monospace" }}>OCR required; medium confidence</div>
                </div>
                <div className="arch-card text-center">
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.50 0.12 280)" }}>~15%</div>
                  <div className="text-xs" style={{ color: "oklch(0.45 0.015 60)" }}>Mixed / complex layouts</div>
                  <div className="text-xs mt-1" style={{ color: "oklch(0.55 0.015 60)", fontFamily: "'JetBrains Mono', monospace" }}>LLM fallback; human review</div>
                </div>
              </div>
            </div>
            <PdfPipelineFlow />
            <div className="reveal mt-4">
              <div className="pullquote">
                The most challenging aspect of PDF processing is not text extraction — it is <em>structure recovery</em>: identifying which text belongs to which zone, which numbers are setbacks versus heights versus lot sizes, and how conditional clauses modify the base parameters.
              </div>
              <p className="text-base leading-relaxed mt-4" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The field extraction stage uses a layered approach: first, a library of <strong>regex patterns</strong> tuned to common zoning code phrasing (e.g., "minimum front yard setback of X feet", "maximum building height: X feet or X stories"); second, a <strong>spaCy NLP pipeline</strong> with custom named entity recognition for numeric parameters; and third, an <strong>LLM-assisted fallback</strong> (GPT-4o or Claude 3.5 Sonnet) for complex conditional regulations that defeat rule-based approaches. Each extraction is tagged with its method and a confidence score.
              </p>
            </div>
          </section>

          {/* ── 6. Data Model ── */}
          <section id="data-model" className="pt-16">
            <SectionHeading number="6" title="Canonical Data Model" sub="Normalized schema for structured zoning parameters" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The canonical data model defines the normalized schema for all extracted zoning parameters. It is designed to be comprehensive enough to support automated compliance checking while remaining tractable for automated extraction. Fields are grouped by the pipeline layer at which they are populated: Collection (metadata), Processing (extracted parameters), and Storage (provenance and quality).
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                Special sentinel values are used for fields that cannot be expressed as a single number: <code className="mono text-sm px-1 rounded" style={{ background: "oklch(0.94 0.012 80)", color: "oklch(0.28 0.10 155)" }}>-5555</code> indicates the regulation is too complex to reduce to a single value (refer to source text), and <code className="mono text-sm px-1 rounded" style={{ background: "oklch(0.94 0.012 80)", color: "oklch(0.28 0.10 155)" }}>-9999</code> indicates the parameter is not applicable to this zone type. This convention is adopted from the Regrid Standardized Zoning Schema.
              </p>
            </div>
            <DataModelTable />
            <div className="reveal mt-4">
              <h4 className="font-semibold text-sm mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
                Database Architecture
              </h4>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    name: "PostgreSQL 16",
                    role: "Primary structured store",
                    details: "JSONB for flexible fields (permitted_uses, parking_min_spaces); PostGIS extension for spatial queries; partitioned by state_fips for query performance; full-text search on zone_description",
                    badge: "storage" as const,
                  },
                  {
                    name: "Elasticsearch 8",
                    role: "Full-text search index",
                    details: "Indexes raw ordinance text for keyword search; fuzzy matching for zone code lookup; used by compliance engine to find relevant code sections for a given parameter query",
                    badge: "storage" as const,
                  },
                  {
                    name: "AWS S3 / MinIO",
                    role: "Raw document archive",
                    details: "Immutable storage for all raw PDFs and HTML snapshots; versioned by scrape timestamp; SHA-256 checksums for integrity verification; lifecycle policies for cost management",
                    badge: "storage" as const,
                  },
                ].map((db, i) => (
                  <div key={i} className="arch-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.28 0.12 280)" }}>{db.name}</span>
                      <Badge type={db.badge}>{db.role}</Badge>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "oklch(0.38 0.012 60)" }}>{db.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 7. Orchestration ── */}
          <section id="orchestration" className="pt-16">
            <SectionHeading number="7" title="Orchestration & Scheduling" sub="Airflow DAGs, update detection, and operational workflows" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The ZoneCrawl system is orchestrated by Apache Airflow, with a set of purpose-built DAGs (Directed Acyclic Graphs) managing the end-to-end workflow. DAGs are triggered either on a fixed schedule or by upstream events (e.g., a new document detected by the discovery layer). The Celery executor with a Redis broker enables horizontal scaling of worker pools during peak crawl periods.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                <strong>Change detection</strong> is a critical operational concern: re-processing all 33,295 jurisdictions from scratch on every run would be prohibitively expensive. The system uses SHA-256 content fingerprinting to detect changes at the document level. Only jurisdictions where the source document has changed since the last successful crawl are re-processed through the full extraction pipeline. Unchanged jurisdictions receive only a metadata refresh (last-checked timestamp).
              </p>
            </div>
            <OrchestrationDiagram />
            <div className="reveal mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="arch-card">
                  <h4 className="font-semibold text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
                    Crawl Priority Tiers
                  </h4>
                  <div className="space-y-2 text-sm" style={{ color: "oklch(0.38 0.012 60)" }}>
                    <div className="flex gap-2">
                      <span className="font-bold" style={{ color: "oklch(0.42 0.10 155)" }}>Tier 1</span>
                      <span>Top 500 cities by population — monthly crawl, 48h SLA for change detection</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold" style={{ color: "oklch(0.65 0.15 50)" }}>Tier 2</span>
                      <span>Cities 501–5,000 by population — quarterly crawl, 7-day SLA</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold" style={{ color: "oklch(0.50 0.12 280)" }}>Tier 3</span>
                      <span>Remaining jurisdictions — semi-annual crawl, 30-day SLA</span>
                    </div>
                  </div>
                </div>
                <div className="arch-card">
                  <h4 className="font-semibold text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.22 0.10 155)" }}>
                    Failure Handling
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: "oklch(0.38 0.012 60)" }}>
                    <div className="flex gap-2"><span style={{ color: "oklch(0.42 0.10 155)" }}>→</span><span>Exponential backoff on HTTP errors (3 retries, max 5 min delay)</span></div>
                    <div className="flex gap-2"><span style={{ color: "oklch(0.42 0.10 155)" }}>→</span><span>Dead-letter queue for permanently failed tasks with alerting</span></div>
                    <div className="flex gap-2"><span style={{ color: "oklch(0.42 0.10 155)" }}>→</span><span>Circuit breaker per domain (pause after 10 consecutive failures)</span></div>
                    <div className="flex gap-2"><span style={{ color: "oklch(0.42 0.10 155)" }}>→</span><span>Automatic IP rotation on 429/503 responses</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 8. Compliance ── */}
          <section id="compliance" className="pt-16">
            <SectionHeading number="8" title="Compliance & Operational Considerations" sub="Legal, ethical, and data quality framework" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                Large-scale web crawling of government and quasi-government websites requires careful attention to legal, ethical, and operational constraints. The ZoneCrawl system incorporates a multi-layered compliance framework that addresses robots.txt directives, rate limiting, terms of service review, and data quality assurance.
              </p>
            </div>
            <ComplianceSection />
          </section>

          {/* ── 9. Assumptions ── */}
          <section id="assumptions" className="pt-16">
            <SectionHeading number="9" title="Design Assumptions" sub="Explicit assumptions underlying this architecture" />
            <div className="space-y-4 reveal">
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.28 0.012 60)", fontFamily: "'Source Serif 4', serif" }}>
                The following assumptions are made explicit to guide implementation decisions and set appropriate expectations for system coverage and data quality. These should be revisited as implementation progresses and real-world constraints are encountered.
              </p>
            </div>
            <AssumptionsSection />
          </section>

          {/* ── Footer ── */}
          <footer className="pt-16 mt-16 border-t" style={{ borderColor: "oklch(0.88 0.012 80)" }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8">
              <div>
                <div className="font-bold text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.18 0.012 60)" }}>
                  ZoneCrawl — Architecture Design v1.0
                </div>
                <div className="text-xs" style={{ color: "oklch(0.52 0.015 60)", fontFamily: "'JetBrains Mono', monospace" }}>
                  Design phase document. Implementation to follow.
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Design Phase", "Pre-Implementation", "April 2026"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "oklch(0.94 0.012 80)",
                      color: "oklch(0.45 0.015 60)",
                      fontFamily: "'JetBrains Mono', monospace",
                      border: "1px solid oklch(0.88 0.012 80)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}
