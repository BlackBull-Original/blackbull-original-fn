import React from "react";

const useLoading = () => {
    const [loading, setLoading] = React.useState(false);

    const onLoading = React.useCallback((value: boolean) => {
        setLoading(value)
    }, [])

    return {
        loading,
        setLoading,
        onLoading: React.useMemo(() => { onLoading }, [onLoading])
    }

}

export default useLoading;