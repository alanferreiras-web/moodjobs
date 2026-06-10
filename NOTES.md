# Moodjobs — Design Spec

## Visão geral

Hub visual para acesso rápido aos recursos de cada projeto profissional: pastas do
Drive, links organizacionais (Notion, ChatGPT, Claude, Asana) e referências soltas.
Cada projeto tem sua própria página, com link fixável no topo dos grupos da extensão
de abas verticais.

Site estático, hospedado (ex: GitHub Pages). Sem preocupação com segurança/login —
as ferramentas linkadas já têm suas próprias credenciais.

## Identidade visual

- Estética inspirada em produto digital: Stripe, Vercel, Linear.
- Sofisticação vem do espaço e da tipografia, não da decoração.
- Sem gradientes, sem sombras, sem excessos visuais.
- Tipografia com dois pesos: 400 (regular) e 500 (medium).
- Fundo transparente por padrão.
- Cada projeto tem uma cor de destaque (`accentColor`) usada como acento
  (ex: marcador no card do índice, detalhes no cabeçalho da página do projeto).
- Pills de status com cor própria por status.

## Arquitetura de arquivos

```
moodjobs/
├── index.html          → página inicial (hub)
├── projeto.html         → template único de projeto
├── assets/
│   ├── style.css        → design system (tipografia, cores, componentes)
│   └── script.js         → lógica de renderização (lê JSON e popula o template)
├── data/
│   ├── manifest.json     → lista de projetos (id, nome, status, accentColor) p/ index
│   ├── <id>.json         → dados completos de cada projeto
│   └── _template.json    → template em branco p/ novo projeto
└── NOTES.md              → este documento
```

- Cada projeto = uma entrada em `manifest.json` + um arquivo `data/<id>.json`.
- Link fixável na aba: `projeto.html?id=<id>`.
- "Novo projeto" → leva para `projeto.html?id=novo` carregando `_template.json`
  (campos vazios). O usuário duplica o JSON com os dados reais e adiciona uma
  entrada em `manifest.json`.

## Página inicial (hub)

- Cabeçalho com título "moodjobs" e botão "+ Novo projeto".
- Grid de cards, um por projeto, lidos de `manifest.json`.
- Cards verticais (estilo "profile card"): bloco de imagem no topo (capa do
  projeto, campo `image`), corpo abaixo com nome e pill de status.
- Se `image` não estiver definida, o bloco mostra um placeholder tintado com a
  `accentColor` e um indicador "+ Adicionar imagem".
- Clique no card abre `projeto.html?id=<id>`.
- "Upload" de imagem: como o site é estático (GitHub Pages), o arquivo de
  imagem precisa ser adicionado em `assets/covers/` e referenciado no JSON do
  projeto (não há upload via navegador nesta fase).

## Página de projeto (template)

Layout em coluna única (estilo "feed"), com a `accentColor` do projeto usada como
acento no cabeçalho:

1. **Cabeçalho**: nome do projeto + link "Notion →" (página oficial do projeto
   no Notion) lado a lado, e pill de status alinhado à direita.
2. **Linha de duas colunas**:
   - **Pastas Drive**: subgrupos "Externo/Cliente", "Interno", "Assets", cada um
     com lista de links de pastas.
   - **Links Organizacionais**: Notion, ChatGPT, Claude, Asana (lista de links).
3. **Linha de duas colunas**:
   - **Referências / Links soltos**: tabela com nome (+ tipo como subtexto) e
     botão "Visualizar".
   - **Datas de Entrega**: lista simples de prazos (data + descrição).

## Botões e ícones de link

Cada link (pasta do Drive, link organizacional, referência) é exibido como uma
linha clicável com:

- **Ícone** representando o tipo do link (`icon` no JSON: `folder`, `notion`,
  `chatgpt`, `claude`, `asana`, `image`, `link`).
- **Label** (nome do link).
- **Botão "Visualizar"**, que abre o link em uma nova aba (`target="_blank"`).

Não há texto puro como link — toda ação é um botão clicável.

## Execução local

Como as páginas usam `fetch()` para carregar `data/*.json`, é preciso servir os
arquivos por HTTP (não funciona abrindo o `.html` direto via `file://`).
Localmente: `python3 -m http.server` na pasta do projeto e acessar
`http://localhost:8000`. No GitHub Pages isso funciona nativamente.

## Status

Pills de status, cada um com cor própria. Conjunto inicial:
- Ativo
- Aguardando feedback
- Pausado
- Concluído

(Paleta de cores definida na implementação, ajustável depois.)

## Estrutura de dados (`data/<id>.json`)

```json
{
  "name": "Projeto X",
  "accentColor": "#6C5CE7",
  "image": "assets/covers/projeto-x.jpg",
  "status": "ativo",
  "notionUrl": "https://notion.so/...",
  "drive": {
    "externo": [{ "label": "Apresentações", "url": "..." }],
    "interno": [{ "label": "Working files", "url": "..." }],
    "assets": [{ "label": "Imagens", "url": "..." }]
  },
  "organizational": [
    { "label": "Notion", "url": "..." },
    { "label": "ChatGPT", "url": "..." },
    { "label": "Claude", "url": "..." },
    { "label": "Asana", "url": "..." }
  ],
  "references": [
    { "label": "Ref 1", "url": "...", "type": "site", "icon": "link" }
  ],
  "deadlines": [
    { "label": "Entrega X para o cliente", "date": "2026-06-20" }
  ]
}
```

`manifest.json`:

```json
[
  { "id": "projeto-x", "name": "Projeto X", "status": "ativo", "accentColor": "#6C5CE7" }
]
```

## Edição direto no app

Não há edição manual de arquivos JSON. Tudo é editado pela própria interface,
direto no navegador, e salvo no repositório via API do GitHub (Contents API).

- **Configuração inicial**: na página inicial, clique no ícone de engrenagem
  e cole um Personal Access Token do GitHub (escopo `repo`). O token fica
  salvo apenas no `localStorage` do navegador.
- **Editar um item**: passe o mouse sobre uma linha (link, pasta, referência,
  prazo) ou sobre o cabeçalho do projeto — aparece um ícone de lápis (editar)
  e de lixeira (remover). Clique no lápis para transformar a linha em um
  formulário inline; clique no ✓ para salvar (grava direto no
  `data/<id>.json` via commit) ou no ✕ para cancelar.
- **Adicionar item**: cada lista (pastas Drive, links organizacionais,
  referências, datas de entrega) tem um botão "+" tracejado no final que
  cria um novo item já em modo de edição.
- **Editar cabeçalho**: o lápis no cabeçalho do projeto permite mudar nome,
  status, cor de destaque, link do Notion e a imagem de capa (upload direto,
  enviado para `assets/covers/<id>.<ext>`). Ao salvar, também atualiza a
  entrada correspondente em `data/manifest.json`.
- **Novo projeto**: o botão "+ Novo projeto" no hub abre um modal para o
  nome; cria `data/<id>.json` (a partir de `_template.json`) e adiciona a
  entrada em `manifest.json` automaticamente.
- Cada salvamento gera um commit individual no repositório. O GitHub Pages
  rebuilda automaticamente — as mudanças aparecem em ~30-60s.

## Fora de escopo (fases futuras)

- **"Cowork" agente de organização automática**: ao sinalizar, um agente
  organizaria links/pastas no formato deste hub automaticamente. Projeto
  separado, com seu próprio design.
- **Polish visual "sala 8-bit"**: referência visual com personagens 8-bit
  representando projetos/clientes, a ser trazida e desenhada depois.
