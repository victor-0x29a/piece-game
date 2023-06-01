import {
  BadRequestException,
  ConflictException,
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
import { GamesPerProfile, sorteds } from './entities/main-game.entity';
import jwtDecode from 'jwt-decode';
import { decodedToken } from '../autenticacao/types/auth.type';
import { Play } from '../database/entities/play.entity';
import { EnterPlay, ItemCheck } from './entities/play.entity';
import { PlayValidationCreate } from './dto/create-play.dto';

@Injectable()
export class MainGameService {
  private checkArrayWithPiecesChoiced = (array: ItemCheck[]): boolean => {
    const categoryNecessary = [1, 2, 3, 4, 5, 6, 7];
    let thisOk = true;
    categoryNecessary.forEach((categoryID) => {
      let found = false;
      array.forEach((item) => {
        if (item.category.id === categoryID) {
          found = true;
        }
      });
      if (!found) {
        thisOk = false;
      }
    });
    return thisOk;
  };
  private sortItems = async (): Promise<sorteds> => {
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
      const games = await Game.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      return {
        error: false,
        message: 'Todos os sorteios.',
        data: games,
      };
    } catch (e) {
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

  // Play area
  async getAllGames(req: Request): Promise<serverResponse> {
    const ME: decodedToken = jwtDecode(req.headers['authorization']);
    const games = await Game.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    const PerProfile: GamesPerProfile[] = [];
    games.forEach(async (item) => {
      const players = await Play.count({ where: { gameID: item.id } });
      const mePlayed = await Play.findOne({
        where: { gameID: item.id, userID: ME.id },
      });
      // eslint-disable-next-line prefer-const
      let stats = {
        played: false,
        playedStats: null,
      };
      if (mePlayed) {
        (stats.played = true),
          (stats.playedStats = {
            date: mePlayed.date,
          });
      }
      PerProfile.push({
        title: item.title,
        description: item.description,
        day: item.day,
        playersOnGame: players,
        ...stats,
      });
    });
    return {
      error: false,
      message: 'Jogos de acordo com seu perfil.',
      data: PerProfile,
    };
  }
  async getMyStats(req: Request) {
    const ME: decodedToken = jwtDecode(req.headers['authorization']);
    const myPlayeds = await Play.findAll({
      where: {
        userID: ME.id,
      },
    });
    return myPlayeds;
  }
  async enterOnGame(body: EnterPlay, req: Request) {
    // Zod validation
    const isValid = await PlayValidationCreate.safeParseAsync(body);
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa!', isValid.error.errors[0].message);
    }

    // Collect a token
    const ME: decodedToken = jwtDecode(req.headers['authorization']);
    // Verify if is played, case played, not ok
    const iPlayed = await Play.findOne({
      where: {
        userID: ME.id,
        gameID: body.gameID,
      },
    });
    if (iPlayed) {
      throw new ConflictException('Ops.', 'Você já jogou!');
    }

    // GameID Exist
    const game = await Game.findOne({ where: { id: body.gameID } });
    if (!game) {
      throw new NotFoundException('Ops.', 'Jogo inexistente.');
    }

    // Validate any items received
    const originalItems = await Piece.findAll();
    const itemsFromPlayer: ItemCheck[] = [];
    body['items'].forEach((item) => {
      const findItem = originalItems.findIndex(
        (beforeItem) => beforeItem['id'] === item.id,
      );
      if (findItem < 0) {
        throw new NotFoundException('Ops.', `Peça #${item.id} não encontrada.`);
      }
      if (item.categoryID !== originalItems[findItem]['category']['id']) {
        throw new BadRequestException(
          'Ops.',
          `A categoria da peça #${item.id} não corresponde.`,
        );
      }
      itemsFromPlayer.push({
        itemID: item.id,
        category: {
          id: item.categoryID,
        },
      });
    });

    // Check if the array contains all categories
    const finalCheck = this.checkArrayWithPiecesChoiced(itemsFromPlayer);
    if (!finalCheck) {
      throw new BadRequestException(
        'Hum...',
        'Nem todas as categorias estão na lista.',
      );
    }

    // Collect this date
    const data = new Date().toISOString();

    return await Play.create({
      choiceds: itemsFromPlayer,
      userID: ME.id,
      gameID: body.gameID,
      date: data,
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw new InternalServerErrorException(
          'Ops.',
          'Houve um erro interno, tente novamente mais tarde.',
        );
      });
  }
}
