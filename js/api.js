const heroById = async (id) => {
    const url = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`;
    const response = await fetch(url);
    const dadosHero = await response.json()
    return dadosHero;
}

const heroAll = async () => {
    const url = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`;
    const response = await fetch(url);
    const dadosHero = await response.json()
    return dadosHero;
}

const heroRandom  = async () => {
    let random = Math.floor(Math.random() * 731);
    random =+ 1;
    return heroById(random);
}

export { heroById, heroAll, heroRandom }