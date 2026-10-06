/* Conteúdo do app: receitas, calendário, guia e vídeos.
   Edite este arquivo para trocar textos, receitas e vídeos. */

const I = (n, q) => ({ n, q });

const RECEITAS = [
  /* ===== BEBIDAS ===== */
  { id: "agua-chia-limao", nome: "Água de chia com limão", cat: "Bebidas", emoji: "🍋", tempo: "15 min", rend: "1 copo (300 ml)",
    ing: [I("Chia", "1 colher (sopa)"), I("Água", "300 ml"), I("Limão", "1/2 unidade (suco)"), I("Mel (opcional)", "1 colher (chá)")],
    preparo: ["Coloque a chia no copo com a água e mexa bem.", "Espere 10 a 15 minutos, mexendo uma vez no meio do tempo, até formar um gel leve.", "Esprema o limão, adoce com mel se quiser e misture.", "Beba em seguida, de preferência gelada."],
    dica: "Sempre hidrate a chia antes de beber. Chia seca em excesso pode causar desconforto." },
  { id: "cha-gelado-chia", nome: "Chá gelado de hibisco com chia", cat: "Bebidas", emoji: "🧊", tempo: "20 min", rend: "2 copos",
    ing: [I("Chia", "2 colheres (sopa)"), I("Chá de hibisco (sachê)", "2 unidades"), I("Água quente", "500 ml"), I("Gelo", "a gosto"), I("Laranja", "1/2 unidade (suco)")],
    preparo: ["Faça o chá com os sachês e a água quente e deixe 5 minutos.", "Retire os sachês e deixe esfriar.", "Misture a chia ao chá frio e espere 10 minutos.", "Acrescente o suco de laranja e o gelo e sirva."],
    dica: "Dá para deixar pronto na geladeira por até 2 dias." },

  /* ===== PUDINS ===== */
  { id: "pudim-basico", nome: "Pudim de chia básico", cat: "Pudins", emoji: "🥣", tempo: "5 min + 3 h", rend: "2 porções",
    ing: [I("Chia", "4 colheres (sopa)"), I("Leite (ou bebida vegetal)", "1 xícara (240 ml)"), I("Mel ou adoçante", "1 colher (sopa)"), I("Essência de baunilha", "1/2 colher (chá)"), I("Frutas picadas", "1/2 xícara")],
    preparo: ["Misture a chia, o leite, o mel e a baunilha em um pote.", "Mexa bem, espere 10 minutos e mexa de novo para não empelotar.", "Tampe e leve à geladeira por pelo menos 3 horas (ou de um dia para o outro).", "Sirva com as frutas por cima."],
    dica: "Prepare 2 potes de uma vez e deixe o do dia seguinte pronto.", video: "e97KTX5Py9Q" },
  { id: "pudim-coco-manga", nome: "Pudim de chia com coco e manga", cat: "Pudins", emoji: "🥭", tempo: "5 min + 3 h", rend: "2 porções",
    ing: [I("Chia", "4 colheres (sopa)"), I("Leite de coco", "1 xícara (240 ml)"), I("Manga madura", "1 unidade pequena"), I("Mel", "1 colher (sopa)"), I("Coco ralado", "1 colher (sopa)")],
    preparo: ["Misture a chia, o leite de coco e o mel.", "Mexa após 10 minutos e leve à geladeira por 3 horas.", "Bata metade da manga no liquidificador até virar creme e pique o resto.", "Monte em camadas: pudim, creme de manga e manga picada. Finalize com coco ralado."],
    dica: "Mamão ou abacaxi funcionam no lugar da manga.", video: "P56eVNWXyNY" },
  { id: "pudim-cacau-banana", nome: "Pudim de chia com cacau e banana", cat: "Pudins", emoji: "🍫", tempo: "5 min + 3 h", rend: "2 porções",
    ing: [I("Chia", "4 colheres (sopa)"), I("Leite (ou bebida vegetal)", "1 xícara (240 ml)"), I("Cacau em pó 100%", "1 colher (sopa)"), I("Banana", "1 unidade madura"), I("Mel", "1 colher (sopa)")],
    preparo: ["Amasse a banana com um garfo e misture ao leite, ao cacau e ao mel.", "Acrescente a chia e mexa bem.", "Mexa de novo após 10 minutos e leve à geladeira por 3 horas.", "Sirva com rodelas de banana."],
    dica: "Se ficar espesso demais, acrescente um pouco de leite antes de servir." },
  { id: "pudim-iogurte-vermelhas", nome: "Pudim de chia com iogurte e frutas vermelhas", cat: "Pudins", emoji: "🫐", tempo: "5 min + 3 h", rend: "2 porções",
    ing: [I("Chia", "3 colheres (sopa)"), I("Iogurte grego natural", "1 pote (100 g)"), I("Leite (ou bebida vegetal)", "100 ml"), I("Frutas vermelhas", "1/2 xícara"), I("Mel", "1 colher (sopa)")],
    preparo: ["Misture o iogurte, o leite e o mel até ficar homogêneo.", "Acrescente a chia, mexa e espere 10 minutos.", "Mexa novamente e leve à geladeira por 3 horas.", "Cubra com as frutas vermelhas na hora de servir."],
    dica: "Frutas vermelhas congeladas servem e podem ser usadas descongeladas.", video: "SN8NIocqK8g" },
  { id: "pudim-maracuja", nome: "Pudim de chia com maracujá", cat: "Pudins", emoji: "💛", tempo: "5 min + 3 h", rend: "2 porções",
    ing: [I("Chia", "4 colheres (sopa)"), I("Leite (ou bebida vegetal)", "1 xícara (240 ml)"), I("Maracujá", "1 unidade (polpa)"), I("Mel", "2 colheres (sopa)")],
    preparo: ["Misture a chia, o leite e 1 colher de mel.", "Mexa depois de 10 minutos e leve à geladeira por 3 horas.", "Misture a polpa do maracujá com o mel restante.", "Sirva o pudim com a calda de maracujá por cima."],
    dica: "Passe a polpa na peneira se não quiser as sementes do maracujá." },
  { id: "pudim-morango", nome: "Pudim de chia com morango", cat: "Pudins", emoji: "🍓", tempo: "5 min + 3 h", rend: "2 porções",
    ing: [I("Chia", "4 colheres (sopa)"), I("Leite (ou bebida vegetal)", "1 xícara (240 ml)"), I("Morango", "1 xícara"), I("Mel", "1 colher (sopa)")],
    preparo: ["Bata metade dos morangos com o leite e o mel.", "Misture a chia ao creme de morango.", "Mexa após 10 minutos e leve à geladeira por 3 horas.", "Sirva com os morangos restantes picados."],
    dica: "Fica bonito servido em copo transparente, em camadas." },

  /* ===== VITAMINAS ===== */
  { id: "vit-banana-chia", nome: "Vitamina de banana com chia e canela", cat: "Vitaminas", emoji: "🍌", tempo: "5 min", rend: "1 copo grande",
    ing: [I("Banana", "1 unidade"), I("Leite (ou bebida vegetal)", "250 ml"), I("Chia hidratada", "1 colher (sopa)"), I("Canela em pó", "1 pitada"), I("Gelo", "3 pedras")],
    preparo: ["Deixe a chia de molho em 3 colheres de água por 10 minutos.", "Bata a banana, o leite, a canela e o gelo no liquidificador.", "Acrescente a chia hidratada e bata só 3 segundos, para manter as sementes inteiras.", "Sirva na hora."],
    dica: "Congele a banana em rodelas para uma vitamina mais cremosa.", video: "ZgI0lw2IsGc" },
  { id: "vit-maca-aveia", nome: "Vitamina de maçã, aveia e chia", cat: "Vitaminas", emoji: "🍎", tempo: "5 min", rend: "1 copo grande",
    ing: [I("Maçã", "1 unidade sem sementes"), I("Aveia em flocos", "1 colher (sopa)"), I("Chia hidratada", "1 colher (sopa)"), I("Leite (ou bebida vegetal)", "250 ml"), I("Canela em pó", "1 pitada")],
    preparo: ["Hidrate a chia em 3 colheres de água por 10 minutos.", "Bata a maçã com casca, a aveia, o leite e a canela.", "Misture a chia hidratada e sirva."],
    dica: "Mantenha a casca da maçã: tem fibras.", video: "2teCgeMFvSU" },
  { id: "vit-mamao-laranja", nome: "Vitamina de mamão com laranja e chia", cat: "Vitaminas", emoji: "🍊", tempo: "5 min", rend: "1 copo grande",
    ing: [I("Mamão papaia", "1/2 unidade"), I("Laranja", "1 unidade (suco)"), I("Chia hidratada", "1 colher (sopa)"), I("Gelo", "3 pedras")],
    preparo: ["Hidrate a chia em 3 colheres de água por 10 minutos.", "Bata o mamão, o suco de laranja e o gelo.", "Misture a chia e sirva."],
    dica: "Ótima opção de lanche da tarde, sem leite." },
  { id: "vit-abacate-limao", nome: "Vitamina de abacate com limão e chia", cat: "Vitaminas", emoji: "🥑", tempo: "5 min", rend: "1 copo grande",
    ing: [I("Abacate maduro", "1/2 unidade"), I("Leite (ou bebida vegetal)", "200 ml"), I("Limão", "1/2 unidade (suco)"), I("Chia hidratada", "1 colher (sopa)"), I("Mel", "1 colher (chá)")],
    preparo: ["Hidrate a chia em 3 colheres de água por 10 minutos.", "Bata o abacate, o leite, o suco de limão e o mel.", "Misture a chia hidratada e sirva gelada."],
    dica: "Use pouca quantidade de mel: o abacate já tem textura cremosa." },
  { id: "suco-verde-chia", nome: "Suco verde com abacaxi, hortelã e chia", cat: "Vitaminas", emoji: "🥬", tempo: "5 min", rend: "1 copo grande",
    ing: [I("Couve", "1 folha"), I("Abacaxi", "2 fatias"), I("Hortelã", "5 folhas"), I("Água de coco", "200 ml"), I("Chia hidratada", "1 colher (sopa)")],
    preparo: ["Hidrate a chia em 3 colheres de água por 10 minutos.", "Bata a couve, o abacaxi, a hortelã e a água de coco.", "Coe se preferir e misture a chia.", "Sirva gelado."],
    dica: "Retire o talo da couve para o suco ficar mais suave." },

  /* ===== IOGURTES ===== */
  { id: "iogurte-frutas-chia", nome: "Iogurte com frutas e chia", cat: "Iogurtes", emoji: "🍨", tempo: "5 min", rend: "1 porção",
    ing: [I("Iogurte natural", "1 pote (170 g)"), I("Chia", "1 colher (sopa)"), I("Frutas picadas", "1/2 xícara"), I("Mel", "1 colher (chá)")],
    preparo: ["Misture o iogurte e a chia e deixe descansar 10 minutos.", "Coloque em uma tigela e acrescente as frutas.", "Finalize com um fio de mel."],
    dica: "Prepare a mistura de iogurte com chia na noite anterior.", video: "4l1fXCsHmdI" },
  { id: "iogurte-chia-mel", nome: "Iogurte com chia e mel", cat: "Iogurtes", emoji: "🍯", tempo: "5 min", rend: "1 porção",
    ing: [I("Iogurte natural", "1 pote (170 g)"), I("Chia", "1 colher (sopa)"), I("Mel", "1 colher (chá)"), I("Granola sem açúcar", "2 colheres (sopa)")],
    preparo: ["Misture o iogurte, a chia e o mel.", "Espere 10 minutos para a chia hidratar.", "Cubra com a granola na hora de comer, para ela ficar crocante."],
    dica: "Receita rápida para o lanche entre as refeições.", video: "wTdmnvVv0sY" },
  { id: "iogurte-manga-bowl", nome: "Bowl de iogurte com manga e coco", cat: "Iogurtes", emoji: "🥥", tempo: "7 min", rend: "1 porção",
    ing: [I("Iogurte grego natural", "1 pote (100 g)"), I("Manga madura", "1/2 unidade"), I("Chia", "1 colher (sopa)"), I("Coco ralado", "1 colher (sopa)")],
    preparo: ["Misture o iogurte com a chia e espere 10 minutos.", "Pique a manga em cubos.", "Monte a tigela com o iogurte, a manga e o coco ralado."],
    dica: "Congele cubos de manga para usar o ano todo." },
  { id: "iogurte-morango-aveia", nome: "Iogurte com morango, aveia e chia", cat: "Iogurtes", emoji: "🍓", tempo: "7 min", rend: "1 porção",
    ing: [I("Iogurte natural", "1 pote (170 g)"), I("Morango", "5 unidades"), I("Aveia em flocos", "1 colher (sopa)"), I("Chia", "1 colher (sopa)")],
    preparo: ["Misture o iogurte, a aveia e a chia e espere 10 minutos.", "Fatie os morangos.", "Sirva o iogurte com os morangos por cima."],
    dica: "Dá uma refeição leve e saciante para o início da tarde.", video: "KYAc7ZIGKws" },

  /* ===== OUTRAS ===== */
  { id: "overnight-oats", nome: "Aveia dormida (overnight oats) com chia", cat: "Café da manhã", emoji: "🥛", tempo: "5 min + noite", rend: "1 porção",
    ing: [I("Aveia em flocos", "4 colheres (sopa)"), I("Chia", "1 colher (sopa)"), I("Leite (ou bebida vegetal)", "150 ml"), I("Iogurte natural", "2 colheres (sopa)"), I("Frutas picadas", "1/2 xícara")],
    preparo: ["Em um pote, misture a aveia, a chia, o leite e o iogurte.", "Tampe e leve à geladeira de um dia para o outro.", "De manhã, mexa, acrescente as frutas e coma gelado ou aqueça 1 minuto."],
    dica: "Prepare 3 potes no domingo para os dias mais corridos.", video: "myomQiyiJB0" },
  { id: "mingau-chia", nome: "Mingau de aveia com chia", cat: "Café da manhã", emoji: "🍲", tempo: "10 min", rend: "1 porção",
    ing: [I("Aveia em flocos", "3 colheres (sopa)"), I("Chia", "1 colher (sopa)"), I("Leite (ou bebida vegetal)", "250 ml"), I("Canela em pó", "1 pitada"), I("Banana", "1/2 unidade")],
    preparo: ["Leve o leite e a aveia ao fogo baixo, mexendo por 5 minutos.", "Desligue e acrescente a chia e a canela. Misture.", "Deixe descansar 5 minutos para engrossar.", "Sirva com banana em rodelas."],
    dica: "Ótimo para dias frios." },
  { id: "panqueca-banana-chia", nome: "Panqueca de banana com chia", cat: "Café da manhã", emoji: "🥞", tempo: "15 min", rend: "2 porções (4 panquecas)",
    ing: [I("Banana", "2 unidades maduras"), I("Ovo", "2 unidades"), I("Aveia em flocos", "3 colheres (sopa)"), I("Chia", "1 colher (sopa)"), I("Canela em pó", "1 pitada")],
    preparo: ["Amasse as bananas e misture com os ovos.", "Acrescente a aveia, a chia e a canela e mexa.", "Aqueça uma frigideira antiaderente em fogo baixo.", "Despeje porções de massa, doure 2 a 3 minutos de cada lado e sirva."],
    dica: "Sirva com iogurte e frutas. Para versão sem ovo, troque cada ovo por 1 colher de chia hidratada em 3 colheres de água." },
  { id: "geleia-chia", nome: "Geleia de chia com frutas", cat: "Café da manhã", emoji: "🍓", tempo: "15 min + 1 h", rend: "1 pote (200 ml)",
    ing: [I("Morango (ou outra fruta)", "1 xícara"), I("Chia", "2 colheres (sopa)"), I("Limão", "1/2 unidade (suco)"), I("Mel", "1 colher (sopa)")],
    preparo: ["Amasse as frutas em uma panela e leve ao fogo baixo por 5 minutos.", "Desligue, acrescente o suco de limão e o mel.", "Misture a chia e espere 15 minutos.", "Coloque em um pote de vidro e leve à geladeira por 1 hora."],
    dica: "Dura até 5 dias na geladeira em pote bem fechado. Combina com pão integral, tapioca e iogurte." }
];

const REC = Object.fromEntries(RECEITAS.map(r => [r.id, r]));
const ORDEM = RECEITAS.map(r => r.id);

/* ===== CALENDÁRIO DE 28 DIAS ===== */
const SEMANAS = [
  { t: "Semana 1 · Primeiros passos", d: "Aprenda a hidratar a chia e crie o hábito do dia a dia." },
  { t: "Semana 2 · Criando rotina", d: "Receitas rápidas para encaixar na sua manhã e no lanche." },
  { t: "Semana 3 · Variando o cardápio", d: "Misture sabores, texturas e frutas diferentes." },
  { t: "Semana 4 · Consolidando", d: "Monte seu próprio ritmo e escolha suas favoritas." }
];

const HABITOS = [
  "Beba 2 litros de água ao longo do dia. Comece agora, com um copo ao acordar.",
  "Hidrate a chia sempre antes de consumir (10 a 15 minutos).",
  "Prepare 2 potes de pudim e deixe o de amanhã pronto na geladeira.",
  "Faça uma caminhada leve de 20 minutos hoje.",
  "Troque um doce industrializado por uma fruta.",
  "Faça sua lista de compras da próxima semana (use a aba Compras).",
  "Dia de descanso: escolha sua receita favorita da semana e repita.",
  "Tente comer sem celular ou TV pelo menos em uma refeição.",
  "Deixe a garrafa de água sempre à vista.",
  "Mastigue devagar. Observe seus sinais de fome e saciedade.",
  "Faça 20 minutos de movimento que você goste (dança, caminhada, bicicleta).",
  "Experimente uma fruta que você não come há tempos.",
  "Registre no diário como está sua disposição hoje.",
  "Dia de descanso: prepare 3 potes de aveia dormida para a semana.",
  "Durma pelo menos 7 horas esta noite.",
  "Inclua uma verdura ou legume no almoço e no jantar.",
  "Reduza o açúcar adicionado: experimente metade do mel da receita.",
  "Faça um alongamento de 10 minutos pela manhã.",
  "Leve um lanche com chia na bolsa para evitar improvisos.",
  "Releia suas anotações no diário e veja o que está funcionando.",
  "Dia de descanso: reorganize a cozinha para facilitar o preparo.",
  "Escolha uma receita nova e prepare para alguém da família.",
  "Beba um copo de água antes de cada refeição principal.",
  "Faça uma caminhada em um lugar diferente.",
  "Prepare duas receitas ao mesmo tempo (ex.: pudim e geleia).",
  "Escolha as 3 receitas que mais gostou e anote no diário.",
  "Dia de descanso: planeje como manter o hábito depois dos 28 dias.",
  "Parabéns! Complete o diário e escolha como continuar sua rotina."
];

function receitasDoDia(d) {          // d = 1..28
  const manha = d === 1 ? "agua-chia-limao" : d === 2 ? "pudim-basico" : d === 3 ? "iogurte-frutas-chia"
              : ORDEM[(d * 4) % ORDEM.length];
  let lanche = ORDEM[(d * 4 + 10) % ORDEM.length];   // 4 e 21 são coprimos: percorre todas as receitas
  if (lanche === manha) lanche = ORDEM[(d * 4 + 11) % ORDEM.length];
  return { manha, lanche };
}

/* ===== GUIA DE INÍCIO ===== */
const GUIA = [
  { t: "Como funciona o programa", p: ["São 28 dias com uma orientação por dia: uma receita para a manhã, uma para o lanche e um hábito simples.", "Abra a aba Hoje, siga o cartão do dia e toque em “Concluí hoje” ao terminar.", "Se perder um dia, siga em frente. O importante é a constância, não a perfeição."] },
  { t: "Como usar a chia", p: ["Quantidade comum: 1 a 2 colheres de sopa por dia. Comece com 1 e observe como seu corpo reage.", "Hidrate sempre: misture a chia com líquido por 10 a 15 minutos, até formar um gel. Evite comer chia seca.", "Beba água ao longo do dia. A chia tem muita fibra e precisa de líquido."] },
  { t: "Como organizar a rotina", p: ["No domingo: veja a lista de compras da semana (aba Compras) e adiante 2 ou 3 potes de pudim ou aveia dormida.", "Deixe a chia e as frutas à vista para facilitar.", "Use os vídeos curtos para ver o preparo antes de cozinhar."] },
  { t: "Como guardar", p: ["Chia seca: pote fechado, local fresco e seco.", "Pudins, geleias e aveia dormida: geladeira, em pote fechado, por até 3 a 5 dias.", "Vitaminas e sucos: beba na hora."] },
  { t: "Cuidados importantes", p: ["Este programa é de educação alimentar e hábitos. Não substitui consulta com médico ou nutricionista, e não promete resultados.", "Gestantes, lactantes, crianças, pessoas com doenças, alergias ou em uso de medicamentos devem consultar um profissional antes de mudar a alimentação.", "Pare de usar e procure um profissional se sentir qualquer desconforto."] }
];

/* ===== VÍDEOS (YouTube) ===== */
// short: true = formato vertical. "Fonte" mostra o link original no YouTube.
const VIDEOS = [
  { id: "e97KTX5Py9Q", titulo: "Pudim de chia", rec: "pudim-basico", short: true },
  { id: "P56eVNWXyNY", titulo: "Pudim de chia com manga e mirtilo", rec: "pudim-coco-manga", short: true },
  { id: "SN8NIocqK8g", titulo: "Pudim de chia com iogurte grego", rec: "pudim-iogurte-vermelhas", short: true },
  { id: "4l1fXCsHmdI", titulo: "Iogurte natural com chia e frutas", rec: "iogurte-frutas-chia", short: true },
  { id: "wTdmnvVv0sY", titulo: "Chia com iogurte e mel", rec: "iogurte-chia-mel", short: true },
  { id: "ZgI0lw2IsGc", titulo: "Vitamina de banana com chia, cacau e canela", rec: "vit-banana-chia", short: false },
  { id: "2teCgeMFvSU", titulo: "Vitamina de banana, maçã, linhaça e chia", rec: "vit-maca-aveia", short: false },
  { id: "s1XgN5CDkR0", titulo: "Água de chia com limão", rec: "agua-chia-limao", short: false },
  { id: "myomQiyiJB0", titulo: "Aveia dormida com frutas", rec: "overnight-oats", short: false },
  { id: "KYAc7ZIGKws", titulo: "Iogurte com frutas, aveia e chia", rec: "iogurte-morango-aveia", short: false }
];

/* ===== BÔNUS (PDFs) =====
   Coloque o arquivo na pasta app/bonus/ e ajuste "arquivo" abaixo.
   Para adicionar outro bônus, copie um bloco e troque os dados. */
const BONUS = [
  { id: "receitas-200", emoji: "📚", titulo: "E-book: 200 receitas fit",
    desc: "100 receitas salgadas e 100 doces, para variar o cardápio depois dos 28 dias.",
    arquivo: "bonus/200-receitas.pdf" }
];

/* ===== DIÁRIO ===== */
const HABITOS_DIARIO = [
  { k: "agua", t: "💧 Bebi bastante água" },
  { k: "chia", t: "🌱 Usei chia hidratada" },
  { k: "mov", t: "🚶 Me movimentei" },
  { k: "sono", t: "😴 Dormi bem" }
];
