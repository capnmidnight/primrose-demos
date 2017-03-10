var env = new Primrose.BrowserEnvironment({
  useFog: true,
  groundTexture: 0x7f7f7f,
  backgroundColor: 0xffffff,
  fullScreenButtonContainer: "#fullScreenButtonContainer"
});

var stand = hub()
    .named("Stand")
    .at(0, env.options.avatarHeight, 0)
    .addTo(env.scene),

  temp = new THREE.Vector4();

  ["cng", "usat"].forEach(function(img, i, arr) {
    var name = "Image" + i,
      pic = new Primrose.Controls.Image(
        [img + "-left.jpg", img + "-right.jpg"], {
          unshaded: true,
          progress: Preloader.thunk
        })
      .named(name)
      .at((2 * i - 1) * 0.75, 0, -1.5)
      .addTo(stand)
      .on("select", function() {
        temp.copy(pic.position);
        temp.z += 0.5;
        env.teleport(temp);
      });

    window[name] = pic;

    pic.ready.then(function() {
      var g = pic.children[0].geometry;

      g.center();

      var bounds = g.boundingBox,
        border = box(
            (bounds.max.x - bounds.min.x) + 0.03,
            (bounds.max.y - bounds.min.y) + 0.03,
            0.025)
          .colored(0x654321)
          .at(0, 0, -0.02)
          .addTo(pic);
    });
  });

range(4)
  .forEach(function(wall) {
    var b = box(10, 3, 0.1)
      .colored(0xffffff)
      .latLon(0, 90 * wall, 5)
      .addTo(env.scene);
    b.position.z += 3.40;
    b.position.y = 1.5;
  });

env.on("ready", Preloader.hide);
