import { GradientFunctionType } from "../../types";

export const directionMap: Record<GradientFunctionType, string> = {
    "linear-gradient": "180deg",
    "radial-gradient": "50% 50% at 50% 50%",
    "conic-gradient": "from 180deg at 50% 50%"
}