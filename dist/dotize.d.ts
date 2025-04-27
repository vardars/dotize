export namespace valTypes {
    const none: string;
    const primitive: string;
    const object: string;
    const array: string;
}
export function getValType(val: any): string;
export function getPathType(arrPath: any): string[];
export function isUndefined(obj: any): boolean;
export function isNumber(f: any): boolean;
export function isEmptyObj(obj: any): boolean;
export function isNotObject(obj: any): boolean;
export function isEmptyArray(arr: any): boolean;
export function isNotArray(arr: any): boolean;
export function removeEmptyArrayItem(arr: any): any;
export function getFieldName(field: any, prefix: any, isRoot: boolean, isArrayItem: boolean, isArray: boolean): string;
export function startsWith(val: any, valToSearch: any): boolean;
export function convert(obj: any, prefix: any): any;
export function backward(obj: any, prefix: any): any;
