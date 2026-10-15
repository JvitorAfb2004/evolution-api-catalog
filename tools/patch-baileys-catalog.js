// Patch TEMPORARIO de diagnostico: faz o productCreate do Baileys jogar o JSON cru
// da resposta do WhatsApp no erro, para descobrir por que a criacao de produto falha.
// Uso: RUN node this-file.js dentro do Dockerfile.catalog. Remover depois.
const fs = require('fs');

const target = '/evolution/node_modules/baileys/lib/Socket/business.js';
const anchor = "const productCatalogAddNode = getBinaryNodeChild(result, 'product_catalog_add');";

const source = fs.readFileSync(target, 'utf8');
if (!source.includes(anchor)) {
  console.error('PATCH: anchor nao encontrado em ' + target);
  process.exit(1);
}

const patched = source.replace(
  anchor,
  anchor + " if(!productCatalogAddNode){throw new Error('RAW_RESULT=' + JSON.stringify(result))}",
);

fs.writeFileSync(target, patched);
console.log('PATCH: baileys productCreate instrumentado');
