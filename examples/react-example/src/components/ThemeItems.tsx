import "./ThemeItems.css";
import { theme } from "../theme";
import { ThemeItemBox } from "./ThemeItemBox";

export const ThemeItem = () => (
    <div className="ThemeItems">
        {Object.entries(theme).map(([key, values]) => (
            <ThemeItemBox key={key} name={key} cssLikeProperties={values} />
        ))}
    </div>
);