let curso_idx = $state(0);

export let cursos: Curso[] = $state([{ nombre: 'Curso-1', notas: [], promedio_simple: true }]);

export const curso = {
	get value() {
		return cursos[curso_idx];
	},
	set value(v: Curso) {
		cursos[curso_idx] = v;
	},
	get notas() {
		return this.value.notas;
	},
	set notas(v) {
		this.value.notas = v;
	},
	get promedio_simple() {
		return this.value.promedio_simple;
	},
	set promedio_simple(v: boolean) {
		this.value.promedio_simple = v;
	},
	get idx() {
		return curso_idx;
	},
	set idx(v: number) {
		curso_idx = v;
	}
};

export function addCurso() {
	cursos.push({ notas: [], nombre: 'Curso-' + curso_idx + 1, promedio_simple: true });
}
