var Data = {
    getLetterDistribution: function(text) {
        var getDistribution = function(text) {
            return text.split('')
                .filter(function(character) {return character.match(/[a-z]/i)})
                .map(function(letter) {return letter.toUpperCase()})
                .reduce(function(counter, current){
                    if (!counter.hasOwnProperty(current)) {
                        counter[current] = 0
                    }
                    counter[current] += 1;
                    return counter;
                }, {})
        };

        var lettersDistribution = getDistribution(text),
            data = [];

        for (var key in lettersDistribution) {
            data.push({
                label: key,
                value: lettersDistribution[key]
            });
        }

        return data;
    }
};