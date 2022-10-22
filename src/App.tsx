import { UseWalletProvider } from "use-wallet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";

import BlockchainProvider from "./providers";
import ThemeProvider from "./providers/theme";
import NavBar from "./components/navbar";
import BGIMG from "./assets/img/bg.webp";
import MyTankPage from "./views";
import "./App.scss";

const Providers = ({ children }: any) => {
    return (
        <ThemeProvider>
            <ReactNotifications />
            <UseWalletProvider
                autoConnect={true}
                connectors={{
                    injected: { chainId: [Number(process.env.REACT_APP_CHAINID) || 4002] },
                    walletconnect: {
                        rpc: {
                            1: "https://main-light.eth.linkpool.io/"
                        },
                    },
                }}
            >
                <BlockchainProvider>{children}</BlockchainProvider>
            </UseWalletProvider>
        </ThemeProvider>
    );
};
function App() {
    return (
        <Box sx={{ display: "flex" }}>
            <Providers>
                <BackgroundTag>
                    <BackgroundImageTag src={BGIMG} alt="" />
                    <BackgroundColorTag />
                </BackgroundTag>
                <Router>
                    <NavBar />
                    <Box
                        sx={{
                            marginTop: "80px",
                            paddingInline: { sm: "30px" },
                            flex: 1,
                        }}
                    >
                        <Routes>
                            <Route path="/" element={<MyTankPage />} />
                        </Routes>
                    </Box>
                </Router>
            </Providers>
        </Box>
    );
}

const BackgroundTag = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
}));

const BackgroundImageTag = styled("img")(({ theme }) => ({
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: "0.4",
}));

const BackgroundColorTag = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    position: "fixed",
    left: 0,
    top: 0,
    opacity: "0.7",
    width: "100%",
    height: "100%",
}));

export default App;
