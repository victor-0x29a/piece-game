import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { serverResponse } from '../app.constant';
import { Piece } from '../database/entities/piece.entity';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { PieceValidationCreate } from './entities/piece.entity';
import { categories } from '../app.constant';

export class PiecesService {
  private async getOne(id: number): Promise<Piece | false> {
    const data = await Piece.findOne({
      where: { id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!data) return false;
    return data;
  }
  private async getAll(): Promise<Piece[]> {
    const data = await Piece.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return data;
  }

  async create(createPiece: CreatePieceDto) {
    const isValid = await PieceValidationCreate.safeParseAsync(createPiece);
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa!', isValid.error.errors[0].message);
    }

    let category = { valid: false, index: 0 };
    categories.forEach((item, index) => {
      if (item[0] === createPiece.category.id) {
        category = { valid: true, index: index };
      }
    });
    if (!category.valid) {
      throw new NotFoundException('Ops.', 'Categoria não encontrada.');
    }
    return await Piece.create({
      product: createPiece.product,
      category: {
        id: categories[category.index][0],
        name: categories[category.index][1],
      },
    })
      .then(() => {
        return true;
      })
      .catch((err: Error) => {
        throw new InternalServerErrorException(
          'Ops.',
          'Tente novamente mais tarde.',
        );
      });
  }

  async findAll(): Promise<serverResponse> {
    const Pecas = await this.getAll();
    return {
      error: false,
      message: 'Todos os componentes',
      data: Pecas,
    };
  }

  async findOne(id: number): Promise<serverResponse> {
    if (id < 0 || typeof id !== 'number') {
      throw new NotAcceptableException('Ops', 'Confira o ID.');
    }
    const Pecas = await this.getOne(id);
    if (!Pecas) {
      throw new NotFoundException('Ops', 'Componente não encontrado.');
    }
    return {
      error: false,
      message: 'O componente',
      data: Pecas,
    };
  }

  async update(id: number, updatePieceDto: UpdatePieceDto) {
    const isValid = await PieceValidationCreate.safeParseAsync(updatePieceDto);
    if (isValid.success === false) {
      throw new NotAcceptableException('Opa!', isValid.error.errors[0].message);
    }
    const Pecas = await this.getOne(id);
    if (!Pecas) {
      throw new NotFoundException('Ops', 'Componente não encontrado.');
    }
    await Piece.update(
      {
        category: updatePieceDto.category,
        product: updatePieceDto.product,
      },
      {
        where: {
          id: id,
        },
      },
    )
      .then(() => {
        return true;
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Ops.',
          'Tente novamente mais tarde.',
        );
      });
  }

  async remove(id: number) {
    const Peca = await this.getOne(id);
    if (!Peca) {
      throw new NotFoundException('Ops', 'Componente não encontrado.');
    }
    return await Piece.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw new InternalServerErrorException(
          'Ops.',
          'Tente novamente mais tarde.',
        );
      });
  }

  async preset(): Promise<serverResponse> {
    return {
      error: false,
      message: 'Preset dos itens.',
      data: {
        categories: categories,
      },
    };
  }
}
