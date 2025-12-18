import { TestBed } from '@angular/core/testing';
import { MovementsService } from './movements.service';

describe('MovementsService', () => {
  let service: MovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find a book by exact title', () => {
    const result = service.getMovements('Dune');
    expect(result).toBeTruthy();
    expect(result?.bookTitle).toBe('Dune');
  });

  it('should find a book by partial title', () => {
    const result = service.getMovements('harry');
    expect(result).toBeTruthy();
    expect(result?.bookTitle).toContain('Harry Potter');
  });

  it('should return null if book not found', () => {
    const result = service.getMovements('Libro inesistente');
    expect(result).toBeNull();
  });
});
