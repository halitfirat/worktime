export const msToHM = (ms) => {
  let seconds = ms / 1000;
  const hours = parseInt(seconds / 3600);

  seconds = seconds % 3600;
  const minutes = parseInt(seconds / 60);
  const hm = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);

  return hm;
};

export const hmToMS = (time) => {
  const hm = time.split(':');
  const ms = hm[0] * 60 * 60 * 1000 + hm[1] * 60 * 1000;

  return ms;
};

export const periodSansPause = (end, start, pause) => {
  return hmToMS(end) - hmToMS(start) - hmToMS(pause);
};

// export const showHMSeperately = (hm) => {
//   const hmSplitted = hm.split(':');
//   return `${hmSplitted[0]}h${hmSplitted[1]}m`;
// };
