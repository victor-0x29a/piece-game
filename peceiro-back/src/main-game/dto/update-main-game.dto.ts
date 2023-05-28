import { PartialType } from '@nestjs/mapped-types';
import { CreateMainGameDto } from './create-main-game.dto';

export class UpdateMainGameDto extends PartialType(CreateMainGameDto) {}
