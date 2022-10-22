import { useState, useMemo, useEffect } from "react";
import {
    Stack,
    Typography
} from "@mui/material";
const TimePanel = ({ label, value }: any) => {
    return (
        <Stack sx={{ width: { xs: "60px", sm: "100px" } }} textAlign={"center"}>
            <Typography variant="h4">{value}</Typography>
            <Typography variant="subtitle2">{label}</Typography>
        </Stack>
    )
}

const TimePanels = ({ restTime }: any) => {
    const [seconds, setseconds] = useState(0);

    useEffect(() => {
        setseconds(restTime);
        const interval = setInterval(() => {
            setseconds(old => old <= 0 ? 0 : old - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [restTime]);

    const timeToString = useMemo(() => {
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d / 10 >= 1 ? String(d) : '0' + d;
        var hDisplay = h / 10 >= 1 ? String(h) : '0' + h;
        var mDisplay = m / 10 >= 1 ? String(m) : '0' + m;
        var sDisplay = s / 10 >= 1 ? String(s) : '0' + s;
        return { dDisplay, hDisplay, mDisplay, sDisplay };
    }, [seconds])
    return (
        <Stack direction={"row"} spacing={2}>
            <TimePanel label={"DAYS"} value={timeToString.dDisplay} />
            <TimePanel label={"HOURS"} value={timeToString.hDisplay} />
            <TimePanel label={"MINUTES"} value={timeToString.mDisplay} />
            <TimePanel label={"SECONDS"} value={timeToString.sDisplay} />
        </Stack>
    )
}
export default TimePanels;