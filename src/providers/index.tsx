import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useEffect,
} from "react";
import { ethers } from "ethers";
import { useWallet } from "use-wallet";

import { fromBigNum, toBigNum } from "../utils";
import {
    Stock
} from "../contract";

// create context
const BlockchainContext = createContext<any>({});

function reducer(state: any, { type, payload }: { type: any, payload: any }) {
    return {
        ...state,
        [type]: payload,
    };
}

const INIT_STATE: {
    signer: any,
    provider: any,
    account: string | null,
    balance: number,
    totalSupply: string
} = {
    signer: null,
    provider: null,
    account: null,
    balance: 0,
    totalSupply: "0"
};

// use contexts
export function useBlockchainContext() {
    return useContext(BlockchainContext);
}


export default function Provider({ children }: any) {
    const wallet = useWallet();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    // set signer
    useEffect(() => {
        (async () => {
            if (wallet.status === "connected") {
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();
                dispatch({
                    type: "signer",
                    payload: signer,
                });
                dispatch({
                    type: "provider",
                    payload: provider,
                });
                dispatch({
                    type: "account",
                    payload: wallet.account,
                });
                const account = wallet.account || "";
                let balance = await provider.getBalance(account);
                dispatch({
                    type: "balance",
                    payload: Number(fromBigNum(balance)),
                });
            } else {
                dispatch({
                    type: "signer",
                    payload: null,
                });
                dispatch({
                    type: "account",
                    payload: null,
                });
            }
        })();
    }, [wallet.status])

    useEffect(() => {
        updateSupply();
    }, []);

    const updateSupply = async () => {
        try {
            let supply = await Stock.totalSupply();
            dispatch({
                type: "totalSupply",
                payload: String(supply)
            })
        } catch (err: any) {
            console.log(err.message);
        }
    }
    /* ------- blockchain interaction functions ------- */
    // interact with smart contract
    const mintNFT = async (amount: number, price: any) => {
        if (!state.signer) throw new Error("Wallet isn't connected!");
        var tx = await Stock.connect(state.signer).mints(String(amount), { value: price });
        await tx.wait();
    }
    const getRestTime = async () => {
        return await Stock.getRestTime();
    }

    return (
        <BlockchainContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        dispatch,
                        mintNFT,
                        updateSupply,
                        getRestTime
                    },
                ],
                [state]
            )}
        >
            {children}
        </BlockchainContext.Provider >
    );
}
