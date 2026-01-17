// src/app/core/models/movement.model.ts

export interface MovementHistory {
  date: Date;
  description: string;
}

export interface MovementEvent {
  date: Date;
  description: MovementStatus;
  note?: string;
  isCurrent?: boolean;
}

export type MovementStatus =
  | 'Disponibile'
  | 'In Transito'
  | 'In Prestito'
  | 'Arrivato'
  | 'Smarrito';

export interface Movement {
  bookTitle: string;
  status: MovementStatus;
  history: MovementEvent[];

  // ✅ nuove proprietà per la posizione del libro
  shelf?: string;    // Scaffale
  bancale?: string;  // Bancale
  side?: 'destra' | 'sinistra'; // lato
}
