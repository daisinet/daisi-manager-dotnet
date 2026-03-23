// Empty shim for Node-only modules that get bundled but not used in browser
export default {};
export const createChannel = () => { throw new Error('Node-only'); };
export const createClientFactory = () => { throw new Error('Node-only'); };
