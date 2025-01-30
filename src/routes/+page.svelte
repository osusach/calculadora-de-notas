<script lang="ts">
	import { calcularNotas, notaAcumulada, ponderacionAcumulada } from '$lib/calcular';
	import { curso, addCurso, cursos } from '$lib/stores.svelte';
	import ComponenteNota from '$lib/components/ComponenteNota.svelte';
	import { nuevaNota } from '$lib';

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
		curso.notas.push(nuevaNota);

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
	$inspect(curso);
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
		<ComponenteNota
			nota={notas[idx]}
			isSub={false}
			removeNota={() => {
				curso.notas = notas.toSpliced(idx, 1);
			}}
		/>
		{#each notas[idx].group as _, subIdx}
			<ComponenteNota
				nota={notas[idx].group[subIdx]}
				isSub={true}
				removeNota={() => {
					notas[idx].group = notas[idx].group.toSpliced(subIdx, 1);
				}}
			/>
		{/each}
	{/each}
</div>

<button
	class="bg-green-200 disabled:bg-red-200"
	disabled={1 - ponderacionAcumulada(notas) > 0.05}
	onclick={() => {
		curso.notas = calcularNotas(notas, 4);
	}}>CALCULAR!!! {notaAcumulada(notas)} {ponderacionAcumulada(notas)}</button
>
