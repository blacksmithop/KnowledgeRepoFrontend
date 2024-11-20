<script>
	import { slide } from 'svelte/transition';

	const menuData = [
		{
			title: 'Home',
			icon: '🏠',
			path: '/'
		},
		{
			title: 'Frameworks',
			icon: '🎯',
			children: [
				{
					title: 'Frontend',
					children: [
						{ title: 'React', path: '/frameworks/react' },
						{ title: 'Vue', path: '/frameworks/vue' },
						{ title: 'Svelte', path: '/frameworks/svelte' }
					]
				},
				{
					title: 'Backend',
					children: [
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
			children: [
				{
					title: 'Containers',
					children: [
						{ title: 'Docker', path: '/devops/docker' },
						{ title: 'Kubernetes', path: '/devops/kubernetes' }
					]
				},
				{
					title: 'CI/CD',
					children: [
						{ title: 'Jenkins', path: '/devops/jenkins' },
						{ title: 'GitHub Actions', path: '/devops/github-actions' }
					]
				}
			]
		},
		{
			title: 'Languages',
			icon: '📝',
			children: [
				{
					title: 'Compiled',
					children: [
						{ title: 'Go', path: '/languages/go' },
						{ title: 'Rust', path: '/languages/rust' },
						{ title: 'C++', path: '/languages/cpp' }
					]
				},
				{
					title: 'Interpreted',
					children: [
						{ title: 'Python', path: '/languages/python' },
						{ title: 'JavaScript', path: '/languages/javascript' },
						{ title: 'Ruby', path: '/languages/ruby' }
					]
				}
			]
		}
	];

	let expandedItems = new Set();

	function toggleItem(path) {
		if (expandedItems.has(path)) {
			expandedItems.delete(path);
		} else {
			expandedItems.add(path);
		}
		expandedItems = expandedItems; // trigger reactivity
	}

	function isExpanded(path) {
		return expandedItems.has(path);
	}
</script>

--save-dev
<nav class="bg-white w-64 shadow-lg border-r h-full overflow-y-auto">
	{#each menuData as item}
		<div class="border-b border-gray-100 last:border-b-0">
			{#if item.children}
				<button
					class="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
					on:click={() => toggleItem(item.title)}
				>
					<span class="flex items-center gap-2">
						<span class="text-lg">{item.icon}</span>
						<span class="font-medium">{item.title}</span>
					</span>
					<svg
						class="w-4 h-4 transform transition-transform {isExpanded(item.title)
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
				{#if isExpanded(item.title)}
					<div transition:slide|local>
						{#each item.children as subItem}
							<div class="pl-4 border-l-2 border-indigo-50 ml-4">
								{#if subItem.children}
									<button
										class="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
										on:click={() => toggleItem(`${item.title}-${subItem.title}`)}
									>
										<span class="font-medium text-gray-700">{subItem.title}</span>
										<svg
											class="w-4 h-4 transform transition-transform {isExpanded(
												`${item.title}-${subItem.title}`
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
									{#if isExpanded(`${item.title}-${subItem.title}`)}
										<div transition:slide|local>
											{#each subItem.children as child}
												<a
													href={child.path}
													class="block pl-8 pr-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
												>
													{child.title}
												</a>
											{/each}
										</div>
									{/if}
								{:else}
									<a
										href={subItem.path}
										class="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
									>
										{subItem.title}
									</a>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			{:else}
				<a
					href={item.path}
					class="block px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
				>
					<span class="text-lg">{item.icon}</span>
					<span class="font-medium">{item.title}</span>
				</a>
			{/if}
		</div>
	{/each}
</nav>
