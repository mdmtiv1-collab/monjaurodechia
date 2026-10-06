# Plano Chia · Área de Membros

App web instalável (PWA) com o programa de 28 dias, receitas com chia, vídeos de preparo, lista de compras, diário e o bônus em PDF.

## Estrutura
- `index.html`, `style.css`, `app.js`: o app
- `data.js`: receitas, calendário de 28 dias, guia, vídeos e bônus (edite aqui)
- `bonus/200-receitas.pdf`: e-book bônus (200 receitas fit)
- `manifest.webmanifest`, `sw.js`, `icon.svg`: instalação no celular (PWA)
- `iniciar-app.bat`: abre o app localmente em http://localhost:8765 (precisa do Node.js)

## Publicar
Hospedagem estática (Vercel, Cloudflare Pages, Netlify): aponte para a raiz do repositório, sem build.

Os vídeos só funcionam em endereço http(s); abrir o `index.html` direto do arquivo não carrega o YouTube.

> Aviso: se o repositório for público, o PDF do bônus também fica público.
