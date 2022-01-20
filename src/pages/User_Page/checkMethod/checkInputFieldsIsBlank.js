export function isBlank(str) {
    return str.replace(/(^s*)|(s*$)/g, "").length !== 0;
}