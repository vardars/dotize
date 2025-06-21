export default dotize;
declare namespace dotize {
    type valTypes = "none" | "primitive" | "object" | "array";
    function getValType(val: any): valTypes;
    function getPathType(arrPath: any[]): string[];
    function isUndefined(obj: any): obj is undefined;
    function isNumber(f: any): f is number;
    function isEmptyObj(obj: object): boolean;
    function isNotObject(obj: any): boolean;
    function isEmptyArray(arr: any[]): boolean;
    function isNotArray(arr: any): arr is Array<never>;
    function removeEmptyArrayItem(arr: any[]): any[];
    function getFieldName(
        field: string,
        prefix: string,
        isRoot: boolean,
        isArrayItem: boolean,
        isArray: boolean
    ): string;
    function startsWith(val: string, valToSearch: string): boolean;
    function convert(obj: object, prefix?: string): object;
    function backward(obj: object, prefix?: string): object;
}
