import type { Z_VERSION_ERROR } from 'node:zlib';

type Nota = {
	valor: number;
	ponderacion: number;
	pendiente: boolean;
	expresion: string;
	group: string;
};

type Curso = {
	notas: Nota[];
	promedio_simple: boolean;
	nombre: string;
};
