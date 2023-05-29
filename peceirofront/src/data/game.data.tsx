export interface Column {
    uuid: number
    id: 'title' | 'date';
    label: string;
    minWidth?: number;
    align?: 'right';
}

export const columns: Column[] = [
    { uuid: 1, id: 'title', label: 'Título', minWidth: 170 },
    { uuid: 2, id: 'date', label: 'Data', minWidth: 100 },
]
