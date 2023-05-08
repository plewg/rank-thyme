import { TailSpin } from "react-loader-spinner";

export function LoadingSpinner() {
    return (
        <div className="flex w-full flex-row items-center justify-center">
            <TailSpin
                height="80"
                width="80"
                color="#93C5FD"
                ariaLabel="loading-spinner"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible
            />
        </div>
    );
}
