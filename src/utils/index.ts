import { ethers } from "ethers";
/**
 * set delay for delayTimes
 * @param {Number} delayTimes - timePeriod for delay
 */
function delay(delayTimes: number | undefined) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

/**
 * change data type from Number to BigNum
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function toBigNum(value: string | number, d: number | undefined = 18) {
    return ethers.utils.parseUnits(String(value), d);
}

/**
 * change data type from BigNum to Number
 * @param {ethers.BigNum} value - data that need to be change
 * @param {Number} d - decimals
 */
function fromBigNum(value: any, d: number | undefined = 18) {
    return parseFloat(ethers.utils.formatUnits(value, d));
}

/**
 * change network in metamask
 */
const networks: any = {
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"]
    },
    fantom_test: {
        chainId: `0x${Number(4002).toString(16)}`,
        chainName: "Fantom Testnet",
        nativeCurrency: {
            name: "Fantom",
            symbol: "FTM",
            decimals: 18
        },
        rpcUrls: ["https://ftm-test.babylonswap.finance"],
        blockExplorerUrls: ["https://testnet.ftmscan.com/"]
    },
    evmos: {
        chainId: `0x${Number(9001).toString(16)}`,
        chainName: "Evmos Mainnet",
        nativeCurrency: {
            name: "EVMOS",
            symbol: "EVMOS",
            decimals: 18
        },
        rpcUrls: ["https://eth.bd.evmos.org:8545"],
        blockExplorerUrls: ["https://evm.evmos.org"]
    },
    evmos_test: {
        chainId: `0x${Number(9000).toString(16)}`,
        chainName: "Evmos Testnet",
        nativeCurrency: {
            name: "tEVMOS",
            symbol: "tEVMOS",
            decimals: 18
        },
        rpcUrls: ["https://eth.bd.evmos.dev:8545"],
        blockExplorerUrls: ["https://evm.evmos.dev"]
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrls: [
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed2.binance.org",
            "https://bsc-dataseed3.binance.org",
            "https://bsc-dataseed4.binance.org",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed2.defibit.io",
            "https://bsc-dataseed3.defibit.io",
            "https://bsc-dataseed4.defibit.io",
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed2.ninicoin.io",
            "https://bsc-dataseed3.ninicoin.io",
            "https://bsc-dataseed4.ninicoin.io",
            "wss://bsc-ws-node.nariox.org"
        ],
        blockExplorerUrls: ["https://bscscan.com"]
    }
};
const changeNetwork = async (networkName: string) => {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                ...networks[networkName]
            }
        ]
    });
};

/**
 * styled view 
 */
const styledString = (s: string) => {
    return s.slice(0, 4) + "..." + s.slice(-4)
}
const styledNumber = (s: number) => {
    return parseFloat(s.toFixed(8))
}

/**
 * convert second to HH:MM:SS
 */
function convertHMS(value: any) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours: any = Math.floor(sec / 3600); // get hours
    let minutes: any = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds: any = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}
export { delay, toBigNum, fromBigNum, changeNetwork, styledString, convertHMS, styledNumber };
