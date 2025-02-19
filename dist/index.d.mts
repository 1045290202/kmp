export interface ICompare<T> {
    (a: T, b: T): boolean;
}
export type ICompareString = ICompare<string>;
export declare const defaultCompare: ICompare<any>;
/**
 * 找到某个模式串在原始串中的位置
 * @param originalString 原始串
 * @param modeString 模式串
 * @param compare 比较函数
 */
export declare function findIndex(originalString: string, modeString: string, compare?: ICompareString): number;
/**
 * 找到某个模式数组在原始数组中的位置
 * @param originalArray 原始数组
 * @param modeArray 模式数组
 * @param compare 比较函数
 */
export declare function findIndex<T>(originalArray: T[], modeArray: T[], compare?: ICompare<T>): number;
