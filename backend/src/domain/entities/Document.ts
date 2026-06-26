import { BusinessRuleError } from '../errors/DomainError';

export enum DocumentType {
  VACCINE = 'VACCINE',
  PASSPORT = 'PASSPORT',
  INSURANCE = 'INSURANCE',
}

export class Document {
  private constructor(
    public readonly id: string,
    public readonly type: DocumentType,
    public readonly urlStorage: string,
    public readonly validatedAt: Date | null,
    public readonly validatedByWalkerId: string | null
  ) {}

  public static create(
    id: string,
    type: DocumentType,
    urlStorage: string
  ): Document {
    if (!urlStorage || urlStorage.trim() === '') {
      throw new BusinessRuleError('La URL del documento no puede estar vacía');
    }
    return new Document(id, type, urlStorage, null, null);
  }

  public validate(walkerId: string): Document {
    if (this.isValidated()) {
      throw new BusinessRuleError('El documento ya ha sido validado');
    }
    return new Document(
      this.id,
      this.type,
      this.urlStorage,
      new Date(),
      walkerId
    );
  }

  public isValidated(): boolean {
    return this.validatedAt !== null && this.validatedByWalkerId !== null;
  }
}
