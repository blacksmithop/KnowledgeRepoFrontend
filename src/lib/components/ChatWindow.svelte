<script>
	import { slide } from 'svelte/transition';
	import UserAvatar from './UserAvatar.svelte';
	import BotAvatar from './BotAvatar.svelte';

	let isOpen = false;
	let message = '';
	let chatHistory = [];

	const starters = [
		'How do I set up Docker volumes?',
		'What are React hooks?',
		'Explain Kubernetes deployments'
	];

	function toggleChat() {
		isOpen = !isOpen;
	}

	function sendMessage(text = message) {
		if (text.trim()) {
			chatHistory = [
				...chatHistory,
				{ type: 'user', text },
				{ type: 'bot', text: `I'm a RAG-powered assistant. Here's what I found about "${text}"...` }
			];
			message = '';
		}
	}
</script>

<div class="fixed bottom-[var(--footer-height)] right-4">
	{#if isOpen}
		<div transition:slide class="bg-white rounded-t-lg shadow-lg border w-96 mb-4">
			<div
				class="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg flex justify-between items-center"
			>
				<span class="font-semibold">Knowledge Assistant</span>
				<button on:click={toggleChat} class="text-white hover:text-gray-200">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="h-96 overflow-y-auto p-4 bg-gray-50">
				{#if chatHistory.length === 0}
					<div class="space-y-2 mb-4">
						<p class="text-gray-600 text-sm font-medium">Try asking about:</p>
						{#each starters as starter}
							<button
								class="block w-full text-left p-2 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm transition-colors"
								on:click={() => sendMessage(starter)}
							>
								{starter}
							</button>
						{/each}
					</div>
				{/if}

				{#each chatHistory as message}
					<div
						class="mb-4 flex items-start gap-2 {message.type === 'user' ? 'flex-row-reverse' : ''}"
					>
						<div class="flex-shrink-0">
							{#if message.type === 'user'}
								<UserAvatar />
							{:else}
								<BotAvatar />
							{/if}
						</div>
						<div class="max-w-[80%]">
							<span
								class="inline-block p-3 rounded-lg {message.type === 'user'
									? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
									: 'bg-white border shadow-sm'}"
							>
								{message.text}
							</span>
						</div>
					</div>
				{/each}
			</div>

			<div class="p-3 border-t bg-white">
				<div class="flex gap-2">
					<input
						type="text"
						bind:value={message}
						placeholder="Ask anything..."
						class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
						on:keydown={(e) => e.key === 'Enter' && sendMessage()}
					/>
					<button
						on:click={() => sendMessage()}
						class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	{:else}
		<button
			on:click={toggleChat}
			class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
				/>
			</svg>
		</button>
	{/if}
</div>
