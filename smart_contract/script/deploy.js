const main = async () => {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.waitForDeployment(); // Replace .deployed() with this
    console.log("Transactions deployed to:", await transactions.getAddress()); // Use getAddress() for ethers v6
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();