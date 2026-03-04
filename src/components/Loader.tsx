import { Oval } from "react-loader-spinner";

/* This is a prebuilt component that comes from react-loader-spinner */
export const Loader = ({isLoading} : {isLoading: boolean}) => {

    return (
        <>
            {isLoading && (
                <div className="loader-container">
                    <Oval
                        height="100%"
                        width="100%"
                        color="var(--blue)"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="var(--light-blue)"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            )}
        </>
    )
}   