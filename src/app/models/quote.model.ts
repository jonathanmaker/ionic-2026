// Modelo de datos: representa una cita (frase + autor).
export interface Quote {
    id?: number;   // id opcional (SQLite lo asigna)
    text: string;  // frase
    author: string;// autor
}

