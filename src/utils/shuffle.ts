export const shuffleArray = <T>(array: T[]): T[] => {
    const out = [...array];

    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = out[i];
        const tempJ = out[j];

        if (temp === undefined || tempJ === undefined) {
            throw new Error("Index out of range");
        }

        out[i] = tempJ;
        out[j] = temp;
    }

    return out;
};
