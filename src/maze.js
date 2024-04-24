"use strict";
// Define Canva and context
let maze = document.getElementById("maze");
let ctx = maze.getContext("2d");
// Current cell visited on the grid
let current;
class Maze {
    constructor(size, rows, columns) {
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.size = size;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.stack = [];
    }
    // Build initial grid
    setup() {
        for (let r = 0; r < this.rows; r++) {
            // Array will contain all cells
            let row = [];
            for (let c = 0; c < this.columns; c++) {
                // Create cell parent props
                let cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        // Current cell is the first cell : the top at the left
        current = this.grid[0][0];
    }
}
class Cell {
    constructor(rowNum, colNum, parentGrid, parentSize) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.rowNum = rowNum;
        this.colNum = rowNum;
        this.parentGrid = parentGrid;
        this.parentSize = parentSize;
        this.visited = false;
        // At the beginning cells are generated with all walls
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true,
        };
    }
}
let newMaze = new Maze(500, 10, 10);
newMaze.setup();
