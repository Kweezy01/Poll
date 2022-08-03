const SAMPLE_SIZE = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
    notThisOne
) => {
    const pokedex_num = Math.floor(Math.random() * SAMPLE_SIZE + 1)

    if (pokedex_num !== notThisOne) return pokedex_num;
    return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
    const firstId = getRandomPokemon();
    const secondId = getRandomPokemon(firstId);

    return [firstId, secondId];
}
