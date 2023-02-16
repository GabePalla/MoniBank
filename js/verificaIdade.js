export default function verificaIdade(data) {
    const dataElemento = new Date(data.value);
    const dataAtual = new Date();
    const dataNascimentoMaisDezoitoAnos = new Date(dataElemento.getUTCFullYear() + 18
        , dataElemento.getUTCMonth(), dataElemento.getUTCDate());

    return dataAtual >= dataNascimentoMaisDezoitoAnos;
}