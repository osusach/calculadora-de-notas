export function notaAcumulada(notas: Nota[]) {
	const nota_acumulada = notas.reduce((acc, currentValue) => {
		return acc + currentValue.valor * currentValue.ponderacion;
	}, 0);
	return nota_acumulada;
}

export function ponderacionAcumulada(notas: Nota[]) {
	const ponderacion_acumulada = notas.reduce((acc, currentValue) => {
		return acc + currentValue.ponderacion;
	}, 0);
	return ponderacion_acumulada;
}

export function calcularNotas(notas: Nota[], nota_objetivo: number) {
	const notas_activas = notas.filter((nota) => {
		return !nota.pendiente;
	});

	const nota_acumulada = notaAcumulada(notas_activas);
	const ponderacion_pendiente = 1 - ponderacionAcumulada(notas_activas);

	if (nota_acumulada > nota_objetivo) {
		return notas;
	}
	const nota_faltante = nota_objetivo - nota_acumulada;

	notas.map((nota) => {
		if (nota.pendiente) {
			nota.valor = nota_faltante / ponderacion_pendiente;
		}
		return nota;
	});

	return notas;
}
