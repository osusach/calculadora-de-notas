<script lang="ts">
	import { nuevaNota } from '$lib';
	import { curso } from '$lib/stores.svelte';
	import { evaluate } from 'mathjs';

	let { nota = $bindable(), isSub, removeNota } = $props();

	let promedio_simple = $derived(curso.promedio_simple);
	let has_group = $derived(nota.group.length !== 0);

	function handlePonderacionChange() {
		let evaluation;
		try {
			evaluation = evaluate(nota.expresion);
		} catch {
			evaluation = 0;
		}

		nota.ponderacion = evaluation;
		// cortar los decimales a 4, y quitar los trailing zeros
		// ej: 1/4 => 0.2500 => 0.25
		nota.expresion = parseFloat(nota.ponderacion.toFixed(4)).toString();
	}

	function handlePendienteToggle() {
		nota.pendiente = !nota.pendiente;
		if (nota.pendiente) {
			nota.valor = 1;
		}
	}

	function handleNewGroup() {
		nota.group.push(nuevaNota);
	}
</script>

<div class="relative flex flex-col bg-gray-100 p-4">
	<!--- Barra de botones superior --->
	<div class="absolute -top-3 right-2 flex w-fit flex-row items-center gap-4">
		<span class="btn h-4 w-4 bg-green-500"></span>
		{#if !isSub}
			<button
				class="bg-purple-400"
				onclick={handleNewGroup}>~</button
			>
		{/if}
		<button
			class="bg-red-600"
			onclick={removeNota}>x</button
		>
	</div>

	<label
		>Nota:
		<input
			class="w-[12ch] text-right"
			disabled={nota.pendiente || has_group}
			type="number"
			bind:value={nota.valor}
		/>
	</label>

	{#if !promedio_simple}
		<label
			>Ponderación:
			<input
				type="text"
				bind:value={nota.expresion}
				onchange={handlePonderacionChange}
			/>
		</label>
	{/if}

	{#if !has_group}
		<div>pendiente: {nota.pendiente}</div>
		<button onclick={handlePendienteToggle}> pendizar</button>
	{/if}
</div>
