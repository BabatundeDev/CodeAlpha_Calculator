document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("calculator-screen");
  const keys = document.querySelectorAll(".key");
  const clearButton = document.getElementById("clear");
  const backSpace = document.getElementById("backspace");

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const keyValue = key.value;

      if (keyValue === "=") {
        calculateResult();
      } else if (keyValue === "C") {
        screen.value = "";
      } else if (keyValue === "←") {
        screen.value = screen.value.slice(0, -1);
      } else {
        screen.value += keyValue;
      }
    });
  });

  clearButton.addEventListener("click", () => {
    screen.value = "";
  });

  backSpace.addEventListener("click", () => {
    screen.value = screen.value.slice(0, -1);
  });

  // ✅ Add Keyboard Support
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
      // If the key is a number or a decimal point, add it to the screen
      screen.value += key;
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      // If it's an operator, add it to the screen
      screen.value += key;
    } else if (key === "Enter" || key === "=") {
      // If Enter or = is pressed, calculate the result
      calculateResult();
    } else if (key === "Backspace") {
      // If Backspace is pressed, remove the last character
      screen.value = screen.value.slice(0, -1);
    } else if (key === "Escape") {
      // If Escape (Esc) is pressed, clear the screen
      screen.value = "";
    }
  });

  // ✅ Function to Calculate Result
  function calculateResult() {
    try {
      // Handle percentage by converting the value before evaluation
      let result = screen.value.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-");

      // If the input contains a percentage, handle it
      if (result.includes("%")) {
        result = result.replace(/(\d+)%/g, (match, p1) => {
          return `(${p1} / 100)`; // Converts 20% to (20 / 100)
        });
      }

      // Evaluate the expression
      screen.value = new Function("return " + result)();
    } catch {
      screen.value = "Error";
    }
  }
});
