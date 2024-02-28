export default (element: HTMLElement, ArrayProps: Array<any>) => {
	// SIZES
	const sizes = {
		HEIGHT: element.offsetHeight,
		WIDTH: element.offsetWidth,
	} as const;

	// CREATE CANVAS
	const canvas = document.createElement("canvas");
	element.appendChild(canvas);
	canvas.width = sizes.WIDTH;
	canvas.height = sizes.HEIGHT;

	// CREATE CONTEXT 2D
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Can not create canvas");

	let width_spaccing = 0;
	ctx.strokeStyle = "green";

	for (let index = 1; index < 10; index++) {
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
	}

	/* const imageData = ctx.createImageData(canvas.width, canvas.height);

	// Rellenamos la textura con los valores 1 y 0
	for (let i = 0; i < imageData.data.length; i += 4) {
		// Asignamos valores 1 y 0 de manera alternada
		const value = i % 8 < 4 ? 255 : 0; // 255 para 1, 0 para 0
		imageData.data[i] = value; // R
		imageData.data[i + 1] = value; // G
		imageData.data[i + 2] = value; // B
		imageData.data[i + 3] = 255; // A
	}

	ctx.putImageData(imageData, 0, 0); */
	/* 	ctx.fillStyle = "blue";
	ctx.fillRect(10, 10, 100, 100); */
	// ctx?.fillStyle = "blue";
};
