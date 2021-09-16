const { ConfigHelper } = require("@oceanprotocol/lib");
const Web3 = require("web3");
const defaultConfig = new ConfigHelper().getConfig("development");
 
const urls = {
 networkUrl: "https://network.ocean.debio.network",
 aquarius: "https://aquarius.ocean.debio.network",
 providerUri: "https://provider.ocean.debio.network",
};
 
const contracts = {
  "DTFactory": "0xBb0911124E680D65358Ac46C5404D4dF01F03e80",
  "BFactory": "0x91EB42b164664cB28a09B0cF9651b404Ee105afA",
  "FixedRateExchange": "0x9C2a015129969c98E9A5BcBEb61A5F907FF5b629",
  "Metadata": "0x611f28Ef25D778aFC5a0034Aea94297e2c215a42",
  "Dispenser": "0xe749E2f8482810b11B838Ae8c5eb69e54d610411",
  "Ocean": "0x1e6d9207241DbDca82B0D9546490c97B24B1a9f6"
};
 
const config = {
 ...defaultConfig,
 metadataCacheUri: urls.aquarius,
 providerUri: urls.providerUri,
 web3Provider: new Web3(urls.networkUrl),
};
 
module.exports = {
 config,
 contracts,
 urls,
};