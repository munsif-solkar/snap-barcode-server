// core/scanner/scannerService.js
const {executeAutomation} = require('../automation/systemAutomation')

async function handleScan(code) {
  console.log("Scan received:", code);

  await executeAutomation(code);
}

module.exports = {handleScan}