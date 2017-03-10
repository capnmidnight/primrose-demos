var env = new Primrose.BrowserEnvironment({
  groundTexture: 0x7f7f7f,
  backgroundColor: 0xffffff,
  useFog: true,
  fullScreenButtonContainer: "#fullScreenButtonContainer",
  useGaze: false
});

var dim = 25,
  rad = 0.75,
  opts = {
    unshaded: true,
    transparent: true,
    progress: Preloader.thunk
  },

  stand = hub()
    .named("Stand")
    .at(0, env.options.avatarHeight, 0)
    .addTo(env.scene),

  photo1 = new Primrose.Controls.Image([
      "cng-left.jpg",
      "cng-right.jpg"
    ], opts)
    .named("CNG")
    .latLon(0, dim, rad)
    .addTo(stand),

  photo2 = new Primrose.Controls.Image([
      "usat-left.jpg",
      "usat-right.jpg"
    ], opts)
    .named("USAToday")
    .latLon(0, -dim, rad)
    .addTo(stand);

env.on("ready", Preloader.hide);
