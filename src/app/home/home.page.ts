import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { Quote } from '../../app/models/quote.model';
import { QuotesService } from '../../app/services/quotes.service';
import { QuoteCardComponent } from '../quote-card/quote-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    QuoteCardComponent,
    RouterModule
  ]
})
export class HomePage implements OnInit {
  randomQuote!: Quote;

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    // Al entrar por primera vez, mostramos una cita aleatoria
    this.loadRandom();
  }

  loadRandom(): void {
    this.randomQuote = this.quotesService.getRandomQuote();
  }
}

