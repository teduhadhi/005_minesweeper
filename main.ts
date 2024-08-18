import gridLayout from "./gridLayout";
import mineSpreads from "./mineSpreads";
import checkTile from "./checkTile";

const config: number[][] = [
  [9, 9, 10],
  [9, 9, 20],
  [16, 9, 40],
]


const gridContainer = document.querySelector(".grid-container") as HTMLDivElement;
const levelButtons = document.querySelectorAll(".button-level") as NodeListOf<HTMLButtonElement>;
const flagButton = document.querySelector(".button-flag") as HTMLButtonElement;

let flagStatus: boolean = false;
let minesArray: string[] = [];
let configIndex: number[] = [];
let gridArray = gridContainer.children as HTMLCollection;


levelButtons.forEach(function(button, index) {
  button.onclick = (): number[] => {
    gridArray = gridLayout.gridCreate(config[index], gridContainer);
    minesArray = mineSpreads.mineSet(config[index], gridArray);
    checkTile.tileConfig(config[index], minesArray);
    return configIndex = config[index];
  }
})

flagButton.onclick = (event: MouseEvent) => {
  const target = event.target as HTMLDivElement

  if(flagStatus){
    target.classList.remove("gray")
    flagStatus = false;
  } else{
    target.classList.add("gray")
    flagStatus = true;
  }
}

gridContainer.onclick = (event: MouseEvent) => {
  const target = event.target as HTMLDivElement

  if(!flagStatus){
    checkTile.checkMine(target.id);
  }
  else {
    target.innerHTML != "" ? target.innerHTML = "flag" : target.innerHTML = ""
  }
}





