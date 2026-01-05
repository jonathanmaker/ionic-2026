import { Component, OnInit } from '@angular/core';
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

import { SettingsService } from '../services/settings.service';

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
export class SettingsPage implements OnInit {
  // Luego esto se persistirá con Preferences
  allowDeleteOnHome = false;

  constructor(private settingsService: SettingsService) { }

  async ngOnInit() {
    this.allowDeleteOnHome = await this.settingsService.getAllowDeleteOnHome();
  }

  async onToggleChange(value: boolean) {
    this.allowDeleteOnHome = value;
    await this.settingsService.setAllowDeleteOnHome(value);
  }
}
