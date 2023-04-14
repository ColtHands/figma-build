import { CSSProperties } from "react";
import "./ThemeItemBox.css";

interface Props {
    name: string;
    cssLikeProperties: CSSProperties;
}

export const ThemeItemBox = ({ name, cssLikeProperties }: Props) => {
    return (
        <div className="ThemeItemBox">
            <div className="example" style={cssLikeProperties}>
                Result example
            </div>
            <div className="description">
                <code className="properties">{JSON.stringify({[name]:cssLikeProperties}, null, "\t")}</code>
            </div>
        </div>
    );
};