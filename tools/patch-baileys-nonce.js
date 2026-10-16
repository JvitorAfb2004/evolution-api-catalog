// Faz o Baileys emitir 'business.ctwa-nonce' quando o WhatsApp empurra a notificacao
// <wa_ad_account_nonce>, primeiro passo do access_token de ad-account usado pelas
// mutations de catalogo (graph.facebook.com). Idempotente.
//
// Uso: node tools/patch-baileys-nonce.js [caminho/messages-recv.js]
const fs = require('fs');
const path = require('path');

const inImage = '/evolution/node_modules/baileys/lib/Socket/messages-recv.js';
const fallback = path.join(__dirname, '..', 'node_modules', 'baileys', 'lib', 'Socket', 'messages-recv.js');
const target = process.argv[2] || (fs.existsSync(inImage) ? inImage : fallback);

if (!fs.existsSync(target)) {
  console.error('PATCH: arquivo nao encontrado:', target);
  process.exit(1);
}

const code = fs.readFileSync(target, 'utf8');

if (code.includes('business.ctwa-nonce')) {
  console.log('PATCH: ja aplicado em', target);
  process.exit(0);
}

const anchor = 'const [child] = getAllBinaryNodeChildren(node);';
if (!code.includes(anchor)) {
  console.error('PATCH: anchor nao encontrado em', target);
  process.exit(1);
}

const inject =
  anchor +
  "\n        try { for (const _c of getAllBinaryNodeChildren(node)) { if (_c && _c.tag === 'wa_ad_account_nonce') { ev.emit('business.ctwa-nonce', { nonce: _c.content ? Buffer.from(_c.content).toString('utf-8') : undefined }); } } } catch (_e) {}";

fs.writeFileSync(target, code.replace(anchor, inject));
console.log('PATCH: aplicado em', target);
