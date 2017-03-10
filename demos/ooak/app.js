var env = new Primrose.BrowserEnvironment({
  groundTexture: 0x7f7f7f,
  backgroundColor: 0xffffff,
  useFog: true,
  fullScreenButtonContainer: "#fullScreenButtonContainer",
  useGaze: false
});

var dim = 60,
  rad = 0.5,
  opts = {
    unshaded: true,
    transparent: true,
    progress: Preloader.thunk
  },

  stand = hub()
    .named("Stand")
    .at(0, env.options.avatarHeight, 0)
    .addTo(env.scene);

  ["cng", "usat"].forEach(function(img, i, arr) {
    new Primrose.Controls.Image(
      [img + "-left.jpg", img + "-right.jpg"],
      opts)
    .named("Image" + i)
    .latLon(0, dim * (i - (arr.length - 1) / 2), rad)
    .addTo(stand);
  });

env.on("ready", Preloader.hide);
