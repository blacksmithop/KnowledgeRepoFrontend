<script>
	import { slide, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import AuthModal from './AuthModal.svelte';
	
	let isMenuOpen = false;
	let isSearchFocused = false;
	let searchQuery = '';
	let isAuthModalOpen = false;
	let activeDropdown = null;
	const dispatch = createEventDispatcher();

	const menuItems = [
		{
			title: 'Frameworks',
			icon: '🎯',
			items: [
				{
					title: 'Frontend',
					items: [
						{ title: 'React', path: '/frameworks/react' },
						{ title: 'Vue', path: '/frameworks/vue' },
						{ title: 'Svelte', path: '/frameworks/svelte' }
					]
				},
				{
					title: 'Backend',
					items: [
						{ title: 'Express', path: '/frameworks/express' },
						{ title: 'NestJS', path: '/frameworks/nestjs' },
						{ title: 'Django', path: '/frameworks/django' }
					]
				}
			]
		},
		{
			title: 'DevOps',
			icon: '⚙️',
			items: [
				{
					title: 'Containers',
					items: [
						{ title: 'Docker', path: '/devops/docker' },
						{ title: 'Kubernetes', path: '/devops/kubernetes' }
					]
				},
				{
					title: 'CI/CD',
					items: [
						{ title: 'Jenkins', path: '/devops/jenkins' },
						{ title: 'GitHub Actions', path: '/devops/github-actions' }
					]
				}
			]
		},
		{
			title: 'Languages',
			icon: '📝',
			items: [
				{
					title: 'Compiled',
					items: [
						{ title: 'Go', path: '/languages/go' },
						{ title: 'Rust', path: '/languages/rust' },
						{ title: 'C++', path: '/languages/cpp' }
					]
				},
				{
					title: 'Interpreted',
					items: [
						{ title: 'Python', path: '/languages/python' },
						{ title: 'JavaScript', path: '/languages/javascript' },
						{ title: 'Ruby', path: '/languages/ruby' }
					]
				}
			]
		}
	];
	
	$: searchSuggestions = searchQuery
		? [
				'#frontend React Components',
				'#state useState Hook',
				'#containers Docker Setup',
				'#kubernetes Deployment Guide',
				'#networking Service Mesh',
				'#reactive Svelte Stores'
		  ].filter(s => 
				s.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(searchQuery.startsWith('#') && s.toLowerCase().includes(searchQuery.toLowerCase()))
		  )
		: [];
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (!isMenuOpen) {
			activeDropdown = null;
		}
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

	function handleDropdown(title) {
		activeDropdown = activeDropdown === title ? null : title;
	}

	function handleClickOutside(event) {
		const dropdown = event.target.closest('.dropdown-container');
		if (!dropdown) {
			activeDropdown = null;
		}
	}
</script>

<svelte:window on:click={handleClickOutside}/>

<header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50" style="height: var(--header-height)">
	<div class="container mx-auto px-4 h-full">
		<div class="flex items-center justify-between h-full">
			<div class="flex items-center gap-4">
				<div class="relative dropdown-container">
					<button 
						class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
						on:click={toggleMenu}
						aria-label="Toggle menu">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
						</svg>
					</button>

					{#if isMenuOpen}
						<div 
							class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border overflow-hidden min-w-[240px]"
							transition:slide|local={{ duration: 200 }}>
							{#each menuItems as item}
								<div class="relative">
									<button
										class="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group transition-colors duration-200"
										on:click|stopPropagation={() => handleDropdown(item.title)}
									>
										<span class="flex items-center gap-2">
											<span class="text-xl">{item.icon}</span>
											<span class="font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
										</span>
										<svg
											class="w-4 h-4 text-gray-400 transform transition-transform duration-200 {activeDropdown === item.title ? 'rotate-180' : ''}"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
										</svg>
									</button>

									{#if activeDropdown === item.title}
										<div
											class="absolute left-full top-0 bg-white rounded-lg shadow-lg border min-w-[200px] -mt-2 ml-1"
											transition:fade|local={{ duration: 150 }}
										>
											{#each item.items as subItem}
												<div class="py-2 px-4">
													<div class="font-medium text-gray-800 mb-2">{subItem.title}</div>
													<div class="space-y-1">
														{#each subItem.items as link}
															<a
																href={link.path}
																class="block px-2 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-200"
															>
																{link.title}
															</a>
														{/each}
													</div>
												</div>
												{#if subItem !== item.items[item.items.length - 1]}
													<div class="border-b mx-4"></div>
												{/if}
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<a href="/" class="text-xl font-bold text-gray-800">KnowledgeRepo</a>
			</div>

			<div class="flex-1 max-w-2xl mx-4">
				<div class="relative">
					<input
						type="search"
						placeholder="Search knowledge base or use #tags..."
						class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
						bind:value={searchQuery}
						on:focus={() => isSearchFocused = true}
						on:blur={() => setTimeout(() => isSearchFocused = false, 200)}
						on:keydown={(e) => e.key === 'Enter' && handleSearch()}
					/>
					<button
						class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
						on:click={handleSearch}>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
						</svg>
					</button>
					
					{#if isSearchFocused && searchQuery && searchSuggestions.length > 0}
						<div 
							transition:slide|local
							class="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border overflow-hidden z-50">
							{#each searchSuggestions as suggestion}
								<button
									class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
									on:click={() => selectSuggestion(suggestion)}>
									<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
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
					class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
					on:click={() => isAuthModalOpen = true}
					aria-label="Sign in">
					<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</header>

{#if isAuthModalOpen}
	<AuthModal on:close={() => isAuthModalOpen = false} />
{/if}

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>