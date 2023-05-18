export interface Column {
    id: 'product' | 'category';
    label: string;
    minWidth?: number;
    align?: 'right';
}

export const columns: Column[] = [
    { id: 'product', label: 'Nome', minWidth: 170 },
    { id: 'category', label: 'Categoria', minWidth: 100 },
]
