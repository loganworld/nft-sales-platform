// by Logan <https://github.com/loganworld>
// at 19/08/2022

import { ethers } from "ethers";
import { Contract, Provider, setMulticallAddress } from "ethers-multicall";

import Abis from "./contracts/abis.json";
import Addresses from "./contracts/addresses.json";
import { provider, supportChainId } from "./providers";

setMulticallAddress(4002, "0x402C435EA85DFdA24181141De1DE66bad67Cdf12");
setMulticallAddress(9000, "0x1d32EB287a8c1B2e7cEFCBEc6beD7f808c3da7A5");
const multicallProvider = new Provider(provider, supportChainId);

// make contract objects
const Stock = new ethers.Contract(Addresses.Stock, Abis.Stock, provider)

const Stock_m = new Contract(Addresses.Stock, Abis.Stock);

const multicallHelper = async (calls: any) => {
    let results: any = [];
    for (let i = 0; i < calls.length; i += 100) {
        const sCalls = calls.slice(i, i + 100);
        const res = await multicallProvider.all(sCalls);
        results = [...results, ...res];
    }
    return results;
};

export {
    provider, multicallProvider,
    multicallHelper,
    Stock,
    Stock_m
};