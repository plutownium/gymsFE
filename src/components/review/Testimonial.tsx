import React from "react";

import "./Review.scss";

interface TestimonialProps {
    text: string;
    valueReporter: Function;
    triggerSubmit: Function;
}

function Testimonial({ text, valueReporter, triggerSubmit }: TestimonialProps) {
    return (
        <div className="px-8 mt-3">
            <div className="mb-2">
                <h3 className="flex justify-start">{text}</h3>
            </div>
            <div className="">
                <textarea
                    className="feedbackTextArea textAreaShared"
                    onChange={e => {
                        valueReporter(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            triggerSubmit();
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Testimonial;
