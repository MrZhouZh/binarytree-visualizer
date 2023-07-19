import rough from 'roughjs'
import { treeFromArray } from 'treevis/tree'
import './style.css'

type NodeValue = number | string | null

interface TreeNode {
  left?: TreeNode
  right?: TreeNode
  val: NodeValue
}

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;

const rc = rough.canvas(canvas);
const ctx = canvas.getContext('2d');

let currentValue

function make(tree: NodeValue[]) {
  canvas.width = window.innerWidth - 40
  canvas.height = window.innerHeight - 140

  const t = treeFromArray(tree) as TreeNode
  const r = 20

  draw(t, [canvas.width / 2, 100], r * 6)
  function draw(node: TreeNode, position: [number, number], s) {
    let [x, y] = position
    if (!ctx) return
    ctx.font = `${r / 1}px serif`
    ctx.fillText(`${node.val}`, x - r / 4, y + r /3)
    
    rc.circle(x, y, r * 2)

    if (node.left) {
      const leftPosition = [x - s, y + r * 4] as [number, number]
      draw(node.left, leftPosition, s / 1.5)
      rc.line(x, y + r, leftPosition[0], leftPosition[1] - r)
    }

    if (node.right) {
      const rightPosition = [x + s, y + r * 4] as [number, number]
      rc.line(x, y + r, rightPosition[0], rightPosition[1] - r)
      draw(node.right, rightPosition, s / 1.5)
    }

  }
}

(document.querySelector('#generate') as HTMLButtonElement).addEventListener('click', () => {
  const arr = document.querySelector('#array') as HTMLTextAreaElement
  currentValue = JSON.parse(arr.value)
  make(currentValue)
});


document.body.onload = function() {
  currentValue = [5, 4, 6, null, null, 3, 7]
  make(currentValue)
}

window.addEventListener('resize', function() {
  if (window.innerWidth < 500) return
  make(currentValue || [5, 4, 6, null, null, 3, 7]);
})
