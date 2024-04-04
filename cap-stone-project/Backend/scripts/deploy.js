const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    
    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());
  
    const supplyChainContractFactory = await hre.ethers.getContractFactory('SupplyChain');
    const supplyChainContract = await supplyChainContractFactory.deploy({
      value: 0,
    });
    await supplyChainContract.deployed();
  
    console.log('SupplyChain address: ', supplyChainContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();