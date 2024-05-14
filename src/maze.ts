import { WallProps } from "./types";

// Define Canva and context
let maze = document.getElementById("maze") as HTMLCanvasElement;
let ctx = maze.getContext("2d")!;

// Current cell visited on the grid
let current: Cell;

class Maze {
  private grid: Cell[][];
  // Each element of the stack represent a cell of the maze
  private stack: Cell[];

  constructor(
    public size: number,
    public rows: number,
    public columns: number
  ) {
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
      let row: Cell[] = [];
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

  draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = "black";
    current.visited = true;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c].show(this.size, this.rows, this.columns);
      }
    }

    // Return a random neighbor
    let next = current.checkNeighbours();

    if (next) {
      next.visited = true;
      this.stack.push(current);
      current.highlight(this.columns);
      current.removeWall(current, next);
      current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current.highlight(this.columns);
    }
  }
}

class Cell {
  // Determine if algorithm has reached the case
  public visited: Boolean;
  // The walls of each cell
  private walls: WallProps;
  constructor(
    public rowNum: number,
    public colNum: number,
    public parentGrid: Cell[][],
    public parentSize: number
  ) {
    this.rowNum = rowNum;
    this.colNum = colNum;
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

  // Check all neighbours and non visited cells
  checkNeighbours() {
    let grid = this.parentGrid;
    let row = this.rowNum;
    let col = this.colNum;
    let neighbours: Cell[] = [];

    // get cell if its not at the side of the labyrinth
    let top = row !== 0 ? grid[row - 1][col] : undefined;
    let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    let left = col !== 0 ? grid[row][col - 1] : undefined;

    //If cell exist and hasnt been visited push it to neighbours array
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);

    if (neighbours.length !== 0) {
      let random = Math.floor(Math.random() * neighbours.length);
      return neighbours[random];
    } else {
      return undefined;
    }
  }

  drawTopWall(
    y: number,
    x: number,
    size: number,
    columns: number,
    rows: number
  ) {
    //Start drawing
    ctx.beginPath();
    // Move the position
    ctx.moveTo(x, y);
    //Draw a line from top left to top right
    ctx.lineTo(x + size / columns, y);
    ctx.stroke();
  }

  drawRightWall(
    y: number,
    x: number,
    size: number,
    columns: number,
    rows: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + size / columns, y);
    // Draw from top right to bottom right
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawBottomWall(
    y: number,
    x: number,
    size: number,
    columns: number,
    rows: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / rows);
    ctx.lineTo(x + size / columns, y + size / rows);
    ctx.stroke();
  }

  drawLeftWall(
    y: number,
    x: number,
    size: number,
    columns: number,
    rows: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size / rows);
    ctx.stroke();
  }

  highlight(columns: number) {
    let x = (this.colNum * this.parentSize) / columns + 1;
    let y = (this.rowNum * this.parentGrid) / row + 1;

    ctx.fillStyle = "green";
    ctx.fillRect(
      x,
      y,
      this.parentSize / columns - 3,
      this.parentSize / columns - 3
    );
  }

  removeWall(cell1: Cell, cell2: Cell) {
    let x = cell1.colNum - cell2.colNum;

    if (x == 1) {
      cell1.walls.leftWall = false;
      cell2.walls.rightWall = false;
    } else if (x == -1) {
      cell1.walls.rightWall = false;
      cell2.walls.leftWall = false;
    }

    let y = cell1.rowNum - cell2.rowNum;

    if (y == 1) {
      cell1.walls.topWall = false;
      cell2.walls.bottomWall = false;
    } else if (y == -1) {
      cell1.walls.bottomWall = false;
      cell2.walls.topWall = false;
    }
  }

  // Draw cells to the canva
  show(size: number, rows: number, columns: number) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;

    ctx.strokeStyle = "#ffffff";
    // Color of cells
    ctx.fillStyle = "red";
    ctx.lineWidth = 2;

    if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
    if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
    if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
    if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);

    if (this.visited) {
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

let newMaze = new Maze(500, 10, 10);
newMaze.setup();
newMaze.draw();
