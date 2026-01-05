import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private readonly ALLOW_DELETE_KEY = 'allowDeleteOnHome';

    constructor() { }

    async setAllowDeleteOnHome(value: boolean): Promise<void> {
        await Preferences.set({
            key: this.ALLOW_VALUE_KEY,
            value: JSON.stringify(value)
        });
    }

    async getAllowDeleteOnHome(): Promise<boolean> {
        const { value } = await Preferences.get({ key: this.ALLOW_VALUE_KEY });
        return value ? JSON.parse(value) : false;
    }

    private get ALLOW_VALUE_KEY(): string {
        return this.ALLOW_DELETE_KEY;
    }
}
