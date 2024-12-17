export function lodashChunk(array: string[], size: number): string[][] {
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    var index = 0,
        resIndex = 0,
        result = Array(Math.ceil(length / size));

    while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
    }
    return result;
}

function baseSlice(array: string[], start: number, end: number) {
    var index = -1,
        length = array.length;

    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}
