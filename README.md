<div align="center">
<img src="https://avatars.githubusercontent.com/u/31523682?s=200&v=4">
</div>

<div align="Center">
<h1> Ocean.js Test Scripts</h1>
<h2> How To Publish Datasets on the Ocean Protocol </h2>
Test script made to publish biomedical data on Ocean Protocol

<br>  
<br>

[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)
</div>

---

Simple test scripts based on the Ocean.js tutorial to post datasets on DeBio's self-hosted Ocean Protocol node.

- [The complete and comprehensive beginners guide by Ocean](https://github.com/oceanprotocol/ocean.js/blob/main/docs/beginners_guide.md)

## Prerequisites

- node.js
- git

## Steps to Run Test Script

Clone this repository:

```shell
git clone https://github.com/debionetwork/ocean-js-test-scripts.git
```

Get inside the `ocean-js-test-scripts` directory:

```shell
cd ocean-js-test-scripts
```

Install the dependencies using `npm`:

```shell
npm install
```

Run the script:

```shell
node index.js
```

And *voila!* you have successfully added a new data token and dataset on DeBio's self-hosted Ocean Protocol node.

Results more or less should look like this:

```
Alice account address: 0xe2DD09d719Da89e5a3D0F2549c7E24566e947260
Deployed datatoken address: 0x0126B3c291c64a48B2CD681F34426A86d3Bcd020
Alice token balance: 200
Data ID: did:op:0126B3c291c64a48B2CD681F34426A86d3Bcd020
Marketplace account address: 0xBE5449a6A97aD46c8558A3356267Ee5D2731ab5e
Marketplace Allowance: 100
```