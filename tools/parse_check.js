const fs = require('fs');
const { parse } = require('@babel/parser');
const path = 'c:/Users/Admin/Desktop/Loan-Web/src/pages/EMI-Calculator/PersonalEMI.jsx';
const out = 'c:/Users/Admin/Desktop/Loan-Web/tools/parse_error.txt';
try {
  const s = fs.readFileSync(path, 'utf8');
  parse(s, { sourceType: 'module', plugins: ['jsx'] });
  fs.writeFileSync(out, 'Parsed OK');
} catch (e) {
  fs.writeFileSync(out, `ERROR:\n${e.message}\nLine: ${e.loc && e.loc.line}, Column: ${e.loc && e.loc.column}\n` + e.codeFrame || '');
  process.exit(1);
}