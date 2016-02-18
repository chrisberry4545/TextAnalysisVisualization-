
var mainProcess = (function() {
    graphicsRenderer.init('container');
    graphicsRenderer.setUpScene(wordAnalysis.getPossibleEmotions());
    
    graphicsRenderer.renderResults(
        wordAnalysis.analyseText(
            wordData.getWordData()
        )
    );

})();
