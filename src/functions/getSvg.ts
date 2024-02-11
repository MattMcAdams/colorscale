const getSvg = (colors: string[]) => {
  const svgWidth = colors.length * 72;
  const rectangles = colors.map((color, index) => (
    `<rect x="${72 * index}" width="72" height="72" fill="${color}"/>`
  ))

  return `<svg width="${svgWidth}" height="72" viewBox="0 0 ${svgWidth} 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${rectangles.join(``)}
  </svg>`
}

export default getSvg;
