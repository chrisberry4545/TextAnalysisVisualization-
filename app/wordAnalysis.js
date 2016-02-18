var wordAnalysis = (function() {

    var wordDictionary = {
        a: {

        },

        b: {
        }
    };

    function getPossibleEmotions() {
        return [
            'sad',
            'happy'
        ];
    }

    function analyseText(str) {
        return {
            sad: 4,
            happy: 2
        };
    }

    return {
        getPossibleEmotions: getPossibleEmotions,
        analyseText: analyseText
    };

})();
