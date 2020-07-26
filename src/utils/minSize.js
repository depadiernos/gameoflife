const minSize = () =>
window.innerWidth < window.innerHeight - 88
  ? window.innerWidth - 30
  : window.innerHeight - 88

export default minSize