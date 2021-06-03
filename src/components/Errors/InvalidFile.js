import NoInventoryFound from './NoInventoryFound';

/**
 * Returns almost the same content as NoInventoryFound, so InvalidFile is an alias of NoInventoryFound with prop "invalidFile"
 * specified as true.
 * @returns Error JSX
 */
export default function InvalidFile() {
    return <NoInventoryFound invalidFile={true} />;
}