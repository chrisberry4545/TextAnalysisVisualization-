var graphicsRenderer = (function() {

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    function addLights() {
        function makeLight() {
            var light = new THREE.PointLight(0xFFFFFF);
            // set its position
            light.position.x = 10;
            light.position.y = 50;
            light.position.z = 130;
            return light;
        }
        // create a point light
        var pointLight2 = makeLight();
        pointLight2.position.x = -(WIDTH / 2);
        pointLight2.position.y = 200;
        pointLight2.position.z = 0;
        var light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);
        scene.add(pointLight2);
    }

    function createSphere(radius, segments, rings, sphereColor) {
        //Defaults
        radius = radius != null ? radius : 7;
        segments = segments != null ? segments : 16;
        rings = rings != null ? rings : 16;
        sphereMaterial = new THREE.MeshLambertMaterial(
                {
                    color: new THREE.Color(sphereColor)
                });
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, rings),
            sphereMaterial);
    }

    function createCircle(radius, segments, color) {
        var material = new THREE.MeshBasicMaterial({
           color: color != null ? color : 0x0000ff
        });

        var radiusSize = radius != null ? radius : 5;
        var numSegments = segments != null ? segments : 32;

        var circleGeometry = new THREE.CircleGeometry( radiusSize, numSegments );
        return new THREE.Mesh( circleGeometry, material );
    }

    function createText(text, fontSize, coords) {
        // create a canvas element
        var canvas1 = document.createElement('canvas');
        var context1 = canvas1.getContext('2d');
        context1.font = "Bold " + fontSize+ "px Arial";
        context1.fillStyle = "rgba(255,0,0,0.95)";
        context1.fillText(text, coords.x, coords.y);

        // canvas contents will be used for a texture
        var texture1 = new THREE.Texture(canvas1)
        texture1.needsUpdate = true;

        var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
        material1.transparent = true;

        var mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(canvas1.width, canvas1.height),
            material1
          );
        mesh1.position.set(0,50,0);
        return mesh1;
    }

    function renderScene() {
        renderer.render(scene, camera);
    }

    function setUpText(possibleEmotions) {
        var numberOfOptions = possibleEmotions.length;
        var yPosition = 50;
        var stepSizeY = 50 / (numberOfOptions - 1);

        possibleEmotions.forEach(function(val) {
            scene.add(createText(val, 25, {
              x: 0,
              y: yPosition
            }));
            yPosition += stepSizeY;
        });
    }

    function setUpBaseDisk() {
        scene.add(createCircle(80, null, '#FFFFFF'));
    }

    function setupGraph(possibleEmotions) {
        setUpBaseDisk();
        setUpText(possibleEmotions);
    }

    function renderResults(results) {

        var str = '';
        for(var prop in results) {
            console.log(prop + ':' + results[prop]);
            str += prop + ': ' + results[prop] + '<br/>';
        }
        document.getElementById('results').innerHTML = str;
    }

    var scene, renderer, camera;
    var WIDTH = 1200,
      HEIGHT = 600;
      // set some camera attributes
      var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    function init(containerId) {
        var container = document.getElementById(containerId);
        renderer = new THREE.WebGLRenderer();
        camera =
          new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;
        scene = new THREE.Scene();
        scene.add(camera);
        // the camera starts at 0,0,0
        // so pull it back
        camera.position.z = 300;
        // start the renderer
        renderer.setSize(WIDTH, HEIGHT);
        // attach the render-supplied DOM element
        container.appendChild(renderer.domElement);

        (function animloop() {
            requestAnimFrame(animloop);
            // renderSceneObjects();
            renderScene();
        })();
    }

    function setUpScene(possibleEmotions) {
        addLights();
        setupGraph(possibleEmotions);
    }


    return {
        renderResults: renderResults,
        init: init,
        setUpScene: setUpScene
    };

})();
