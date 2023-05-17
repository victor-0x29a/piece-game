export interface serverResponse {
  error: boolean;
  message?: string;
  data: any;
}

export type categoryType = [id: number, nome: string];

export const categories: categoryType[] = [
  [1, 'Placa de vídeo'],
  [2, 'Periféricos'],
  [3, 'Processadores'],
  [4, 'Refrigeração'],
  [5, 'Acessórios'],
  [6, 'Tela'],
  [7, 'Ambiente'],
];
