<script lang="ts">
	import { calcularNotas, notaAcumulada, ponderacionAcumulada } from '$lib/calcular';
	import { curso, addCurso, cursos } from '$lib/stores.svelte';
	import ComponenteNota from '$lib/components/ComponenteNota.svelte';
	import { initGroup } from '$lib';
	import type { Nota } from '$lib/types';

	let notas: Nota[] = $derived(curso.notas);
	let promedio_simple = $derived(curso.promedio_simple);

	function igualarPonderaciones() {
		curso.notas = notas.map((nota) => {
			nota.ponderacion = 1 / notas.length;
			nota.expresion = nota.ponderacion.toString();
			return nota;
		});
	}

	function handleNuevaNota() {
		curso.notas.push({
			pendiente: false,
			ponderacion: 0.25,
			valor: 1.0,
			expresion: '0.25',
			group: initGroup()
		});

		if (promedio_simple) {
			igualarPonderaciones();
		}
	}

	function togglePromedioSimple() {
		curso.promedio_simple = !promedio_simple;
		if (promedio_simple) {
			igualarPonderaciones();
		}
	}
</script>

<button onclick={addCurso}>add</button>
{#each cursos as _curso, idx}
	<button
		class={['p-4', idx == curso.idx && 'bg-blue-200']}
		onclick={() => {
			curso.idx = idx;
		}}>{idx} {_curso.nombre}</button
	>
{/each}

<div class="m-4 w-fit rounded-lg border border-black p-4">
	<button
		class={[promedio_simple && 'bg-green-200', !promedio_simple && 'bg-blue-300', 'button']}
		onclick={togglePromedioSimple}>Promedio Simple</button
	>

	<button onclick={handleNuevaNota}>nuevo</button>
</div>

<div class="my-4 grid grid-cols-3 gap-4">
	{#each notas as _, idx}
		<ComponenteNota {idx} />
	{/each}
</div>

<button
	class="bg-green-200 disabled:bg-red-200"
	disabled={1 - ponderacionAcumulada(notas) > 0.05}
	onclick={() => {
		curso.notas = calcularNotas(notas, 4);
	}}>CALCULAR!!! {notaAcumulada(notas)} {ponderacionAcumulada(notas)}</button
>
