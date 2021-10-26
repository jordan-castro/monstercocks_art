/**
 * Convert a string of seconds into a Date object.
 * 
 * @param seconds The number of seconds to convert.
 * 
 * @returns A Date object.
 */
export default function toDateTime(seconds: number): Date {
    return new Date(seconds * 1000);
}

/**
 * Chequea la differencia en fechas desde ahora.
 * 
 * @param date Fecha a comparar.
 * 
 * @returns String con la diferencia en formato "días, horas, minutos, segundos".
 */
export function dateDifference(date: Date): string {
    // Obtenemos la fecha actual.
    const now = new Date();
    // Calculamos la diferencia en milisegundos.
    const diff = now.getTime() - date.getTime();
    // Convertimos la diferencia en segundos.
    const diffSeconds = diff / 1000;
    // Convertimos la diferencia en minutos.
    const diffMinutes = diff / (60 * 1000);
    // Convertimos la diferencia en horas.
    const diffHours = diff / (60 * 60 * 1000);
    // Convertimos la diferencia en días.
    const diffDays = diff / (24 * 60 * 60 * 1000);
    // Convertimos la diferencia en meses.
    const diffMonths = diff / (30 * 24 * 60 * 60 * 1000);
    // Convertimos la diferencia en años.
    const diffYears = diff / (365 * 24 * 60 * 60 * 1000);
    // Si la diferencia es menor a un minuto.
    if (diffSeconds < 60) {
        return `${Math.round(diffSeconds)} seconds`;
    }
    // Si la diferencia es menor a una hora.
    if (diffMinutes < 60) {
        return `${Math.round(diffMinutes)} minutes`;
    }
    // Si la diferencia es menor a un día.
    if (diffHours < 24) {
        return `${Math.round(diffHours)} hours`;
    }
    // Si la diferencia es menor a un mes.
    if (diffDays < 30) {
        return `${Math.round(diffDays)} days`;
    }
    // Si la diferencia es menor a un año.
    if (diffMonths < 12) {
        return `${Math.round(diffMonths)} months`;
    }
    // Si la diferencia es mayor a un año.
    return `${Math.round(diffYears)} years`;
}