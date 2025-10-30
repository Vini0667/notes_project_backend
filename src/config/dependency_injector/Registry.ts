import { DIContainer } from "./DIContainer.ts";

export const registerDependencies = () => {
    const container = DIContainer.getInstance();

    /**
     * Setup dependencies here
     */

    return container;
};
