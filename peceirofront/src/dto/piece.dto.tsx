export type CategoryDtoArray = [id: number, nome: string]

export interface CategoryDto {
    id: number;
    name: string;
}


export interface CreatePieceDto {
    id?: number;
    category: CategoryDto;
    product: string;
}
