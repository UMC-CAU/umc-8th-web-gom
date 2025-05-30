export const formatDate = (date: Date | string) => {
    if (!date) return ''

    const d = typeof date === 'string' ? new Date(date) : date

    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    return `${year}년 ${month}월 ${day}일`
}

export const getRelativeTime = (date: Date | string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = (d.getTime() - now.getTime()) / 1000

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ['year', diff / (60 * 60 * 24 * 365)],
        ['month', diff / (60 * 60 * 24 * 30)],
        ['week', diff / (60 * 60 * 24 * 7)],
        ['day', diff / (60 * 60 * 24)],
        ['hour', diff / (60 * 60)],
        ['minute', diff / 60],
        ['second', diff],
    ]

    for (const [unit, value] of units) {
        const rounded = Math.round(value)
        if (Math.abs(rounded) >= 1) return rtf.format(rounded, unit)
    }

    return '방금 전'
}
