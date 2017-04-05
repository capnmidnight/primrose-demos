var env = new Primrose.BrowserEnvironment({
  useFog: true,
  groundTexture: 0x7f7f7f,
  backgroundColor: 0xffffff,
  fullScreenButtonContainer: "#fullScreenButtonContainer"
}),

  cam = hub(),

  ready = navigator.mediaDevices.enumerateDevices()
    .catch(errorHandler("ERR [enumerating devices]:>"))
    .then(function(devices) {
      return devices.filter(function(d) {
        return d.kind === "videoinput";
      });
    })
    .then(function(cameras) {
      if(cameras.length === 0) {
        throw new Erorr("No cameras!");
      }
      return cameras[cameras.length - 1];
    })
    .catch(errorHandler("ERR [filtering devices]:>"))
    .then(function(device) {
      return navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: device.deviceId,
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
    })
    .catch(errorHandler("ERR [getting media access]:>"))
    .then(function(stream) {
      console.log(stream);
      return new Primrose.Controls.Video(stream, {
        width: 1,
        height: 480/640,
        unshaded: true,
        transparent: true,
        opacity: 0.5
      }).ready;
    })
    .catch(errorHandler("ERR [creating image]:>"));

env.on("ready", function() {

  ready.then(function(cam) {

    cam._meshes.forEach(function(mesh) {
      mesh.material.map.minFilter = THREE.LinearFilter;
    });

    cam._elements.forEach(function(elem) {
      elem.play();
    });

    cam
      .addTo(env.input.head)
      .at(0, 0, -0.5);

    Preloader.hide();
  });

});

function errorHandler(lbl) {
  return function(err) {
    console.error(lbl, err);
  };
}
