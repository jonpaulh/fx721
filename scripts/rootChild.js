// Contracts
const root = artifacts.require("FxERC721RootTunnel")
const child = artifacts.require("FxERC721ChildTunnel")
const nft = artifacts.require("Nft")


const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
  try {
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()
    const nullBytes = "0x0000000000000000000000000000000000000000000000000000000000000000"
    const nullAddress = "0x0000000000000000000000000000000000000000"

    const network = config.network;

    if (network == 'goerli') {
      // Get child address on mumbai from artifact
      let childAddress =  child.networks['80001'].address
      
      // Fetch the deployed token
      const rootContract = await root.deployed()  
      const fxChildTunnel = await rootContract.fxChildTunnel()

      // set fxChildTunnel address from the mumbai network
      if(fxChildTunnel == nullAddress) {
        await rootContract.setFxChildTunnel(childAddress, { from: accounts[0] })
      }

      // Mint 2 NFTs
      const nftContract = await nft.deployed()
      await nftContract.safeMint(accounts[0], { from: accounts[0] })
      await nftContract.safeMint(accounts[0], { from: accounts[0] })  

      // Approve FxRoot and Deposit 1 NFT
      await nftContract.setApprovalForAll(rootContract.address, true, { from: accounts[0] })


      await rootContract.mapToken(nftContract.address)
      let mappedAddress = await rootContract.rootToChildTokens(nftContract.address)
      console.log(mappedAddress)
      await rootContract.deposit(nftContract.address, accounts[0], 0, nullBytes, { from: accounts[0] })
    }

    if (network == 'mumbai') {
      // Get root address on goerli from artifact
      let rootAddress =  root.networks['5'].address

      // Fetch the deployed token
      const childContract = await child.deployed()
      await childContract.setFxRootTunnel(rootAddress, { from: accounts[0] })
    }
  }
  catch(error) {
    console.log(error)
  }

  callback()
}