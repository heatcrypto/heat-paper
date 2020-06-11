export const pdfTemplateHtml = `
<html>
  <head><style>{{ css }}</style></head>
  <body>
    <div class="page">
      <h2>Private Key Backup</h2>
      <small>This document (or 'paper wallet') contains crypto currency keys, keys give access to possibly valuable funds on blockchains like Bitcoin or Ethereum. 
      Safegaurd your funds <strong>do not throw away this document!</strong></small>
      <hr/>
      <p>To access the funds in this backup we advice you download HEAT mobile wallet for Android or IPhone from <b>https://heatwallet.com/app</b> or by visiting the app stores, 
      when installed go to 'Menu' -> 'Wallets' -> 'Import Existing Wallet' and scan the QR code in this document.</p>
      <h3>Backup Details</h3>
      <p>This backup was created on {{ date }}</p>
      <h4>Notes</h4>
      <p>{{ notes }}</p>
      <h3>Private Key</h3>
      <p>Below you find the private key in text and QR code format.</p>
      <p><b>Text format</b></p>
      <p class="monospace">{{ keyData }}</p>
      <p><b>QR format</b></p>
      <img width="250px" height="250px" src="{{ qrDataUri }}" />
    </div>
  </body>
</html>
`