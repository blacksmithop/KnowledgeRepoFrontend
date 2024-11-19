<script>
	export let title;
	export let description;
	export let tags;
	export let example;
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-indigo-50">
	<div class="p-6">
		<h3 class="text-xl font-semibold mb-2 text-indigo-900">{title}</h3>
		<p class="text-gray-600 mb-4">{description}</p>
		
		<div class="mb-4">
			<pre class="bg-gradient-to-r from-gray-50 to-indigo-50 p-3 rounded-lg text-sm overflow-x-auto border border-indigo-100">{example}</pre>
		</div>
		
		<div class="flex flex-wrap gap-2">
			{#each tags as tag}
				<span class="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm rounded-full border border-indigo-200 cursor-pointer hover:from-indigo-200 hover:to-purple-200 transition-colors">
					#{tag}
				</span>
			{/each}
		</div>
	</div>
</div>