import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const updateMatches = () => {
            setMatches(mediaQueryList.matches);
        };

        // Initial check
        updateMatches();

        // Add listener for changes in media query
        mediaQueryList.addListener(updateMatches);

        // Cleanup
        return () => {
            mediaQueryList.removeListener(updateMatches);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
