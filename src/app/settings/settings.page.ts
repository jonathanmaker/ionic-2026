import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonToggle,
    IonText,
    FormsModule
  ]
})
export class SettingsPage {
  // Luego esto se persistirá con Preferences
  allowDeleteOnHome = false;

  onToggleChange(value: boolean): void {
    this.allowDeleteOnHome = value;
  }
}
