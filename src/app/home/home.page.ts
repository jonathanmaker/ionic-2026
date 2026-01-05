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
import { SettingsService } from '../../app/services/settings.service';
import { QuoteCardComponent } from '../quote-card/quote-card.component';
import { CommonModule } from '@angular/common';

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
    RouterModule,
    CommonModule
  ]
})
export class HomePage implements OnInit {
  randomQuote!: Quote;
  allowDelete = false;

  constructor(
    private quotesService: QuotesService,
    private settingsService: SettingsService
  ) { }

  async ngOnInit() {
    await this.loadSettings();
    await this.loadRandom();
  }

  async loadSettings() {
    this.allowDelete = await this.settingsService.getAllowDeleteOnHome();
  }

  async loadRandom() {
    this.randomQuote = await this.quotesService.getRandomQuote();
  }

  async onDelete(id: number) {
    await this.quotesService.remove(id);
    await this.loadRandom();
  }
}
