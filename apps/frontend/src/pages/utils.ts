export function formatDateToHumanReadable(dateString: string | undefined): string {
    if (!dateString){
        return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
}
