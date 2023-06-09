export interface Reservation{
    id_reservacion?: number
    id_parque: number
    horario: string
    email: string
    fecha_reservacion: string
    nombre_reservacion: string
    nacionalidad: string
    procedencia: string
    moneda: string
    cantidad_campos: number
    total: number
    nombre_Admin?: string
    nombre_parque?: string;
}
