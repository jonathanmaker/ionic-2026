import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Quote } from '../models/quote.model';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    private db!: SQLiteDBConnection;
    private readonly DB_NAME = 'quotes_db';
    private readonly WEB_STORAGE_KEY = 'quotes_data';

    constructor() { }

    async initializePlugin(): Promise<void> {
        const platform = Capacitor.getPlatform();

        if (platform === 'web') {
            // Web: Initialize with seed data if empty
            const { value } = await Preferences.get({ key: this.WEB_STORAGE_KEY });
            if (!value) {
                const initialQuotes: Quote[] = [
                    { id: 1, text: 'La vida es lo que pasa mientras estás ocupado haciendo otros planes.', author: 'John Lennon' },
                    { id: 2, text: 'El único modo de hacer un gran trabajo es amar lo que haces.', author: 'Steve Jobs' },
                    { id: 3, text: 'No cuentes los días, haz que los días cuenten.', author: 'Muhammad Ali' }
                ];
                await Preferences.set({ key: this.WEB_STORAGE_KEY, value: JSON.stringify(initialQuotes) });
            }
        } else {
            // Native: Initialize SQLite
            this.db = await this.sqlite.createConnection(
                this.DB_NAME,
                false,
                'no-encryption',
                1,
                false
            );
            await this.db.open();

            const schema = `
        CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          author TEXT NOT NULL
        );
      `;
            await this.db.execute(schema);

            // Seed initial data if empty
            const res = await this.db.query('SELECT COUNT(*) as count FROM quotes');
            if (res.values?.[0].count === 0) {
                await this.db.execute(`
          INSERT INTO quotes (text, author) VALUES 
          ('La vida es lo que pasa mientras estás ocupado haciendo otros planes.', 'John Lennon'),
          ('El único modo de hacer un gran trabajo es amar lo que haces.', 'Steve Jobs'),
          ('No cuentes los días, haz que los días cuenten.', 'Muhammad Ali');
        `);
            }
        }
    }

    async getQuotes(): Promise<Quote[]> {
        if (Capacitor.getPlatform() === 'web') {
            const { value } = await Preferences.get({ key: this.WEB_STORAGE_KEY });
            return value ? JSON.parse(value) : [];
        } else {
            const res = await this.db.query('SELECT * FROM quotes');
            return res.values || [];
        }
    }

    async addQuote(quote: Omit<Quote, 'id'>): Promise<void> {
        if (Capacitor.getPlatform() === 'web') {
            const quotes = await this.getQuotes();
            const newId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id || 0)) + 1 : 1;
            const newQuote = { ...quote, id: newId };
            quotes.push(newQuote);
            await Preferences.set({ key: this.WEB_STORAGE_KEY, value: JSON.stringify(quotes) });
        } else {
            const sql = 'INSERT INTO quotes (text, author) VALUES (?, ?)';
            await this.db.run(sql, [quote.text, quote.author]);
        }
    }

    async deleteQuote(id: number): Promise<void> {
        if (Capacitor.getPlatform() === 'web') {
            let quotes = await this.getQuotes();
            quotes = quotes.filter(q => q.id !== id);
            await Preferences.set({ key: this.WEB_STORAGE_KEY, value: JSON.stringify(quotes) });
        } else {
            const sql = 'DELETE FROM quotes WHERE id = ?';
            await this.db.run(sql, [id]);
        }
    }
}
