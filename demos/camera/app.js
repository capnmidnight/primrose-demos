var env = new Primrose.BrowserEnvironment({
  useFog: true,
  groundTexture: 0x7f7f7f,
  backgroundColor: 0xffffff,
  fullScreenButtonContainer: "#fullScreenButtonContainer"
});


env.on("ready", function() {

  camera(0)
    .then(function(cam) {

      cam.play();
      cam.addTo(env.head)
        .at(0, 0, -0.5);

      Preloader.hide();
    });

});