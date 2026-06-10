const GH_OWNER = "alanferreiras-web";
const GH_REPO = "moodjobs";
const GH_BRANCH = "main";
const GH_TOKEN_KEY = "moodjobs_gh_token";

function getToken() {
  return localStorage.getItem(GH_TOKEN_KEY) || "";
}

function setToken(token) {
  localStorage.setItem(GH_TOKEN_KEY, token);
}

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode("0x" + p1)));
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
}

async function ghContentsRequest(path, options = {}) {
  const token = getToken();
  if (!token) throw new Error("Token do GitHub não configurado. Use o ícone de engrenagem na página inicial.");

  const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`GitHub API ${res.status}: ${body.message || res.statusText}`);
  }
  return res.json();
}

async function getJsonFile(path) {
  const data = await ghContentsRequest(`${path}?ref=${GH_BRANCH}`);
  return { content: JSON.parse(b64DecodeUnicode(data.content)), sha: data.sha };
}

async function getFileSha(path) {
  try {
    const data = await ghContentsRequest(`${path}?ref=${GH_BRANCH}`);
    return data.sha;
  } catch (e) {
    return undefined;
  }
}

async function putJsonFile(path, obj, message, sha) {
  const content = b64EncodeUnicode(JSON.stringify(obj, null, 2) + "\n");
  return ghContentsRequest(path, {
    method: "PUT",
    body: JSON.stringify({ message, content, sha, branch: GH_BRANCH }),
  });
}

async function putBinaryFile(path, base64Content, message) {
  const sha = await getFileSha(path);
  return ghContentsRequest(path, {
    method: "PUT",
    body: JSON.stringify({ message, content: base64Content, sha, branch: GH_BRANCH }),
  });
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------- modal ----------
function showModal(innerHtml) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `<div class="modal-box">${innerHtml}</div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  return overlay;
}

function closeModal(overlay) {
  overlay.remove();
}
