import {
    Box, Stack,
    Typography
} from "@mui/material";


const InfoPanel = ({ title, value, description }: any) => {
    return (
        <Stack direction={"column"} alignItems="center" sx={{ flex: "1" }}>
            <Typography sx={{ m: "10px" }}>{title}</Typography>
            <Box sx={{ bgcolor: "primary.light", width: "100%" }} textAlign="center">
                <Typography sx={{ p: "10px" }}>{value}</Typography>
            </Box>
            <Stack direction={"row"} alignItems="center" justifyContent={"center"} sx={{ bgcolor: "black", width: "100%", height: "150px" }}>
                <Typography sx={{ p: "10px" }} textAlign={"center"}>{description}</Typography>
            </Stack>
        </Stack>
    )
}
export default InfoPanel;