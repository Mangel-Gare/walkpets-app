import { ContractEvent, ContractType, ContractClauses } from '../../domain/entities/ContractEvent';
import { Result, success, failure } from '../../shared/result';

export interface ContractRepository {
  save(contract: ContractEvent): Promise<void>;
}

export type AcceptContractDTO = {
  contractId: string;
  walkId: string;
  petId: string;
  type: ContractType;
  acceptedText: string; // Esperamos "acepto"
  photoUrl: string;
  clauses: ContractClauses; // El JSON dinámico
};

export class AcceptContract {
  constructor(private readonly contractRepo: ContractRepository) {}

  async execute(dto: AcceptContractDTO): Promise<Result<void, Error>> {
    try {
      // 1. Validar reglas de negocio estricta al instanciar el contrato 
      // (valida la foto, valida la palabra "acepto", valida descargo médico)
      const contract = ContractEvent.create(
        dto.contractId,
        dto.walkId,
        dto.petId,
        dto.type,
        dto.acceptedText,
        dto.photoUrl,
        dto.clauses
      );

      // 2. Persistir en la base de datos (con su campo JSONB para las clauses dinámicas)
      await this.contractRepo.save(contract);

      // Aquí se emitiría un evento de dominio "ContractAcceptedEvent" 
      // para notificar al dueño por WebSocket en tiempo real.

      return success(undefined);
    } catch (error) {
      // Retornar Failure con el error de negocio sin tumbar el servidor
      return failure(error instanceof Error ? error : new Error('Error interno al firmar el contrato'));
    }
  }
}
