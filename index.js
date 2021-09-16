const Web3 = require("web3");
const {
    Ocean,
    DataTokens
} = require("@oceanprotocol/lib");

const {
    factoryABI
} = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const {
    datatokensABI
} = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const {
    config,
    contracts,
    urls
} = require("./config");
const tokenDefinition = require('./tokens.json');
const { testData } = require("./data");

const init = async () => {
    try{
        const ocean = await Ocean.getInstance(config);
        const blob = `${urls.providerUri}/api/v1/services/consume`;
    
        const web3 = new Web3(urls.networkUrl);
        const accounts = await ocean.accounts.list();
    
        const alice = accounts[0].id;
        console.log('Alice account address:', alice)

        const datatoken = new DataTokens(
            contracts.DTFactory,
            factoryABI,
            datatokensABI,
            web3
        );
        const tokenAddress = await datatoken.create(
          blob,
          alice,
          null,
          tokenDefinition[0].name, // name
          tokenDefinition[0].ticker, // symbol
        );
        console.log(`Deployed datatoken address: ${tokenAddress}`);

        await datatoken.mint(tokenAddress, alice, '200', alice);
        let aliceBalance = await datatoken.balance(tokenAddress, alice);
        console.log('Alice token balance:', aliceBalance);

        const dataService = await ocean.assets.createAccessServiceAttributes(
            accounts[0],
            10, // set the price in datatoken
            new Date(Date.now()).toISOString().split(".")[0] + "Z", // publishedDate
            0 // timeout
        );
        
        // publish asset
        const createData = await ocean.assets.create(
            testData,
            accounts[0],
            [dataService],
            tokenAddress
        );
        
        const dataId = createData.id;
        console.log('Data ID:', dataId);

        const marketplace = accounts[1].id;
        console.log('Marketplace account address:', marketplace);

        await datatoken.approve(
            tokenAddress,
            marketplace, // marketplace address,
            '100', // marketplaceAllowance
            alice
         )
          
         const marketplaceAllowance = await datatoken.allowance(
            tokenAddress,
            alice,
            marketplace, // marketplace address,
         );
          
         console.log("Marketplace Allowance:", marketplaceAllowance);
    }
    catch(err){
      console.error(err)
    }
};

init();