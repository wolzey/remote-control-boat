const minmax = (min, v, max) => {
  return (v < min) ? min : (max < v) ? max : v;
}

const yuv2r = (y, u, v) => {
  return minmax(0, (y + 359 * v) >> 8, 255);
}

const yuv2g = (y, u, v) => {
  return minmax(0, (y + 88 * v - 183 * u) >> 8, 255);

}
const yuv2b = (y, u, v) => {
  return minmax(0, (y + 454 * u) >> 8, 255);
}

export function yuyv2rgba(yuyv, rgba, width, height) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j += 2) {
      var index = i * width + j;
      var y0 = yuyv[index * 2 + 0] << 8;
      var u = yuyv[index * 2 + 1] - 128;
      var y1 = yuyv[index * 2 + 2] << 8;
      var v = yuyv[index * 2 + 3] - 128;
      rgba[index * 4 + 0] = yuv2r(y0, u, v);
      rgba[index * 4 + 1] = yuv2g(y0, u, v);
      rgba[index * 4 + 2] = yuv2b(y0, u, v);
      rgba[index * 4 + 3] = 255;
      rgba[index * 4 + 4] = yuv2r(y1, u, v);
      rgba[index * 4 + 5] = yuv2g(y1, u, v);
      rgba[index * 4 + 6] = yuv2b(y1, u, v);
      rgba[index * 4 + 7] = 255;
    }
  }
  return rgba;
};
