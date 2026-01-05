import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { Quote } from '../../app/models/quote.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    CommonModule
  ]
})
export class QuoteCardComponent {
  // ✅ @Input: el componente recibe la cita que debe mostrar.
  @Input() quote!: Quote;

  // ✅ @Input: define si se muestra el botón eliminar o no.
  @Input() canDelete = false;

  // ✅ @Output: evento que avisa al padre que quiere eliminar una cita.
  @Output() delete = new EventEmitter<number>();

  onDeleteClick(): void {
    // Emitimos el id al padre. Si no hay id, no hacemos nada.
    if (this.quote?.id != null) {
      this.delete.emit(this.quote.id);
    }
  }
}
