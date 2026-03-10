
const fs = require('fs');
const path = require('path');

// Mock data mapping (simplified for test)
const S = {
    fp: [
        { label: 'ZOETIS', natId: 66, ccId: 50, hist: 'MAT. LABORATORIO- ZOETIS COMECIO E DISTRIBUICAO LTDA- NF- {NF}- Material para o Hospital Veterinário' },
        { label: 'SALLUS', natId: 66, ccId: 50, hist: 'MAT. LABORATORIO-SALLUS MEDICAL DISTR PROD MED HOSPITALAR-NF {NF}-BOLETO-MATERIAL DE REPOSICAO' },
        { label: 'ENEL', natId: 152, ccId: 60, hist: 'ENERGIA- ENEL- MES {MES_ANO}' },
        { label: 'VIVO', natId: 154, ccId: 60, hist: 'TELEFONE- VIVO- FATURA {NF}' },
        { label: 'CONNECT', natId: 157, ccId: 11, hist: 'INTERNET- CONNECT- NF {NF}' }
    ]
};

function getSupplierSuggestion(name) {
    if (!name) return null;
    const q = name.toUpperCase();
    const fp = S.fp.find(x => q.includes(x.label.toUpperCase()) || x.label.toUpperCase().includes(q));
    if (fp) return { natId: fp.natId, ccId: fp.ccId, hist: fp.hist };
    return null;
}

function cleanSupplierName(n) {
    if (!n) return '';
    return n.toString()
        .replace(/^(?:NF\s*)?(\d+)\s*[-–:]\s*/i, '')
        .replace(/^0*(\d{1,8})\b/, '')
        .replace(/\.pdf$/i, '')
        .trim();
}

const dir = 'C:\\Users\\agled\\Downloads\\drive-download-20260309T215103Z-3-001';
const files = fs.readdirSync(dir);

console.log('--- TEST RESULTS ---');
files.forEach(f => {
    const cleanName = cleanSupplierName(f);
    const sugg = getSupplierSuggestion(cleanName);
    if (sugg) {
        console.log(`[MATCH] File: ${f}`);
        console.log(`        Suggested Nat: ${sugg.natId}, CC: ${sugg.ccId}`);
        console.log(`        Template: ${sugg.hist}`);
    } else {
        console.log(`[NO MATCH] File: ${f}`);
    }
});
