<script>
	import { slide } from 'svelte/transition';
	import KnowledgeCard from './KnowledgeCard.svelte';

	export let categories;

	let expandedCategories = new Set();
	let expandedSubcategories = new Set();

	function toggleCategory(categoryTitle) {
		if (expandedCategories.has(categoryTitle)) {
			expandedCategories.delete(categoryTitle);
		} else {
			expandedCategories.add(categoryTitle);
		}
		expandedCategories = expandedCategories;
	}

	function toggleSubcategory(categoryTitle, subcategoryTitle) {
		const key = `${categoryTitle}-${subcategoryTitle}`;
		if (expandedSubcategories.has(key)) {
			expandedSubcategories.delete(key);
		} else {
			expandedSubcategories.add(key);
		}
		expandedSubcategories = expandedSubcategories;
	}
</script>

<div class="space-y-6">
	{#each categories as category}
		<div class="relative">
			<button
				class="flex items-center gap-2 text-xl font-bold text-indigo-700 hover:text-indigo-500 mb-2"
				on:click={() => toggleCategory(category.title)}
			>
				<span class="text-2xl">{category.icon}</span>
				<span>{category.title}</span>
				<svg
					class="w-5 h-5 transform transition-transform {expandedCategories.has(category.title)
						? 'rotate-90'
						: ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>

			{#if expandedCategories.has(category.title)}
				<div class="tree-line" transition:slide>
					{#each category.items as item}
						<div class="relative tree-node">
							<KnowledgeCard {...item} />

							{#if item.subcategories}
								{#each item.subcategories as subcategory}
									<div class="mt-4">
										<button
											class="flex items-center gap-2 text-lg font-semibold text-purple-600 hover:text-purple-400 ml-4"
											on:click={() => toggleSubcategory(item.title, subcategory.title)}
										>
											<span>└─ {subcategory.title}</span>
											<svg
												class="w-4 h-4 transform transition-transform {expandedSubcategories.has(
													`${item.title}-${subcategory.title}`
												)
													? 'rotate-90'
													: ''}"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</button>

										{#if expandedSubcategories.has(`${item.title}-${subcategory.title}`)}
											<div class="tree-line mt-4" transition:slide>
												{#each subcategory.items as subitem}
													<div class="relative tree-node">
														<KnowledgeCard {...subitem} />
													</div>
												{/each}
											</div>
										{/if}
									</div>
								{/each}
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
