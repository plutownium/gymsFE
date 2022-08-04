import React from "react";
import "./Button.scss";

interface ButtonProps {
    type: "Transparent" | "Opaque";
    text: string;
}

function Button({ type, text }: ButtonProps) {
    return (
        <div>
            <div className={`buttonShared ${type === "Transparent" ? "transparentBg" : "opaqueBg"}`}>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Button;
