export default function formatHour(hour) {
    return new Intl.DateTimeFormat("fr-FR", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(hour))
}

export function formatDate(date) {
    return new Intl.DateTimeFormat("fr-FR", {
        weekday: 'long',
        day: "2-digit",
        month: "long"
    }).format(new Date(date))
}

export function formatDateTime(dateTime) {
    return <>
        {
            new Intl.DateTimeFormat("fr-FR", {
                day: "2-digit",
                month: "short"
            }).format(new Date(dateTime))
        }
        <br />
        { formatHour(dateTime) }
    </>
}