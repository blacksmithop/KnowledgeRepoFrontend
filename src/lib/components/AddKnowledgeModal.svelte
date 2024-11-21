<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import RichTextEditor from './RichTextEditor.svelte';
	
	const dispatch = createEventDispatcher();
	
	export let categories = [];
	
	let title = '';
	let description = '';
	let example = '';
	let tags = '';
	let selectedCategory = '';
	let selectedSubcategory = '';
	let newCategory = '';
	let newSubcategory = '';
	let isAddingNewCategory = false;
	let isAddingNewSubcategory = false;
	
	$: availableSubcategories = selectedCategory 
		? categories.find(c => c.title === selectedCategory)?.items.flatMap(item => 
				item.subcategories?.map(sub => sub.title) || []
			) || []
		: [];
	
	function closeModal() {
		dispatch('close');
	}
	
	function handleSubmit() {
		const formData = {
			title,
			description,
			example,
			tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
			category: isAddingNewCategory ? newCategory : selectedCategory,
			subcategory: isAddingNewSubcategory ? newSubcategory : selectedSubcategory
		};
		
		dispatch('submit', formData);
		closeModal();
	}
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
	on:click={closeModal}
	transition:fade={{ duration: 200 }}
>
	<div
		class="bg-white rounded-xl shadow-xl w-full max-w-2xl my-8"
		on:click|stopPropagation
		transition:scale={{ duration: 200, start: 0.95 }}
	>
		<div class="flex justify-between items-center p-6 border-b">
			<h2 class="text-2xl font-bold text-gray-900">Add Knowledge Item</h2>
			<button
				class="text-gray-400 hover:text-gray-500 hover:rotate-90 transform transition-all duration-200"
				on:click={closeModal}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
		</div>
		
		<div class="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
						required
					/>
				</div>
				
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
					<div class="editor-container">
						<RichTextEditor bind:content={description} placeholder="Enter description..." />
					</div>
				</div>
				
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Example Code</label>
					<div class="editor-container">
						<RichTextEditor bind:content={example} placeholder="Enter example code..." />
					</div>
				</div>
				
				<div>
					<label for="tags" class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
					<input
						type="text"
						id="tags"
						bind:value={tags}
						placeholder="frontend, javascript, react..."
						class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
					/>
				</div>
				
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700">Category</label>
						{#if isAddingNewCategory}
							<input
								type="text"
								bind:value={newCategory}
								placeholder="New category name"
								class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
							/>
						{:else}
							<select
								bind:value={selectedCategory}
								class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
							>
								<option value="">Select category</option>
								{#each categories as category}
									<option value={category.title}>{category.title}</option>
								{/each}
							</select>
						{/if}
						<button
							type="button"
							class="mt-2 text-sm text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200"
							on:click={() => isAddingNewCategory = !isAddingNewCategory}
						>
							{isAddingNewCategory ? 'Select existing category' : 'Add new category'}
						</button>
					</div>
					
					<div>
						<label class="block text-sm font-medium text-gray-700">Subcategory</label>
						{#if isAddingNewSubcategory}
							<input
								type="text"
								bind:value={newSubcategory}
								placeholder="New subcategory name"
								class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
							/>
						{:else}
							<select
								bind:value={selectedSubcategory}
								class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-shadow duration-200"
								disabled={!selectedCategory && !isAddingNewCategory}
							>
								<option value="">Select subcategory</option>
								{#each availableSubcategories as subcategory}
									<option value={subcategory}>{subcategory}</option>
								{/each}
							</select>
						{/if}
						<button
							type="button"
							class="mt-2 text-sm text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200"
							on:click={() => isAddingNewSubcategory = !isAddingNewSubcategory}
						>
							{isAddingNewSubcategory ? 'Select existing subcategory' : 'Add new subcategory'}
						</button>
					</div>
				</div>
			</form>
		</div>

		<div class="p-6 border-t bg-gray-50">
			<div class="flex justify-end gap-4">
				<button
					type="button"
					class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border rounded-lg transition-colors duration-200"
					on:click={closeModal}
				>
					Cancel
				</button>
				<button
					type="submit"
					class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
				>
					Add Item
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.editor-container {
		@apply overflow-y-auto rounded-lg border border-gray-200 min-h-[150px] max-h-[300px];
	}
	
	.editor-container::-webkit-scrollbar {
		@apply w-2;
	}
	
	.editor-container::-webkit-scrollbar-track {
		@apply bg-gray-100 rounded-r-lg;
	}
	
	.editor-container::-webkit-scrollbar-thumb {
		@apply bg-gray-300 rounded-full;
	}
	
	.editor-container::-webkit-scrollbar-thumb:hover {
		@apply bg-gray-400;
	}
</style>