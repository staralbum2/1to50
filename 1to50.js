document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", startGame);

    let currentNumber = 1; 
    let numbers = [];
    let remainingNumbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 26)); // 26~50 범위의 숫자들
    let gameBoard = document.getElementById("gameBoard");

    function startGame() {
        document.getElementById("startBtn").style.display = "none"; 
        gameBoard.classList.remove("hidden"); 
        resetBoard();
        createBoard(); 
    }

    function resetBoard() {
        currentNumber = 1;
        numbers = [];
        remainingNumbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 26)); // 26~50 범위 숫자 랜덤 배열
        gameBoard.innerHTML = "";
    }

    function createBoard() {
       
        numbers = shuffleArray(Array.from({ length: 25 }, (_, i) => i + 1));

        
        numbers.forEach((num, index) => {
            const cell = document.createElement("div");
            cell.classList.add("number-cell");
            cell.textContent = num;
            cell.dataset.number = num; 
            gameBoard.appendChild(cell);

        
            cell.addEventListener("click", function () {
                handleCellClick(cell, num);
            });
        });
    }

    function handleCellClick(cell, num) {
        
        if (num === currentNumber) {
            if (num <= 25) {
                
                const randomNumber = remainingNumbers.pop(); 
                cell.textContent = randomNumber; 
                currentNumber++; 
            } else {
      
                cell.style.opacity = 0; 
                setTimeout(() => {
                    cell.style.opacity = 1; 
                    currentNumber++; 
                    if (currentNumber <= 50) {
                        const nextCell = document.querySelector(`.number-cell[data-number='${currentNumber}']`);
                        if (nextCell) nextCell.textContent = currentNumber;
                    }
                }, 500);
            }

            if (currentNumber > 50) {
                alert("게임을 완료했습니다!");
                resetGame();
            }
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function resetGame() {
        resetBoard();
        document.getElementById("startBtn").style.display = "inline-block"; 
        gameBoard.classList.add("hidden"); 
    }
});
