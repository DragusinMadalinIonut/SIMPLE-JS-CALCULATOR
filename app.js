(function() {
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');
    let historyButton = document.querySelector('.btn-History');
  
    let isMinusAdded = false;
    let isSymbolAdded = false;
    let history = [];
    let lastResult = null;
    let equalClickCount = 0;
  
    buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        let value = e.target.dataset.num;
  
        // Clear the "Please enter" message
        if (screen.value === "Please enter a number") {
          screen.value = "";
        }
  
        // Check if the last character on the screen is an operator or minus sign
        if (/[\+\*\/-]$/.test(screen.value) && /[\+\*\/]/.test(value)) {
          // Replace the last operator with the current operator
          screen.value = screen.value.slice(0, -1) + value;
          isSymbolAdded = true;
        }
        // Allow only minus sign (-) to be added before a number
        else if (value === '-' && (screen.value === '' || /[\+\*\/-]$/.test(screen.value)) && !isMinusAdded) {
          screen.value += value;
          isMinusAdded = true;
        }
        // Allow numbers to be inputted without a sign in front of them
        else if (/\d/.test(value)) {
          screen.value += value;
          isSymbolAdded = false;
        }
        // Allow only one symbol to be added after a number
        else if (/\d$/.test(screen.value) && !isSymbolAdded) {
          screen.value += value;
          isSymbolAdded = true;
        }
        else {
          // Ignore the button press
        }
      });
    });
  
    equal.addEventListener('click', function(e) {
      if (screen.value === '') {
        screen.value = "Please enter a number";
      } else {
        let result = null;
  
        if (lastResult !== null) {
          // Perform operation on last result
          result = eval(lastResult + screen.value);
        } else {
          // Perform operation on the current value
          result = eval(screen.value);
        }
  
        screen.value = result;
  
        // Add operation to history
        if (history.length >= 10) {
          history.shift();
        }
        history.push(screen.value);
  
        lastResult = screen.value;
      }
      isMinusAdded = false; // Reset the minus flag
      isSymbolAdded = false; // Reset the symbol flag
  
      // Empty the display when equal is pressed a second time
      equalClickCount++;
      if (equalClickCount >= 2) {
        screen.value = '';
        lastResult = null;
        equalClickCount = 0;
      }
    });
  
    clear.addEventListener('click', function(e) {
      screen.value = "";
      isMinusAdded = false; // Reset the minus flag
      isSymbolAdded = false; // Reset the symbol flag
      lastResult = null; // Reset the last result
      equalClickCount = 0; // Reset the equal click count
    });
  
    historyButton.addEventListener('click', function(e) {
      if (history.length === 0) {
        screen.value = "No history available";
      } else {
        screen.value = history.join(', ');
      }
    });
  })();
  