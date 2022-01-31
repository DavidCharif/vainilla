export const getData = async url => {
    const data = await fetch(url);
    const objetos = await JSON.parse(data);
    return objetos;
}