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

1. **Cabeçalho**: nome do projeto + pill(s) de status + link "Notion →" (página
   oficial do projeto no Notion).
2. **Linha de duas colunas**:
   - **Pastas Drive**: subgrupos "Externo/Cliente", "Interno", "Assets", cada um
     com lista de links de pastas.
   - **Links Organizacionais**: Notion, ChatGPT, Claude, Asana (lista de links).
3. **Referências / Links soltos**: bloco de largura total, lista de chips/botões
   com links de referência.

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
    { "label": "Ref 1", "url": "..." }
  ]
}
```

`manifest.json`:

```json
[
  { "id": "projeto-x", "name": "Projeto X", "status": "ativo", "accentColor": "#6C5CE7" }
]
```

## Fora de escopo (fases futuras)

- **"Cowork" agente de organização automática**: ao sinalizar, um agente
  organizaria links/pastas no formato deste hub automaticamente. Projeto
  separado, com seu próprio design.
- **Polish visual "sala 8-bit"**: referência visual com personagens 8-bit
  representando projetos/clientes, a ser trazida e desenhada depois.
