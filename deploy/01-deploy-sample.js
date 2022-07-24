// const { getNamedAccounts, deployments, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments, network, ethers }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const currentTimestampInSeconds = Math.round(Date.now() / 1000)
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

    const lockedAmount = ethers.utils.parseEther("1")

    log("----------------------------------------------------")
    log("Deploying Lock Contract and waiting...")
    const Lock = await deploy("Lock", {
        from: deployer,
        args: [unlockTime],
        log: true,
        value: lockedAmount,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Lock deployed at ${Lock.address}`)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(fundMe.address, [ethUsdPriceFeedAddress])
    // }
}

module.exports.tags = ["all", "lock"]
