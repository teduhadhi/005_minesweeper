import gridLayout from "./gridLayout";

const level: number[][] = [
  [9, 9, 10],
  [9, 9, 20],
  [16, 9, 40],
]

const levelButtons = document.querySelectorAll(".button-level") as NodeListOf<HTMLButtonElement>;
const gridContainer = document.querySelector(".grid-container") as HTMLDivElement;


levelButtons.forEach(function(button, index) {
  button.onclick = (): void => {
    gridLayout.gridCreate(level[index], gridContainer);
  }
})



