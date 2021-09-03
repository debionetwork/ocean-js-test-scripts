const Web3 = require("web3");
const { Ocean, DataTokens, Account } = require("@oceanprotocol/lib");

const { factoryABI } = require("@oceanprotocol/contracts/artifacts/DTFactory.json");
const { datatokensABI } = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json");
const { config, contracts, urls } = require("./config");


const init = async () => {
  const ocean = await Ocean.getInstance(config);
  //const blob = `http://localhost:8030/api/v1/services/consume`;
  const blob = `${config.providerUri}/api/v1/services/consume`;

  /*
  const accounts = await ocean.accounts.list();
  const alice = accounts[0].id;
  console.log('Alice account address:', alice)
  */

  const web3 = new Web3(urls.networkUrl)
  const debioDeployerPrivateKey = '1dbe12c7595d7577f92d7002a8d564b8d1aef33a0ebc26ef5a3dd828fd9ae2ae'
  const account = web3.eth.accounts.privateKeyToAccount('0x' + debioDeployerPrivateKey)

  web3.eth.accounts.wallet.add(account)
  web3.eth.defaultAccount = account.address

  const datatoken = new DataTokens(
    contracts.DTFactory,
    factoryABI,
    datatokensABI,
    web3
  );
  const tokenAddress = await datatoken.create(
    blob,
    account.address,
    null,
    'GeneToken', // name
    'GENE', // symbol
  );
  console.log(`Deployed datatoken address: ${tokenAddress}`);

  console.log(`Minting token`)
  await datatoken.mint(
    tokenAddress,
    account.address,
    '100', // amount
    account.address // toAddress
  )
  console.log('Token minted')

  let tokenBalance = await datatoken.balance(tokenAddress, account.address)
  console.log('Account token balance:', tokenBalance)

  let tokenName = await datatoken.getName(tokenAddress)
  console.log('tokenName:', tokenName)

  let tokenSymbol = await datatoken.getSymbol(tokenAddress)
  console.log('tokenSymbol', tokenSymbol)

  const testData = {
    main: {
      type: "dataset",
      name: "test-dataset",
      dateCreated: new Date(Date.now()).toISOString().split(".")[0] + "Z",
      author: "test",
      license: "MIT",
      files: [
        {
          url:
            "https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls",
          contentType: "xlsx",
        },
      ],
    },
  };

  try {
    const publishedDate = new Date(Date.now()).toISOString().split(".")[0] + "Z" // publishedDate
    const dataService = await ocean.assets.createAccessServiceAttributes(
      new Account(account),
      10, // set the price in datatoken
      publishedDate,
      0 // timeout
    );

    // publish asset
    const createData = await ocean.assets.create(
      testData,
      new Account(account),
      [dataService],
      tokenAddress
    );

    console.log(createData)
    //const dataId = createData.id;
    //console.log('Data ID:', dataId);
  } catch (err) {
    console.log(err)
  }
}

init();
