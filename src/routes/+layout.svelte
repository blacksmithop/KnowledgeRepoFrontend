<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatWindow from '$lib/components/ChatWindow.svelte';
</script>

<div class="min-h-screen bg-gray-50">
	<Header />

	<main class="main-content overflow-y-auto">
		<slot />
	</main>

	<Footer />
	<ChatWindow />
</div>
