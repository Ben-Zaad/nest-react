export function formatDateToHumanReadable(dateString: string | undefined): string {
    if (!dateString){
        return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

export function flattenArrays<T>(arrays: T[][]): T[] {
    return arrays.reduce((result, currentArray) => result.concat(currentArray), []);
}
