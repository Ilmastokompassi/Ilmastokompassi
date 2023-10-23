import { useEffect } from "react"

export const useTitle = (title) =>
    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        // On unmount, use previous 
        return () => document.title = prevTitle
    }, [title])