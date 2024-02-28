import canvas from "./libs/canvas";
import three from "./libs/three";

const ArrayProps = [];

const HTMLthree = document.getElementById("#three");
const HTMLcanvas = document.getElementById("#canvas");

HTMLthree && three(HTMLthree);
HTMLcanvas && canvas(HTMLcanvas);
