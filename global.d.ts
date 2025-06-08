export {};

declare global {
    interface Window {
        Daily: {
            createFrame: () => {
                join: (config: { url: string }) => void;
            };
        };
    }
}
