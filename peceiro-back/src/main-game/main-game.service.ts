import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { serverResponse } from '../app.constant';
import { Game } from '../database/entities/game.entity';
import { Piece } from '../database/entities/piece.entity';
import {
  CreateMainGameDto,
  GameValidationCreate,
} from './dto/create-main-game.dto';
import {
  GameValidationUpdate,
  UpdateMainGameDto,
} from './dto/update-main-game.dto';
import { categories } from '../app.constant';
import { sorteds } from './entities/main-game.entity';

@Injectable()
export class MainGameService {
  sortItems = async (): Promise<sorteds> => {
    // eslint-disable-next-line prefer-const
    let sorted = {
      Periféricos: null,
      'Placa de vídeo': null,
      Processadores: null,
      Refrigeração: null,
      Acessórios: null,
      Tela: null,
      Ambiente: null,
    };
    const items = await Piece.findAll();
    for (let i = 0; i < 7; i++) {
      const actually = categories[i];
      const itemsActually = [];
      items.forEach((item) => {
        if (item.category.id === actually[0]) {
          itemsActually.push(item);
        }
      });
      sorted[actually[1]] =
        itemsActually[Math.floor(Math.random() * itemsActually.length)];
    }
    return sorted;
  };
  async create(createMainGameDto: CreateMainGameDto): Promise<serverResponse> {
    const isValid = await GameValidationCreate.safeParseAsync(
      createMainGameDto,
    );
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa!', isValid.error.errors[0].message);
    }
    const sorteados = await this.sortItems();

    return await Game.create({
      title: createMainGameDto.title,
      description: createMainGameDto.description,
      day: createMainGameDto.day,
      sorted: sorteados,
    })
      .then(() => {
        return {
          error: false,
          message: 'Sorteio criado.',
          data: null,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(
          'Opa.',
          'Houve uma falha interna, tente novamente mais tarde.',
        );
      });
  }

  async findAll(): Promise<serverResponse> {
    try {
      const games = await Game.findAll();
      return {
        error: false,
        message: 'Todos os sorteios.',
        data: games,
      };
    } catch (e: Error) {
      throw new InternalServerErrorException(
        'Hum!',
        'Houve um erro interno, tente novamente mais tarde.',
      );
    }
  }

  async findOne(id: number): Promise<serverResponse> {
    if (id < 0 || typeof id !== 'number') {
      throw new NotAcceptableException('Opa.', 'Confira o ID.');
    }
    const game = await Game.findOne({ where: { id: id } });
    if (!game) {
      throw new NotFoundException('Hum!', 'Sorteio não encontrado.');
    }
    return {
      error: false,
      message: `Sorteio #${id.toString()}, listado.`,
      data: game,
    };
  }

  async update(
    id: number,
    updateMainGameDto: UpdateMainGameDto,
  ): Promise<serverResponse> {
    if (id < 0 || typeof id !== 'number') {
      throw new NotAcceptableException('Opa.', 'Confira o ID.');
    }
    const isValid = await GameValidationUpdate.safeParseAsync(
      updateMainGameDto,
    );
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa!', isValid.error.errors[0].message);
    }
    const game = await Game.findOne({ where: { id: id } });
    if (!game) {
      throw new NotFoundException('Hum!', 'Sorteio não encontrado.');
    }
    return await Game.update(
      {
        title: updateMainGameDto.title,
        description: updateMainGameDto.description,
        day: updateMainGameDto.day,
      },
      {
        where: {
          id: id,
        },
      },
    )
      .then(() => {
        return {
          error: false,
          message: `Sorteio ${id.toString()} atualizado.`,
          data: updateMainGameDto,
        };
      })
      .catch((err) => {
        throw new InternalServerErrorException(
          'Opa.',
          'Houve uma falha interna, tente novamente mais tarde.',
        );
      });
  }

  async remove(id: number) {
    if (id < 0 || typeof id !== 'number') {
      throw new NotAcceptableException('Opa.', 'Confira o ID.');
    }
    const game = await Game.findOne({ where: { id: id } });
    if (!game) {
      throw new NotFoundException('Hum!', 'Sorteio não encontrado.');
    }
    return await Game.destroy({ where: { id: id } })
      .then(() => {
        return {
          error: false,
          message: 'Sorteio deletado.',
          data: null,
        };
      })
      .catch((err) => {
        return {
          error: true,
          message: 'Contate o suporte.',
          data: null,
        };
      });
  }
}
