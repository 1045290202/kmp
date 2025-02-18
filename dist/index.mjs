export const defaultCompare = (a, b) => a === b;
function computePrefixFunction(array, compare = defaultCompare) {
    const prefixFunction = new Array(array.length);
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
function kmp(array, modeArray, compare = defaultCompare) {
    if (modeArray.length > array.length) {
        return -1;
    }
    const prefixFunction = computePrefixFunction(modeArray, compare);
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
 * 找到对应的集合在什么位置
 */
export function findIndex(originalArray, modeArray, compare = defaultCompare) {
    return kmp(originalArray, modeArray, compare);
}
console.log(findIndex("aaaAB", "ab", (a, b) => a.toLowerCase() === b.toLowerCase()));
