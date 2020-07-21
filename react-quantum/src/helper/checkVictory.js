const checkVictory = (completions) => {
    const gameOverThreshold = completions[0].length;
    const scores = completions.map(
        (player) => player.filter((card) => card).length
    );
    if (scores.includes(gameOverThreshold)) {
        return scores;
    }
    return false;
};

export default checkVictory;
