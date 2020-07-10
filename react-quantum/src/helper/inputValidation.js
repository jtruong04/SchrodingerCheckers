import { indexMapper1to2 } from './indexMapper';

export const isValidLink = (src, dst, size) => {
    const [fromRow, fromCol] = indexMapper1to2(parseInt(src), size);
    const [toRow, toCol] = indexMapper1to2(dst, size);
    return (
        (fromRow - toRow === 0 && Math.abs(fromCol - toCol) === 1) ||
        (Math.abs(fromRow - toRow) === 1 && fromCol - toCol === 0)
    );
};
