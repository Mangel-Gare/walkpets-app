import { Pet } from '../../domain/entities/Pet';
import { BusinessRuleError } from '../../domain/errors/DomainError';
import { Result, success, failure } from '../../shared/result';

export interface PetRepository {
  findByIds(ids: string[]): Promise<Pet[]>;
}

export interface WalkRepository {
  createWalk(walkerId: string, petIds: string[]): Promise<string>;
}

export type StartWalkDTO = {
  walkerId: string;
  petIds: string[];
};

export class StartWalk {
  constructor(
    private readonly petRepo: PetRepository,
    private readonly walkRepo: WalkRepository
  ) {}

  async execute(dto: StartWalkDTO): Promise<Result<string, Error>> {
    try {
      // 1. Validar restricción del negocio: Límite de 3 perros
      if (dto.petIds.length > 3) {
        return failure(new BusinessRuleError('Un paseador no puede llevar más de 3 perros a la vez por motivos de seguridad.'));
      }

      // 2. Obtener los perros de la base de datos
      const pets = await this.petRepo.findByIds(dto.petIds);
      if (pets.length !== dto.petIds.length) {
        return failure(new BusinessRuleError('Algunos perros especificados no existen en el sistema.'));
      }

      // 3. REGLA ESTRICTA (Core Domain): Validar que el 100% de la documentación esté en regla
      for (const pet of pets) {
        if (!pet.isReadyForWalk()) {
          return failure(
            new BusinessRuleError(
              `El perro ${pet.name} no tiene la documentación validada al 100% (seguro PPP, vacunas, o pasaporte faltantes). No se puede iniciar el paseo legalmente.`
            )
          );
        }
      }

      // 4. Iniciar el paseo
      const walkId = await this.walkRepo.createWalk(dto.walkerId, dto.petIds);

      // (Aquí en el futuro se publicaría el evento de dominio "WalkStarted")

      return success(walkId);
    } catch (error) {
      return failure(error instanceof Error ? error : new Error('Error interno inesperado'));
    }
  }
}
