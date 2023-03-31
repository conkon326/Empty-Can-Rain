window.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Remove all empty cans from the canvas
      emptyCans.forEach(emptyCan => canvas.remove(emptyCan.object));
      emptyCans.length = 0;

      // Create empty cans based on the input value
      const numCans = document.getElementById('num-cans').value;
      for (let i = 0; i < numCans; i++) {
        const emptyCan = new EmptyCan();
        emptyCans.push(emptyCan);
      }

      // Start animation loop
      function animate() {
        // Move all the empty cans down the screen
        emptyCans.forEach(emptyCan => {
          emptyCan.move();
          emptyCan.checkIfOffScreen();
        });

        // Request next animation frame
        requestAnimationFrame(animate);
      }

      animate();

      // Update the number of cans based on the input value
      document.getElementById('num-cans').addEventListener('input', () => {
        const numCans = document.getElementById('num-cans').value;
        // Remove extra empty cans
        while (emptyCans.length > numCans) {
          const emptyCan = emptyCans.pop();
          canvas.remove(emptyCan.object);
        }
        // Add new empty cans
        for (let i = emptyCans.length; i < numCans; i++) {
          const emptyCan = new EmptyCan();
          emptyCans.push(emptyCan);
        }
      });
    });
  }
});
