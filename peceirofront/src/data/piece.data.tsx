export interface Column {
    uuid: number
    id: 'product' | 'category';
    label: string;
    minWidth?: number;
    align?: 'right';
}

export const columns: Column[] = [
    { uuid: 1, id: 'product', label: 'Nome', minWidth: 170 },
    { uuid: 2, id: 'category', label: 'Categoria', minWidth: 100 },
]
