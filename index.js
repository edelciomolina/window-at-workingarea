let RepositionTo = {};
(() => {
  repositionTo = config => {
    config.type = config.type || "web";
    config.app = config.app || {};
    config.app.size = config.app.size || 400;

    let screens = {};
    let work_area = {};
    let screenWidth = window.screen.availWidth;
    let screenHeight = window.screen.availHeight;
    let screenTop = 0;
    let screenLeft = 0;
    let scaleFactor = 1;

    if (config.type === "nwjs") {
      ({ screens } = gui.Screen);
    } else {
      ({ screens } = config);
    }

    let [MonitorPrincipal] = screens;
    if (screens.length > 1) {
      let idxMonitorPrincipal = 0;
      for (let i = 0; i < screens.length; i++) {
        ({ work_area } = screens[i]);
        if (work_area.x === 0 && work_area.y === 0) {
          idxMonitorPrincipal = i;
        }
      }
      MonitorPrincipal = screens[idxMonitorPrincipal];
    }

    ({ scaleFactor, work_area } = MonitorPrincipal);
    work_area.x = work_area.x || 0;
    work_area.y = work_area.y || 0;
    screenWidth = (work_area.width + work_area.x) * scaleFactor;
    screenHeight = work_area.height * scaleFactor;
    screenTop = work_area.y - (work_area.y > 0 ? 5 : 0);
    screenLeft = work_area.x - (work_area.x > 0 ? 5 : 0);

    const appWidth = config.app.width;
    const appHeight = work_area.height;
    const appPosX = parseInt(screenWidth / scaleFactor - appWidth);
    const appPosY = parseInt(screenTop * scaleFactor);

    return {
      app: {
        left: appPosX,
        top: appPosY,
        width: appWidth,
        height: appHeight
      },
      screen: work_area
    };
  };

  RepositionTo = repositionTo;
})();

try {
  module.exports = { RepositionTo };
} catch (error) {}
