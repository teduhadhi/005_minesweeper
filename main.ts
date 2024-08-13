const level: number[][] = [
  [9, 9, 10],
  [9, 9, 20],
  [9, 16, 40],
]

const buttons = document.querySelectorAll(".button-level") as NodeListOf<HTMLButtonElement>;
const gridContainer = document.querySelector(".grid-container") as HTMLDivElement;


// for (const button of buttons){
  
// }

const gridCreate = (level : number[], gridContainer : HTMLDivElement): void => {

  const rows: number = level[0];
  const cols: number = level[1];

  for (let row: number = 0; row < rows; row++) {
    for (let col: number = 0; col < cols; col++ ) {
      const gridTile: HTMLDivElement = document.createElement("div");
      const gridItem: HTMLParagraphElement = document.createElement("p");
      
      gridTile.classList.add()
      gridItem.classList.add()

      gridTile.appendChild(gridItem);
      gridContainer.appendChild(gridTile);
    }
  }
}

gridCreate(level[0], gridContainer)


