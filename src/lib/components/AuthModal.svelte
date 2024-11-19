<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	
	const dispatch = createEventDispatcher();
	let isEmailForm = false;
	let email = '';
	let password = '';
	
	function closeModal() {
		dispatch('close');
	}
	
	function handleSubmit() {
		// Handle form submission
		console.log('Form submitted:', { email, password });
		closeModal();
	}
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
	on:click={closeModal}
	transition:fade>
	<div
		class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
		on:click|stopPropagation>
		<div class="p-6">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold text-gray-900">Sign In</h2>
				<button
					class="text-gray-400 hover:text-gray-500"
					on:click={closeModal}>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
					</svg>
				</button>
			</div>
			
			{#if isEmailForm}
				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
					</div>
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							id="password"
							bind:value={password}
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Sign in
					</button>
					<button
						type="button"
						class="w-full text-sm text-indigo-600 hover:text-indigo-500"
						on:click={() => isEmailForm = false}
					>
						Or continue with social providers
					</button>
				</form>
			{:else}
				<div class="space-y-4">
					<button
						class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24">
							<path
								fill="#4285F4"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="#34A853"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="#FBBC05"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="#EA4335"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Continue with Google
					</button>
					<button
						class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.578 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/>
						</svg>
						Continue with GitHub
					</button>
					<button
						class="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
					>
						<svg class="w-5 h-5" fill="#1DA1F2" viewBox="0 0 24 24">
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
						</svg>
						Continue with Twitter
					</button>
					<button
						type="button"
						class="w-full text-sm text-indigo-600 hover:text-indigo-500"
						on:click={() => isEmailForm = true}
					>
						Or sign in with email
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>