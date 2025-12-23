
import React from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

const PageLoader = ({ className, title, ...rest }) => {
    return (
        <div
            className={cn(
                "h-dvh w-full flex flex-col items-center justify-center space-y-1.5",
                className
            )}
            {...rest}
        >
            <LoadingSpinner type="long" className="w-14 md:w-24 h-14 md:h-24" />
            <p className="text-xl capitalize">{title || "Loading ..."}</p>
        </div>
    );
};

export default PageLoader;
