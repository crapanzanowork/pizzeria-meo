// Genera tutte le pagine HTML. Uso: node build.mjs
import { writeFileSync } from 'node:fs';

const WA = 'https://wa.me/393494041264';
const wa = t => `${WA}?text=${encodeURIComponent(t)}`;
const WA_PANE = wa('Ciao! Vorrei ordinare del pane per domani. Mi potresti dire quali tipologie sono disponibili e come posso prenotarle? Grazie!');
const WA_RIST = wa('Buongiorno! Vi contatto dal vostro sito web perché sono interessato ad una possibile fornitura di pane e prodotti da forno per la mia attività.\n\nAvrei bisogno di...');
const MAPS_DIR = 'https://www.google.com/maps/dir//Pizzeria+Meo,+Via+Aurelio+Saffi,+4%2Fa,+60035+Jesi+AN';
const MAPS = 'https://www.google.com/maps/place/Pizzeria+Meo/@43.5223157,13.2401849,17z';
const IG = 'https://www.instagram.com/pizzeriameo/', FB = 'https://www.facebook.com/pizzeriameo';
const TEL = 'tel:+39073164304';

const NAV = [['prodotti', 'I prodotti'], ['storia', 'La storia'], ['come-lavoriamo', 'Come lavoriamo'], ['menu', 'Menu'], ['per-i-ristoranti', 'Per i ristoranti'], ['dove-siamo', 'Dove siamo']];

const ORARI = `
<section class="sec orari" data-reveal>
  <div class="wrap">
    <p class="eyebrow">Quando trovi cosa</p>
    <div class="orari-grid">
      <div class="card"><h2>Orari</h2>
        <ul class="plain"><li><b>Martedì–venerdì</b> 8–14 e 16.30–20.15</li><li><b>Sabato</b> 8–13 e 16.30–20.30</li><li><b>Domenica</b>, da ottobre a maggio: 16.30–20.15</li><li><b>Lunedì</b> chiuso</li></ul></div>
      <div class="card"><h2>Al banco</h2>
        <ul class="plain"><li><b>Pizza in teglia</b> dall'apertura, ore 8</li><li><b>Pane bianco</b> mercoledì–sabato, dalle 9</li><li><b>Pane integrale</b> mercoledì e sabato, dalle 9</li><li><b>Ciambelle di mosto</b> dalle 10.30, finché c'è il mosto</li></ul></div>
    </div>
    <p class="note">Il pane si prenota per telefono, meglio due giorni prima.</p>
    <p class="btns"><a class="btn" href="${TEL}">Chiamaci</a><a class="btn ghost" href="${MAPS_DIR}" target="_blank" rel="noopener">Come arrivare</a></p>
  </div>
</section>`;

const page = ({ file, title, desc, body, home }) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#DCE7E8">
<link rel="icon" href="assets/img/logo.png">
<link rel="preload" href="assets/fonts/fraunces.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body${home ? ' class="home"' : ''}>
<a class="skip" href="#main">Vai al contenuto</a>
<div class="progress" aria-hidden="true"></div>
<header class="top" data-header>
  <a class="logo" href="index.html" aria-label="Pizzeria Meo, home"><img src="assets/img/logo.png" alt="Pizzeria Meo, dal 1952" width="900" height="376"></a>
  <nav class="desk" aria-label="Principale">${NAV.map(([h, t]) => `<a href="${h}.html">${t}</a>`).join('')}</nav>
  <a class="btn call" href="${TEL}">Chiamaci</a>
  <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Apri il menu"><span></span><span></span></button>
</header>
<div class="overlay" id="menu" hidden>
  <nav aria-label="Menu a schermo intero">${NAV.map(([h, t]) => `<a href="${h}.html">${t}</a>`).join('')}<a href="index.html">Home</a></nav>
</div>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div><img class="flogo" src="assets/img/logo.png" alt="Pizzeria Meo" width="900" height="376"><p>A Jesi dal 1952</p></div>
    <div><p><a href="${MAPS}" target="_blank" rel="noopener">Via Aurelio Saffi 4/a<br>60035 Jesi (AN)</a></p><p><a href="${TEL}">Tel. 0731 64304</a><br><a href="${WA}">3494041264</a></p></div>
    <div><p><a href="${IG}" target="_blank" rel="noopener">Instagram</a><br><a href="${FB}" target="_blank" rel="noopener">Facebook</a></p><p><a href="privacy.html">Privacy</a> · <a href="cookie.html">Cookie</a></p></div>
  </div>
  <p class="wrap legal">© 2026 Pizzeria Meo. Powered by <a href="https://www.crapanzano.work/luce/siti-web/">Mattia Crapanzano</a>. Foto: Sarah Stierch (CC0) e Wikimedia Commons (CC BY 3.0).</p>
</footer>
<script src="assets/js/site.js"></script>
${home ? '<script type="module" src="assets/js/products3d.js"></script>' : ''}
</body>
</html>
`;

const head = (eyebrow, h1, lead) => `<section class="pagehead"><div class="wrap"><p class="eyebrow">${eyebrow}</p><h1 data-rise>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>`;

// ---------- HOME
const PRODUCTS = [
  ['Pizza in teglia', "Impasto con biga e farina del Molino Mariani, in teglia come nel 1952. La prima teglia è al banco alle 8."],
  ['Pane', 'Lievito madre, bianco e integrale. Da mercoledì a sabato, dalle 9. Per evitare sprechi è gradita la prenotazione.'],
  ['Calzoni e grasselli', 'Calzoni al forno e fritti. Pizzette con i grasselli, impastate con lo strutto, come da tradizione Jesina.'],
  ['Ciambelle di mosto', "Il mosto arriva da una cantina di Staffolo. Si fanno finché c'è, poi si aspetta la prossima vendemmia."],
];
const home = `
<section class="hero">
  <video autoplay muted loop playsinline preload="metadata" aria-hidden="true"><source src="assets/video/hero.mp4" type="video/mp4"></video>
  <div class="hero-in">
    <p class="eyebrow light">Pizzeria Meo</p>
    <h1 data-rise>Pizza al taglio<br>a Jesi dal 1952</h1>
    <a class="btn" href="#prodotti">Cosa trovi al banco</a>
  </div>
</section>

<section class="pin" id="prodotti" data-pin aria-label="Cosa trovi al banco">
  <div class="stage" data-stage>
    <div class="stage-head"><p class="eyebrow light">A Jesi dal 1952</p><h2>Cosa trovi al banco</h2></div>
    <canvas aria-hidden="true"></canvas>
    <div class="track" data-track>
      ${PRODUCTS.map(([t, d], i) => `<article class="pcard"><span class="num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
    <div class="stage-foot"><div class="dots" aria-hidden="true">${PRODUCTS.map(() => '<i data-dot></i>').join('')}</div><span class="hint">Scorri</span><a class="btn light" href="prodotti.html">Tutti i prodotti</a></div>
    <ul class="fallback">${PRODUCTS.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="sec split" data-reveal>
  <div class="wrap two">
    <div class="ph tilt"><img src="assets/img/pizza.jpg" alt="Pizza al taglio al banco, su taglieri di legno" loading="lazy" width="1200" height="1200"></div>
    <div><p class="eyebrow">Dal 1952</p><h2>Si chiama Meo per un motivo.</h2>
      <p>Nel 1952 Amedeo Riccitelli, per tutti Meo, apre la pizzeria. Dal 1972, per 34 anni, la porta avanti la famiglia Pergolesi. Nel 2006 arriviamo noi, la famiglia Angelelli: per tutti era ancora "da Meo", e le abbiamo ridato il suo nome, anche per ricordare Amedeo, che oggi non c'è più.</p>
      <a class="btn" href="storia.html">La nostra storia</a></div>
  </div>
</section>

<section class="sec split rev" data-reveal>
  <div class="wrap two">
    <div class="ph tilt"><img src="assets/img/pane.jpg" alt="Pagnotta di pane a lievito madre appena sfornata" loading="lazy" width="1200" height="1092"></div>
    <div><p class="eyebrow">Una famiglia, un laboratorio</p><h2>Una famiglia, un laboratorio.</h2>
      <p>Roberto fa la pizza in teglia. Lorenzo fa il pane e la stirata. Le ciambelle di mosto e la pizza al formaggio le fanno insieme. Patrizia sta al banco e cura il banco e la clientela.</p>
      <p>La teglia: impasto con biga e farina del Molino Paolo Mariani di Barbara. Il pane: solo lievito madre e farina Mariani. La prenotazione è gradita per evitare sprechi, grazie. Il pane che avanza lo portiamo alla Caritas di Jesi.</p>
      <a class="btn" href="come-lavoriamo.html">Come lavoriamo</a></div>
  </div>
</section>

<section class="sec band" data-reveal>
  <div class="wrap center"><p class="eyebrow light">Come lavoriamo</p><h2>Il nostro pane, a casa tua o nel tuo locale.</h2>
    <p>Il pane a lievito madre si prenota per telefono, meglio con due giorni di anticipo, e si ritira al banco dal mercoledì al sabato, dalle 9. Hai un ristorante o un locale? Raccontaci cosa ti serve e vediamo insieme cosa possiamo fare.</p>
    <p class="btns"><a class="btn light" href="${WA_PANE}" target="_blank" rel="noopener">Prenotalo</a><a class="btn ghost-l" href="${WA_RIST}" target="_blank" rel="noopener">Sei un ristoratore?</a></p></div>
</section>
${ORARI}`;

// ---------- PRODOTTI
const P_FULL = [
  ['Pizza in teglia', "Impasto indiretto con biga e farina del Molino Paolo Mariani di Barbara. È la pizza al taglio che si trovava qui nel 1952: stesso formato, in teglia, fatta con la tecnica di oggi. La prima teglia è al banco alle 8."],
  ['Alta idratazione', "Impasto all'80% di idratazione, lo stesso della stirata romana: alveoli larghi e crosta croccante. Formato 20×30 oppure ripiena."],
  ['Il pane', 'Pane a lievito madre, bianco e integrale, con farina del Molino Paolo Mariani di Barbara. Il lievito madre è un impasto di farina e acqua che rinfreschiamo ogni giorno: ha i suoi tempi, per questo vi chiediamo di prenotarlo.'],
  ['Calzoni e grasselli', 'Calzoni al forno e fritti, con prosciutto cotto e mozzarella. Le pizzette con i grasselli sono impastate con lo strutto, come si fa da queste parti.'],
  ['Ciambelle di mosto', 'Il mosto ce lo porta una cantina di Staffolo. Si fanno finché c\'è il mosto, poi si aspetta la vendemmia. Cavallo di battaglia.'],
  ['Pizza al formaggio', 'Solo pecorino, semi-stagionato, a pezzi e grattugiato. Quando è il suo momento, la trovi qui. Cavallo di battaglia.'],
];
const prodotti = head('Cosa trovi al banco', 'I prodotti', '') +
  `<section class="sec"><div class="wrap grid3">${P_FULL.map(([t, d]) => `<article class="card" data-reveal><h2>${t}</h2><p>${d}</p></article>`).join('')}</div></section>` + ORARI;

// ---------- STORIA
const storia = head('A Jesi dal 1952', 'La storia', "Una pizzeria al taglio nel centro storico di Jesi. In più di settant'anni è passata per tre famiglie, e oggi porta di nuovo il nome di chi l'ha aperta.") + `
<section class="sec"><div class="wrap narrow">
  <p class="eyebrow">Dal 1952 a oggi</p><h2>Il nome è tornato.</h2>
  <ol class="timeline">
    <li data-reveal><b>1952–1972 — Meo</b><p>Amedeo Riccitelli, per tutti Meo, apre la pizzeria.</p></li>
    <li data-reveal><b>1972–2006 — La famiglia Pergolesi</b><p>Per 34 anni la porta avanti la famiglia Pergolesi.</p></li>
    <li data-reveal><b>2006 — Torna Meo</b><p>Arriviamo noi, la famiglia Angelelli, e la gente continua a dire "andiamo da Meo". In 34 anni il nome non era cambiato nella testa di nessuno: non potevamo farlo noi. L'abbiamo richiamata Pizzeria Meo, anche per ricordare Amedeo, che oggi non c'è più.</p></li>
  </ol>
  <h2>Perché proprio qui.</h2>
  <p>Dal 2006 cerchiamo di onorare la memoria di Meo.</p>
  <p>Roberto aveva lavorato due anni al Forno Cerioni, in Vallesina, e da allora aveva un'idea fissa: mettersi in proprio. Patrizia veniva da un altro mestiere e l'ha seguito. Abbiamo visto l'annuncio su Portobello e siamo venuti ad assaggiare la pizza. Lorenzo, al primo morso: «Questa è la pizza più buona che abbia mai mangiato.» È per quel morso che abbiamo scelto proprio questa pizzeria.</p>
  <p>Oggi Roberto fa la teglia, Lorenzo il pane e l'alta idratazione. Le ciambelle di mosto e la pizza al formaggio le fanno insieme. Patrizia sta al banco con voi.</p>
  <p class="btns"><a class="btn" href="come-lavoriamo.html">Come lavoriamo</a></p>
</div></section>`;

// ---------- COME LAVORIAMO
const come = head('Come lavoriamo', 'Descriviamo quello che facciamo.', 'Come nascono i prodotti che trovate al banco, detto senza giri di parole.') + `
<section class="sec"><div class="wrap narrow">
  <h2>La teglia e l'alta idratazione</h2>
  <p>La teglia la fa Roberto: impasto indiretto con biga e farina del Molino Paolo Mariani di Barbara. È la pizza al taglio che si trovava qui nel 1952, stesso formato e stessa teglia, fatta con la tecnica di oggi. Alle 8, quando apriamo, la prima teglia è già al banco.</p>
  <p>L'alta idratazione la fa Lorenzo: un impasto all'80% di idratazione, lo stesso della stirata romana, con alveoli larghi e crosta croccante. Formato 20×30, non sottilissima.</p>
  <h2>Il pane</h2>
  <p>Il pane lo fa Lorenzo, solo con lievito madre e farina del Molino Paolo Mariani di Barbara, un molino della nostra zona che macina solo grano italiano. Il lievito madre va rinfrescato e aspettato: per questo il pane si prenota, possibilmente due giorni prima, così organizziamo gli impasti. Esce dal mercoledì al sabato, pronto per le 9. Quello che avanza lo portiamo alla Caritas di Jesi.</p>
  <h2>Ciambelle di mosto e pizze al formaggio</h2>
  <p>Le facciamo insieme, Roberto e Lorenzo. Il mosto per le ciambelle ce lo porta una cantina di Staffolo: si fanno finché c'è, poi si aspetta la vendemmia. Per la pizza al formaggio usiamo solo pecorino, semi-stagionato a pezzi e grattugiato.</p>
  <h2>Calzoni e grasselli</h2>
  <p>I calzoni li facciamo al forno e fritti, con prosciutto cotto e mozzarella. Le pizzette con i grasselli sono impastate con lo strutto, come si fa da queste parti.</p>
</div></section>`;

// ---------- MENU
const M = [
  ['Le classiche', '', [
    ['Cipolla', 'Base bianca, cipolla tagliata a mano a julienne', '1,50 €'], ['Pomodoro', 'Pomodoro e origano essiccato Wiberg', '1,50 €'], ['Rosmarino', 'Base bianca con rosmarino', '1,50 €'],
    ['Margherita', 'Pomodoro e mozzarella Sabelli', '1,80 €'], ['Salsiccia', 'Pomodoro, mozzarella Sabelli, salsiccia', '2,20 €'], ['Wurstel', 'Pomodoro, mozzarella Sabelli, wurstel', '2,20 €'],
    ['Salame piccante', 'Pomodoro, mozzarella Sabelli, salame piccante', '2,20 €'], ['Carciofini', 'Pomodoro, mozzarella Sabelli, carciofini a spicchi', '2,20 €'], ['Funghi', "Pomodoro, mozzarella Sabelli, funghi champignon sott'olio", '2,20 €'],
    ['Peperoni e salsiccia', 'Pomodoro, mozzarella Sabelli, peperoni, salsiccia', '2,50 €'], ['Friarielli e salsiccia', 'Pomodoro, mozzarella Sabelli, friarielli napoletani leggermente piccanti, salsiccia', '2,50 €'],
    ['Patate', 'Base bianca, patate fresche a fette, rosmarino Wiberg, mozzarella Sabelli', '2,00 €'], ['Patate e salsiccia', 'Base bianca, patate fresche a fette, rosmarino Wiberg, mozzarella Sabelli, salsiccia', '2,30 €'],
    ['Zucchine e pomodorini', 'Base bianca, zucchine fresche affettate a mano, cipolla rossa di Tropea, mozzarella Sabelli, pomodori ciliegino, olive nere denocciolate', '2,50 €'],
    ['Zucchine e salsiccia', 'Base bianca, zucchine fresche affettate a mano, cipolla rossa di Tropea, mozzarella Sabelli, salsiccia', '2,50 €'],
    ['Zucchine e peperoni', 'Base bianca, zucchine fresche affettate a mano, cipolla rossa di Tropea, mozzarella Sabelli, peperoni', '2,50 €']]],
  ['Le speciali', '', [
    ['Parmigiana', 'Pomodoro, mozzarella Sabelli, datterini saltati in padella, salsiccia, olive, parmigiano', '2,50 €'], ['Alici', 'Pomodoro, mozzarella Sabelli, alici, pomodori ciliegino, olive, frutto del cappero, origano essiccato Wiberg', '2,50 €'],
    ['Tonno e cipolla', 'Pomodoro, mozzarella Sabelli, tonno, cipolla di Tropea, capperi, origano essiccato Wiberg', '2,50 €'], ['Capricciosa', 'Pomodoro, mozzarella Sabelli, funghi champignon, carciofini, olive, prosciutto cotto', '2,50 €'],
    ['Funghi freschi e salsiccia', 'Pomodoro, mozzarella Sabelli, funghi freschi affettati a mano, mix di funghi (chiodini, porcini, champignon), salsiccia', '2,50 €'],
    ['Guanciale e datterini', 'Base bianca, mozzarella Sabelli, guanciale, datterini saltati in padella, rosmarino Wiberg', '2,50 €'], ['Guanciale e radicchio', 'Base bianca, mozzarella Sabelli, guanciale, crema di radicchio, rosmarino Wiberg', '2,50 €'],
    ['Funghi e scamorza', 'Base bianca, mozzarella Sabelli, mix di funghi (chiodini, porcini, champignon), scamorza affumicata Sabelli, salsiccia, rosmarino Wiberg', '2,50 €'],
    ['Scarola, olive e scamorza', 'Base bianca, mozzarella Sabelli, scarola brasata Demetra, olive Leccino denocciolate Demetra, scamorza affumicata Sabelli', '2,50 €'],
    ['Cacio e pepe', 'Base bianca, mozzarella Sabelli, crema di pecorino Demetra, salsiccia, guanciale, pepe cuvée Wiberg', '2,50 €'], ['Porcini e speck', 'Base bianca, mozzarella Sabelli, porcini, speck Trentino della Val di Fassa', '2,80 €'],
    ['Formaggi', 'Base bianca, mozzarella Sabelli, crema di pecorino Demetra, gorgonzola, parmigiano, scamorza affumicata Sabelli', '2,50 €'], ['Funghi e grana', 'Base bianca, mozzarella Sabelli, mix di funghi (chiodini, porcini, champignon), salsiccia, parmigiano', '2,50 €'],
    ['Ciauscolo e tartufo', 'Base bianca, mozzarella Sabelli, ciauscolo IGP, crema al tartufo, pecorino', '2,80 €'], ['Porcini e gorgonzola', 'Base bianca, mozzarella Sabelli, porcini, gorgonzola', '2,50 €'],
    ['Tartufo, porcini e salsiccia', 'Pomodoro, mozzarella Sabelli, salsa tartufata, porcini, salsiccia', '2,80 €']]],
  ['Stirata romana', "Impasto all'80% di idratazione, formato 20×30 cm. Disponibile in tutti i giorni di apertura.", [
    ['Formaggi', 'Base bianca, crema di pecorino Demetra, gorgonzola, mozzarella Sabelli, parmigiano, scamorza affumicata Sabelli, pepe cuvée Wiberg', '2,80 €'],
    ['Friarielli e scamorza', 'Base bianca, mozzarella Sabelli, friarielli napoletani, scamorza affumicata Sabelli', '2,80 €'], ['Ricotta, tartufo e guanciale', 'Base bianca, ricotta vaccina, crema al tartufo, guanciale croccante', '3,00 €'],
    ['Fave, pecorino e guanciale', 'Base bianca, crema di fave Demetra, pecorino, guanciale croccante', '3,00 €'], ['Focaccia ripiena', 'Mortadella e stracciatella Sabelli', '4,00 €'],
    ['Crema di porcini, gorgonzola e speck', 'Base bianca, crema di porcini, gorgonzola, porcini, speck Trentino della Val di Fassa', '3,00 €'], ['Carciofi e guanciale', 'Base bianca, crema di carciofi, carciofini a spicchi, mozzarella Sabelli, guanciale croccante', '2,80 €']]],
  ['Specialità', '', [
    ['Calzone al forno', 'Prosciutto cotto e mozzarella', '2,50 €'], ['Calzone fritto', 'Prosciutto cotto e mozzarella', '2,50 €'], ['Pizza al formaggio', 'Con pecorino semi-stagionato, a pezzi e grattugiato', 'al kg 20 €'],
    ['Pizzetta con i grasselli', 'Impasto con strutto e grasselli', '2,50 €'], ['Ciambella di mosto', "Con mosto di una cantina di Staffolo. Stagionale: dal martedì al sabato dalle 10.30, finché c'è il mosto", '1,90 €']]],
];
const menu = head('Pizza al taglio', 'Menu', '') + `<section class="sec"><div class="wrap narrow">${M.map(([h, n, items]) => `<h2 class="mh">${h}</h2>${n ? `<p class="note">${n}</p>` : ''}<ul class="menu">${items.map(([a, b, c]) => `<li data-reveal><span><b>${a}</b><small>${b}</small></span><em>${c}</em></li>`).join('')}</ul>`).join('')}</div></section>` + ORARI;

// ---------- RISTORANTI
const rist = head('Per i ristoratori', 'I nostri prodotti, nel tuo locale.', 'Sei un ristoratore e vorresti i nostri prodotti nel tuo locale? Raccontaci cosa ti serve: vediamo insieme cosa possiamo fare. Contattaci e ne parliamo.') + `
<section class="sec"><div class="wrap narrow"><p class="eyebrow">Come funziona</p><h2>Tre passaggi.</h2>
<ol class="steps"><li data-reveal>Ci chiami e ci racconti cosa ti serve: prodotti, quantità e giorni.</li><li data-reveal>Vediamo insieme cosa è fattibile e concordiamo formato e prezzo. Per il pane a lievito madre ci servono almeno due giorni per organizzare gli impasti.</li><li data-reveal>Lo prepariamo per te nei giorni stabiliti.</li></ol>
<p class="btns"><a class="btn" href="${TEL}">Chiamaci</a><a class="btn ghost" href="${WA_RIST}" target="_blank" rel="noopener">Scrivici su WhatsApp</a></p></div></section>`;

// ---------- DOVE SIAMO
const dove = head('Nel centro storico di Jesi', 'Dove siamo', '') + `<section class="sec"><div class="wrap narrow"><p class="addr">Via Aurelio Saffi 4/a, 60035 Jesi (AN)<br>Tel. <a href="${TEL}">0731 64304</a></p><p class="btns"><a class="btn" href="${MAPS_DIR}" target="_blank" rel="noopener">Come arrivare</a></p></div></section>` + ORARI;

// ---------- LEGALI (i testi di Wix erano segnaposto: sostituiti)
const priv = head('Ultimo aggiornamento: 11 novembre 2026', 'Privacy', '') + `<section class="sec"><div class="wrap narrow legalp">
<h2>Titolare</h2><p>Pizzeria Meo, Via Aurelio Saffi 4/a, 60035 Jesi (AN). Tel. 0731 64304.</p>
<h2>Dati trattati</h2><p>Questo sito non raccoglie dati personali: non ha moduli, account, cookie, statistiche né strumenti di terze parti. I pulsanti "Prenotalo" e "Sei un ristoratore?" aprono WhatsApp, "Chiamaci" avvia una telefonata: in quel momento i dati che invii sono trattati dal servizio che scegli di usare, secondo la sua informativa.</p>
<h2>Hosting</h2><p>Il sito è ospitato su GitHub Pages (GitHub, Inc., USA). Come ogni server web, il fornitore può registrare per breve tempo l'indirizzo IP dei visitatori per ragioni tecniche e di sicurezza.</p>
<h2>Link a terzi</h2><p>Mappe, Instagram, Facebook e WhatsApp sono link: solo se li apri passi a quei servizi, che hanno proprie informative.</p>
<h2>Diritti</h2><p>Puoi esercitare i diritti degli artt. 15-22 del Regolamento UE 2016/679 (accesso, rettifica, cancellazione, limitazione, opposizione, portabilità) scrivendo o telefonando al titolare, e proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).</p>
<p class="note">Testo informativo, non consulenza legale: da confermare con il titolare.</p></div></section>`;
const cookie = head('Ultimo aggiornamento: 11 novembre 2026', 'Cookie', '') + `<section class="sec"><div class="wrap narrow legalp">
<h2>Nessun cookie</h2><p>Questo sito non usa cookie né tecnologie di tracciamento, proprie o di terze parti, e non carica font, script o contenuti da servizi esterni. Per questo non compare alcun banner. Resta valido quanto indicato dalle linee guida del Garante del 10 giugno 2021.</p>
<h2>Accessibilità</h2><p>Il sito punta al livello WCAG 2.1 AA: struttura con titoli, testi alternativi, navigazione da tastiera, contrasti adeguati e animazioni ridotte quando il dispositivo lo richiede. Se trovi un ostacolo, chiamaci allo 0731 64304.</p></div></section>`;

const pages = [
  ['index', 'Pizzeria Meo | Pizza al taglio e pane a Jesi dal 1952', 'Pizza al taglio, pane a lievito madre, calzoni e ciambelle di mosto a Jesi, in Via Aurelio Saffi 4/a, dal 1952.', home, true],
  ['prodotti', 'I prodotti | Pizzeria Meo', 'Pizza in teglia, pane a lievito madre, calzoni, grasselli e ciambelle di mosto: cosa trovi al banco.', prodotti],
  ['storia', 'La storia | Pizzeria Meo', 'Dal 1952 a oggi: tre famiglie e un nome che è tornato, Meo.', storia],
  ['come-lavoriamo', 'Come lavoriamo | Pizzeria Meo', 'Biga, lievito madre e alta idratazione: come nascono i prodotti della Pizzeria Meo.', come],
  ['menu', 'Menu | Pizzeria Meo', 'Il menu della pizza al taglio: classiche, speciali, stirata romana e specialità, con prezzi.', menu],
  ['per-i-ristoranti', 'Per i ristoranti | Pizzeria Meo', 'Pane e prodotti da forno per ristoratori e locali a Jesi.', rist],
  ['dove-siamo', 'Dove siamo | Pizzeria Meo', 'Via Aurelio Saffi 4/a, Jesi: indirizzo, telefono e orari.', dove],
  ['privacy', 'Privacy | Pizzeria Meo', 'Informativa sulla privacy della Pizzeria Meo.', priv],
  ['cookie', 'Cookie e accessibilità | Pizzeria Meo', 'Nessun cookie; dichiarazione di accessibilità.', cookie],
];
for (const [file, title, desc, body, h] of pages) writeFileSync(`${file}.html`, page({ file, title, desc, body, home: h }));
console.log('Generate', pages.length, 'pagine');
