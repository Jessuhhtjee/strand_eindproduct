    AFRAME.registerComponent('throw-shell', {
      init: function () {
        const shell = this.el;
        let thrown = false;

        shell.addEventListener('click', function () {
          if (thrown) return;
          thrown = true;

          const start = shell.object3D.position.clone();
          const duration = 1600;
          const startTime = performance.now();


          const endX = start.x + 2;
          const endZ = -24;
          const endY = 0.15;

          function animateThrow(now) {
            const t = Math.min((now - startTime) / duration, 1);

            const x = start.x + (endX - start.x) * t;
            const z = start.z + (endZ - start.z) * t;
            const y = start.y + (endY - start.y) * t
                      + 5 * Math.sin(Math.PI * t);

            shell.object3D.position.set(x, y, z);


            shell.object3D.rotation.set(
              t * Math.PI * 4,
              t * Math.PI * 6,
              t * Math.PI * 2
            );

            if (t < 1) {
              requestAnimationFrame(animateThrow);
            } else {
              shell.setAttribute('visible', false);
            }
          }

          requestAnimationFrame(animateThrow);
        });
      }
    });