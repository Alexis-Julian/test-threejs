import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// SCENE
export default (element: HTMLElement, ArrayProps: Array<any>) => {
	const scene = new THREE.Scene();
	const sizes = {
		HEIGHT: element.offsetHeight,
		WIDTH: element.offsetWidth,
	} as const;
	// CAMERA
	const camera = new THREE.PerspectiveCamera(
		75,
		sizes.WIDTH / sizes.HEIGHT,
		0.1,
		1000
	);

	// RENDERER
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(sizes.WIDTH, sizes.HEIGHT);

	// CONTROLS
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.update();

	// INIT CAMERA
	camera.position.z = 30;
	camera.position.x = -4;
	camera.position.y = 6;
	camera.lookAt(0, 0, -20);

	// INIT HEMISPHERE LIGHT
	scene.add(new THREE.AmbientLight(0xffffff, 0.5));

	// SCENE
	scene.background = new THREE.Color(0xffffff);

	// TEXTURE LOADER
	const textureLoader = new THREE.TextureLoader();

	// PLANE
	/* const tiles = textureLoader.load("/Substance_Graph_Roughness.jpg");
	const plane2 = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2),
		new THREE.MeshStandardMaterial({
			map: tiles,
		})
	);
	plane2.position.y = 3;
	plane2.position.x = -5.8;
	scene.add(plane2); */

	/* for (let index = 1; index < 10; index++) {
		// Dibujar el número 0
		// Dibujar el número 1
		ctx.beginPath();
		ctx.moveTo(50 + width_spaccing, 30);
		ctx.lineTo(50 + width_spaccing, 70);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(100 * index, 50, 20, 0, 2 * Math.PI);
		ctx.stroke();

		width_spaccing += 100;
	} */
	// CANVAS
	const canvas = document.createElement("canvas");
	canvas.width = 920;
	canvas.height = 1080;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Can not create canvas");

	/* let width_spaccing = 0;
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.moveTo(50, 30);
	ctx.lineTo(50, 70);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(100, 50, 2, 0, 5 * Math.PI);
	ctx.stroke(); */
	function drawBinaryValues() {
		const cellSize = 20; // Tamaño de cada celda
		const numRows = Math.floor(canvas.height / cellSize);
		const numCols = Math.floor(canvas.width / cellSize);
		if (!ctx) throw new Error("Can not create canvas");

		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				// Generamos valores aleatorios 0 o 1
				const value = Math.random() < 0.5 ? 0 : 1;

				ctx.fillStyle = value === 1 ? "black" : "white";
				ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
			}
		}
	}

	drawBinaryValues();
	const bgCanvas = new THREE.CanvasTexture(canvas);

	//SPHERE
	// const texture = textureLoader.load("/bgt.svg");

	const geometry = new THREE.SphereGeometry(15, 32, 16);
	const material = new THREE.MeshStandardMaterial({
		map: bgCanvas,
	});
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);

	function animate() {
		// sphere.rotation.x += 0.0;
		// console.log(ArrayProps);
		// sphere.rotation.y += 0.01;
		controls.update();

		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	}

	element.appendChild(renderer.domElement);
	animate();
};
