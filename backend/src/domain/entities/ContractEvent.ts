import { BusinessRuleError } from '../errors/DomainError';

export enum ContractType {
  PICKUP = 'PICKUP',
  DROPOFF = 'DROPOFF',
}

export type ContractClauses = {
  bozal_obligatorio?: boolean;
  correa_obligatoria?: boolean;
  prohibido_dar_comida?: boolean;
  golosinas_permitidas?: boolean;
  imponderables_aceptados?: boolean;
  // Permite escalabilidad dinámica para cualquier regla futura
  [key: string]: boolean | undefined; 
};

export class ContractEvent {
  private constructor(
    public readonly id: string,
    public readonly walkId: string,
    public readonly petId: string,
    public readonly type: ContractType,
    public readonly acceptedText: string,
    public readonly photoUrl: string,
    public readonly clauses: ContractClauses,
    public readonly createdAt: Date
  ) {}

  public static create(
    id: string,
    walkId: string,
    petId: string,
    type: ContractType,
    acceptedText: string,
    photoUrl: string,
    clauses: ContractClauses
  ): ContractEvent {
    // REGLA DE NEGOCIO ESTRICTA: Firma activa obligatoria
    if (acceptedText.trim().toLowerCase() !== 'acepto') {
      throw new BusinessRuleError('El contrato no es legalmente válido si no contiene la palabra exacta "acepto". No se permiten firmas vacías o atajos.');
    }

    // REGLA DE NEGOCIO ESTRICTA: Prueba de estado fotográfica obligatoria
    if (!photoUrl || photoUrl.trim() === '') {
      throw new BusinessRuleError('Debe adjuntarse una foto geolocalizada obligatoriamente como prueba del estado de salud físico del perro al entregarlo o recogerlo.');
    }

    // REGLA DE NEGOCIO ESTRICTA: Descargo de imponderables obligatorio
    if (clauses.imponderables_aceptados !== true) {
      throw new BusinessRuleError('El dueño debe aceptar explícitamente la cláusula de imponderables de salud para eximir de responsabilidad no negligente al paseador.');
    }

    return new ContractEvent(
      id,
      walkId,
      petId,
      type,
      acceptedText.toLowerCase(),
      photoUrl,
      clauses,
      new Date()
    );
  }
}
