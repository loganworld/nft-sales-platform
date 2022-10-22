// by Logan <https://github.com/loganworld>
// at 19/08/2022

import { ethers } from "ethers";

export const supportChainId = Number(process.env.REACT_APP_CHAINID) || 4002;

const RPCS: any = {
    1: "https://main-light.eth.linkpool.io/",
    250: "https://rpc.ftm.tools/",
    4002: "https://ftm-test.babylonswap.finance",
    // 1337: "http://localhost:7545",
    // 31337: "http://localhost:8545/",
    9000: "https://eth.bd.evmos.dev:8545",
    9001: "https://eth.bd.evmos.org:8545",
};

const providers: any = {
    // 1: new ethers.providers.JsonRpcProvider(RPCS[1]),
    // 250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
    9000: new ethers.providers.JsonRpcProvider(RPCS[9000]),
    9001: new ethers.providers.JsonRpcProvider(RPCS[9001]),
    // 1337: new ethers.providers.JsonRpcProvider(RPCS[1337]),
    // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337]),
};

export const provider = providers[supportChainId];

