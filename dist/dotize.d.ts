export const enum valTypes {
    none = "NONE",
    primitive = "PRIM",
    object = "OBJECT",
    array = "ARRAY",
}

export function getValType(val: any): valTypes;
export function getPathType(arrPath: any[]): string[];
export function isUndefined(obj: any): obj is undefined;
export function isNumber(f: any): f is number;
export function isEmptyObj(obj: object): boolean;
export function isNotObject(obj: any): boolean;
export function isEmptyArray(arr: any[]): boolean;
export function isNotArray(arr: any): arr is Array<never>;
export function removeEmptyArrayItem(arr: any[]): any[];
export function getFieldName(
    field: string,
    prefix: string,
    isRoot: boolean,
    isArrayItem: boolean,
    isArray: boolean
): string;
export function startsWith(val: string, valToSearch: string): boolean;
export function convert(obj: object, prefix?: string): object;
export function backward(obj: object, prefix?: string): object;
