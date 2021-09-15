/** Returns the current UTC time as a string of only numbers. */
export default function getTime() {
    return `${new Date().toISOString().replace(/\..+/g, "").replace(/[T:-]/g, "")}`;
}