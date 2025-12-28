// src/app/core/models/movement.model.ts
export interface MovementHistory {
  date: Date;
  description: string;
}

export interface Movement {
  id: number;
  bookTitle: string;
  status: 'Disponibile' | 'In Prestito' | 'In Transito' | 'Arrivato';
  history?: MovementHistory[];
  arrivalDate?: Date;  // <-- nuova proprietà
}
