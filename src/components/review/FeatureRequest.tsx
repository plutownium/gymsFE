import React from "react";

interface FeatureRequestProps {
    answerOneReporter: Function;
    answerTwoReporter: Function;
    triggerSubmit: Function;
}

const FeatureRequest: React.FC<FeatureRequestProps> = ({ answerOneReporter, answerTwoReporter, triggerSubmit }: FeatureRequestProps) => {
    return (
        <div className="px-8 pt-3">
            <div className="mb-2 mt-2">
                <h2 className="text-left text-md">Feature Request</h2>
            </div>
            <div>
                <div className="pb-1">
                    <h3 className="text-left">Which feature would you like to see on this site?</h3>
                </div>
                <div className="flex justify-start">
                    <textarea
                        className="textAreaShared h-20 w-3/5"
                        onChange={e => {
                            answerOneReporter(e.target.value);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                triggerSubmit();
                            }
                        }}
                    />
                </div>
            </div>
            <div>
                <div className="pb-1 pt-2">
                    <h3 className="text-left">What would that feature enable you to do that you can't do?</h3>
                </div>
                <div className="flex justify-start">
                    <textarea
                        className="textAreaShared h-20 w-3/5"
                        onChange={e => {
                            answerTwoReporter(e.target.value);
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                triggerSubmit();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeatureRequest;
