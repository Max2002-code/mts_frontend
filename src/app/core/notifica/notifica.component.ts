import { Component, OnInit } from '@angular/core';

export interface Notifica {
  titolo: string;
  messaggio: string;
  tipo: 'success' | 'error' | 'info'; // usato per colore icona
  letta: boolean;
}

@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.component.html',
  styleUrls: ['./notifica.component.scss']
})
export class NotificaComponent implements OnInit {

  notifiche: Notifica[] = [];

  constructor() { }

  ngOnInit(): void {
    // Esempio di notifiche
    this.notifiche = [
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Ordine completato', messaggio: 'L’ordine #1234 è stato completato', tipo: 'success', letta: false },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
      { titolo: 'Errore di sistema', messaggio: 'Impossibile salvare il record', tipo: 'error', letta: false },
      { titolo: 'Aggiornamento', messaggio: 'Nuova versione disponibile', tipo: 'info', letta: true },
    ];
  }

  // Determina la classe dell’icona in base al tipo
  getIconClass(tipo: string): string {
    switch (tipo) {
      case 'success': return 'icon-success';
      case 'error': return 'icon-error';
      case 'info': return 'icon-info';
      default: return 'icon-default';
    }
  }

  // Segna la notifica come accettata
  accetta(notifica: Notifica) {
    notifica.letta = true;
    console.log('Accettata:', notifica);
  }

  // Segna la notifica come rifiutata
  rifiuta(notifica: Notifica) {
    notifica.letta = true;
    console.log('Rifiutata:', notifica);
  }
}
