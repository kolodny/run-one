interface ReturnType {
    isMaster: boolean;
    cleanup: Function;
}
declare const _default: (name: string, options: {
    wait: number;
}) => Promise<ReturnType>;
export default _default;
