import { startServer } from './infrastructure/http/server';

async function bootstrap() {
  console.log('Iniciando WalkPets Backend API...');
  try {
    await startServer();
  } catch (error) {
    console.error('Error fatal al iniciar la aplicación:', error);
    process.exit(1);
  }
}

bootstrap();
