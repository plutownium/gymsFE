import React from "react";
import Button from "../button/Button";

interface NavigationBtnProps {
    currentPage: number;
    totalPages: number;
    changePgHandler: Function;
    resetActive?: Function;
}

const NavigationBtns: React.FC<NavigationBtnProps> = ({ currentPage, totalPages, changePgHandler, resetActive }) => {
    return (
        <div className="flex">
            <div
                onClick={() => {
                    console.log("new pg:", currentPage - 1);
                    if (currentPage > 1) {
                        changePgHandler(currentPage - 1);
                        if (resetActive) {
                            resetActive(null);
                        }
                    }
                }}
                className="mr-4"
            >
                <Button type={"Transparent"} text={"Back"} />
            </div>
            <div
                onClick={() => {
                    console.log("new pg:", currentPage + 1);
                    if (currentPage < totalPages) {
                        changePgHandler(currentPage + 1);
                        if (resetActive) {
                            resetActive(null);
                        }
                    }
                }}
            >
                <Button type={"Opaque"} text={"Next"} />
            </div>
        </div>
    );
};

export default NavigationBtns;
