import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItemDivider,
  IonLabel,
  IonText
} from '@ionic/angular/standalone';
import { Quote } from '../../app/models/quote.model';
import { QuotesService } from '../../app/services/quotes.service';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { QuoteCardComponent } from '../quote-card/quote-card.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItemDivider,
    IonLabel,
    IonText,
    QuoteFormComponent,
    QuoteCardComponent,
    CommonModule
  ]
})
export class QuotesPage implements OnInit {
  quotes: Quote[] = [];

  constructor(private quotesService: QuotesService) { }

  async ngOnInit() {
    await this.loadQuotes();
  }

  async loadQuotes() {
    this.quotes = await this.quotesService.getAll();
  }

  // Recibe desde QuoteForm (✅ @Output save)
  async onSave(newQuote: Omit<Quote, 'id'>) {
    await this.quotesService.add(newQuote);
    await this.loadQuotes();
  }

  // Recibe desde QuoteCard (✅ @Output delete)
  async onDelete(id: number) {
    await this.quotesService.remove(id);
    await this.loadQuotes();
  }
}

