export function $(selector) {
  return document.querySelector(selector);
}

export function toggle(selector, status) {
  let styleStr = status ? 'block' : 'none'
  $(selector).setAttribute('style', `display:${styleStr}`);
}

export function toggleClass(selector, classname, status) {
  let action = status ? 'add' : 'remove';
  $(selector).classList[action](classname);
}