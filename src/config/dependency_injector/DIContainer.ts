export type Dependency = new (...args: any[]) => any;
export type CreatorFunction = (...args: any[]) => any;
type RegistryItem = {
    class: Dependency | CreatorFunction;
    dependencies: any[];
};

export class DIContainer {
    private classRegistry = new Map<any, RegistryItem>();
    private instanceRegistry = new Map<any, any>();
    private static instance: DIContainer;

    private constructor() {}

    /**
     * Get the singleton instance of the DIContainer.
     * @returns The singleton instance of the DIContainer.
     */
    public static getInstance(): DIContainer {
        if (!this.instance) {
            this.instance = new DIContainer();
        }
        return this.instance;
    }

    /**
     * Registers a dependency with its class or creator function and its dependencies.
     * @param target The dependency to register.
     * @param classOrCreator The class or creator function for the dependency.
     * @param dependencies The dependencies of the dependency.
     */
    public register(
        target: any,
        classOrCreator: Dependency | CreatorFunction,
        dependencies: any[],
    ): void {
        this.classRegistry.set(target, {
            class: classOrCreator,
            dependencies: dependencies,
        });
    }

    /**
     * Receives the dependency target and solves it, the dependencies are solved in cascade as needed.
     * @param target The dependency to resolve.
     * @returns The resolved dependency.
     */
    public resolve<T>(target: any) {
        if (this.instanceRegistry.has(target)) {
            return this.instanceRegistry.get(target) as T;
        }

        const registryItem = this.classRegistry.get(target);

        if (!registryItem) {
            throw new Error(
                `Dependency not found for ${target.name || target.toString()}`,
            );
        }

        const resolveDependencies = registryItem.dependencies.map((dep) =>
            this.resolve(dep),
        );

        let instance: T;

        if (
            typeof registryItem.class === "function" &&
            registryItem.class.prototype
        ) {
            instance = new (registryItem.class as Dependency)(
                ...resolveDependencies,
            );
        } else {
            instance = (registryItem.class as CreatorFunction)(
                ...resolveDependencies,
            );
        }

        this.instanceRegistry.set(target, instance);

        return instance;
    }
}
