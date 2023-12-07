export default function toParams(object) {
    const params = Object.entries(object)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    String(value)
                )}`
        )

    return params.length > 0 ? `?${params.join('&')}` : ''
}
