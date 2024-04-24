// Define Canva and context
let maze = document.getElementById("maze") as HTMLCanvasElement;
let ctx = maze.getContext("2d");

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
}

let newMaze = new Maze(500, 10, 10);
newMaze.setup();
