export function formatNumber(input: string) {
    input = input.replace(/\./g, ',')

    var parts = input.split(",")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    if (parts.length > 1) {
        parts[1] = parts[1].substring(0, 2)
        parts[1] = parts[1].replace(/0+$/, '')
        
        if (parts[1] === '') {
            parts.pop()
        }
    }

    return parts.join(",")
}
