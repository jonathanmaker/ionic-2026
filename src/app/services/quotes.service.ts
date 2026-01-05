import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';
import { DatabaseService } from './database.service';

@Injectable({
    providedIn: 'root'
})
export class QuotesService {

    constructor(private dbService: DatabaseService) { }

    async getAll(): Promise<Quote[]> {
        return await this.dbService.getQuotes();
    }

    async getRandomQuote(): Promise<Quote> {
        const quotes = await this.dbService.getQuotes();
        if (quotes.length === 0) {
            return { id: 0, text: 'No hay citas disponibles', author: 'Sistema' };
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    async add(quote: Omit<Quote, 'id'>): Promise<void> {
        await this.dbService.addQuote(quote);
    }

    async remove(id: number): Promise<void> {
        await this.dbService.deleteQuote(id);
    }
}
