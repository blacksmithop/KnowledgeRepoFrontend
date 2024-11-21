<script>
	import KnowledgeCard from '$lib/components/KnowledgeCard.svelte';
	import TreeView from '$lib/components/TreeView.svelte';
	import AddKnowledgeModal from '$lib/components/AddKnowledgeModal.svelte';
	
	let isAddModalOpen = false;
	
	const categories = [
		{
			title: 'Frameworks',
			icon: '🎯',
			items: [
				{
					title: 'React',
					description: 'A JavaScript library for building user interfaces',
					tags: ['frontend', 'javascript', 'ui', 'meta'],
					example: 'const App = () => <h1>Hello World</h1>',
					subcategories: [
						{
							title: 'Hooks',
							items: [
								{
									title: 'useState',
									description: 'State management hook for functional components',
									tags: ['hooks', 'state', 'react-core'],
									example: 'const [count, setCount] = useState(0)'
								},
								{
									title: 'useEffect',
									description: 'Side effects management in React components',
									tags: ['hooks', 'lifecycle', 'react-core'],
									example: 'useEffect(() => {\n  // Side effect code\n  return () => cleanup();\n}, [deps])'
								}
							]
						}
					]
				}
			]
		}
	];
	
	function handleAddKnowledge(event) {
		const newItem = event.detail;
		console.log('New knowledge item:', newItem);
		// Here you would typically update your data store or make an API call
		isAddModalOpen = false;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-gray-900">Knowledge Base</h1>
		<button
			on:click={() => isAddModalOpen = true}
			class="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-indigo-200 active:scale-95"
			aria-label="Add knowledge"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
			</svg>
		</button>
	</div>
	
	<TreeView {categories} />
</div>

{#if isAddModalOpen}
	<AddKnowledgeModal
		{categories}
		on:close={() => isAddModalOpen = false}
		on:submit={handleAddKnowledge}
	/>
{/if}