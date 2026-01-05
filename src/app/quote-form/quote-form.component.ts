import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonText
} from '@ionic/angular/standalone';
import { Quote } from '../../app/models/quote.model';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonText,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class QuoteFormComponent {
  // ✅ @Output: avisa al padre cuando el formulario es válido y se quiere guardar.
  @Output() save = new EventEmitter<Omit<Quote, 'id'>>();

  // Formulario reactivo con validaciones solicitadas en la pauta
  form = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(5)]],
    author: ['', [Validators.required, Validators.minLength(2)]]
  });

  // Mensaje general cuando se intenta enviar inválido
  showInvalidMessage = false;

  constructor(private fb: FormBuilder) { }

  submit(): void {
    // Marca todos los campos como "touched" para que aparezcan mensajes
    this.form.markAllAsTouched();

    // Si es inválido: bloqueo + mensaje UI
    if (this.form.invalid) {
      this.showInvalidMessage = true;
      return;
    }

    // Si es válido, emitimos hacia el componente/página padre
    this.showInvalidMessage = false;

    this.save.emit({
      text: this.form.value.text!.trim(),
      author: this.form.value.author!.trim()
    });

    // Limpia el formulario luego de guardar
    this.form.reset();
  }

  // Helpers para simplificar el HTML
  get textCtrl() { return this.form.get('text'); }
  get authorCtrl() { return this.form.get('author'); }
}

