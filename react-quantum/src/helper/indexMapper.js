export function indexMapper2to1(row, col, size) {
    return row*size + col;
}

export function indexMapper1to2(idx, size) {
    return [Math.floor(idx/size), Math.floor(idx%size)];
}