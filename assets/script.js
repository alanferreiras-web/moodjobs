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

  pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3z"/><path d="M13.5 6L18 10.5"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`,

  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,

  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,

  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h14M9 7V5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7m-8 0v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7"/></svg>`,

  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13.5a7.4 7.4 0 0 0 0-3l1.7-1.3-1.5-2.6-2 .6a7.3 7.3 0 0 0-2.6-1.5L14.6 3h-3l-.4 2.7a7.3 7.3 0 0 0-2.6 1.5l-2-.6L5.1 9.2l1.7 1.3a7.4 7.4 0 0 0 0 3L5.1 14.8l1.5 2.6 2-.6a7.3 7.3 0 0 0 2.6 1.5L11.6 21h3l.4-2.7a7.3 7.3 0 0 0 2.6-1.5l2 .6 1.5-2.6z"/></svg>`,
};

const ICON_OPTIONS = ["folder", "notion", "chatgpt", "claude", "asana", "image", "link"];

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

function statusOptions(selected) {
  return Object.entries(STATUS_MAP)
    .map(([key, info]) => `<option value="${key}" ${key === selected ? "selected" : ""}>${info.label}</option>`)
    .join("");
}

function iconOptions(selected) {
  return ICON_OPTIONS
    .map((key) => `<option value="${key}" ${key === selected ? "selected" : ""}>${key}</option>`)
    .join("");
}

// ---------- toast ----------
function showToast(message) {
  let toast = document.querySelector(".save-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "save-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
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

  const gearBtn = document.getElementById("gear-btn");
  if (gearBtn) {
    gearBtn.innerHTML = icon("settings");
    gearBtn.addEventListener("click", openSettingsModal);
  }

  const newProjectBtn = document.getElementById("new-project-btn");
  if (newProjectBtn) newProjectBtn.addEventListener("click", openNewProjectModal);
}

function openSettingsModal() {
  const overlay = showModal(`
    <h3>Configurações</h3>
    <p class="sublabel">Token de acesso pessoal do GitHub (escopo "repo"), usado para salvar edições. Fica salvo apenas neste navegador.</p>
    <input type="password" class="modal-input" id="gh-token-input" value="${getToken()}" placeholder="ghp_...">
    <div class="modal-actions">
      <button class="btn-visualizar" data-close>Cancelar</button>
      <button class="btn-visualizar primary" id="gh-token-save">Salvar</button>
    </div>
  `);
  overlay.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => closeModal(overlay)));
  overlay.querySelector("#gh-token-save").addEventListener("click", () => {
    setToken(overlay.querySelector("#gh-token-input").value.trim());
    closeModal(overlay);
    showToast("Token salvo.");
  });
}

function openNewProjectModal() {
  const overlay = showModal(`
    <h3>Novo projeto</h3>
    <input type="text" class="modal-input" id="new-project-name" placeholder="Nome do projeto">
    <div class="modal-actions">
      <button class="btn-visualizar" data-close>Cancelar</button>
      <button class="btn-visualizar primary" id="new-project-create">Criar</button>
    </div>
  `);
  overlay.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", () => closeModal(overlay)));

  const createBtn = overlay.querySelector("#new-project-create");
  createBtn.addEventListener("click", async () => {
    const name = overlay.querySelector("#new-project-name").value.trim();
    if (!name) return;

    createBtn.disabled = true;
    createBtn.textContent = "Criando...";

    try {
      const manifestFile = await getJsonFile("data/manifest.json");
      const manifest = manifestFile.content;

      let id = slugify(name) || "projeto";
      let unique = id;
      let n = 2;
      while (manifest.some((p) => p.id === unique)) unique = `${id}-${n++}`;
      id = unique;

      const template = await fetch("data/_template.json").then((r) => r.json());
      template.name = name;

      await putJsonFile(`data/${id}.json`, template, `Criar projeto ${name}`);

      manifest.push({ id, name, status: template.status, accentColor: template.accentColor, image: template.image || "" });
      await putJsonFile("data/manifest.json", manifest, `Adicionar ${name} ao manifest`, manifestFile.sha);

      window.location.href = `projeto.html?id=${id}`;
    } catch (e) {
      alert(e.message);
      createBtn.disabled = false;
      createBtn.textContent = "Criar";
    }
  });
}

// ---------- project page ----------
let currentData = null;
let currentId = null;
let editingPath = null;
let newItemPath = null;

const DRIVE_GROUPS = [
  { key: "externo", label: "Externo / Cliente" },
  { key: "interno", label: "Interno" },
  { key: "assets", label: "Assets" },
];

const FIELD_SCHEMAS = {
  drive: [
    { key: "label", label: "Nome", type: "text" },
    { key: "url", label: "Link", type: "url" },
  ],
  organizational: [
    { key: "label", label: "Nome", type: "text" },
    { key: "url", label: "Link", type: "url" },
    { key: "icon", label: "Ícone", type: "select" },
  ],
  references: [
    { key: "label", label: "Nome", type: "text" },
    { key: "type", label: "Tipo", type: "text" },
    { key: "icon", label: "Ícone", type: "select" },
    { key: "url", label: "Link", type: "url" },
  ],
  deadlines: [
    { key: "date", label: "Data", type: "date" },
    { key: "label", label: "Descrição", type: "text" },
  ],
};

function getAtPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setAtPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const parent = keys.reduce((o, k) => o[k], obj);
  parent[last] = value;
}
function removeAtPath(obj, path) {
  const keys = path.split(".");
  const last = Number(keys.pop());
  const parent = keys.reduce((o, k) => o[k], obj);
  parent.splice(last, 1);
}

function blankItem(schemaKey) {
  const blank = {};
  FIELD_SCHEMAS[schemaKey].forEach((f) => (blank[f.key] = f.type === "select" ? FIELD_SCHEMAS_DEFAULTS[schemaKey] : ""));
  return blank;
}
const FIELD_SCHEMAS_DEFAULTS = { organizational: "link", references: "link" };

function fieldInput(field, value) {
  if (field.type === "select") {
    return `<select data-field="${field.key}">${iconOptions(value)}</select>`;
  }
  const safeValue = (value || "").toString().replace(/"/g, "&quot;");
  return `<input type="${field.type}" data-field="${field.key}" value="${safeValue}" placeholder="${field.label}">`;
}

function rowActions(path, { editable = true, deletable = true } = {}) {
  if (!editable) return "";
  return `
    <span class="row-actions">
      <button class="icon-btn" data-action="edit" data-path="${path}" title="Editar">${icon("pencil")}</button>
      ${deletable ? `<button class="icon-btn" data-action="delete" data-path="${path}" title="Remover">${icon("trash")}</button>` : ""}
    </span>`;
}

function editActions(path) {
  return `
    <span class="row-actions" style="opacity:1">
      <button class="icon-btn" data-action="save" data-path="${path}" title="Salvar">${icon("check")}</button>
      <button class="icon-btn" data-action="cancel" data-path="${path}" title="Cancelar">${icon("x")}</button>
    </span>`;
}

// ---------- shared renderers ----------
function linkRow(item, path, schemaKey) {
  if (editingPath === path) {
    const fields = FIELD_SCHEMAS[schemaKey].map((f) => fieldInput(f, item[f.key])).join("");
    return `<div class="link-row editing" data-path="${path}">${fields}${editActions(path)}</div>`;
  }
  return `
    <div class="link-row link-row-link" data-url="${item.url}">
      <span class="icon">${icon(item.icon)}</span>
      <span class="label">${item.label}</span>
      ${rowActions(path)}
    </div>`;
}

function refRow(item, path) {
  if (editingPath === path) {
    const safeUrl = (item.url || "").toString().replace(/"/g, "&quot;");
    return `
      <div class="link-row editing" data-path="${path}">
        <input type="url" data-field="url" value="${safeUrl}" placeholder="Cole o link aqui" autofocus>
        ${editActions(path)}
      </div>`;
  }
  return `
    <div class="ref-row" data-url="${item.url}">
      <span class="icon">${icon(item.icon)}</span>
      <div class="ref-text">
        <div class="ref-label">${item.label}</div>
        ${item.type ? `<div class="ref-meta">${item.type}</div>` : ""}
      </div>
      <button class="icon-btn" data-action="delete" data-path="${path}" title="Remover">${icon("x")}</button>
    </div>`;
}

const MONTHS_PT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${MONTHS_PT[month - 1]}`;
}

function deadlineItem(item, path) {
  if (editingPath === path) {
    const fields = FIELD_SCHEMAS.deadlines.map((f) => fieldInput(f, item[f.key])).join("");
    return `<div class="deadline-item editing" data-path="${path}">${fields}${editActions(path)}</div>`;
  }
  return `
    <div class="deadline-item">
      <span class="deadline-date">${formatDate(item.date)}</span>
      <span class="deadline-label">${item.label}</span>
      ${rowActions(path)}
    </div>`;
}

function addButton(path, label) {
  return `<button class="add-row-btn" data-action="add" data-path="${path}" title="${label}">${icon("plus")}</button>`;
}

function labelFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// ---------- header ----------
function renderHeader() {
  if (editingPath === "header") {
    return `
      <div class="project-page-header">
        <div class="accent-bar" style="background:${currentData.accentColor || "#999"};"></div>
        <div class="header-edit" data-path="header">
          <input type="text" data-field="name" value="${(currentData.name || "").replace(/"/g, "&quot;")}" placeholder="Nome do projeto">
          <select data-field="status">${statusOptions(currentData.status)}</select>
          <input type="color" data-field="accentColor" value="${currentData.accentColor || "#999999"}">
          <input type="url" data-field="notionUrl" value="${(currentData.notionUrl || "").replace(/"/g, "&quot;")}" placeholder="Link do Notion">
          <input type="file" data-field="image" accept="image/*">
          ${editActions("header")}
        </div>
      </div>`;
  }
  return `
    <div class="project-page-header">
      <div class="accent-bar" style="background:${currentData.accentColor || "#999"};"></div>
      <div class="header-title">
        <h1>${currentData.name}</h1>
        ${currentData.notionUrl ? `<a class="notion-link" href="${currentData.notionUrl}" target="_blank" rel="noopener">${icon("notion")} Notion →</a>` : ""}
      </div>
      ${statusPill(currentData.status)}
      ${rowActions("header", { deletable: false })}
    </div>`;
}

// ---------- save ----------
async function saveProjectData() {
  showToast("Salvando...");
  const { sha } = await getJsonFile(`data/${currentId}.json`);
  await putJsonFile(`data/${currentId}.json`, currentData, `Atualizar ${currentData.name}`, sha);
  showToast("Salvo ✓");
}

async function saveManifestEntry() {
  const { content: manifest, sha } = await getJsonFile("data/manifest.json");
  const idx = manifest.findIndex((p) => p.id === currentId);
  if (idx > -1) {
    manifest[idx] = {
      ...manifest[idx],
      name: currentData.name,
      status: currentData.status,
      accentColor: currentData.accentColor,
      image: currentData.image,
    };
    await putJsonFile("data/manifest.json", manifest, `Atualizar ${currentData.name} no manifest`, sha);
  }
}

// ---------- main render ----------
function render() {
  const root = document.getElementById("project-page");

  const driveHtml = DRIVE_GROUPS.map((group) => {
    const items = (currentData.drive && currentData.drive[group.key]) || [];
    const basePath = `drive.${group.key}`;
    const rows = items.map((i, idx) => linkRow({ ...i, icon: i.icon || "folder" }, `${basePath}.${idx}`, "drive")).join("");
    return `
      <div class="sublabel">${group.label}</div>
      <div class="link-list">
        ${rows}
        ${addButton(basePath, "Adicionar pasta")}
      </div>`;
  }).join("");

  const orgItems = currentData.organizational || [];
  const orgHtml = orgItems.map((i, idx) => linkRow(i, `organizational.${idx}`, "organizational")).join("");

  const refItems = currentData.references || [];
  const refHtml = refItems.map((i, idx) => refRow(i, `references.${idx}`)).join("");

  const deadlineItems = currentData.deadlines || [];
  const deadlinesHtml = deadlineItems.map((i, idx) => deadlineItem(i, `deadlines.${idx}`)).join("");

  document.title = `${currentData.name} — moodjobs`;
  const accent = currentData.accentColor || "#999999";

  root.innerHTML = `
    <a class="back-link" href="index.html">${icon("link")} moodjobs</a>

    ${renderHeader()}

    <div class="two-col">
      <div class="box box-highlight" style="border-color:${accent}66;">
        <div class="section-title">Pastas Drive</div>
        ${driveHtml}
      </div>
      <div class="box box-highlight" style="border-color:${accent}66;">
        <div class="section-title">Links Organizacionais</div>
        <div class="link-list">
          ${orgHtml}
          ${addButton("organizational", "Adicionar link")}
        </div>
      </div>
    </div>

    <div class="two-col two-col-bottom">
      <div class="box">
        <div class="section-title">Referências / Links soltos</div>
        <div class="ref-list">${refHtml}</div>
        ${addButton("references", "Adicionar referência")}
      </div>
      <div class="box">
        <div class="section-title">Datas de Entrega</div>
        <div class="deadline-list">
          ${deadlinesHtml}
          ${addButton("deadlines", "Adicionar data")}
        </div>
      </div>
    </div>`;
}

function schemaKeyForPath(path) {
  if (path.startsWith("drive.")) return "drive";
  if (path.startsWith("organizational.")) return "organizational";
  if (path.startsWith("references.")) return "references";
  if (path.startsWith("deadlines.")) return "deadlines";
  return null;
}

async function handleProjectClick(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) {
    const linkEl = e.target.closest("[data-url]");
    if (linkEl && linkEl.dataset.url) {
      window.open(linkEl.dataset.url, "_blank", "noopener");
    }
    return;
  }
  const { action, path } = btn.dataset;

  if (action === "edit") {
    editingPath = path;
    render();
    return;
  }

  if (action === "cancel") {
    if (path === newItemPath) {
      removeAtPath(currentData, path);
      newItemPath = null;
    }
    editingPath = null;
    render();
    return;
  }

  if (action === "add") {
    const schemaKey = path === "organizational" || path === "references" || path === "deadlines" ? path : "drive";
    const arr = getAtPath(currentData, path);
    arr.push(blankItem(schemaKey));
    const itemPath = `${path}.${arr.length - 1}`;
    editingPath = itemPath;
    newItemPath = itemPath;
    render();
    return;
  }

  if (action === "delete") {
    if (!confirm("Remover este item?")) return;
    removeAtPath(currentData, path);
    try {
      await saveProjectData();
    } catch (err) {
      alert(err.message);
    }
    render();
    return;
  }

  if (action === "save") {
    if (path === "header") {
      const form = btn.closest('[data-path="header"]');
      currentData.name = form.querySelector('[data-field="name"]').value.trim() || currentData.name;
      currentData.status = form.querySelector('[data-field="status"]').value;
      currentData.accentColor = form.querySelector('[data-field="accentColor"]').value;
      currentData.notionUrl = form.querySelector('[data-field="notionUrl"]').value.trim();

      const fileInput = form.querySelector('[data-field="image"]');
      try {
        if (fileInput.files && fileInput.files[0]) {
          showToast("Enviando imagem...");
          const file = fileInput.files[0];
          const ext = file.name.split(".").pop();
          const coverPath = `assets/covers/${currentId}.${ext}`;
          const base64 = await readFileAsBase64(file);
          await putBinaryFile(coverPath, base64, `Atualizar capa de ${currentData.name}`);
          currentData.image = `${coverPath}?v=${Date.now()}`;
        }
        await saveProjectData();
        await saveManifestEntry();
      } catch (err) {
        alert(err.message);
      }
      editingPath = null;
      render();
      return;
    }

    const form = btn.closest("[data-path]");
    const schemaKey = schemaKeyForPath(path);
    let item;
    if (schemaKey === "references") {
      const url = form.querySelector('[data-field="url"]').value.trim();
      if (!url) {
        if (path === newItemPath) {
          removeAtPath(currentData, path);
          newItemPath = null;
        }
        editingPath = null;
        render();
        return;
      }
      item = { label: labelFromUrl(url), url, type: "", icon: "link" };
    } else {
      item = {};
      form.querySelectorAll("[data-field]").forEach((input) => (item[input.dataset.field] = input.value.trim()));
    }
    setAtPath(currentData, path, item);
    editingPath = null;
    newItemPath = null;
    try {
      await saveProjectData();
    } catch (err) {
      alert(err.message);
    }
    render();
    return;
  }
}

async function renderProject() {
  const root = document.getElementById("project-page");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  currentId = params.get("id");

  currentData = await fetch(`data/${currentId}.json`).then((r) => r.json());

  root.addEventListener("click", handleProjectClick);
  render();
}

renderIndex();
renderProject();
