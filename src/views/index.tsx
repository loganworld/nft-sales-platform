import { useState, useMemo, useCallback, useEffect } from "react";
import {
    Box, Stack,
    Divider,
    Typography,
    Button,
    IconButton
} from "@mui/material";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SubIcon from '@mui/icons-material/HorizontalRule';

import { useBlockchainContext } from "../providers";
import TimePanels from "./components/timePanel";
import { ActionButton1, ActionButton2 } from "../components/buttons";
import TankImg from "../assets/img/tank55.webp"
import { fromBigNum, styledNumber, styledString, toBigNum } from "../utils";
import { AddNotification } from "../utils/views";
import InfoPanel from "./components/infoPanel";

const MyTankPage = () => {
    const [state, { mintNFT, updateSupply, getRestTime }] = useBlockchainContext();
    const [restTime, setRestTime] = useState(0);
    const [status, setStatus] = useState({
        amount: 1,
        price: 0.3
    })

    useEffect(() => {
        (async () => {
            let _restTime = await getRestTime();
            console.log(_restTime);
            setRestTime(Number(_restTime))
        })()
    }, []);
    const addAmount = () => {
        if (status.amount + 1 > 10) return;
        setStatus({ ...status, amount: status.amount + 1 })
    }
    const subAmount = () => {
        if (status.amount - 1 <= 0) return;
        setStatus({ ...status, amount: status.amount - 1 })
    }
    const setMax = () => { setStatus({ ...status, amount: 10 }) }

    const mint = async () => {
        try {
            if (!state.signer) throw new Error("Please Connect metamask!");
            await mintNFT(status.amount, toBigNum(status.price).mul(status.amount));
            updateSupply();
            AddNotification("Sucess", status.amount + " Founder NFT is minted", "success")
        } catch (err: any) {
            console.log(err.code);
            var errMsg: any = err.message;
            switch (err.code) {
                case "ACTION_REJECTED":
                case -32603:
                    errMsg = "User reject Transaction"; break;
                case "UNPREDICTABLE_GAS_LIMIT":
                    errMsg = "Invalid parameters"; break;
            }
            AddNotification("Failed", errMsg, "warning")
        }
    }

    const mintDisabled = useMemo(() => {
        return state.balance < status.price * status.amount || !state.signer
    }, [state, state.balance, state.signer])


    return (
        <Box>
            <Stack
                marginTop={"30px"}
                spacing={2}
                // direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h3" color={"black"} fontWeight="600" >DefiTankLand Founder NFT Presale!</Typography>
                <Typography color={"black"} textAlign={"center"}>Congratulations, you are on of the lucky few who made it to our WhiteList! <br /> You are able to mint up to 10 NFTs at the price of ({status.price}) BNB</Typography>
                <TimePanels restTime={restTime} />
                <Box margin={"20px!important"} />
                <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }} justifyContent="center" gap="50px">
                    <Panel>
                        <Box sx={{
                            p: "40px"
                        }}>
                            <Stack textAlign={"center"} spacing={3}>
                                <Stack textAlign={"center"}>
                                    <Typography variant="h4">Pre-sale mint</Typography>
                                    <Typography>{state.totalSupply} NFT's Minted</Typography>
                                </Stack>
                                <DataField>
                                    <Typography>BALANCE</Typography>
                                    <Typography>{styledNumber(state.balance)} BNB</Typography>
                                </DataField>
                                <Divider sx={{ borderBottomWidth: "3px", borderColor: "white" }} />
                                <DataField>
                                    <Typography>Amount</Typography>
                                    <Stack direction={"row"} alignContent="center" alignItems={"center"} spacing={{ sx: 0, sm: 1 }}>
                                        <IconButton sx={buttonType} color="primary" onClick={subAmount} disabled={status.amount === 1}><SubIcon sx={{ fontSize: "10px" }} /></IconButton >
                                        <Box sx={{ ...buttonType, p: "10px", fontSize: "20px" }}>{status.amount}</Box>
                                        <IconButton sx={buttonType} color="primary" onClick={addAmount} disabled={status.amount === 10}><AddIcon sx={{ fontSize: "10px" }} /> </IconButton >
                                        <IconButton sx={{ ...buttonType, p: "10px", fontSize: "20px" }} color="primary" onClick={setMax}>MAX</IconButton >
                                    </Stack>
                                </DataField>
                                <Divider sx={{ borderBottomWidth: "3px", borderColor: "white" }} />
                                <DataField>
                                    <Typography>TOTAL</Typography>
                                    <Typography>{styledNumber(status.amount * status.price)} BNB</Typography>
                                </DataField>
                                <Divider sx={{ borderBottomWidth: "3px", borderColor: "white" }} />
                                <ActionButton2 disabled={mintDisabled} onClick={mint}>MINT</ActionButton2>
                            </Stack>
                        </Box>
                    </Panel>
                    <Panel>
                        <Box
                            component="img"
                            src={TankImg}
                            alt="DeFiTankLand"
                            sx={{
                                textAlign: "center",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                marginInline: "auto",
                                borderRadius: "30px"
                            }}
                        />
                    </Panel>
                </Box>
                <Box sx={{ mt: "50px!important", mb: "100px!important" }}>
                    <Stack
                        direction={{ xs: "column", lg: "row" }}
                        justifyContent="center"
                        sx={{ maxWidth: "1500px" }}
                        spacing={2}
                    >
                        <InfoPanel title={"TOTAL"} value={"1000"} description={"Total 1000 FounderNFT is issued for DeFiTankLand."} />
                        <InfoPanel title={"ROLE"} value={"STOCK"} description={"Founder NFT holders are considered shareholders."} />
                        <InfoPanel title={"USECASE"} value={"VARIOUS"} description={"FounderNFT holder will get discount in presale and Voting power on development process."} />
                    </Stack>
                </Box>
            </Stack >
        </Box >
    );
};
export const DataField = styled((props: any) => (
    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} {...props} />
))(({ theme }) => ({}));

const Panel = styled(Box)(({ theme }) => ({
    flex: "1 1 50%",
    maxWidth: "500px",
    backgroundColor: "#00000099",
    borderRadius: "30px"
}));

const buttonType = { borderRadius: "15px", border: "1px solid white", color: "white" }

export default MyTankPage;
