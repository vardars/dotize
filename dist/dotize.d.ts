export default dotize;
declare namespace dotize {
    namespace valTypes {
        const none: string;
        const primitive: string;
        const object: string;
        const array: string;
    }
    function getValType(val: any): string;
    function getPathType(arrPath: any): string[];
    function isUndefined(obj: any): boolean;
    function isNumber(f: any): boolean;
    function isEmptyObj(obj: any): boolean;
    function isNotObject(obj: any): boolean;
    function isEmptyArray(arr: any): boolean;
    function isNotArray(arr: any): boolean;
    function removeEmptyArrayItem(arr: any): any;
    function getFieldName(field: any, prefix: any, isRoot: any, isArrayItem: any, isArray: any): string;
    function startsWith(val: any, valToSearch: any): boolean;
    function convert(obj: any, prefix: any): any;
    function backward(obj: any, prefix: any): any;
}
