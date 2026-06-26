import { BusinessRuleError } from '../errors/DomainError';
import { Document, DocumentType } from './Document';

export class Pet {
  private constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly name: string,
    public readonly isPpp: boolean,
    private readonly documents: Document[],
    public readonly currentGpsCollarId: string | null
  ) {}

  public static create(
    id: string,
    ownerId: string,
    name: string,
    isPpp: boolean
  ): Pet {
    if (name.trim().length < 2) {
      throw new BusinessRuleError('El nombre de la mascota es demasiado corto');
    }
    return new Pet(id, ownerId, name, isPpp, [], null);
  }

  public addDocument(document: Document): Pet {
    const newDocs = [...this.documents, document];
    return new Pet(this.id, this.ownerId, this.name, this.isPpp, newDocs, this.currentGpsCollarId);
  }

  // Se devuelve una nueva instancia para mantener la inmutabilidad de la entidad en memoria
  public assignCollar(collarId: string): Pet {
    return new Pet(this.id, this.ownerId, this.name, this.isPpp, this.documents, collarId);
  }

  public removeCollar(): Pet {
    return new Pet(this.id, this.ownerId, this.name, this.isPpp, this.documents, null);
  }

  public getDocuments(): Document[] {
    return [...this.documents];
  }

  /**
   * Lógica de Negocio Core:
   * Valida si la mascota tiene toda la documentación requerida y aprobada
   * para poder ser paseada (100% de la documentación validada).
   */
  public isReadyForWalk(): boolean {
    const hasVaccine = this.documents.some(d => d.type === DocumentType.VACCINE && d.isValidated());
    const hasPassport = this.documents.some(d => d.type === DocumentType.PASSPORT && d.isValidated());
    
    if (!hasVaccine || !hasPassport) return false;

    // REGLA: Si es un Perro Potencialmente Peligroso (PPP), requiere seguro validado obligatoriamente
    if (this.isPpp) {
      const hasInsurance = this.documents.some(d => d.type === DocumentType.INSURANCE && d.isValidated());
      if (!hasInsurance) return false;
    }

    return true;
  }
}
