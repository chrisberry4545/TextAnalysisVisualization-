var wordData = (function() {

    var defaultData = 'test 123';

    function getWordData() {
        var value = document.getElementById('textToAnalyse').value;
        if (value == null || value == '') {
            return defaultData;
        }
        return value;
    }


    return {
        getWordData: getWordData
    };


})();
