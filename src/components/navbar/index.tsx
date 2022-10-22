import { useWallet } from "use-wallet";
import { AppBar, Toolbar, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { changeNetwork } from "../../utils";
import { HeaderButton } from "../buttons";
import { useBlockchainContext } from "../../providers";

const NavBar = () => {
    const wallet = useWallet();
    const [state, { dispatch }] = useBlockchainContext();

    const connectToMetamask = async () => {
        wallet.connect().then((res) => {
            (async () => {
                try {
                    //if metamask is connected and wallet is not connected ( chain error))
                    if (wallet.status === "error") {
                        var accounts = await window.ethereum.request({
                            method: "eth_accounts",
                        });
                        if (accounts.length > 0) {
                            await changeNetwork("fantom_test");
                            wallet.connect();
                        }
                    }
                } catch (err: any) {
                    console.log(err.message);
                }
            })();
        });
    };
    const connectToWalletConnect = async () => {
        wallet.connect("walletconnect");
    };

    const disconnect = async () => {
        wallet.reset();
    };

    const openMobileSidebar = () => {
        dispatch({
            type: "mobileOpen",
            payload: true,
        });
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar>
                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: "none" }, flexGrow: 1 }}
                    onClick={openMobileSidebar}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{ flex: 1 }}></div>
                {wallet.status !== "connected" ? (
                    <Stack spacing={2} direction="row">
                        <HeaderButton onClick={connectToMetamask}>
                            connect wallet
                        </HeaderButton>
                        {/* <HeaderButton variant="outlined" onClick={connectToWalletConnect}>connect to wallet connect</HeaderButton> */}
                    </Stack>
                ) : (
                    <Stack spacing={2} direction="row">
                        <HeaderButton onClick={disconnect}>
                            disconnect
                        </HeaderButton>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
