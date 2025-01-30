type Nota = {
	valor: number;
	ponderacion: number;
	pendiente: boolean;
	expresion: string;
	group: Nota[];
};

type Curso = {
	notas: Nota[];
	promedio_simple: boolean;
	nombre: string;
};
