// Variables
let firstDisplay = document.querySelector(".first-display");
let secondDisplay = document.querySelector(".second-display");
let isEquals = false;
let isResult = false;

// Function untuk mendapatkan angka dari second display
const getSecondNumber = () => {
  let number = secondDisplay.textContent.substring(
    0,
    secondDisplay.textContent.length - 2
  );
  return number;
};

//Function untuk mengubah ukuran output first display
const updateDisplay = () => {
  if (firstDisplay.textContent.length > 13) {
    firstDisplay.style.fontSize = "1.3rem";
  } else {
    firstDisplay.style.fontSize = "2.3rem";
  }
};

// Input number
const handleNumberInput = (item) => {
  let prevSecondDisplay = getSecondNumber();

  //jika angka pada first display diklik dua kali dan kondisi isEquals (klik angka yang sama) masih false
  if (item.textContent == firstDisplay.textContent && !isEquals) {
    isEquals = true;
    //jika status isEquals true dan second display tidak kosong, maka tambahkan angka baru dibelakang angka lama
  } else if (isEquals && secondDisplay.textContent.length != 0) {
    firstDisplay.textContent += item.textContent;
    updateDisplay(); //check apakah angka yang diinputkan user memiliki panjang melebihi 13
    isEquals = false; //ubah isEquals menjadi false
    return; //berhentikan perulangan
  }

  //jika first display memiliki angka 0 atau
  // ketika second display tidak kosong dan first display dan second display memiliki angka yang sama
  //replace angka tersebut
  if (
    firstDisplay.textContent == "0" ||
    (secondDisplay.textContent.length != 0 &&
      firstDisplay.textContent == prevSecondDisplay)
  ) {
    // check apakah user ingin meng inputkan angka float / desimal
    if (item.textContent != ".") {
      firstDisplay.textContent = item.textContent;
    } else {
      firstDisplay.textContent = "0.";
    }
    //check apakah user menginputkan angka setelah menekan tombol sama dengan
  } else if (isResult == true) {
    firstDisplay.textContent = item.textContent;
    secondDisplay.textContent = "";
    isResult = false;
  } else {
    firstDisplay.textContent += item.textContent;
    updateDisplay();
  }
};

// Event Listeners
const numpadItem = document.querySelectorAll(".numpad-item");
numpadItem.forEach((item) => {
  item.addEventListener("click", () => {
    handleNumberInput(item);
  });
});

// Clear and Delete
const handleDelete = () => {
  let prev = firstDisplay.textContent;
  //jika panjang content dari first display = 1, maka ubah menjadi 0
  if (prev.length == 1) {
    firstDisplay.textContent = "0";
  } else {
    //jika tidak, potong angka terakhir dari first display
    firstDisplay.textContent = prev.substring(
      0,
      firstDisplay.textContent.length - 1
    );
  }
  updateDisplay();
};

const clear = document.querySelector("#delete");
clear.addEventListener("click", handleDelete);

//hapus semua angka, ubah content first display menjadi 0
const clearAll = document.querySelector("#clear-all");
clearAll.addEventListener("click", () => {
  firstDisplay.textContent = "0";
  secondDisplay.textContent = "";
  updateDisplay();
});

// Input Operator
const handleOperatorInput = (e) => {
  let prevSecondDisplay = secondDisplay.textContent;
  let secondNumber = getSecondNumber();
  let prevFirstDisplay = firstDisplay.textContent;
  let result = 0;

  // tambahkan content first display dengan spasi dan operator yang diinputkan user
  firstDisplay.textContent += " " + e.target.textContent;
  // copy output dari first display ke second display
  secondDisplay.textContent = firstDisplay.textContent;
  //terakhir kembalikan output first display seperti semula
  firstDisplay.textContent = prevFirstDisplay;
  isResult = false;

  //kondisi ini digunakan ketika user ingin melakukan multiple operator

  //check jika angka pada second display sama dengan first display atau kondisi isEquals true
  if (
    (secondNumber != firstDisplay.textContent && prevSecondDisplay) ||
    isEquals
  ) {
    //check pada second display apakah user sebelumnya menginputkan operator x
    if (prevSecondDisplay.lastIndexOf("x") != -1) {
      //fungsi eval digunakan untuk mengeksekusi string menjadi ekspresi matematika
      result = eval(secondNumber + "  *  " + firstDisplay.textContent);
    } else {
      result = eval(prevSecondDisplay + prevFirstDisplay);
    }
    secondDisplay.textContent = result + " " + e.target.textContent;
    firstDisplay.textContent = result;
    updateDisplay();
  }

  //ubah variable isResult dan isEquals ke keadaan awal
  isEquals = false;
};

const operator = document.querySelectorAll(".operator");
operator.forEach((item) => {
  item.addEventListener("click", (e) => {
    handleOperatorInput(e);
  });
});

// Toggle Sign
//check apakah angka dari first display mengandung simbol negatif
//jika tidak tambahkan simbol negatif jika iya hapus simbol negatif
const handleSignToggle = () => {
  const hasMinus = firstDisplay.textContent.includes("-");
  firstDisplay.textContent = hasMinus
    ? firstDisplay.textContent.replace("-", "")
    : "-" + firstDisplay.textContent;
};

const signToggle = document.querySelector("#signToggle");
signToggle.addEventListener("click", handleSignToggle);

// Output
//hitung operasi yang diinputkan user
const checkResult = () => {
  let prevFirstDisplay = firstDisplay.textContent;
  //check apakah second display terdapat simbol x
  if (secondDisplay.textContent.includes("x")) {
    firstDisplay.textContent = eval(
      getSecondNumber() + "  *  " + firstDisplay.textContent
    );
  } else {
    firstDisplay.textContent = eval(
      secondDisplay.textContent + firstDisplay.textContent
    );
  }
  //jika sudah dihitung ubah second dispay
  secondDisplay.textContent += " " + prevFirstDisplay + " =";
  isResult = true;
  isEquals = false;
  updateDisplay();
};

const equals = document.querySelector("#equals");
equals.addEventListener("click", checkResult);
