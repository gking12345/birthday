document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle-container');
    const wordListContainer = document.getElementById('word-list');
    const checkButton = document.getElementById('checkButton');

    const words = ['APPLE', 'BANANA', 'ORANGE', 'LEMON', 'GRAPE'];
    const gridSize = 10;

    const grid = [
        ['A', 'P', 'P', 'L', 'E', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['B', 'A', 'N', 'A', 'N', 'A', 'X', 'X', 'X', 'X'],
        ['O', 'R', 'A', 'N', 'G', 'E', 'X', 'X', 'X', 'X'],
        ['L', 'E', 'M', 'O', 'N', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'G', 'R', 'A', 'P', 'E']
    ];

    let selectedCells = [];

    function createPuzzle() {
        grid.forEach((row, rowIndex) => {
            row.forEach((letter, colIndex) => {
                const cell = document.createElement('div');
                cell.textContent = letter;
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                cell.addEventListener('click', () => selectCell(cell));
                puzzleContainer.appendChild(cell);
            });
        });

        words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = word;
            wordListContainer.appendChild(listItem);
        });
    }

    function selectCell(cell) {
        if (cell.classList.contains('found')) return;

        if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
            selectedCells = selectedCells.filter(selectedCell => selectedCell !== cell);
        } else {
            cell.classList.add('selected');
            selectedCells.push(cell);
        }
    }

    function checkWords() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        if (words.includes(selectedWord)) {
            selectedCells.forEach(cell => {
                cell.classList.add('found');
                cell.classList.remove('selected');
            });
            words.splice(words.indexOf(selectedWord), 1);
        } else {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
        }
        selectedCells = [];
    }

    checkButton.addEventListener('click', checkWords);

    createPuzzle();
});
