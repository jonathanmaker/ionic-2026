import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuotesService {
    // Datos de ejemplo (prototipo). Luego esto se reemplaza por SQLite.
    private quotes: Quote[] = [
        { id: 1, text: 'La disciplina vence al talento cuando el talento no se disciplina.', author: 'Anónimo' },
        { id: 2, text: 'Lo que no se mide, no se puede mejorar.', author: 'Peter Drucker' },
        { id: 3, text: 'Primero resuelve el problema, después escribe el código.', author: 'John Johnson' }
    ];

    // Devuelve todas las citas
    getAll(): Quote[] {
        return [...this.quotes]; // copia para evitar cambios directos fuera del servicio
    }

    // Devuelve una cita aleatoria (para Home)
    getRandomQuote(): Quote {
        const index = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[index];
    }

    // Agrega una cita (id simulado)
    add(newQuote: Omit<Quote, 'id'>): Quote {
        // Toma el último elemento de forma compatible (sin .at)
        const last = this.quotes.length > 0 ? this.quotes[this.quotes.length - 1] : undefined;
        const nextId = (last?.id ?? 0) + 1;
        const quote: Quote = { id: nextId, ...newQuote };
        this.quotes.push(quote);
        return quote;
    }

    // Elimina por id
    remove(id: number): void {
        this.quotes = this.quotes.filter(q => q.id !== id);
    }
}
