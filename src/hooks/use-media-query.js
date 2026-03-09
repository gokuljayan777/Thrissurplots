import { useState, useEffect } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Use modern 'change' listener
        const listener = (e) => setMatches(e.matches);

        // Initial check
        if (media.matches !== matches) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setMatches(media.matches);
        }

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}
