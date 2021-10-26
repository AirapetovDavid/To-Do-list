export default function createElement(tagName, className, attributes) {
  const element = document.createElement(tagName);
  if (className) {
    const classNameArr = className.split(' ');
    element.classList.add(...classNameArr);
  }
  if (attributes) {
    Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
  }
  return element;
}
