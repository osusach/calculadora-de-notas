<script lang="ts">
	import { nextGroup } from '$lib';
	import { curso } from '$lib/stores.svelte';
	import { evaluate } from 'mathjs';

	let notas = $derived(curso.notas);
	let promedio_simple = $derived(curso.promedio_simple);

	let { idx }: { idx: number } = $props();

	function handlePromedioChange() {
		let evaluation;
		try {
			evaluation = evaluate(notas[idx].expresion);
		} catch {
			evaluation = 0;
		}
		console.log(evaluation, typeof evaluation);
		notas[idx].ponderacion = evaluation;
		// cortar los decimales a 4, y quitar los trailing zeros
		// ej: 1/4 => 0.2500 => 0.25
		notas[idx].expresion = parseFloat(notas[idx].ponderacion.toFixed(4)).toString();
	}

	function handlePendienteToggle() {
		notas[idx].pendiente = !notas[idx].pendiente;
		if (notas[idx].pendiente) {
			notas[idx].valor = 1;
		}
	}

	function handleNextGroup() {
		notas[idx].group = nextGroup(notas[idx].group);
	}
</script>

<div class="relative flex flex-col bg-gray-100 p-4">
	<div class="absolute -top-3 right-2 flex w-fit flex-row items-center gap-4">
		<span class="btn h-4 w-4 bg-green-500"></span>
		<button
			class="bg-purple-400"
			onclick={handleNextGroup}>{notas[idx].group}</button
		>
		<button
			class="bg-red-600"
			onclick={() => {
				curso.notas = notas.toSpliced(idx, 1);
			}}>x</button
		>
	</div>
	<label for={'nota-' + idx}>Nota: </label>
	<input
		class="w-[12ch] text-right"
		disabled={notas[idx].pendiente}
		id={'nota-' + idx}
		type="number"
		bind:value={notas[idx].valor}
	/>

	{#if !promedio_simple}
		<label for={'pond-' + idx}>Ponderación: </label>
		<input
			id={'pond-' + idx}
			type="text"
			bind:value={notas[idx].expresion}
			onchange={handlePromedioChange}
		/>
	{/if}

	<div>pendiente: {notas[idx].pendiente}</div>
	<button onclick={handlePendienteToggle}> pendizar</button>
</div>
