  /**@returns {HTMLElements} */
//document.write(prompt())
const theme = document.querySelector('#theme')
const getTheme = () => theme.value
const weight = [2, 1]
function _(el) {
  return document.querySelector(el)
}
const input = document.querySelector('input')
let number
const scr = [window.innerWidth, window.innerHeight]
/**@type {HTMLCanvasElement} */
const canvas = _('canvas')
const ctx = canvas.getContext('2d')
const clarity = 30
//符文的边长
const SIZE = clarity
const glyph = [
  {
    type: 'power',
    color: [34, 170, 72],
    symbol: 'Ω'
  },
  {
    type: 'infinity',
    color: [182, 127, 51],
    symbol: '∞'
  },
  {
    type: 'time',
    color: [178, 65, 227],
    symbol: 'Δ'
  },
  {
    type: 'replicanti',
    color: [3, 69, 224],
    symbol: 'Ξ'
  },
  {
    type: 'dilation',
    color: [100, 211, 23],
    symbol: 'Ψ'
  },
  {
    type: 'effarig',
    color: [226, 23, 23],
    symbol: 'Ϙ'
  },
  /*{
    type: "cursed",
    color: [0, 0, 0],
    symbol: '⸸'
  },*/
  {
    type: 'companion',
    color: [254, 174, 201],
    symbol: '❤️'
  }
]
const rarityColor = [

  {
    minStrength: 3.5,
    name: "Celestial",
    darkColor: "#3d3dec",
    lightColor: "#9696ff",
    darkHighContrast: "#ffff00",
    lightHighContrast: "#c0c000"
  }, {
    minStrength: 3.25,
    name: "Transcendent",
    darkColor: "#03ffec",
    lightColor: "#00c3c3",
    darkHighContrast: "#00ffff",
    lightHighContrast: "#00c0c0"
  }, {
    minStrength: 3,
    name: "Mythical",
    darkColor: "#d50000",
    lightColor: "#d50000",
    darkHighContrast: "#c00000",
    lightHighContrast: "#ff0000"
  }, {
    minStrength: 2.75,
    name: "Legendary",
    darkColor: "#ff9800",
    lightColor: "#d68100",
    darkHighContrast: "#ff8000",
    lightHighContrast: "#ff8000"
  }, {
    minStrength: 2.5,
    name: "Epic",
    darkColor: "#9c27b0",
    lightColor: "#9c27b0",
    darkHighContrast: "#ff00ff",
    lightHighContrast: "#ff00ff"
  }, {
    minStrength: 2,
    name: "Rare",
    darkColor: "#5096f3",
    lightColor: "#0d40ff",
    darkHighContrast: "#6060ff",
    lightHighContrast: "#0000ff"
  }, {
    minStrength: 1.5,
    name: "Uncommon",
    darkColor: "#43a047",
    lightColor: "#1e8622",
    darkHighContrast: "#00ff00",
    lightHighContrast: "#00b000"
  }, {
    minStrength: 1,
    name: "Common",
    darkColor: "#ffffff",
    lightColor: "#000000",
    darkHighContrast: "#ffffff",
    lightHighContrast: "#000000"
  },
]
function rgbToArr(text) {
  if (Array.isArray(text)) {
    return text
  }
  rgb =  text.match(/([0-9a-f]{6})/)[0]
  return [parseInt(rgb.slice(0, 2), 16), parseInt(rgb.slice(2, 4), 16), parseInt(rgb.slice(4, 6), 16)]
}

input.onchange = function() {
  
  let allColor = []
  for (let j = 0; j < glyph.length; j++) {
  for (let k = 0; k < (glyph[j].type === 'companion' ?1:rarityColor.length); k++) {
    allColor.push({
      color: glyph[j].type === 'companion' ? glyph[j].color : average(glyph[j].color, rgbToArr(rarityColor[k][getTheme()]), weight),
      glyphColor: glyph[j].color,
      rarityColor: (glyph[j].type === 'companion') ? glyph[j].color : rgbToArr(rarityColor[k][getTheme()]),
      symbol: glyph[j].symbol,
      type: glyph[j].type
    })
  }
}
number = {
  power: 0,
  infinity: 0,
  time: 0,
  dilation: 0,
  replicanti: 0,
  effarig: 0,
  companion: 0
}
  const fr = new FileReader()
  const file = this.files[0]
  fr.readAsDataURL(file)
  const img = new Image()
  fr.onload = function() {
    img.src = this.result

    img.onload = function() {
      //绘制时的大小
      const width = canvas.width = +prompt('宽度', 100)
      const height = canvas.height = Math.floor(width * (this.height / this.width))
      const colors = {
        glyph: [],
        color: [],
        rarityColor: [],
        type: []
      }
      if (getTheme() === 'lightColor' || getTheme() === 'lightHighContrast') {
        ctx.fillStyle = '#ffffff'
      }
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(this, 0, 0, width, height)
      const imgData = ctx.getImageData(0, 0, width, height)
      const data = imgData.data
      for (let i = 0; i < data.length; i += 4) {
        const curColor = [data[i], data[i + 1], data[i + 2]]
        const suited = {
          dissimilarity: +Infinity,
          data: {}
        }
        for (let j = 0; j < allColor.length; j++) {
          const dissimilarity = calcDissimilarity(allColor[j].color, curColor)
          if (dissimilarity < suited.dissimilarity) {
            suited.dissimilarity = dissimilarity
            suited.data.color = allColor[j].color
            suited.data.glyph = allColor[j].symbol
            suited.data.glyphColor = allColor[j].glyphColor
            suited.data.borderColor = allColor[j].rarityColor
            suited.data.type = allColor[j].type
          }
        }
        colors.color.push(suited.data.glyphColor)
        colors.rarityColor.push(suited.data.borderColor)
        colors.glyph.push(suited.data.glyph)
        colors.type.push(suited.data.type)
        number[suited.data.type]++
        /*data[i] = suited.data.color[0]
        data[i + 1] = suited.data.color[1]
        data[i + 2] = suited.data.color[2]*/
      }
      //imgData.data = data
      canvas.width = width * SIZE
      canvas.height = height * SIZE
      //ctx.putImageData(imgData, 0, 0)
      //console.log(typeof colors);
      if (getTheme() === 'lightColor' || getTheme() === 'lightHighContrast') {
        ctx.fillStyle = '#ffffff'
      } else {
        document.body.style.backgroundColor = '#000000'
      }
      ctx.fillRect(0, 0, SIZE * width, SIZE * height)
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const index = j * width + i
          ctx.strokeStyle = arrToRgb(colors.color[index])
          ctx.lineWidth = '1px'
          ctx.strokeRect(i * clarity, j * clarity, clarity - 2, clarity - 2)
          ctx.font = `normal bold ${(clarity - 1) * 0.5}px typewriter`
          ctx.fillStyle = arrToRgb(colors.rarityColor[index])
          ctx.textBaseline = 'middle'
          ctx.textAlign = 'center'
          ctx.fillText(colors.glyph[index], (i + 0.5) * clarity - 1, (j + 0.5) * clarity - 1)
          if (colors.type[index] !== 'companion') {
          ctx.beginPath()
          ctx.arc((i + 3 / 11) * clarity - 1, (j + 3 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
          ctx.arc((i + 8 / 11) * clarity - 1, (j + 3 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()
          ctx.beginPath()
          ctx.arc((i + 8 / 11) * clarity - 1, (j + 8 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
          ctx.arc((i + 3 / 11) * clarity - 1, (j + 8 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
          ctx.fill()
          ctx.closePath()
          if (colors.type[index] === 'effarig') {
            ctx.beginPath()
            ctx.arc((i + 2 / 11) * clarity - 1, (j + 5.5 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()
            ctx.beginPath()
            ctx.arc((i + 9 / 11) * clarity - 1, (j + 5.5 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()
            ctx.beginPath()
            ctx.arc((i + 5.5 / 11) * clarity - 1, (j + 2 / 11) * clarity - 1, clarity / 20, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()
          }
        }
        }
      }
      canvas.style.zoom = (width / height >= window.innerWidth / window.innerHeight)?(scr[0] / (width * SIZE)):(scr[1] / (height * SIZE))
    }
  }
}

function arrToRgb(arr) {
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`
}
/**
 * @param {Array.<Number>} nums1
 * @param {Array.<Number>} nums2
 * @param {Array.<Number>} weights
 * @returns {Number}
 */
function average(nums1, nums2, weights) {
  return nums1.map((v, i) => {
    return (v * weights[0] + nums2[i] * weights[1]) / (weights[0] + weights[1])
  })
}
/*function calcDissimilarity(arr1, arr2) {
  return ((arr1[0] - arr2[0]) ** 2 + (arr1[1] - arr2[1]) ** 2 + (arr1[2] - arr2[2]) ** 2) ** 0.5
}*/
function calcDissimilarity(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb) {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255,
    x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
  y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
  z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

function download() {
  const url = canvas.toDataURL()
  const a = document.createElement('a')
  a.href = url
  a.download = 'icon.jpg'
  document.body.appendChild(a)
  a.click()
  a.remove()
}