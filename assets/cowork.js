function buildClaudeUrl(promptText) {
  return `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;
}

function buildOrganizeProjectPrompt(projectData, projectId) {
  const json = JSON.stringify(projectData, null, 2);
  return `Quero organizar as informações do projeto "${projectData.name}" no meu hub moodjobs (repositório GitHub ${GH_OWNER}/${GH_REPO}, branch ${GH_BRANCH}, arquivo data/${projectId}.json).

Este é o conteúdo atual de data/${projectId}.json:

\`\`\`json
${json}
\`\`\`

Esquema dos campos:
- drive.externo / drive.interno / drive.assets: arrays de { "label": "...", "url": "..." } (pastas do Google Drive)
- organizational: array de { "label": "...", "url": "..." } (links para Notion, ChatGPT, Claude, Asana etc.)
- references: array de { "label": "...", "url": "...", "type": "...", "icon": "..." } (referências/links soltos)
- deadlines: array de { "label": "...", "date": "AAAA-MM-DD" }

No navegador, localize o grupo de abas verticais aberto que corresponde a este projeto (nome aproximado: "${projectData.name}"). Para cada aba do grupo, identifique se é uma pasta do Google Drive (e classifique em externo/interno/assets), um link organizacional (Notion/ChatGPT/Claude/Asana) ou uma referência solta.

Mescle essas informações com o JSON atual (sem duplicar itens já existentes) e me mostre o JSON atualizado completo para eu revisar.

Só depois que eu confirmar, faça o commit do arquivo atualizado em data/${projectId}.json no repositório ${GH_OWNER}/${GH_REPO} (branch ${GH_BRANCH}) usando o conector do GitHub.`;
}
