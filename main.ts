import gridLayout from "./gridLayout";
import mineSpreads from "./mineSpreads";
import checkTile from "./checkTile";

const config: number[][] = [
  [9, 9, 10],
  [9, 9, 20],
  [16, 9, 40],
]

const levelButtons = document.querySelectorAll(".button-level") as NodeListOf<HTMLButtonElement>;
const gridContainer = document.querySelector(".grid-container") as HTMLDivElement;
let minesArray: string[] = [];
let configIndex: number[] = [];
let gridArray = gridContainer.children as HTMLCollection;


levelButtons.forEach(function(button, index) {
  button.onclick = (): number[] => {
    gridArray = gridLayout.gridCreate(config[index], gridContainer);
    minesArray = mineSpreads.mineSet(config[index], gridArray);
    return configIndex = config[index];
  }
})

gridContainer.onclick = (event: MouseEvent) => {
  const target = event.target as HTMLDivElement
  let status = checkTile.checkMine(minesArray, target.id, configIndex);

  // switch (true) {
  //   case (status > 0):
  //     target.innerHTML = status.toString();
  //     break;

  //   case (status == 0):
  //     target.classList.add("gray")
  //     break;

  //   case (status == -1):
  //     alert("duar")
  //     break;
  
  //   default:
  //     break;
  // }

}





