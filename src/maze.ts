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
}

class Cell {
  // Determine if algorithm has reached the case
  private visited: Boolean;
  // The walls of each cell
  private walls: WallProps;
  constructor(
    public rowNum: number,
    public colNum: number,
    public parentGrid: Cell[][],
    public parentSize: Number
  ) {
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

  // Draw cells to the canva
  show(size: number, rows: number, columns: number) {
    let x = (this.colNum * size) / columns;
    let y = (this.rowNum * size) / rows;

    ctx.strokeStyle = "white";
    // Color of cells
    ctx.fillStyle = "black";
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
