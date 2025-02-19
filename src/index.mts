export interface ICompare<T> {
    (a: T, b: T): boolean;
}

export type ICompareString = ICompare<string>;

export const defaultCompare: ICompare<any> = (a, b) => a === b;

function computePrefixFunction(array: string, compare?: ICompareString): number[];
function computePrefixFunction<T>(array: T[], compare?: ICompare<T>): number[];
function computePrefixFunction<T>(array: T[] | string, compare: ICompare<any> = defaultCompare): number[] {
    const prefixFunction: number[] = new Array(array.length);
    prefixFunction[0] = 0;
    
    for (let i = 1; i < array.length; i++) {
        let j = prefixFunction[i - 1];
        while (j > 0 && !compare(array[i], array[j])) {
            j = prefixFunction[j - 1];
        }
        if (compare(array[i], array[j])) {
            j++;
        }
        prefixFunction[i] = j;
    }
    
    return prefixFunction;
}


function kmp(array: string, modeArray: string, compare?: ICompareString): number;
function kmp<T>(array: T[], modeArray: T[], compare?: ICompare<T>): number;
function kmp<T>(array: T[] | string, modeArray: T[] | string, compare: ICompare<any> = defaultCompare): number {
    if (modeArray.length > array.length) {
        return -1;
    }
    const prefixFunction: number[] = computePrefixFunction(modeArray as any, compare);
    for (let i = 0, j = 0, n = array.length, m = modeArray.length; i < n; i++) {
        while (j > 0 && !compare(array[i], modeArray[j])) {
            j = prefixFunction[j - 1];
        }
        if (compare(array[i], modeArray[j])) {
            j++;
        }
        if (j === m) {
            return i - m + 1;
        }
    }
    return -1;
}

/**
 * 找到某个模式串在原始串中的位置
 * @param originalString 原始串
 * @param modeString 模式串
 * @param compare 比较函数
 */
export function findIndex(originalString: string, modeString: string, compare?: ICompareString): number;
/**
 * 找到某个模式数组在原始数组中的位置
 * @param originalArray 原始数组
 * @param modeArray 模式数组
 * @param compare 比较函数
 */
export function findIndex<T>(originalArray: T[], modeArray: T[], compare?: ICompare<T>): number;
export function findIndex<T>(
    originalArray: T[] | string,
    modeArray: T[] | string,
    compare: ICompare<any> = defaultCompare,
): number {
    return kmp(originalArray as any, modeArray as any, compare);
}
