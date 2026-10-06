(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const view = $("#view");
  const KEY = "planochia_v1";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const hojeISO = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const fmtData = iso => { const [y, m, d] = iso.split("-"); return d + "/" + m + "/" + y; };

  /* ---------- estado ---------- */
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S.done = S.done || {}; S.shop = S.shop || {}; S.diary = S.diary || {};
  if (!S.start) S.start = hojeISO();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  save();

  function diaAtual() {
    const a = new Date(S.start + "T00:00:00"), b = new Date(hojeISO() + "T00:00:00");
    return Math.min(28, Math.max(1, Math.floor((b - a) / 864e5) + 1));
  }
  const totalFeitos = () => Object.keys(S.done).filter(k => S.done[k]).length;

  /* ---------- componentes ---------- */
  function recCard(id) {
    const r = REC[id];
    return `<a class="rec" href="#/receita/${r.id}"><div class="em">${r.emoji}</div>
      <div><b>${esc(r.nome)}</b><small>${esc(r.cat)} · ⏱ ${esc(r.tempo)} · ${esc(r.rend)}</small></div></a>`;
  }
  function videoBlock(v, wide) {
    return `<div class="${wide ? "wide" : ""}"><button class="vid ${wide ? "wide" : ""}" data-vid="${v.id}" aria-label="Assistir: ${esc(v.titulo)}">
      <img loading="lazy" src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="">
      <span class="play">▶</span></button>
      <div class="vtxt">${esc(v.titulo)}</div></div>`;
  }
  function bindVideos(root) {
    root.querySelectorAll("[data-vid]").forEach(b => b.onclick = () => {
      const id = b.dataset.vid;
      if (location.protocol === "file:") {
        b.innerHTML = `<span class="play" style="font-size:13px;padding:14px;text-align:center;background:#000">Abra o app pelo endereço do site (ou pelo arquivo iniciar-app.bat) para os vídeos funcionarem.</span>`;
        return;
      }
      const o = encodeURIComponent(location.origin);
      b.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&origin=${o}" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Vídeo da receita"></iframe>`;
      b.onclick = null;
    });
  }
  const legal = `<p class="legal">Conteúdo informativo de educação alimentar. Não substitui orientação de médico ou nutricionista. Os resultados variam de pessoa para pessoa. Vídeos de terceiros pertencem aos seus autores no YouTube.</p>`;

  /* ---------- telas ---------- */
  function telaHoje(sel) {
    const cur = diaAtual(), d = sel || cur, dia = receitasDoDia(d), sem = SEMANAS[Math.floor((d - 1) / 7)];
    const feito = !!S.done[d];
    let grid = "";
    for (let i = 1; i <= 28; i++)
      grid += `<button data-d="${i}" class="${S.done[i] ? "done" : ""} ${i === cur ? "cur" : ""} ${i === d ? "sel" : ""}">${i}</button>`;
    view.innerHTML = `
      <span class="pill">${esc(sem.t)}</span>
      <h1 style="margin-top:8px">Dia ${d} de 28 ${d === cur ? "· hoje" : ""}</h1>
      <p class="sub">${esc(sem.d)}</p>
      <div class="days">${grid}</div>
      <div class="card green"><div class="pill alt">🌅 Café da manhã</div><div style="height:8px"></div>${recCard(dia.manha)}
        <div class="pill alt">🍎 Lanche</div><div style="height:8px"></div>${recCard(dia.lanche)}</div>
      <div class="card"><h3>✅ Hábito do dia</h3><p style="font-size:14px;margin-top:6px">${esc(HABITOS[d - 1])}</p></div>
      <button class="btn ${feito ? "ghost" : ""}" id="done">${feito ? "✔ Dia concluído (toque para desfazer)" : "Concluí hoje ✔"}</button>
      <div style="height:10px"></div>
      <a class="btn ghost" href="#/diario">📓 Registrar no diário</a>
      ${legal}`;
    view.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { location.hash = "#/hoje/" + b.dataset.d; });
    $("#done").onclick = () => { S.done[d] = !S.done[d]; save(); telaHoje(d); progresso(); if (S.done[d] && totalFeitos() === 28) alert("🎉 Parabéns! Você completou os 28 dias!"); };
  }

  function telaReceitas(filtro, busca) {
    filtro = filtro || "Todas"; busca = busca || "";
    const cats = ["Todas", ...new Set(RECEITAS.map(r => r.cat))];
    const lista = RECEITAS.filter(r => (filtro === "Todas" || r.cat === filtro) &&
      (r.nome + r.ing.map(i => i.n).join(" ")).toLowerCase().includes(busca.toLowerCase()));
    view.innerHTML = `<h1>Receitas com chia</h1><p class="sub">${RECEITAS.length} receitas com ingredientes, quantidades, preparo e rendimento.</p>
      <input type="search" id="q" placeholder="Buscar receita ou ingrediente" value="${esc(busca)}">
      <div class="chips">${cats.map(c => `<button class="${c === filtro ? "on" : ""}" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div>
      <div id="lista">${lista.map(r => recCard(r.id)).join("") || "<p class='sub'>Nenhuma receita encontrada.</p>"}</div>${legal}`;
    view.querySelectorAll("[data-c]").forEach(b => b.onclick = () => telaReceitas(b.dataset.c, $("#q").value));
    $("#q").oninput = e => {
      const q = e.target.value.toLowerCase();
      $("#lista").innerHTML = RECEITAS.filter(r => (filtro === "Todas" || r.cat === filtro) &&
        (r.nome + r.ing.map(i => i.n).join(" ")).toLowerCase().includes(q)).map(r => recCard(r.id)).join("") || "<p class='sub'>Nenhuma receita encontrada.</p>";
    };
  }

  function telaReceita(id) {
    const r = REC[id]; if (!r) return telaReceitas();
    const v = r.video && VIDEOS.find(x => x.id === r.video);
    view.innerHTML = `<a class="back" href="#/receitas">← Receitas</a>
      <div class="row"><div class="rec" style="margin:0;padding:0;border:0"><div class="em" style="width:64px;height:64px;font-size:34px">${r.emoji}</div></div>
      <div><h1>${esc(r.nome)}</h1></div></div>
      <div class="row" style="margin:12px 0;flex-wrap:wrap"><span class="pill">${esc(r.cat)}</span><span class="pill alt">⏱ ${esc(r.tempo)}</span><span class="pill alt">🍽 ${esc(r.rend)}</span></div>
      <h2>Ingredientes</h2><ul class="ing">${r.ing.map(i => `<li><span>${esc(i.n)}</span><span>${esc(i.q)}</span></li>`).join("")}</ul>
      <h2>Modo de preparo</h2><ol class="steps">${r.preparo.map(p => `<li>${esc(p)}</li>`).join("")}</ol>
      ${r.dica ? `<div class="tip">💡 <b>Dica:</b> ${esc(r.dica)}</div>` : ""}
      ${v ? `<h2>Veja o preparo</h2><div class="vgrid" style="grid-template-columns:${v.short ? "60%" : "1fr"};justify-content:center">${videoBlock(v, !v.short)}</div>` : ""}
      ${legal}`;
    bindVideos(view); window.scrollTo(0, 0);
  }

  function telaVideos() {
    const shorts = VIDEOS.filter(v => v.short), longos = VIDEOS.filter(v => !v.short);
    view.innerHTML = `<h1>Vídeos de preparo</h1><p class="sub">Toque no vídeo para assistir sem sair do app.</p>
      <h2 style="margin-top:6px">⚡ Shorts rápidos</h2><div class="vgrid">${shorts.map(v => videoBlock(v)).join("")}</div>
      <h2>🎥 Passo a passo</h2><div class="vgrid">${longos.map(v => videoBlock(v, true)).join("")}</div>${legal}`;
    bindVideos(view);
  }

  function telaCompras(sem) {
    sem = sem == null ? Math.floor((diaAtual() - 1) / 7) : +sem;
    const mapa = {};
    for (let d = sem * 7 + 1; d <= sem * 7 + 7; d++) {
      const x = receitasDoDia(d);
      [x.manha, x.lanche].forEach(id => REC[id].ing.forEach(i => {
        (mapa[i.n] = mapa[i.n] || []).push(REC[id].nome);
      }));
    }
    const itens = Object.keys(mapa).sort((a, b) => a.localeCompare(b, "pt-BR"));
    view.innerHTML = `<h1>Lista de compras</h1><p class="sub">Ingredientes das receitas da semana. Confira o que você já tem em casa.</p>
      <div class="chips">${SEMANAS.map((s, i) => `<button class="${i === sem ? "on" : ""}" data-s="${i}">Semana ${i + 1}</button>`).join("")}</div>
      <ul class="shop">${itens.map(n => {
        const k = sem + "|" + n, ck = S.shop[k];
        const rs = [...new Set(mapa[n])];
        return `<li class="${ck ? "ck" : ""}"><input type="checkbox" data-k="${esc(k)}" ${ck ? "checked" : ""}>
          <span>${esc(n)}<small>usado em ${mapa[n].length}× · ${esc(rs.slice(0, 2).join(", "))}${rs.length > 2 ? "…" : ""}</small></span></li>`;
      }).join("")}</ul>
      <div style="height:14px"></div>
      <button class="btn ghost" id="copy">📋 Copiar lista</button>
      <div style="height:8px"></div>
      <button class="btn ghost" id="clear">Limpar marcações</button>${legal}`;
    view.querySelectorAll("[data-s]").forEach(b => b.onclick = () => telaCompras(b.dataset.s));
    view.querySelectorAll("[data-k]").forEach(c => c.onchange = () => { S.shop[c.dataset.k] = c.checked; save(); c.closest("li").classList.toggle("ck", c.checked); });
    $("#clear").onclick = () => { itens.forEach(n => delete S.shop[sem + "|" + n]); save(); telaCompras(sem); };
    $("#copy").onclick = () => {
      const txt = "Lista de compras · Semana " + (sem + 1) + "\n" + itens.map(n => "☐ " + n).join("\n");
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => alert("Lista copiada!")).catch(() => prompt("Copie a lista:", txt));
    };
  }

  function telaDiario() {
    const hoje = hojeISO(); let e = S.diary[hoje] || { disp: 0, fome: 0, hab: {}, obs: "" };
    const emojiD = ["😞", "😕", "😐", "🙂", "😄"], emojiF = ["😌", "🙂", "😐", "😋", "🤤"];
    const regs = Object.keys(S.diary).sort().reverse();
    const ult = regs.slice(0, 14).reverse();
    const med = k => { const v = regs.map(r => S.diary[r][k]).filter(Boolean); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : "–"; };
    view.innerHTML = `<h1>Diário de acompanhamento</h1><p class="sub">Registre como você se sente. É só para você acompanhar sua rotina.</p>
      <div class="card"><h3>Hoje · ${fmtData(hoje)}</h3>
        <p class="sub" style="margin:10px 0 0">Como está sua disposição?</p>
        <div class="scale" data-k="disp">${emojiD.map((x, i) => `<button data-v="${i + 1}" class="${e.disp === i + 1 ? "on" : ""}">${x}</button>`).join("")}</div>
        <p class="sub" style="margin:0">Como está sua fome ao longo do dia? (1 = tranquila · 5 = muita)</p>
        <div class="scale" data-k="fome">${emojiF.map((x, i) => `<button data-v="${i + 1}" class="${e.fome === i + 1 ? "on" : ""}">${x}</button>`).join("")}</div>
        ${HABITOS_DIARIO.map(h => `<label class="chk"><input type="checkbox" data-h="${h.k}" ${e.hab[h.k] ? "checked" : ""}> ${h.t}</label>`).join("")}
        <p class="sub" style="margin:12px 0 6px">Observações</p>
        <textarea id="obs" placeholder="Ex.: como me senti, o que comi, o que funcionou…">${esc(e.obs)}</textarea>
        <div style="height:12px"></div><button class="btn" id="sv">Salvar registro</button></div>
      ${regs.length ? `<div class="stats"><div><b>${regs.length}</b><small>registros</small></div><div><b>${med("disp")}</b><small>disposição média</small></div><div><b>${med("fome")}</b><small>fome média</small></div></div>
        <h3>Disposição (últimos registros)</h3><div class="bars">${ult.map(r => `<i title="${fmtData(r)}" style="height:${(S.diary[r].disp || 0) * 20}%"></i>`).join("")}</div>
        <h2>Histórico</h2>${regs.slice(0, 20).map(r => { const x = S.diary[r]; return `<div class="hist"><b>${fmtData(r)}</b> ${x.disp ? emojiD[x.disp - 1] : ""} ${x.fome ? emojiF[x.fome - 1] : ""}
          <small>${HABITOS_DIARIO.filter(h => x.hab && x.hab[h.k]).map(h => h.t).join(" · ")}</small>${x.obs ? `<div>${esc(x.obs)}</div>` : ""}</div>`; }).join("")}` : ""}${legal}`;
    view.querySelectorAll(".scale").forEach(sc => sc.querySelectorAll("button").forEach(b => b.onclick = () => {
      e[sc.dataset.k] = +b.dataset.v; sc.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    }));
    view.querySelectorAll("[data-h]").forEach(c => c.onchange = () => { e.hab[c.dataset.h] = c.checked; });
    $("#sv").onclick = () => { e.obs = $("#obs").value.trim(); S.diary[hoje] = e; save(); telaDiario(); window.scrollTo(0, 0); };
  }

  function telaGuia() {
    view.innerHTML = `<h1>Guia de início</h1><p class="sub">Tudo o que você precisa saber para começar o programa.</p>
      ${GUIA.map((g, i) => `<details class="acc" ${i === 0 ? "open" : ""}><summary>${esc(g.t)}</summary><div>${g.p.map(p => `<p>${esc(p)}</p>`).join("")}</div></details>`).join("")}
      <div style="height:6px"></div>
      <button class="btn ghost" id="tour">▶ Rever a apresentação</button>
      <div style="height:8px"></div>
      <label class="sub" style="display:block;margin:14px 0 6px">Data de início do programa</label>
      <input type="date" id="start" value="${S.start}" max="${hojeISO()}">
      <div style="height:10px"></div>
      <button class="btn ghost" id="reset">Reiniciar programa (apaga progresso e diário)</button>${legal}`;
    $("#tour").onclick = onboarding;
    $("#start").onchange = e => { if (e.target.value) { S.start = e.target.value; save(); progresso(); alert("Data atualizada."); } };
    $("#reset").onclick = () => { if (confirm("Apagar todo o progresso e diário deste aparelho?")) { S = { start: hojeISO(), done: {}, shop: {}, diary: {} }; save(); progresso(); location.hash = "#/hoje"; } };
  }

  /* ---------- bônus (botão de download) ---------- */
  function telaBonus() {
    view.innerHTML = `<h1>🎁 Bônus</h1><p class="sub">Materiais extras para você continuar variando suas receitas.</p><div id="bn"></div>${legal}`;
    const box = $("#bn");
    for (const b of BONUS) {
      const ok = !!b.arquivo;
      box.insertAdjacentHTML("beforeend", `<div class="card green" style="text-align:center">
        <div style="font-size:46px">${b.emoji}</div><h2 style="margin:8px 0 4px">${esc(b.titulo)}</h2>
        <p class="sub" style="margin:0 0 14px">${esc(b.desc)}</p>
        ${ok ? `<a class="btn" href="${b.arquivo}" download>⬇ Baixar e-book (PDF)</a>` : `<button class="btn" disabled>Disponível em breve</button>`}</div>`);
    }
  }

  /* ---------- onboarding ---------- */
  function onboarding() {
    const passos = [
      ["🌱", "Bem-vinda ao Plano Chia", "28 dias de receitas simples com chia, hábitos leves e acompanhamento no seu ritmo."],
      ["📅", "Um passo por dia", "Na aba Hoje você vê a receita da manhã, a do lanche e um hábito. Toque em “Concluí hoje” ao terminar."],
      ["🥣", "Receitas e vídeos", "Veja ingredientes, quantidades, preparo e vídeos curtos de demonstração."],
      ["🛒", "Compras e diário", "Use a lista semanal para organizar as compras e o diário para registrar como você está se sentindo."],
      ["⚠️", "Importante", "Este programa é de educação alimentar. Não substitui médico ou nutricionista. Hidrate sempre a chia antes de consumir."]
    ];
    let i = 0; const m = $("#modal"); m.hidden = false;
    const draw = () => {
      const p = passos[i];
      m.innerHTML = `<div class="sheet" style="text-align:center"><div style="font-size:54px">${p[0]}</div><h1 style="margin:8px 0">${p[1]}</h1>
        <p class="sub">${p[2]}</p><div class="dots">${passos.map((_, k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</div>
        <button class="btn" id="nx">${i === passos.length - 1 ? "Começar" : "Continuar"}</button></div>`;
      $("#nx").onclick = () => { if (i < passos.length - 1) { i++; draw(); } else { m.hidden = true; m.innerHTML = ""; S.onb = true; save(); } };
    };
    draw();
  }

  /* ---------- roteador ---------- */
  function progresso() {
    $("#topProg").innerHTML = `<i style="width:${totalFeitos() / 28 * 100}%"></i>`;
  }
  function rota() {
    const [, r, a] = (location.hash || "#/hoje").split("/");
    document.querySelectorAll("#tabs a").forEach(l => l.classList.toggle("on", l.dataset.t === (r === "receita" ? "receitas" : r)));
    window.scrollTo(0, 0);
    switch (r) {
      case "receitas": return telaReceitas();
      case "receita": return telaReceita(a);
      case "videos": return telaVideos();
      case "compras": return telaCompras();
      case "diario": return telaDiario();
      case "guia": return telaGuia();
      case "bonus": return telaBonus();
      default: return telaHoje(a ? +a : null);
    }
  }
  window.addEventListener("hashchange", rota);
  progresso(); rota();
  if (!S.onb) onboarding();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
