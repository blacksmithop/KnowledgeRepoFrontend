<script>
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import AuthModal from './AuthModal.svelte';
	import TreeNavigation from './TreeNavigation.svelte';

	let isMenuOpen = false;
	let isSearchFocused = false;
	let searchQuery = '';
	let isAuthModalOpen = false;
	const dispatch = createEventDispatcher();

	// Enhanced suggestions with hashtag support
	$: searchSuggestions = searchQuery
		? [
				'#frontend React Components',
				'#state useState Hook',
				'#containers Docker Setup',
				'#kubernetes Deployment Guide',
				'#networking Service Mesh',
				'#reactive Svelte Stores'
			].filter(
				(s) =>
					s.toLowerCase().includes(searchQuery.toLowerCase()) ||
					(searchQuery.startsWith('#') && s.toLowerCase().includes(searchQuery.toLowerCase()))
			)
		: [];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleSearch() {
		dispatch('search', {
			query: searchQuery,
			isHashtagSearch: searchQuery.startsWith('#')
		});
		isSearchFocused = false;
	}

	function selectSuggestion(suggestion) {
		searchQuery = suggestion;
		handleSearch();
	}
</script>

<header
	class="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
	style="height: var(--header-height)"
>
	<div class="container mx-auto px-4 h-full">
		<div class="flex items-center justify-between h-full">
			<div class="flex items-center gap-4">
				<button
					class="p-2 hover:bg-gray-100 rounded-lg"
					on:click={toggleMenu}
					aria-label="Toggle menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<a href="/" class="text-xl font-bold text-gray-800">KnowledgeRepo</a>
			</div>

			<div class="flex-1 max-w-2xl mx-4">
				<div class="relative">
					<input
						type="search"
						placeholder="Search knowledge base or use #tags..."
						class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						bind:value={searchQuery}
						on:focus={() => (isSearchFocused = true)}
						on:blur={() => setTimeout(() => (isSearchFocused = false), 200)}
						on:keydown={(e) => e.key === 'Enter' && handleSearch()}
					/>
					<button
						class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
						on:click={handleSearch}
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>

					{#if isSearchFocused && searchQuery && searchSuggestions.length > 0}
						<div
							transition:slide
							class="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border overflow-hidden z-50"
						>
							{#each searchSuggestions as suggestion}
								<button
									class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
									on:click={() => selectSuggestion(suggestion)}
								>
									<svg
										class="w-4 h-4 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
									{#if suggestion.startsWith('#')}
										<span class="text-indigo-600 font-medium">{suggestion.split(' ')[0]}</span>
										<span>{suggestion.split(' ').slice(1).join(' ')}</span>
									{:else}
										<span>{suggestion}</span>
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div>
				<button
					class="p-2 hover:bg-gray-100 rounded-full"
					on:click={() => (isAuthModalOpen = true)}
					aria-label="Sign in"
				>
					<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if isMenuOpen}
		<div
			transition:slide
			class="fixed top-[var(--header-height)] left-0 bottom-[var(--footer-height)] bg-white shadow-lg"
		>
			<TreeNavigation />
		</div>
	{/if}
</header>

{#if isAuthModalOpen}
	<AuthModal on:close={() => (isAuthModalOpen = false)} />
{/if}
