// ---------- icons (inline SVG, 24x24, stroke-based) ----------
const ICONS = {
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6.5c0-.83.67-1.5 1.5-1.5h4l2 2.5h8.5c.83 0 1.5.67 1.5 1.5v8c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 3 16.5z"/></svg>`,

  notion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M8 7.5v9M8 7.5l8 9v-9"/></svg>`,

  chatgpt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M7.5 12h9"/></svg>`,

  claude: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v17M5 8.5l14 7M19 8.5l-14 7"/></svg>`,

  asana: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="2.5"/><circle cx="6.5" cy="16" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>`,

  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M20 15.5l-4.5-4.5-3 3-2-2-6.5 6.5"/></svg>`,

  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 14.5l5-5M11 8.5l1-1a3 3 0 0 1 4.24 4.24l-1 1M13 15.5l-1 1a3 3 0 0 1-4.24-4.24l1-1"/></svg>`,

  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h-3a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 6 18h9a1.5 1.5 0 0 0 1.5-1.5v-3"/><path d="M14 4.5h5.5V10M19.5 4.5L11 13"/></svg>`,
};

function icon(name) {
  return ICONS[name] || ICONS.link;
}

// ---------- status pills ----------
const STATUS_MAP = {
  ativo: { label: "Ativo", className: "ativo" },
  aguardando: { label: "Aguardando feedback", className: "aguardando" },
  pausado: { label: "Pausado", className: "pausado" },
  concluido: { label: "Concluído", className: "concluido" },
};

function statusPill(status) {
  const info = STATUS_MAP[status] || { label: status || "—", className: "pausado" };
  return `<span class="pill ${info.className}"><span class="dot"></span>${info.label}</span>`;
}

// ---------- shared renderers ----------
function linkRow(item) {
  return `
    <div class="link-row">
      <span class="icon">${icon(item.icon)}</span>
      <span class="label">${item.label}</span>
      <a class="btn-visualizar" href="${item.url}" target="_blank" rel="noopener">
        Visualizar ${icon("external")}
      </a>
    </div>`;
}

function refRow(item) {
  return `
    <tr>
      <td class="ref-name">
        <span class="icon">${icon(item.icon)}</span>
        <div>
          <div class="ref-label">${item.label}</div>
          ${item.type ? `<div class="ref-meta">${item.type}</div>` : ""}
        </div>
      </td>
      <td class="ref-action">
        <a class="btn-visualizar" href="${item.url}" target="_blank" rel="noopener">
          Visualizar ${icon("external")}
        </a>
      </td>
    </tr>`;
}

const MONTHS_PT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${MONTHS_PT[month - 1]}`;
}

function deadlineItem(item) {
  return `
    <div class="deadline-item">
      <span class="deadline-date">${formatDate(item.date)}</span>
      <span class="deadline-label">${item.label}</span>
    </div>`;
}

// ---------- index (hub) ----------
async function renderIndex() {
  const root = document.getElementById("project-list");
  if (!root) return;

  const manifest = await fetch("data/manifest.json").then((r) => r.json());

  root.innerHTML = manifest
    .map((p) => {
      const cover = p.image
        ? `<img src="${p.image}" alt="Capa do projeto ${p.name}">`
        : `<div class="upload-hint"><span class="plus">+</span>Adicionar imagem</div>`;
      const blockClass = p.image ? "accent-block" : "accent-block empty";
      const blockStyle = p.image ? "" : `style="background:${p.accentColor}22;"`;

      return `
        <a class="project-card" href="projeto.html?id=${p.id}">
          <div class="${blockClass}" ${blockStyle}>${cover}</div>
          <div class="card-body">
            <h3>${p.name}</h3>
            ${statusPill(p.status)}
          </div>
        </a>`;
    })
    .join("");
}

// ---------- project page ----------
async function renderProject() {
  const root = document.getElementById("project-page");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "_template";
  const file = id === "novo" ? "_template" : id;

  const data = await fetch(`data/${file}.json`).then((r) => r.json());

  const driveGroups = [
    { key: "externo", label: "Externo / Cliente" },
    { key: "interno", label: "Interno" },
    { key: "assets", label: "Assets" },
  ];

  const driveHtml = driveGroups
    .map((group) => {
      const items = (data.drive && data.drive[group.key]) || [];
      if (!items.length) return "";
      return `
        <div class="sublabel">${group.label}</div>
        <div class="link-list">
          ${items.map((i) => linkRow({ ...i, icon: i.icon || "folder" })).join("")}
        </div>`;
    })
    .join("");

  const orgHtml = (data.organizational || [])
    .map((i) => linkRow({ ...i, icon: i.icon || "link" }))
    .join("");

  const refHtml = (data.references || [])
    .map((i) => refRow({ ...i, icon: i.icon || "link" }))
    .join("");

  const deadlinesHtml = (data.deadlines || []).map(deadlineItem).join("");

  document.title = `${data.name} — moodjobs`;

  root.innerHTML = `
    <a class="back-link" href="index.html">${icon("link")} moodjobs</a>

    <div class="project-page-header">
      <div class="accent-bar" style="background:${data.accentColor || "#999"};"></div>
      <div class="header-title">
        <h1>${data.name}</h1>
        ${data.notionUrl ? `<a class="notion-link" href="${data.notionUrl}" target="_blank" rel="noopener">${icon("notion")} Notion →</a>` : ""}
      </div>
      ${statusPill(data.status)}
    </div>

    <div class="two-col">
      <div class="box">
        <div class="section-title">Pastas Drive</div>
        ${driveHtml || `<p class="sublabel">Nenhuma pasta cadastrada.</p>`}
      </div>
      <div class="box">
        <div class="section-title">Links Organizacionais</div>
        <div class="link-list">
          ${orgHtml || `<p class="sublabel">Nenhum link cadastrado.</p>`}
        </div>
      </div>
    </div>

    <div class="two-col">
      <div class="box">
        <div class="section-title">Referências / Links soltos</div>
        ${
          refHtml
            ? `<table class="ref-table"><tbody>${refHtml}</tbody></table>`
            : `<p class="sublabel">Nenhuma referência cadastrada.</p>`
        }
      </div>
      <div class="box">
        <div class="section-title">Datas de Entrega</div>
        ${deadlinesHtml || `<p class="sublabel">Nenhuma data cadastrada.</p>`}
      </div>
    </div>`;
}

renderIndex();
renderProject();
