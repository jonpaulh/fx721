const TokenEth = artifacts.require('Nft.sol');
const TokenPoly = artifacts.require('FxNft.sol');
const Root = artifacts.require('FxERC721RootTunnel.sol');
const Child = artifacts.require('FxERC721ChildTunnel.sol');

module.exports = async function (deployer, network, addresses) {
	let _checkpointManager, _fxRoot, _fxChild;

  	if(network === 'goerli') {
  		// set vars
  		_checkpointManager = "0x2890bA17EfE978480615e330ecB65333b880928e";
  		_fxRoot = "0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA";

  		// Deploy ERC721 on eth
	    await deployer.deploy(TokenEth);
	    const tokenEth = await TokenEth.deployed();

	    // deploy fxroot with _checkpointManager, _fxRoot and address of ERC721
	    await deployer.deploy(Root, _checkpointManager, _fxRoot, TokenPoly.networks['80001'].address);
	    const root = await Root.deployed();
  	}

  	if(network === 'mumbai') {
  		// set vars
	  	_fxChild = "0xCf73231F28B7331BBe3124B907840A94851f9f11";

	  	// deploy ERC721 on Poly
	    await deployer.deploy(TokenPoly);
	    const tokenPoly = await TokenPoly.deployed();

	    // deploy fxchild with _fxChild and address of ERC721
	    await deployer.deploy(Child, _fxChild, tokenPoly.address);
	    const child = await Child.deployed();
  	}


  	/*
  	if(network === 'ethereum') {
	  	_checkpointManager = "0x86e4dc95c7fbdbf52e33d563bbdb00823894c287";
	  	_fxRoot = "0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2";

	    await deployer.deploy(TokenEth);
	    const tokenEth = await TokenEth.deployed();


	    await tokenEth.mint(addresses[0], 1000);
	    await deployer.deploy(BridgeEth, tokenEth.address);
	    const bridgeEth = await BridgeEth.deployed();
	    await tokenEth.updateAdmin(bridgeEth.address);
 	}

  	if(network === 'matic') {
	  	_fxChild = "0x8397259c983751DAf40400790063935a11afa28a";
	    await deployer.deploy(TokenPoly);
	    const tokenPoly = await TokenBsc.deployed();
	    await deployer.deploy(BridgeBsc, tokenPoly.address);
	    const bridgeBsc = await BridgeBsc.deployed();
	    await tokenPoly.updateAdmin(bridgeBsc.address);
  	}
  	*/
};
