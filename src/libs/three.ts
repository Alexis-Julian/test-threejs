import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import getStarfield from "../utils/getStarfield";
// SCENE
export default (element: HTMLElement) => {
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
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(sizes.WIDTH, sizes.HEIGHT);

	// CONTROLS
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.update();

	// INIT CAMERA
	camera.position.z = 2;
	/* camera.position.x = -4;
	camera.position.y = 6; */
	camera.lookAt(0, 0, -20);

	//--------------LIGHT-----------------------------------------
	/* Ambient Light */
	// const light = new THREE.AmbientLight(0x404040); // soft white light
	// scene.add(light);

	/* Hemispher Light */
	//const light = new THREE.HemisphereLight();
	//scene.add(light);

	/* Directional Light */
	//const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
	//scene.add(directionalLight);

	/* Position Light */
	/* const light = new THREE.PointLight(0xff0000, 1, 100);
	light.position.set(50, 50, 50);
	scene.add(light); */
	/* ------------------------------------------------------------------------------ */

	/* ----------------------HEARTH----------------------------------------------- */
	const detail = 12;

	const earthGroup = new THREE.Group();
	earthGroup.rotation.x = (-23.4 * Math.PI) / 180;
	scene.add(earthGroup);

	const geometry = new THREE.IcosahedronGeometry(1, detail);

	const material = new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load("8k_earth_daymap.jpg"),
	});

	const earthMesh = new THREE.Mesh(geometry, material);
	earthGroup.add(earthMesh);
	// scene.add(earthMesh);

	const stars = getStarfield({ numStars: 1000 });
	scene.add(stars);

	const lightsMath = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load("8k_earth_nightmap.jpg"),
		// color: 0x00000ff,
	});
	const lightMesh = new THREE.Mesh(geometry, lightsMath);
	earthGroup.add(lightMesh);

	const cloudsMat = new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load("8k_earth_clouds.jpg"),
		blending: THREE.AdditiveBlending,
	});

	const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
	cloudsMesh.scale.setScalar(1.003);
	earthGroup.add(cloudsMesh);

	const sunLight = new THREE.DirectionalLight(0xffffff);
	sunLight.position.set(-2, 0.5, 1.5);
	scene.add(sunLight);

	/* ------------------------------------------------------------------------------ */
	// INIT HEMISPHERE LIGHT
	// scene.add(new THREE.AmbientLight(0xffffff, ));

	// SCENE
	// scene.background = new THREE.Color(0x0000);

	// TEXTURE LOADER
	// const textureLoader = new THREE.TextureLoader();

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

	//SPHERE
	/* 
	const geometry = new THREE.SphereGeometry(15, 32, 16);
	const material = new THREE.MeshStandardMaterial({
		color: "0x000fff",
		wireframe: true,
	});
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere); */

	function animate() {
		requestAnimationFrame(animate);

		// cartMesh.rotation.x += 0.0;
		// console.log(ArrayProps);
		// cartMesh.rotation.y += 0.01;
		cloudsMesh.rotation.y += 0.002;
		earthMesh.rotation.y += 0.002;
		lightMesh.rotation.y += 0.002;
		controls.update();

		renderer.render(scene, camera);
	}

	element.appendChild(renderer.domElement);
	animate();
};
