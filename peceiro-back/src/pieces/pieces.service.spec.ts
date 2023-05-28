import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { PiecesController } from './pieces.controller';
import { PiecesService } from './pieces.service';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { AuthGuardAdmin } from '../autenticacao/autenticacao.admin.guard';
import { AuthGuard } from '../autenticacao/autenticacao.member.guard';

describe('PiecesService', () => {
  let service: PiecesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutenticacaoModule],
      controllers: [PiecesController],
      providers: [PiecesService],
    }).compile();

    service = module.get<PiecesService>(PiecesService);
  });

  it('should be defined', async () => {
    return expect(service).toBeDefined();
  });
});
